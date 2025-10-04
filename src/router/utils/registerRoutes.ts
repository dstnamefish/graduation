import { h } from 'vue';

import { useMenuStore } from '@/store/modules/menu';

import type { AppRouteRecord } from '@/types/router'
import { RoutesAlias } from '../routesAlias';

import { saveIframeRoutes } from './menuToRouter';

import type { Router, RouteRecordRaw } from 'vue-router';

/**
 * 动态导入 views 目录下所有 .vue 组件
 * 使用 Vite 的 glob 导入功能自动加载所有 Vue 组件文件
 */
const modules: Record<string, () => Promise<any>> = import.meta.glob('../../views/**/*.vue');

/**
 * 注册异步路由
 * 将接口返回的菜单列表转换为 Vue Router 路由配置，并添加到传入的 router 实例中
 * 包含路由去重检测、组件动态加载、iframe 路由特殊处理等功能
 *
 * @param router - Vue Router 实例，用于添加动态路由
 * @param menuList - 接口返回的菜单列表数据
 */
export function registerDynamicRoutes(router: Router, menuList: AppRouteRecord[]): void {
  // 用于局部收集 iframe 类型路由
  const iframeRoutes: AppRouteRecord[] = [];

  // 收集路由移除函数，用于后续清理
  const removeRouteFns: (() => void)[] = [];

  // 检测菜单列表中是否有重复路由
  checkDuplicateRoutes(menuList);

  // 遍历菜单列表，注册路由
  menuList.forEach((route) => {
    // 只有还没注册过的路由才进行注册
    if (route.name && !router.hasRoute(route.name)) {
      const routeConfig = convertRouteComponent(route, iframeRoutes);

      // addRoute 返回移除函数，收集起来
      const removeRouteFn = router.addRoute(routeConfig as RouteRecordRaw);
      removeRouteFns.push(removeRouteFn);
    }
  });

  // 将移除函数存储到 store 中
  const menuStore = useMenuStore();
  menuStore.addRemoveRouteFns(removeRouteFns);

  // 保存 iframe 路由
  saveIframeRoutes(iframeRoutes);
}

/**
 * 路径解析函数：处理父路径和子路径的拼接
 * 自动处理路径开头和结尾的斜杠，确保路径格式正确
 *
 * @param parent - 父级路径
 * @param child - 子级路径
 * @returns 拼接后的完整路径
 */
