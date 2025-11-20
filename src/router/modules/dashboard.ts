import { AppRouteRecord } from '@/types/router';

/**
 * Dashboard (仪表板) 路由配置
 */
export const dashboardRoutes: AppRouteRecord[] = [
  {
    component: '/dashboard',
    meta: {
      headerBar:{
        breadcrumb: true,
        chat: true,
        globalSearch: true,
        language: true,
        notification: true,
        settings: true,
        themeToggle: true,
      },
      keepAlive: false,
      roles: ['ADMIN'],
      title: 'menus.dashboard.title',
    },
    name: 'Dashboard',
    path: '/dashboard',
  },
];