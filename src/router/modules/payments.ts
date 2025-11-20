import { AppRouteRecord } from '@/types/router';

/**
 * Payments (收费管理) 路由配置
 */
export const paymentsRoutes: AppRouteRecord[] = [
  {
    component: '/payments',
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
      title: 'menus.payments.title',
    },
    name: 'Payments',
    path: '/payments',
  },
];