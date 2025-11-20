import { AppRouteRecord } from '@/types/router';

/**
 * Messages (消息中心) 路由配置
 */
export const messagesRoutes: AppRouteRecord[] = [
  {
    component: '/messages',
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
      title: 'menus.messages.title',
    },
    name: 'Messages',
    path: '/messages',
  },
];