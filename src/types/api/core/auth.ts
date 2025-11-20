import { UserInfo } from './user';

/**
 * 登录参数
 * @property username 用户名
 * @property password 密码
 */
export interface LoginParams {
  username: string;
  password: string;
}

/**
 * 登录响应
 * @property token 访问令牌
 * @property refreshToken 刷新令牌
 * @property user 用户信息
 */
export interface LoginResponse {
  token: string;
  refreshToken: string;
  userInfo: UserInfo;
}

/**
 * 注册参数
 * @property username 用户名
 * @property password 密码
 * @property email 邮箱
 * @property phone 手机号
 * @property confirmPassword 确认密码
 */
export interface RegisterParams {
  username: string;
  password: string;
  email: string;
  phone: string;
  confirmPassword: string;
}

/**
 * 注册响应
 * @property id 用户ID
 * @property username 用户名
 * @property role 用户角色
 */
export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
}