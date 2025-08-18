/**
 * 登录表单数据类型
 */
export interface LoginFormData {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * 登录响应数据类型
 */
export interface LoginResponse {
  token: string;
  userInfo: {
    id: string;
    username: string;
    name: string;
    avatar: string;
    role: string;
  };
}