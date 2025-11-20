import { AppRouteRecord } from '@/types/router';

import { appointmentsRoutes } from './appointments';
import { dashboardRoutes } from './dashboard';
import { departmentsRoutes } from './departments';
import { doctorsRoutes } from './doctors';
import { doctorsScheduleRoutes } from './doctorsSchedule';
import { inventoryRoutes } from './inventory';
import { messagesRoutes } from './messages';
import { patientsRoutes } from './patients';
import { paymentsRoutes } from './payments';

/**
 * 导出所有模块化路由
 */
export const routeModules: AppRouteRecord[] = [
  ...dashboardRoutes,
  ...appointmentsRoutes,
  ...patientsRoutes,
  ...doctorsRoutes,
  ...departmentsRoutes,
  ...doctorsScheduleRoutes,
  ...paymentsRoutes,
  ...inventoryRoutes,
  ...messagesRoutes,
];