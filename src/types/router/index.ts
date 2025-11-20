/**
 * 路由类型定义模块
 *
 * 提供路由相关的类型定义
 *
 * ## 主要功能
 *
 * - 路由元数据类型（标题、图标、权限等）
 * - 应用路由记录类型
 * - 路由配置扩展
 *
 * ## 使用场景
 *
 * - 路由配置类型约束
 * - 路由元数据定义
 * - 菜单生成
 * - 权限控制
 *
 * @module types/router/index
 * @author Art Design Pro Team
 */

import { RouteRecordRaw } from 'vue-router';

/**
 * 路由元数据接口
 * 定义路由的各种配置属性
 *
 * @property title 路由标题
 * @property icon 路由图标
 * @property showBadge 是否显示徽章
 * @property showTextBadge 文本徽章
 * @property isHide 是否在菜单中隐藏
 * @property isHideTab 是否在标签页中隐藏
 * @property link 外部链接
 * @property isIframe 是否为iframe
 * @property keepAlive 是否缓存
 * @property authList 操作权限列表
 * @property isFirstLevel 是否为一级菜单
 * @property roles 角色权限列表
 * @property fixedTab 是否固定标签页
 * @property activePath 激活菜单路径
 * @property isFullPage 是否为全屏页面
 * @property isAuthButton 是否为权限按钮行
 * @property authMark 权限标识
 * @property parentPath 父级路径
 * @property headerBar 头栏配置
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
  headerBar?: {
    breadcrumb?: boolean
    chat?: boolean
    fastEnter?: boolean
    fullscreen?: boolean
    globalSearch?: boolean
    language?: boolean
    menuButton?: boolean
    notification?: boolean
    refreshButton?: boolean
    settings?: boolean
    themeToggle?: boolean
  }
}

/**
 * 应用路由记录接口
 * 扩展 Vue Router 的路由记录类型
 */
export interface AppRouteRecord extends Omit<RouteRecordRaw, 'meta' | 'children' | 'component'> {
  id?: number
  meta: RouteMeta
  children?: AppRouteRecord[]
  component?: string | (() => Promise<any>)
}