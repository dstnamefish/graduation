import { createRouter, createWebHashHistory } from 'vue-router';

import { configureNProgress } from '@/utils/router';

import { setupAfterEachGuard } from './guards/afterEach';
import { setupBeforeEachGuard } from './guards/beforeEach';
import { staticRoutes } from './routes/staticRoutes';

import type { App } from 'vue';

// 创建路由实例
export const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
});

// 初始化路由
export function initRouter(app: App<Element>): void {
  configureNProgress();
  setupBeforeEachGuard(router);
  setupAfterEachGuard(router);
  app.use(router);
}

// 主页路径，默认使用菜单第一个有效路径，配置后使用此路径
export const HOME_PAGE_PATH = '';