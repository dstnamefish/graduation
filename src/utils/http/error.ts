import { AxiosError } from 'axios';
import { ElMessage } from 'element-plus';

import { $t } from '@/locales';

import { ApiStatus } from './status';

// 错误响应接口
export interface ErrorResponse {
  code: number
  msg: string
  data?: unknown
}

// 错误日志数据接口
export interface ErrorLogData {
  code: number
  message: string
  data?: unknown
  timestamp: string
  url?: string
  method?: string
  stack?: string
}

// 自定义 HttpError 类
export class HttpError extends Error {
  public readonly code: number;
  public readonly data?: unknown;
  public readonly timestamp: string;
  public readonly url?: string;
  public readonly method?: string;

  constructor(
    message: string,
    code: number,
    options?: {
      data?: unknown
      method?: string
      url?: string
    },
  ) {
    super(message);
    this.name = 'HttpError';
    this.code = code;
    this.data = options?.data;
    this.timestamp = new Date().toISOString();
    this.url = options?.url;
    this.method = options?.method;
  }

  public toLogData(): ErrorLogData {
    return {
      code: this.code,
      data: this.data,
      message: this.message,
      method: this.method,
      stack: this.stack,
      timestamp: this.timestamp,
      url: this.url,
    };
  }
}

/**
 * 获取错误消息
 * @param status 错误状态码
 * @returns 错误消息
 */
const getErrorMessage = (status: number): string => {
  const errorMap: Record<number, string> = {
    [ApiStatus.badGateway]: 'httpMsg.badGateway',
    [ApiStatus.forbidden]: 'httpMsg.forbidden',
    [ApiStatus.gatewayTimeout]: 'httpMsg.gatewayTimeout',
    [ApiStatus.internalServerError]: 'httpMsg.internalServerError',
    [ApiStatus.methodNotAllowed]: 'httpMsg.methodNotAllowed',
    [ApiStatus.notFound]: 'httpMsg.notFound',
    [ApiStatus.requestTimeout]: 'httpMsg.requestTimeout',
    [ApiStatus.serviceUnavailable]: 'httpMsg.serviceUnavailable',
    [ApiStatus.unauthorized]: 'httpMsg.unauthorized',
  };

  return $t(errorMap[status] || 'httpMsg.internalServerError');
};

/**
 * 处理错误
 * @param error 错误对象
 * @returns 错误对象
 */
export function handleError(error: AxiosError<ErrorResponse>): never {
  // 处理取消的请求
  if (error.code === 'ERR_CANCELED') {
    console.warn('Request cancelled:', error.message);
    throw new HttpError($t('httpMsg.requestCancelled'), ApiStatus.error);
  }

  const statusCode = error.response?.status;
  const errorMessage = error.response?.data?.msg || error.message;
  const requestConfig = error.config;

  // 处理网络错误
  if (!error.response) {
    throw new HttpError($t('httpMsg.networkError'), ApiStatus.error, {
      method: requestConfig?.method?.toUpperCase(),
      url: requestConfig?.url,
    });
  }

  // 处理 HTTP 状态码错误
  const message = statusCode
    ? getErrorMessage(statusCode)
    : errorMessage || $t('httpMsg.requestFailed');
  throw new HttpError(message, statusCode || ApiStatus.error, {
    data: error.response.data,
    method: requestConfig?.method?.toUpperCase(),
    url: requestConfig?.url,
  });
}

/**
 * 显示错误消息
 * @param error 错误对象
 * @param showMessage 是否显示错误消息
 */
export function showError(error: HttpError, showMessage: boolean = true): void {
  if (showMessage) {
    ElMessage.error(error.message);
  }

  // 记录错误日志
  console.error('[HTTP Error]', error.toLogData());
}

/**
 * 显示成功消息
 * @param message 成功消息
 * @param showMessage 是否显示消息
 */
export function showSuccess(message: string, showMessage: boolean = true): void {
  if (showMessage) {
    ElMessage.success(message);
  }
}

/**
 * 判断是否为 HttpError 类型
 * @param error 错误对象
 * @returns 是否为 HttpError 类型
 */
export const isHttpError = (error: unknown): error is HttpError => {
  return error instanceof HttpError;
};