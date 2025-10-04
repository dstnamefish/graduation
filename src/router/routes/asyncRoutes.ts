import { AppRouteRecord } from '@/types/router';

import { RoutesAlias } from '../routesAlias';

/**
 * 菜单列表、异步路由
 *
 * 支持两种模式:
 * 前端静态配置 - 直接使用本文件中定义的路由配置
 * 后端动态配置 - 后端返回菜单数据，前端解析生成路由
 *
 * 菜单标题（title）:
 * 可以是 i18n 的 key，也可以是字符串，比如：'用户列表'
 *
 * 注意事项：
 * 1、RoutesAlias.Layout 指向的是布局容器，后端返回的菜单数据中，component 字段需要指向 /index/index
 * 2、path、name 不要和动态路由冲突，否则会导致路由冲突无法访问
 */
export const asyncRoutes: AppRouteRecord[] = [
  {
    component: RoutesAlias.Dashboard,
    meta: { title: 'menus.dashboard.title' },
    name: 'Dashboard',
    path: '/dashboard',
  },
  {
    component: RoutesAlias.Appointments,
    meta: { title: 'menus.appointments.title' },
    name: 'Appointments',
    path: '/appointments',
  },
  {
    component: RoutesAlias.Patients,
    meta: { title: 'menus.patients.title' },
    name: 'Patients',
    path: '/patients',
  },
  {
    component: RoutesAlias.Doctors,
    meta: { keepAlive: false,title: 'menus.doctors.title' },
    name: 'Doctors',
    path: '/doctors',
  },
  {
    component: RoutesAlias.Departments,
    meta: { keepAlive: false,title: 'menus.departments.title' },
    name: 'Departments',
    path: '/departments',
  },
  {
    component: RoutesAlias.DoctorsSchedule,
    meta: { keepAlive: false,title: 'menus.doctorsSchedule.title' },
    name: 'DoctorsSchedule',
    path: '/doctors-schedule',
  },
  {
    component: RoutesAlias.Payments,
    meta: { keepAlive: false,title: 'menus.payments.title' },
    name: 'Payments',
    path: '/payments',
  },
  {
    component: RoutesAlias.Inventory,
    meta: { keepAlive: false,title: 'menus.inventory.title' },
    name: 'Inventory',
    path: '/inventory',
  },
  {
    component: RoutesAlias.Messages,
    meta: { keepAlive: false,title: 'menus.messages.title' },
    name: 'Messages',
    path: '/messages',
  },
];