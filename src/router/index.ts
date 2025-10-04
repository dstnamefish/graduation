import { createRouter, createWebHashHistory } from 'vue-router';

import { setupAfterEachGuard } from './guards/afterEach';
import { setupBeforeEachGuard } from './guards/beforeEach';
import { staticRoutes } from './routes/staticRoutes';
import { configureNProgress } from './utils/utils';

import type { App } from 'vue';


/**
 * 创建并配置 Vue Router 实例
 *
 * 使用哈希模式(createWebHashHistory)创建路由实例，配置静态路由表。
 * 哈希模式提供更好的浏览器兼容性和部署便利性，适合内部管理系统和需要
 * 快速部署的场景。
 *
 * @type {Router}
 *
 * @property {RouterHistory} history - 路由历史模式实例，使用哈希模式
 * @property {RouteRecordRaw[]} routes - 静态路由配置表
 *
 * @remarks
 * ## 路由模式选择说明：
 * - **哈希模式 (Hash Mode)**:
 *   - ✅ 优点：兼容所有浏览器、部署简单、无需服务器配置
 *   - ❌ 缺点：URL中包含 `#` 符号，美观度较差
 *   - 📍 适用场景：内部系统、静态托管、快速原型开发
 *
 * - **历史模式 (History Mode)**:
 *   - ✅ 优点：URL简洁美观、符合传统URL格式
 *   - ❌ 缺点：需要服务器端配置、低版本浏览器不兼容
 *   - 📍 适用场景：公众网站、SEO要求高的项目
 *
 * @see {@link createWebHashHistory} 哈希模式创建函数
 * @see {@link createWebHistory} 历史模式创建函数
 * @see {@link staticRoutes} 静态路由配置
 * @version 1.0.0
 */
export const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
});

/**
 * 初始化应用程序路由系统
 *
 * 该函数负责配置和安装Vue Router,包含：
 * 1. 配置顶部进度条的显示
 * 2. 设置路由前置守卫
 * 3. 设置路由后置守卫
 * 4. 将路由实例安装到Vue应用中
 *
 * @param app - Vue 应用实例
 * @returns 无返回值
 *
 * @see {@link configureNProgress} 顶部进度条配置
 * @see {@link setupBeforeEachGuard} 路由前置守卫
 * @see {@link setupAfterEachGuard} 路由后置守卫
 */
export function initRouter(app: App<Element>): void {
  configureNProgress();
  setupBeforeEachGuard(router);
  setupAfterEachGuard(router);
  app.use(router);
}

// 主页路径，默认使用菜单第一个有效路径，配置后使用此路径
export const HOME_PAGE_PATH = '';