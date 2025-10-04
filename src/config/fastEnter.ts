/**
 * 快速入口配置
 * 包含：应用列表、快速链接等配置
 */
import { RoutesAlias } from '@/router/routesAlias';
import { WEB_LINKS } from '@/utils/constants'

import type { FastEnterConfig } from '@/types/config'

























const fastEnterConfig: FastEnterConfig = {
  // 应用列表
  applications: [
    {
      description: '系统概览与数据统计',
      enabled: true,
      icon: '&#xe721;',
      iconColor: '#377dff',
      name: '工作台',
      order: 1,
      path: RoutesAlias.Dashboard,
    },
    {
      description: '数据分析与可视化',
      enabled: true,
      icon: '&#xe812;',
      iconColor: '#ff3b30',
      name: '分析页',
      order: 2,
      path: RoutesAlias.Analysis,
    },
    {
      description: '动画特效展示',
      enabled: true,
      icon: '&#xe7ed;',
      iconColor: '#7A7FFF',
      name: '礼花效果',
      order: 3,
      path: RoutesAlias.Fireworks,
    },
    {
      description: '即时通讯功能',
      enabled: true,
      icon: '&#xe70a;',
      iconColor: '#13DEB9',
      name: '聊天',
      order: 4,
      path: RoutesAlias.Chat,
    },
    {
      description: '使用指南与开发文档',
      enabled: true,
      icon: '&#xe788;',
      iconColor: '#ffb100',
      name: '官方文档',
      order: 5,
      path: WEB_LINKS.DOCS,
    },
    {
      description: '技术支持与问题反馈',
      enabled: true,
      icon: '&#xe86e;',
      iconColor: '#ff6b6b',
      name: '技术支持',
      order: 6,
      path: WEB_LINKS.COMMUNITY,
    },
    {
      description: '版本更新与变更记录',
      enabled: true,
      icon: '&#xe81c;',
      iconColor: '#38C0FC',
      name: '更新日志',
      order: 7,
      path: RoutesAlias.ChangeLog,
    },
    {
      description: '技术分享与交流',
      enabled: true,
      icon: '&#xe6b4;',
      iconColor: '#FB7299',
      name: '哔哩哔哩',
      order: 8,
      path: WEB_LINKS.BILIBILI,
    },
  ],

  // 显示条件（屏幕宽度）
  minWidth: 1200,

  // 快速链接
  quickLinks: [
    {
      enabled: true,
      name: '登录',
      order: 1,
      path: RoutesAlias.Login,
    },
    {
      enabled: true,
      name: '注册',
      order: 2,
      path: RoutesAlias.Register,
    },
    {
      enabled: true,
      name: '忘记密码',
      order: 3,
      path: RoutesAlias.ForgetPassword,
    },
    {
      enabled: true,
      name: '定价',
      order: 4,
      path: RoutesAlias.Pricing,
    },
    {
      enabled: true,
      name: '个人中心',
      order: 5,
      path: RoutesAlias.UserCenter,
    },
    {
      enabled: true,
      name: '留言管理',
      order: 6,
      path: RoutesAlias.Comment,
    },
  ],
};

export default Object.freeze(fastEnterConfig);