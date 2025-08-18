/**
 * @description 登录接口
 * @username 用户名
 * @password 密码
 */
export interface LoginRequest {
  username: string;
  password: string;
}

/**
 * @description 注册接口
 * @username 用户名
 * @password 密码
 * @confirmPassword 确认密码
 * @email 邮箱
 * @verificationCode 验证码
 */
export interface RegisterRequest {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  verificationCode: string;
}

/**
 * @description 发送验证码接口
 * @email 邮箱
 * @code 验证码
 */
export interface SendCodeRequest {
  email: string;
}