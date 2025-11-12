/**
 * 顶部栏功能配置
 * 控制顶部栏各种功能的启用/禁用状态
 * @property {boolean} breadcrumb - 面包屑导航
 * @property {boolean} globalSearch - 全局搜索
 * @property {boolean} notification - 通知功能
 * @property {boolean} chat - 聊天功能
 * @property {boolean} language - 多语言切换
 * @property {boolean} settings - 设置面板
 * @property {boolean} themeToggle - 主题切换
 */
export interface HeaderBarFeatureConfig {
  breadcrumb: boolean;
  globalSearch: boolean;
  notification: boolean;
  chat: boolean;
  language: boolean;
  settings: boolean;
  themeToggle: boolean;
}