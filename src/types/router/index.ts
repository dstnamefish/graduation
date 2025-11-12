/**
 * 路由相关类型定义
 */

import { RouteRecordRaw } from 'vue-router';

/**
 * 路由元数据接口
 * 定义路由元数据的属性接口，用于存储路由相关的额外信息
 * 每个属性都有一个默认值，用于在未传入对应属性时使用
 * @property {string} title - 路由标题，默认值为空字符串
 * @property {string} icon - 路由图标，默认值为空字符串
 * @property {boolean} showBadge - 是否显示徽章，默认值为false
 * @property {string} showTextBadge - 文本徽章，默认值为空字符串
 * @property {boolean} isHide - 是否在菜单中隐藏，默认值为false
 * @property {boolean} isHideTab - 是否在标签页中隐藏，默认值为false
 * @property {string} link - 外部链接，默认值为空字符串
 * @property {boolean} isIframe - 是否为iframe，默认值为false
 * @property {boolean} keepAlive - 是否缓存，默认值为false
 * @property {Array<{authMark: string, title: string}>} authList - 操作权限列表，默认值为空数组
 */
export interface RouteMeta extends Record<string | number | symbol, unknown> {
  title: string
  icon?: string
  showBadge?: boolean
  showTextBadge?: string
  isHide?: boolean
  isHideTab?: boolean
  link?: string
  isIframe?: boolean
  keepAlive?: boolean
  authList?: Array<{
    authMark: string
    title: string
  }>
  isFirstLevel?: boolean
  roles?: string[]
  fixedTab?: boolean
  activePath?: string
  isFullPage?: boolean
  isAuthButton?: boolean
  authMark?: string
  parentPath?: string
  showBreadcrumb?: boolean
  showGlobalSearch?: boolean
  showNotification?: boolean
  showChat?: boolean
  showLanguage?: boolean
  showSettings?: boolean
  showThemeToggle?: boolean
}

// 扩展路由记录
export interface AppRouteRecord extends Omit<RouteRecordRaw, 'meta' | 'children' | 'component'> {
  id?: number
  meta: RouteMeta
  children?: AppRouteRecord[]
  component?: string | (() => Promise<any>)
}