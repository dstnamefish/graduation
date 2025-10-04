import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { $t } from '@/locales';
import { useUserStore } from '@/store/modules/user';
import { BaseResponse } from '@/types/api/request';
import { fetchRefreshToken } from '@/api/auth';

import { HttpError, handleError, showError, showSuccess } from './error';
import { ApiStatus } from './status';

/** 请求配置常量 */
const REQUEST_TIMEOUT = 15000;
const LOGOUT_DELAY = 500;
const MAX_RETRIES = 0;
const RETRY_DELAY = 1000;
const UNAUTHORIZED_DEBOUNCE_TIME = 3000;

/** 401防抖状态 */
let isUnauthorizedErrorShown = false;
let unauthorizedTimer: NodeJS.Timeout | null = null;

/** 刷新令牌状态 */
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

/** 扩展 AxiosRequestConfig */
interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  showErrorMessage?: boolean
  showSuccessMessage?: boolean
}

const { VITE_API_URL, VITE_WITH_CREDENTIALS } = import.meta.env;

/** Axios实例 */
const axiosInstance = axios.create({
  baseURL: VITE_API_URL,
  timeout: REQUEST_TIMEOUT,
  transformResponse: [
    (data, headers) => {
      const contentType = headers['content-type'];
      if (contentType?.includes('application/json')) {
        try {
          return JSON.parse(data);
        } catch {
          return data;
        }
      }
      return data;
    },
  ],
  validateStatus: (status) => status >= 200 && status < 300,
  withCredentials: VITE_WITH_CREDENTIALS === 'true',
});

/** 请求拦截器 */
axiosInstance.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    const { accessToken } = useUserStore();

    // 按照JWT标准，Authorization头应该包含Bearer前缀
    if (accessToken) {request.headers.set('Authorization', `Bearer ${accessToken}`);}

    if (request.data && !(request.data instanceof FormData) && !request.headers['Content-Type']) {
      request.headers.set('Content-Type', 'application/json');
      request.data = JSON.stringify(request.data);
    }

    return request;
  },
  (error) => {
    showError(createHttpError($t('httpMsg.requestConfigError'), ApiStatus.error));
    return Promise.reject(error);
  },
);

/** 响应拦截器 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<BaseResponse>) => {
    const { code, msg } = response.data;
    if (code === ApiStatus.success) {return response;}
    if (code === ApiStatus.unauthorized) {handleUnauthorizedError(msg);}
    throw createHttpError(msg || $t('httpMsg.requestFailed'), code);
  },
  (error) => {
    if (error.response?.status === ApiStatus.unauthorized) {handleUnauthorizedError();}
    return Promise.reject(handleError(error));
  },
);

/**
 * @description 统一创建HttpError
 * @param message 错误信息
 * @param code 错误码
 * @returns {HttpError}
 */
function createHttpError(message: string, code: number) {
  return new HttpError(message, code);
}

/**
 * @description 处理401错误（带令牌刷新机制）
 * @param message 错误信息
 * @returns never
 */
function handleUnauthorizedError(message?: string): never {
  const error = createHttpError(message || $t('httpMsg.unauthorized'), ApiStatus.unauthorized);
  
  // 如果没有刷新令牌或正在刷新中，直接登出
  const userStore = useUserStore();
  if (!userStore.refreshToken || isRefreshing) {
    if (!isUnauthorizedErrorShown) {
      isUnauthorizedErrorShown = true;
      logOut();

      unauthorizedTimer = setTimeout(resetUnauthorizedError, UNAUTHORIZED_DEBOUNCE_TIME);

      showError(error, true);
    }
    throw error;
  }
  
  // 创建一个Promise等待刷新令牌完成
  const refreshPromise = new Promise<string>((resolve, reject) => {
    // 将回调函数添加到订阅者列表
    refreshSubscribers.push((newToken) => {
      resolve(newToken);
    });
  });
  
  // 开始刷新令牌
  refreshToken(userStore.refreshToken);
  
  // 抛出错误，但不显示消息，因为我们正在尝试刷新令牌
  throw error;
}

/**
 * @description 刷新令牌
 * @param refreshToken 刷新令牌
 */
