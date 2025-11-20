import { AppRouteRecord } from '@/types/router';

import { routeModules } from '../modules/index';

/**
 * 菜单列表、异步路由
 *
 * 支持两种模式:
 * 前端静态配置 - 直接使用本文件中定义的路由配置
 * 后端动态配置 - 后端返回菜单数据，前端解析生成路由
 *
 * 菜单标题（title）:
 * 可以是 i18n 的 key，也可以是字符串，比如：'用户列表'
 *
 * 注意事项：
 * 1、RoutesAlias.Layout 指向的是布局容器，后端返回的菜单数据中，component 字段需要指向 /index/index
 * 2、path、name 不要和动态路由冲突，否则会导致路由冲突无法访问
 *
 * 重构说明：
 * - 2024年重构：将路由配置按模块拆分到 src/router/modules/ 目录下
 * - 每个模块独立管理自己的路由配置，降低耦合度
 * - 保持路由加载顺序一致
 */
export const asyncRoutes: AppRouteRecord[] = routeModules;