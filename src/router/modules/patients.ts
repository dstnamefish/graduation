import { AppRouteRecord } from '@/types/router';

/**
 * Patients (患者管理) 路由配置
 */
export const patientsRoutes: AppRouteRecord[] = [
  {
    component: '/patients/list',
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
      title: 'menus.patients.title',
    },
    name: 'Patients',
    path: '/patients',
  },
];