async function refreshToken(currentRefreshToken: string) {
  if (isRefreshing) return;
  
  isRefreshing = true;
  
  try {
    // 调用刷新令牌接口
    const response = await fetchRefreshToken({ refreshToken: currentRefreshToken });
    
    if (response.token) {
      const userStore = useUserStore();
      // 更新用户存储中的token和refreshToken
      userStore.setToken(response.token, response.refreshToken);
      
      // 执行所有等待中的请求
      refreshSubscribers.forEach((callback) => callback(response.token));
    }
  } catch (error) {
    console.error('刷新令牌失败:', error);
    // 刷新失败，执行登出
    logOut();
  } finally {
    // 重置刷新状态
    isRefreshing = false;
    refreshSubscribers = [];
  }
}

/**
 * @description 重置401防抖状态
 * @returns {void}
 */
function resetUnauthorizedError() {
  isUnauthorizedErrorShown = false;
  if (unauthorizedTimer) {clearTimeout(unauthorizedTimer);}
  unauthorizedTimer = null;
}

/** 退出登录函数 */
function logOut() {
  setTimeout(() => {
    useUserStore().logOut();
  }, LOGOUT_DELAY);
}

/** 是否需要重试 */
function shouldRetry(statusCode: number) {
  return [
    ApiStatus.requestTimeout,
    ApiStatus.internalServerError,
    ApiStatus.badGateway,
    ApiStatus.serviceUnavailable,
    ApiStatus.gatewayTimeout,
  ].includes(statusCode);
}

/** 请求重试逻辑 */
async function retryRequest<T>(
  config: ExtendedAxiosRequestConfig,
  retries: number = MAX_RETRIES,
): Promise<T> {
  try {
    return await request<T>(config);
  } catch (error) {
    if (retries > 0 && error instanceof HttpError && shouldRetry(error.code)) {
      await delay(RETRY_DELAY);
      return retryRequest<T>(config, retries - 1);
    }
    throw error;
  }
}

/**
 * @description 当刷新令牌成功后，重新发送请求
 * @param config 请求配置
 * @param token 新的访问令牌
 */
function retryOriginalRequest<T>(config: ExtendedAxiosRequestConfig, token: string): Promise<T> {
  config.headers = config.headers || {};
  config.headers.Authorization = `Bearer ${token}`;
  return request<T>(config);
}

/** 延迟函数 */
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** 请求函数 */
async function request<T = any>(config: ExtendedAxiosRequestConfig): Promise<T> {
  // POST | PUT 参数自动填充
  if (
    ['POST', 'PUT'].includes(config.method?.toUpperCase() || '') &&
    config.params &&
    !config.data
  ) {
    config.data = config.params;
    config.params = undefined;
  }

  try {
    const res = await axiosInstance.request<BaseResponse<T>>(config);

    // 显示成功消息
    if (config.showSuccessMessage && res.data.msg) {
      showSuccess(res.data.msg);
    }

    return res.data.data as T;
  } catch (error) {
    // 如果是401错误且正在刷新令牌，等待刷新完成后重试请求
    if (error instanceof HttpError && error.code === ApiStatus.unauthorized && isRefreshing) {
      const userStore = useUserStore();
      if (userStore.refreshToken) {
        // 创建一个Promise等待刷新完成
        return new Promise<T>((resolve, reject) => {
          // 添加到订阅者列表
          refreshSubscribers.push((newToken) => {
            try {
              // 重试原始请求
              resolve(retryOriginalRequest(config, newToken));
            } catch (retryError) {
              reject(retryError);
            }
          });
        });
      }
    }

    // 其他错误处理
    if (error instanceof HttpError && error.code !== ApiStatus.unauthorized) {
      const showMsg = config.showErrorMessage !== false;
      showError(error, showMsg);
    }
    
    return Promise.reject(error);
  }
}

/** API方法集合 */
const api = {
  del<T>(config: ExtendedAxiosRequestConfig) {
    return retryRequest<T>({ ...config, method: 'DELETE' });
  },
  get<T>(config: ExtendedAxiosRequestConfig) {
    return retryRequest<T>({ ...config, method: 'GET' });
  },
  post<T>(config: ExtendedAxiosRequestConfig) {
    return retryRequest<T>({ ...config, method: 'POST' });
  },
  put<T>(config: ExtendedAxiosRequestConfig) {
    return retryRequest<T>({ ...config, method: 'PUT' });
  },
  request<T>(config: ExtendedAxiosRequestConfig) {
    return retryRequest<T>(config);
  },
};

export default api;