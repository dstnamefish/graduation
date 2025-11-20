/**
 * 用户信息
 * @property id 用户ID
 * @property username 用户名
 * @property role 用户角色
 */
export interface UserInfo {
  id: number;
  username: string;
  role: string;
  roleCode?: string;
}