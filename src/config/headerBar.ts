import { HeaderBarFeatureConfig } from '@/types/config';

const defaultConfig: HeaderBarFeatureConfig = {
  breadcrumb: true,
  chat: true,
  globalSearch: true,
  language: true,
  notification: true,
  settings: true,
  themeToggle: true,
};

export const headerBarConfig = {
  default: defaultConfig,
  routeMap: {
    Appointments: defaultConfig,
    Dashboard: {
      ...defaultConfig,
      breadcrumb: false,
    },
    Departments: {
      ...defaultConfig,
      chat: false,
      globalSearch: false,
    },
    Doctors: defaultConfig,
    DoctorsSchedule: defaultConfig,
    Inventory: defaultConfig,
    Messages: defaultConfig,
    Patients: defaultConfig,
    Payments: defaultConfig,
  } as const satisfies Record<string, Partial<HeaderBarFeatureConfig>>,
} as const;

export function getHeaderBarConfig(routeName?: string): HeaderBarFeatureConfig {
  const routeConfig = routeName ? headerBarConfig.routeMap[routeName] : {};
  return {
    ...headerBarConfig.default,
    ...routeConfig,
  };
}