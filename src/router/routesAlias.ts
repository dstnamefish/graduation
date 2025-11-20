/**
 * 路由路径别名枚举
 *
 * 提供统一的路由路径常量管理，用于：
 * 1. 避免硬编码路由路径，提高代码可维护性
 * 2. 提供类型安全的路由引用
 * 3. 方便全局路由路径修改和重构
 * 4. 支持IDE快速导航和自动补全
 *
 * @enum {string} 路由路径常量
 * @version 1.0.0
 */
export enum RoutesAlias {
  Layout = '/index/index',
  Login = '/auth/login',
  Register = '/auth/register',
  ForgotPassword = '/auth/forgot-password',
  Exception404 = '/exception/404',
}