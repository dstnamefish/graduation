import { AppRouteRecord } from '@/types/router';

import { RoutesAlias } from '../routesAlias';

/**
 * 将菜单数据转换为路由配置
 *
 * 递归处理菜单数据结构，生成符合 Vue Router 要求的路由配置对象。
 * 支持路径拼接、组件验证、iframe 路由特殊处理等功能。
 *
 * @param {AppRouteRecord} route - 菜单数据对象，包含路由配置信息
 * @param {string} [parentPath=''] - 父级路径，用于构建完整路径
 * @returns {AppRouteRecord} 处理后的路由配置对象
 *
 * @throws {Error} 当路由配置无效时会输出错误日志
 *
 * @see {@link buildRoutePath} 路径构建函数
 * @see {@link validateComponent} 组件验证函数
 * @see {@link processChildren} 子路由处理函数
 */
export const menuDataToRouter = (route: AppRouteRecord, parentPath = ''): AppRouteRecord => {
  const fullPath = buildRoutePath(route, parentPath);

  // 检测组件配置并给出警告
  validateComponent(route, parentPath);

  return {
    ...route,
    children: processChildren(route.children || [], fullPath),
    path: fullPath,
  };
};

/**
 * 构建路由完整路径
 *
 * 根据父级路径和当前路由路径构建完整的路由路径。
 * 特殊处理 iframe 路由，保持其原始路径不变。
 *
 * @param {AppRouteRecord} route - 当前路由对象
 * @param {string} parentPath - 父级路径
 * @returns {string} 构建后的完整路径
 */
const buildRoutePath = (route: AppRouteRecord, parentPath: string): string => {
  if (!route.path) {return '';}

  // iframe 类型路由直接使用原始路径
  if (route.meta?.isIframe) {return route.path;}

  // 拼接并规范化路径（处理多个连续斜杠）
  return parentPath ? `${parentPath}/${route.path}`.replace(/\/+/g, '/') : route.path;
};

/**
 * 处理子路由数组
 *
 * 递归处理子路由菜单数据，为每个子路由构建完整路径。
 *
 * @param {AppRouteRecord[]} children - 子路由数组
 * @param {string} parentPath - 父级完整路径
 * @returns {AppRouteRecord[]} 处理后的子路由数组
 */
const processChildren = (children: AppRouteRecord[], parentPath: string): AppRouteRecord[] => {
  if (!Array.isArray(children) || children.length === 0) {return [];}

  return children.map((child) => menuDataToRouter(child, parentPath));
};

/**
 * 保存 iframe 路由到 sessionStorage
 *
 * 将 iframe 路由列表持久化到 sessionStorage 中，
 * 用于页面刷新后恢复 iframe 路由状态。
 *
 * @param {AppRouteRecord[]} list - iframe 路由列表
 */
export const saveIframeRoutes = (list: AppRouteRecord[]): void => {
  if (list.length > 0) {
    sessionStorage.setItem('iframeRoutes', JSON.stringify(list));
  }
};

/**
 * 从 sessionStorage 获取 iframe 路由
 *
 * 从持久化存储中恢复 iframe 路由列表，
 * 包含错误处理机制。
 *
 * @returns {AppRouteRecord[]} iframe 路由列表
 */
export const getIframeRoutes = (): AppRouteRecord[] => {
  try {
    return JSON.parse(sessionStorage.getItem('iframeRoutes') || '[]');
  } catch (error) {
    console.error('解析 iframe 路由失败:', error);
    return [];
  }
};

/**
 * 校验路由组件配置有效性
 *
 * 验证路由对象的 component 配置是否符合规范：
 * 1. 一级菜单必须指定 Layout 组件（外链除外）
 * 2. 非一级菜单必须指定组件或包含子路由（外链除外）
 * 3. 输出详细的错误信息帮助调试
 *
 * @param {AppRouteRecord} route - 当前路由对象
 * @param {string} parentPath - 父级路径
 */
const validateComponent = (route: AppRouteRecord, parentPath: string): void => {
  const hasExternalLink = !!route.meta?.link?.trim();
  const hasChildren = Array.isArray(route.children) && route.children.length > 0;
  const routePath = route.path || '[未定义路径]';

  // 如果已配置 component，则跳过验证
  if (route.component) {return;}

  // 一级菜单验证：必须指定 Layout，除非是外链
  if (parentPath === '' && !hasExternalLink) {
    console.error(
      `[路由配置错误] 一级菜单 "${routePath}" 缺少 component 配置。` +
      `必须指向布局组件: ${RoutesAlias.Layout}`,
    );
    return;
  }

  // 非一级菜单验证：必须配置组件或包含子路由，除非是外链
  if (!hasExternalLink && !hasChildren) {
    console.error(
      `[路由配置错误] 路由 "${routePath}" 缺少 component 配置。` +
      '必须指定组件文件路径或配置子路由',
    );
  }
};