function resolvePath(parent: string, child: string): string {
  return [parent.replace(/\/$/, ''), child.replace(/^\//, '')].filter(Boolean).join('/');
}

/**
 * 检测菜单中的重复路由（包括子路由）
 * 检查路由名称和组件路径的重复情况，输出警告信息
 *
 * @param routes - 要检查的路由列表
 * @param parentPath - 父级路径，用于构建完整路径
 */
function checkDuplicateRoutes(routes: AppRouteRecord[], parentPath = ''): void {
  // 用于检测动态路由中的重复项
  const routeNameMap = new Map<string, string>(); // 路由名称 -> 路径
  const componentPathMap = new Map<string, string>(); // 组件路径 -> 路由信息

  const checkRoutes = (routes: AppRouteRecord[], parentPath = '') => {
    routes.forEach((route) => {
      // 处理路径拼接
      const currentPath = route.path || '';
      const fullPath = resolvePath(parentPath, currentPath);

      // 名称重复检测
      if (route.name) {
        if (routeNameMap.has(String(route.name))) {
          console.warn(`[路由警告] 名称重复: "${String(route.name)}"`);
        } else {
          routeNameMap.set(String(route.name), fullPath);
        }
      }

      // 组件路径重复检测
      if (route.component) {
        const componentPath = getComponentPathString(route.component);

        if (componentPath && componentPath !== RoutesAlias.Layout) {
          const componentKey = `${parentPath}:${componentPath}`;

          if (componentPathMap.has(componentKey)) {
            console.warn(`[路由警告] 路径重复: "${componentPath}"`);
          } else {
            componentPathMap.set(componentKey, fullPath);
          }
        }
      }

      // 递归处理子路由
      if (route.children?.length) {
        checkRoutes(route.children, fullPath);
      }
    });
  };

  checkRoutes(routes, parentPath);
}

/**
 * 获取组件路径的字符串表示
 * 处理组件配置的各种格式，返回可读的路径字符串
 *
 * @param component - 组件配置，可以是字符串或路由别名
 * @returns 组件路径的字符串表示
 */
function getComponentPathString(component: any): string {
  if (typeof component === 'string') {
    return component;
  }

  // 对于其他别名路由，获取组件名称
  for (const key in RoutesAlias) {
    if (RoutesAlias[key as keyof typeof RoutesAlias] === component) {
      return `RoutesAlias.${key}`;
    }
  }

  return '';
}

/**
 * 根据组件路径动态加载组件
 * 支持直接路径和包含 index.vue 的目录路径两种形式
 *
 * @param componentPath - 组件路径（不包含 ../../views 前缀和 .vue 后缀）
 * @param routeName - 当前路由名称，用于错误提示
 * @returns 组件加载函数
 */
function loadComponent(componentPath: string, routeName: string): () => Promise<any> {
  // 如果路径为空，直接返回一个空的组件
  if (componentPath === '') {
    return () =>
      Promise.resolve({
        render() {
          return h('div', {});
        },
      });
  }

  // 构建可能的路径
  const fullPath = `../../views${componentPath}.vue`;
  const fullPathWithIndex = `../../views${componentPath}/index.vue`;

  // 先尝试直接路径，再尝试添加/index的路径
  const module = modules[fullPath] || modules[fullPathWithIndex];

  if (!module) {
    console.error(
      `[路由错误] 未找到组件：${routeName}，尝试过的路径: ${fullPath} 和 ${fullPathWithIndex}`,
    );
    return () =>
      Promise.resolve({
        render() {
          return h('div', `组件未找到: ${routeName}`);
        },
      });
  }

  return module;
}

/**
 * 转换后的路由配置类型
 * 扩展自 RouteRecordRaw，添加了 id 属性和递归 children 类型
 */
interface ConvertedRoute extends Omit<RouteRecordRaw, 'children'> {
  id?: number
  children?: ConvertedRoute[]
  component?: RouteRecordRaw['component'] | (() => Promise<any>)
}

/**
 * 转换路由组件配置
 * 根据路由类型（iframe、一级菜单、普通路由）进行不同的组件处理
 *
 * @param route - 原始路由配置
 * @param iframeRoutes - iframe 路由收集数组
 * @param depth - 当前递归深度，用于判断菜单层级
 * @returns 转换后的路由配置
 */
function convertRouteComponent(
  route: AppRouteRecord,
  iframeRoutes: AppRouteRecord[],
  depth = 0,
): ConvertedRoute {
  const { children, component, ...routeConfig } = route;

  // 基础路由配置
  const converted: ConvertedRoute = {
    ...routeConfig,
    component: undefined,
  };

  // 是否为一级菜单
  const isFirstLevel =
    depth === 0 && route.children?.length === 0 && component !== RoutesAlias.Layout;

  if (route.meta.isIframe) {
    handleIframeRoute(converted, route, iframeRoutes, depth);
  } else if (isFirstLevel) {
    handleLayoutRoute(converted, route, component as string);
  } else {
    handleNormalRoute(converted, component as string, String(route.name));
  }

  // 递归时增加深度
  if (children?.length) {
    converted.children = children.map((child) =>
      convertRouteComponent(child, iframeRoutes, depth + 1),
    );
  }

  return converted;
}

/**
 * 处理 iframe 类型路由
 * 根据嵌套深度采用不同的布局策略
 *
 * @param targetRoute - 目标路由配置对象
 * @param sourceRoute - 原始路由配置对象
 * @param iframeRoutes - iframe 路由收集数组
 * @param depth - 当前嵌套深度
 */
function handleIframeRoute(
  targetRoute: ConvertedRoute,
  sourceRoute: AppRouteRecord,
  iframeRoutes: AppRouteRecord[],
  depth: number,
): void {
  const LAYOUT_VIEW = () => import('@/views/index/index.vue');
  const IFRAME_VIEW = () => import('@/views/outside/Iframe.vue');

  if (depth === 0) {
    // 顶级 iframe：用 Layout 包裹
    targetRoute.component = LAYOUT_VIEW;
    targetRoute.path = `/${(sourceRoute.path?.split('/')[1] || '').trim()}`;
    targetRoute.name = '';

    targetRoute.children = [
      {
        ...sourceRoute,
        component: IFRAME_VIEW,
      } as ConvertedRoute,
    ];
  } else {
    // 非顶级（嵌套）iframe：直接使用 Iframe.vue
    targetRoute.component = IFRAME_VIEW;
  }

  // 记录 iframe 路由，供 Iframe.vue 查找对应的外链
  iframeRoutes.push(sourceRoute);
}

/**
 * 处理一级菜单路由
 * 一级菜单需要包裹在 Layout 组件中
 *
 * @param converted - 转换后的路由配置
 * @param route - 原始路由配置
 * @param component - 组件路径字符串
 */
function handleLayoutRoute(
  converted: ConvertedRoute,
  route: AppRouteRecord,
  component: string | undefined,
): void {
  converted.component = () => import('@/views/index/index.vue');
  converted.path = `/${(route.path?.split('/')[1] || '').trim()}`;
  converted.name = '';
  route.meta.isFirstLevel = true;

  converted.children = [
    {
      ...route,
      component: loadComponent(component as string, String(route.name)),
    } as ConvertedRoute,
  ];
}

/**
 * 处理普通路由
 * 直接加载对应的组件文件
 *
 * @param converted - 转换后的路由配置
 * @param component - 组件路径字符串
 * @param routeName - 路由名称，用于错误提示
 */
function handleNormalRoute(
  converted: ConvertedRoute,
  component: string | undefined,
  routeName: string,
): void {
  if (component) {
    const aliasComponent = RoutesAlias[
      component as keyof typeof RoutesAlias
    ] as unknown as RouteRecordRaw['component'];
    converted.component = aliasComponent || loadComponent(component as string, routeName);
  }
}