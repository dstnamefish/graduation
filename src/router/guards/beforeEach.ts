import NProgress from 'nprogress';
import { ref, nextTick } from 'vue';

import { fetchGetUserInfo } from '@/api/auth';
import { fetchGetMenuList } from '@/api/system-manage';
import { useCommon } from '@/composables/useCommon';
import { useMenuStore } from '@/store/modules/menu';
import { useSettingStore } from '@/store/modules/setting';
import { useUserStore } from '@/store/modules/user';
import { AppRouteRecord } from '@/types/router/index';
import { loadingService } from '@/utils/ui';

import { asyncRoutes } from '../routes/asyncRoutes';
import { RoutesAlias } from '../routesAlias';
import { menuDataToRouter } from '../utils/menuToRouter';
import { registerDynamicRoutes } from '../utils/registerRoutes';
import { setPageTitle, setSystemTheme } from '../utils/utils';

import type { Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

// 前端权限模式 loading 关闭延时，提升用户体验
const LOADING_DELAY = 100;

// 是否已注册动态路由
const isRouteRegistered = ref(false);

// 跟踪时是否需要关闭 loading
const pendingLoading = ref(false);

/**
 * 设置路由全局前置守卫
 * 负责路由导航前的权限验证、登录状态检查、动态路由注册等核心逻辑
 *
 * @param router - Vue Router 实例
 */
export function setupBeforeEachGuard(router: Router): void {
  router.beforeEach(
    async (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext,
    ) => {
      try {
        await handleRouteGuard(to, from, next, router);
      } catch (error) {
        console.error('路由守卫处理失败:', error);
        next('/exception/500');
      }
    },
  );

  // 设置后置守卫关闭 loading 和进度条
  setupAfterEachGuard(router);
}

/**
 * 设置路由全局后置守卫
 * 在路由导航完成后执行清理工作，包括关闭进度条和加载状态
 *
 * @param router - Vue Router 实例
 */
export default function setupAfterEachGuard(router: Router): void {
  router.afterEach(() => {
    // 关闭进度条
    const settingStore = useSettingStore();
    if (settingStore.showNprogress) {
      NProgress.done();
    }

    // 关闭 loading 效果
    if (pendingLoading.value) {
      nextTick(() => {
        loadingService.hideLoading();
        pendingLoading.value = false;
      });
    }
  });
}

/**
 * 处理路由守卫核心逻辑
 * 按顺序执行路由导航前的各种检查和操作
 *
 * @param to - 目标路由对象
 * @param from - 来源路由对象
 * @param next - 路由导航回调函数
 * @param router - Vue Router 实例
 */
async function handleRouteGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
  router: Router,
): Promise<void> {
  const settingStore = useSettingStore();
  const userStore = useUserStore();

  // 处理进度条 在路由切换时显示进度条（使用NProgress库），提升用户体验。
  if (settingStore.showNprogress) {
    NProgress.start();
  }

  // 设置系统主题 根据目标路由设置系统主题 暗色/亮色模式切换
  setSystemTheme(to);

  // 处理登录状态 检查用户登录状态，如果未登录且访问需要认证的路由，会重定向到登录页
  if (!(await handleLoginStatus(to, userStore, next))) {
    return;
  }

  // 处理动态路由注册 对于已登录用户但动态路由尚未注册的情况，加载并注册权限相关的动态路由
  if (!isRouteRegistered.value && userStore.isLogin) {
    await handleDynamicRoutes(to, from, next, router);
    return;
  }

  // 处理根路径跳转到首页 如果用户访问根路径("/")且已登录，重定向到首页或其他默认页面
  if (userStore.isLogin && isRouteRegistered.value && handleRootPathRedirect(to, next)) {
    return;
  }

  // 处理已知的匹配路由 对于已匹配的路由，设置相关页面元信息并允许导航
  if (to.matched.length > 0) {
    setPageTitle(to);
    next();
    return;
  }

  // 尝试刷新路由重新注册 如果路由未匹配但用户已登录，尝试重新注册动态路由
  if (userStore.isLogin && !isRouteRegistered.value) {
    await handleDynamicRoutes(to, from, next, router);
    return;
  }

  // 未匹配到路由，跳转到 404
  next(RoutesAlias.Exception404);
}

