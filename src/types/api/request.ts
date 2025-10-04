export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined

export interface BaseResponse<T = any> {
  code: number
  msg: string
  data: T
}

export interface PaginationParams {
  current: number
  size: number
  total: number
}

export interface PaginatedResponse<T = any> {
  records: T[]
  total: number
  current?: number
  size?: number
}

export interface RequestOptions {
  joinParamsToUrl?: boolean
  formatDate?: boolean
  isTransformResponse?: boolean
  isReturnNativeResponse?: boolean
  joinPrefix?: boolean
  apiUrl?: string
  errorMessageMode?: ErrorMessageMode
  joinTime?: boolean
  ignoreCancelToken?: boolean
  withToken?: boolean
}

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface RequestHeaders {
  [key: string]: string | number | boolean
}

export interface BaseRequestConfig {
  url: string
  method?: RequestMethod
  headers?: RequestHeaders
  params?: Record<string, any>
  data?: any
  timeout?: number
}