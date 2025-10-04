/**
 * 顶部栏功能配置
 * 控制顶部栏各种功能的启用/禁用状态
 */

import { HeaderBarFeatureConfig } from '@/types';

// 顶部栏功能配置
export const headerBarConfig: HeaderBarFeatureConfig = {
  breadcrumb: {
    description: '面包屑导航，显示当前页面路径',
    enabled: true,
  },
  chat: {
    description: '聊天功能，提供实时沟通',
    enabled: true,
  },
  fastEnter: {
    description: '快速入口功能，提供常用应用和链接的快速访问',
    enabled: true,
  },
  fullscreen: {
    description: '全屏切换功能',
    enabled: true,
  },
  globalSearch: {
    description: '全局搜索功能，支持快捷键 Ctrl+K 或 Cmd+K',
    enabled: true,
  },
  language: {
    description: '多语言切换功能',
    enabled: true,
  },
  menuButton: {
    description: '控制左侧菜单的展开/收起按钮',
    enabled: true,
  },
  notification: {
    description: '通知中心，显示系统通知和消息',
    enabled: true,
  },
  refreshButton: {
    description: '页面刷新按钮',
    enabled: true,
  },
  settings: {
    description: '系统设置面板',
    enabled: true,
  },
  themeToggle: {
    description: '主题切换功能（明暗主题）',
    enabled: true,
  },
};

export default headerBarConfig;