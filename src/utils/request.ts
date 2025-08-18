import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

// 创建axios实例
const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }

    if (import.meta.env.NODE_ENV === 'development') {
      console.log(`请求拦截：${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error('请求拦截错误:', error);
    return Promise.reject(error);
  },
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么
    if (response.status !== 200) {
      return Promise.reject(new Error(`Http错误：${response.status}`));
    }
    const res = response.data;
    if (res.code && res.code !== 200) {
      console.log('业务错误：',res.message || '未知错误');
      return Promise.reject(new Error(res.message || '业务错误'));
    }

    if (import.meta.env.NODE_ENV === 'development') {
      console.log(`响应拦截：${response.config.url}`, response);
    }

    return response.data || res;
  },
  (error) => {
    // 对响应错误做点什么

    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('未授权，请重新登录');
          break;
        case 403:
          console.error('拒绝访问');
          break;
        case 404:
          console.error('请求资源不存在');
          break;
        case 500:
          console.error('服务器内部错误');
          break;
        default:
          console.error('未知HTTP错误:', error.response.status);

      }
    } else if (error.request) {
      console.error('无响应:', error.request);
    } else {
      console.error('请求错误:', error.message);
    }
    return Promise.reject(error);
  },
);
export function createRequest<T>(config: AxiosRequestConfig): Promise<T> {
  return request(config);
}

export function get<T>(url:string,config?:AxiosRequestConfig): Promise<T> {
  return request.get(url,config);
}
export function post<T>(url:string,data?:any,config?:AxiosRequestConfig): Promise<T> {
  return request.post(url,data,config);
}
export function put<T>(url:string,data?:any,config?:AxiosRequestConfig): Promise<T> {
  return request.put(url,data,config);
}
export function del<T>(url:string,config?:AxiosRequestConfig): Promise<T> {
  return request.delete(url,config);
}

export default request;