export interface UserSearchParams {
  current?: number
  size?: number
  username?: string
  realName?: string
  status?: number
  roleId?: number
}

export interface SystemUserInfo {
  id: number
  username: string
  realName: string
  email?: string
  phone?: string
  status: number
  roleId: number
  roleName?: string
  createdAt: string
  updatedAt: string
}

export interface UserList {
  records: SystemUserInfo[]
  total: number
  current: number
  size: number
}

export interface RoleSearchParams {
  current?: number
  size?: number
  roleName?: string
  status?: number
}

export interface RoleInfo {
  id: number
  roleName: string
  roleCode: string
  description?: string
  status: number
  createdAt: string
  updatedAt: string
}

export interface RoleList {
  records: RoleInfo[]
  total: number
  current: number
  size: number
}