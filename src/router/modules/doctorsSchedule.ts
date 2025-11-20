import { AppRouteRecord } from '@/types/router';

/**
 * DoctorsSchedule (医生排班) 路由配置
 */
export const doctorsScheduleRoutes: AppRouteRecord[] = [
  {
    component: '/doctors-schedule',
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
      title: 'menus.doctorsSchedule.title',
    },
    name: 'DoctorsSchedule',
    path: '/doctors-schedule',
  },
];