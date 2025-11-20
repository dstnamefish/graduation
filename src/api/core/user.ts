import { UserInfo } from '@/types/api/core/user';
import request from '@/utils/http';

/**
 * 用户
 */

/**
 * 获取用户信息
 * @returns 用户信息响应
 */
export function fetchUserInfo() {
  return request.get<UserInfo>({
    showErrorMessage: true,
    showSuccessMessage: true,
    url:'user/info',
  });
}