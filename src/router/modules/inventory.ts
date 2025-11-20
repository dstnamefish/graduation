import { AppRouteRecord } from '@/types/router';

/**
 * Inventory (库存管理) 路由配置
 */
export const inventoryRoutes: AppRouteRecord[] = [
  {
    component: '/inventory',
    meta: {
      keepAlive: false,
      roles: ['ADMIN'],
      showBreadcrumb: true,
      showChat: true,
      showGlobalSearch: true,
      showLanguage: true,
      showNotification: true,
      showSettings: true,
      showThemeToggle: true,
      title: 'menus.inventory.title',
    },
    name: 'Inventory',
    path: '/inventory',
  },
];