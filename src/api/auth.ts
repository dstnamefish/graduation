import api from '@/utils/http';

import type { LoginRequest, RegisterRequest,SendCodeRequest,UserInfo, CodeResponseData, LoginResponseData, RefreshTokenRequest } from '@/types/api/auth';

/**
 * 用户登录
 * @param params 登录请求参数
 * @returns 登录响应结果
 */
export function fetchLogin(params: LoginRequest) {
  return api.post<LoginResponseData>({
    data: params,
    showErrorMessage: true,
    showSuccessMessage: true,
    url: '/auth/login',
  });
}

/**
 * 用户注册
 * @param params 注册请求参数
 * @returns 注册响应结果
 */
export function fetchRegister(params: RegisterRequest) {
  return api.post<CodeResponseData>({
    data: params,
    showSuccessMessage: true,
    url: '/auth/register',
  });
}

/**
 * 发送邮箱验证码
 * @param params 发送验证码请求参数
 * @returns 发送结果
 */
export function fetchSendEmailCode(params: SendCodeRequest) {
  return api.post<CodeResponseData>({
    data: params,
    showSuccessMessage: true,
    url: '/auth/sendCode',
  });
}

/**
 * 校验工号和真实姓名
 * @param employeeId 工号
 * @param realName 真实姓名
 * @returns 校验结果
 */
export function fetchCheckEmployeeIdAndRealName(employeeId: string, realName: string) {
  return api.get<CodeResponseData>({
    params: {
      employeeId,
      realName,
    },
    url: '/auth/check-employee',
  });
}

/**
 * 获取当前用户信息
 * @returns 用户信息
 */
export function fetchGetUserInfo() {
  return api.get<UserInfo>({
    url: '/user/info',
  });
}

/**
 * 刷新令牌
 * @param params 刷新令牌请求参数
 * @returns 刷新令牌响应结果
 */
export function fetchRefreshToken(params: RefreshTokenRequest) {
  return api.post<LoginResponseData>({
    data: params,
    showErrorMessage: true,
    url: '/auth/refreshToken',
  });
}

/**
 * 检查会话是否有效
 * @param token 当前的access token
 * @returns 检查结果
 */
export function fetchCheckSession(token: string) {
  return api.get<CodeResponseData>({
    params: { token },
    url: '/auth/checkSession',
  });
}

/**
 * 验证用户名是否存在
 * @param value 用户名
 * @returns 验证结果
 */
export function fetchValidateUsername(value: string) {
  return api.get<{ exists: boolean }>({
    params: { value },
    url: '/auth/validate/username',
  });
}

/**
 * 验证邮箱是否存在
 * @param value 邮箱
 * @returns 验证结果
 */
export function fetchValidateEmail(value: string) {
  return api.get<{ exists: boolean }>({
    params: { value },
    url: '/auth/validate/email',
  });
}