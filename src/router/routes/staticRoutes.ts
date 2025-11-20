import { AppRouteRecordRaw } from '@/utils/router';

import { RoutesAlias } from '../routesAlias';

/**
 * 静态路由配置表
 *
 * 定义无需权限验证即可访问的公共路由，包括登录、注册等开放页面。
 * 这些路由在应用初始化时加载，不依赖于用户权限状态。
 *
 * @type {AppRouteRecordRaw[]}
 *
 * @remarks
 * ## 重要注意事项：
 * 1. **路径冲突**：path 和 name 不能与动态路由重复，否则会导致路由冲突
 * 2. **权限控制**：所有静态路由默认无需登录，可通过 `meta.noLogin: true` 显式声明
 * 3. **路由顺序**：静态路由应在动态路由之前定义，确保正确匹配
 * 4. **元数据配置**：合理使用 meta 字段控制页面行为和显示
 *
 * @property {string} path - 路由路径，使用 RoutesAlias 常量避免硬编码
 * @property {string} name - 路由名称，需全局唯一
 * @property {Component} component - 路由组件，使用懒加载优化性能
 * @property {RouteMeta} meta - 路由元信息，控制页面特性和行为
 *
 * @see {@link RoutesAlias} 路由路径别名常量
 * @see {@link AppRouteRecordRaw} 路由记录原始类型定义
 * @version 1.0.0
 */
export const staticRoutes: AppRouteRecordRaw[] = [
  {
    component: () => import('@views/auth/login/index.vue'),
    meta: { isHideTab: true, setTheme: true, title: 'menus.login.title' },
    name: 'Login',
    path: RoutesAlias.Login,
  },
  {
    component: () => import('@views/auth/register/index.vue'),
    meta: { isHideTab: true, noLogin: true, setTheme: true, title: 'menus.register.title' },
    name: 'Register',
    path: RoutesAlias.Register,
  },
  {
    component: () => import('@views/auth/forgot-password/index.vue'),
    meta: { isHideTab: true, noLogin: true, setTheme: true, title: 'menus.forgotPassword.title' },
    name: 'ForgotPassword',
    path: RoutesAlias.ForgotPassword,
  },
  {
    component: () => import('@views/exception/404/index.vue'),
    meta: { title: '404' },
    name: 'Exception404',
    path: '/:pathMatch(.*)*',
  },
];