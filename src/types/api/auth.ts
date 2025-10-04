/**
 * @description 用户登录请求参数接口
 * 定义用户登录时需要提交的表单数据结构
 * 用于用户身份验证和系统登录
 *
 * @interface LoginRequest
 * @property {string} username - 用户名，用于用户身份标识
 * @property {string} password - 用户密码，用于身份验证
 */
export interface LoginRequest {
  username: string
  password: string
}

/**
 * @description 用户注册请求参数接口
 * 定义用户注册时需要提交的完整表单数据结构
 * 包含员工信息、账户信息和验证信息
 *
 * @interface RegisterRequest
 * @property {string} employeeId - 员工ID，用于关联员工档案
 * @property {string} realName - 真实姓名，用于身份认证
 * @property {string} username - 用户名，用于系统登录
 * @property {string} password - 密码，用于账户安全
 * @property {string} confirmPassword - 确认密码，用于密码验证
 * @property {string} email - 邮箱地址，用于账户验证和通知
 * @property {string} verificationCode - 邮箱验证码，用于邮箱验证
 */
export interface RegisterRequest {
  employeeId: string
  realName: string
  username: string
  password: string
  confirmPassword: string
  email: string
  verificationCode: string
}

/**
 * @description 发送验证码请求参数接口
 * 定义发送邮箱验证码时需要的参数
 * 用于用户注册和密码重置等场景
 *
 * @interface SendCodeRequest
 * @property {string} email - 接收验证码的邮箱地址
 */
export interface SendCodeRequest {
  email: string
}

/**
 * @description 用户信息接口
 *
 * @interface UserInfo
 * @property {number} id - 用户id
 * @property {string} username - 用户名
 * @property {string} [realName] - 用户真实姓名
 * @property {string} [avatar] - 用户头像
 * @property {number} status - 用户状态
 * @property {number} roleId - 角色id
 * @property {string} [roleCode] - 角色代码
 */
export interface UserInfo {
  id: number
  username: string
  realName?: string
  avatar?: string
  status: number
  roleId: number
  roleCode?: string
}

/**
 * @description 登录响应数据类型
 * 定义登录成功后返回的数据结构
 *
 * @interface LoginResponseData
 * @property {string} token - 登录凭证，用于后续请求验证
 * @property {string} refreshToken - 刷新令牌，用于在token过期时获取新的token
 * @property {UserInfo} userInfo - 用户信息，包含用户基本信息、权限信息等
 */
export interface LoginResponseData {
  token: string
  refreshToken: string
  userInfo: UserInfo
}

/**
 * @description 验证码响应数据类型
 * 定义发送验证码成功后返回的数据结构
 *
 * @interface CodeResponseData
 * @property {string} message - 提示信息，用于提示用户
 */
export interface CodeResponseData {
  message: string
}

/**
 * @description 刷新令牌请求参数接口
 * 定义刷新令牌时需要提交的参数结构
 */
export interface RefreshTokenRequest {
  refreshToken: string
}