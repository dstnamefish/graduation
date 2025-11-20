import { AppRouteRecord } from '@/types/router';

/**
 * Departments (科室管理) 路由配置
 */
export const departmentsRoutes: AppRouteRecord[] = [
  {
    component: '/departments',
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
      title: 'menus.departments.title',
    },
    name: 'Departments',
    path: '/departments',
  },
];