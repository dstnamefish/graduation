/**
 * 基础响应体
 * @param T 响应数据类型
 * @param code 状态码
 * @param msg 状态信息
 * @param data 响应数据
 */
export interface BaseResponse<T> {
  code: number;
  msg: string;
  data: T;
}