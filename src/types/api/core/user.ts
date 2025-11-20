/**
 * 用户信息
 * @property id 用户ID
 * @property username 用户名
 * @property role 用户角色
 * @property roleCode 用户角色代码
 * @property realName 真实姓名
 * @property avatar 头像
 */
export interface UserInfo {
  id: number;
  username: string;
  role: string;
  roleCode?: string;
  realName?:string;
  avatar?:string;
}