import { AppRouteRecord } from '@/types/router';

/**
 * Doctors (医生管理) 路由配置
 */
export const doctorsRoutes: AppRouteRecord[] = [
  {
    component: '/doctors',
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
      title: 'menus.doctors.title',
    },
    name: 'Doctors',
    path: '/doctors',
  },
];