/**
 * 处理用户登录状态验证
 * 检查用户是否登录，未登录且访问需要认证的页面时重定向到登录页
 *
 * @param to - 目标路由对象
 * @param userStore - 用户状态存储
 * @param next - 路由导航回调函数
 * @returns 是否通过登录验证
 */
async function handleLoginStatus(
  to: RouteLocationNormalized,
  userStore: ReturnType<typeof useUserStore>,
  next: NavigationGuardNext,
): Promise<boolean> {
  if (!userStore.isLogin && to.path !== RoutesAlias.Login && !to.meta.noLogin) {
    userStore.logOut();
    next(RoutesAlias.Login);
    return false;
  }
  return true;
}

/**
 * 处理动态路由注册流程
 * 获取用户信息和菜单数据，注册权限路由，完成导航
 *
 * @param to - 目标路由对象
 * @param from - 来源路由对象
 * @param next - 路由导航回调函数
 * @param router - Vue Router 实例
 */
async function handleDynamicRoutes(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
  router: Router,
): Promise<void> {
  try {
    // 显示 loading 并标记 pending
    pendingLoading.value = true;
    loadingService.showLoading();

    // 获得用户信息
    const userStore = useUserStore();
    const isRefresh = from.path === '/';
    if (isRefresh || !userStore.info || Object.keys(userStore.info).length === 0) {
      try {
        const data = await fetchGetUserInfo();
        userStore.setUserInfo(data);
      } catch (error) {
        console.error('获取用户信息失败:', error);

        // 检查是否是认证相关错误（401或403），如果是则执行登出
        const isHttpError = error instanceof Error && 'code' in error;
        if (isHttpError && (error.code === 401 || error.code === 403)) {
          userStore.logOut();
          return;
        }

        // 检查错误消息中是否包含认证相关错误代码
        if (error instanceof Error && (error.message.includes('401') || error.message.includes('403'))) {
          userStore.logOut();
          return;
        }
      }
    }

    await getMenuData(router);

    // 处理根据跳转
    if (handleRootPathRedirect(to, next)) {
      return;
    }

    next({
      hash: to.hash,
      path: to.path,
      query: to.query,
      replace: true,
    });
  } catch (error) {
    console.error('动态路由注册失败:', error);
    next('/exception/500');
  }
}

/**
 * 获取菜单数据
 * 根据系统配置模式（前端控制或后端控制）获取相应的菜单数据
 *
 * @param router - Vue Router 实例
 */
async function getMenuData(router: Router): Promise<void> {
  try {
    if (useCommon().isFrontendMode.value) {
      await processFrontendMenu(router);
    } else {
      await processBackendMenu(router);
    }
  } catch (error) {
    handleMenuError(error);
    throw error;
  }
}

/**
 * 处理前端控制模式的菜单逻辑
 * 根据预设的异步路由和用户角色过滤菜单项
 *
 * @param router - Vue Router 实例
 */
async function processFrontendMenu(router: Router): Promise<void> {
  const menuList = asyncRoutes.map((route) => menuDataToRouter(route));
  const userStore = useUserStore();
  const roleCode = userStore.info.roleCode;

  if (!roleCode) {
    throw new Error('获取用户角色失败');
  }
  const filteredMenuList = filterMenuByRoles(menuList, [roleCode]);

  // 添加延时来提升用户体验
  await new Promise((resolve) => setTimeout(resolve, LOADING_DELAY));

  await registerAndStoreMenu(router, filteredMenuList);
}

/**
 * 处理后端控制模式的菜单逻辑
 * 从后端API获取菜单数据并处理
 *
 * @param router - Vue Router 实例
 */
async function processBackendMenu(router: Router): Promise<void> {
  const { menuList } = await fetchGetMenuList();
  await registerAndStoreMenu(router, menuList);
}

