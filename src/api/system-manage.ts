import { asyncRoutes } from '@/router/routes/asyncRoutes';
import { menuDataToRouter } from '@/router/utils/menuToRouter';
import { AppRouteRecord } from '@/types/router';
import api from '@/utils/http';

import type {
  UserSearchParams,
  UserList,
  RoleSearchParams,
  RoleList,
} from '@/types/api/system-manage';

/**
 * 获取用户列表
 * @param params 用户搜索参数
 * @returns 用户列表数据
 */
export function fetchGetUserList(params: UserSearchParams) {
  return api.get<UserList>({
    params,
    url: '/user/list',
  });
}

/**
 * 获取角色列表
 * @param params 角色搜索参数
 * @returns 角色列表数据
 */
export function fetchGetRoleList(params: RoleSearchParams) {
  return api.get<RoleList>({
    params,
    url: '/role/list',
  });
}

/**
 * 菜单响应接口
 */
export interface MenuResponse {
  menuList: AppRouteRecord[];
}

/**
 * 获取菜单数据（模拟）
 * @param delay 模拟延迟时间
 * @returns 菜单数据
 */
export async function fetchGetMenuList(delay = 300): Promise<MenuResponse> {
  try {
    // 模拟接口返回的菜单数据
    const menuData = asyncRoutes;

    // 处理菜单数据
    const menuList = menuData.map((route) => menuDataToRouter(route));

    // 模拟接口延迟
    await new Promise((resolve) => setTimeout(resolve, delay));

    return { menuList };
  } catch (error) {
    throw error instanceof Error ? error : new Error('获取菜单失败');
  }
}