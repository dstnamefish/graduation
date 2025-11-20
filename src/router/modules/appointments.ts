import { AppRouteRecord } from '@/types/router';

/**
 * Appointments (预约管理) 路由配置
 */
export const appointmentsRoutes: AppRouteRecord[] = [
  {
    component: '/appointments',
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
      title: 'menus.appointments.title',
    },
    name: 'Appointments',
    path: '/appointments',
  },
];