/**
 * 递归过滤空菜单项
 * 移除没有子菜单的布局组件和空组件菜单项
 *
 * @param menuList - 菜单列表
 * @returns 过滤后的菜单列表
 */
function filterEmptyMenus(menuList: AppRouteRecord[]): AppRouteRecord[] {
  return menuList
    .map((item) => {
      // 如果由子菜单，先递归过滤子菜单
      if (item.children && item.children.length > 0) {
        const filteredChildren = filterEmptyMenus(item.children);
        return {
          ...item,
          children: filteredChildren,
        };
      }
      return item;
    })
    .filter((item) => {
      // 过滤布局组件且没有子菜单的项
      const isEmptyLayoutMenu = item.component === RoutesAlias.Layout && (!item.children || item.children.length === 0);

      // 过滤掉组件为空字符串且没有子菜单的项，但保留有外链的菜单项
      const isEmptyComponentMenu =
        item.component === '' &&
        (!item.children || item.children.length === 0) &&
        item.meta.isIframe !== true &&
        !item.meta.link;

      return !(isEmptyLayoutMenu || isEmptyComponentMenu);
    });
}

/**
 * 注册路由并存储菜单数据
 * 验证菜单数据有效性，过滤空菜单项，注册动态路由
 *
 * @param router - Vue Router 实例
 * @param menuList - 菜单列表
 */
async function registerAndStoreMenu(router: Router, menuList: AppRouteRecord[]): Promise<void> {
  if (!isValidMenuList(menuList)) {
    throw new Error('获取菜单列表失败，请重新登录');
  }
  const menuStore = useMenuStore();

  // 递归过滤掉为空的菜单项
  const list = filterEmptyMenus(menuList);
  menuStore.setMenuList(list);
  registerDynamicRoutes(router, list);
  isRouteRegistered.value = true;
}

/**
 * 处理菜单相关错误
 * 输出错误日志并执行登出操作
 *
 * @param error - 错误对象
 */
function handleMenuError(error: unknown): void {
  console.error('菜单处理失败:', error);
  useUserStore().logOut();
  throw error instanceof Error ? error : new Error('获取菜单列表失败，请重新登录');
}

/**
 * 根据角色过滤菜单
 * 返回用户有权限访问的菜单列表
 *
 * @param menu - 菜单列表
 * @param roles - 用户角色列表
 * @returns 过滤后的菜单列表
 */
const filterMenuByRoles = (menu: AppRouteRecord[],roles: string[]): AppRouteRecord[] => {
  return menu.reduce((acc:AppRouteRecord[],item) => {
    const itemRoles = item.meta?.roles;

    // 修复：确保正确处理角色权限检查
    const hasPermission = !itemRoles || itemRoles.some((role) => roles?.includes(role));

    if (hasPermission) {
      const filteredItem = { ...item };
      if (filteredItem.children?.length) {
        filteredItem.children = filterMenuByRoles(filteredItem.children, roles);
      }
      acc.push(filteredItem);
    }

    return acc;
  },[]);
};

/**
 * 验证菜单列表是否有效
 * 检查菜单列表是否为非空数组
 *
 * @param menuList - 菜单列表
 * @returns 是否有效
 */
function isValidMenuList(menuList: AppRouteRecord[]): boolean {
  return Array.isArray(menuList) && menuList.length > 0;
}

/**
 * 重置路由相关状态
 * 清除路由注册状态和菜单数据
 */
export function resetRouterState(): void{
  isRouteRegistered.value = false;
  const menuStore = useMenuStore();
  menuStore.removeAllDynamicRoutes();
  menuStore.setMenuList([]);
}

/**
 * 处理根路径跳转到首页
 * 将根路径重定向到用户首页
 *
 * @param to - 目标路由对象
 * @param next - 路由导航回调函数
 * @returns 是否执行了重定向
 */
function handleRootPathRedirect(to: RouteLocationNormalized, next: NavigationGuardNext): boolean {
  if (to.path === '/') {
    const { homePath } = useCommon();
    if (homePath.value) {
      next({ path: homePath.value, replace: true });
      return true;
    }
  }
  return false;
}