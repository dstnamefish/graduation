import { AppRouteRecord } from '@/types/router';

/**
 * Dashboard (仪表板) 路由配置
 */
export const dashboardRoutes: AppRouteRecord[] = [
  {
    component: '/dashboard',
    meta: {
      headerBar:{
        showBreadcrumb: true,
        showChat: true,
        showGlobalSearch: true,
        showLanguage: true,
        showNotification: true,
        showSettings: true,
        showThemeToggle: true,
      },
      keepAlive: false,
      roles: ['ADMIN'],
      title: 'menus.dashboard.title',
    },
    name: 'Dashboard',
    path: '/dashboard',
  },
];