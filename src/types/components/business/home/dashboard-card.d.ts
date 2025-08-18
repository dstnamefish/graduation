/**
 * 首页卡片
 * @description 首页卡片
 * @interface DashboardCard
 * @property {string} title - 卡片标题
 * @property {number} value - 卡片值
 * @property {number} trend - 卡片趋势
 * @property {string} desc - 卡片描述
 */
export interface DashboardCard {
  title: string;
  value: number;
  trend: number;
  desc: string;
}