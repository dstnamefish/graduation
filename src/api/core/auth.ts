import request from '@/utils/http';

import type { LoginParams, LoginResponse, RegisterParams, RegisterResponse } from '@/types/api/core/auth';

/**
 * fetch create update remove 操作
 * GET → Read (读取)
 * POST → Create (创建)
 * PUT/PATCH → Update (更新)
 * DELETE → Delete (删除)
 */

/**
 * 认证
 */

/**
 * 登录
 * @param params 登录参数
 * @returns 登录响应
 */
export function fetchLogin(params: LoginParams) {
  return request.post<LoginResponse>({
    params,
    showErrorMessage: true,
    showSuccessMessage: true,
    url:'auth/login',
  });
}

/**
 * 注册
 * @param params 注册参数
 * @returns 注册响应
 */
export function fetchRegister(params: RegisterParams) {
  return request.post<RegisterResponse>({
    params,
    showErrorMessage: true,
    showSuccessMessage: true,
    url:'auth/register',
  });
}