import NProgress from 'nprogress';
import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

import { useTheme } from '@/composables/useTheme';
import AppConfig from '@/config';
import i18n, { $t } from '@/locales';

import 'nprogress/nprogress.css';

import { useSettingStore } from '@/store/modules/setting';

/**
 * 扩展的路由配置类型
 * 在 Vue Router 原生 RouteRecordRaw 基础上添加 hidden 属性
 * 用于控制路由是否在菜单中隐藏显示
 */
export type AppRouteRecordRaw = RouteRecordRaw & {
  hidden?: boolean
}

/**
 * 配置顶部进度条 NProgress
 * 设置进度条动画效果、速度、样式等参数
 */
export const configureNProgress = (): void => {
  NProgress.configure({
    easing: 'ease',          // 动画缓动函数
    parent: 'body',           // 进度条挂载的父元素
    showSpinner: false,      // 是否显示旋转加载器
    speed: 600,              // 动画速度（毫秒）
    trickleSpeed: 200,       // 自动递增速度
  });
};

/**
 * 设置页面标题
 * 根据路由元信息中的 title 和系统配置拼接完整的页面标题
 *
 * @param to - 当前路由对象，包含路由元信息
 */
export const setPageTitle = (to: RouteLocationNormalized): void => {
  const { title } = to.meta;
  if (title) {
    // 延迟设置标题，确保 DOM 更新完成
    setTimeout(() => {
      document.title = `${formatMenuTitle(String(title))} - ${AppConfig.systemInfo.name}`;
    }, 150);
  }
};

/**
 * 设置系统主题样式
 * 根据路由元信息中的 setTheme 标志决定是否切换主题
 *
 * @param to - 当前路由对象，包含主题设置标志
 */
export const setSystemTheme = (to: RouteLocationNormalized): void => {
  if (to.meta.setTheme) {
    useTheme().switchThemeStyles(useSettingStore().systemThemeType);
  }
};

/**
 * 格式化菜单标题
 * 支持国际化翻译键和普通文本两种格式
 *
 * @param title - 菜单标题，可以是 i18n 翻译键（menus.开头）或普通文本
 * @returns 格式化后的菜单标题文本
 */
export const formatMenuTitle = (title: string): string => {
  if (title) {
    if (title.startsWith('menus.')) {
      // 检查翻译键是否存在，避免控制台警告
      if (i18n.global.te(title)) {
        return $t(title);
      } else {
        // 翻译不存在时，返回键名的最后部分作为回退显示
        return title.split('.').pop() || title;
      }
    }
    return title;
  }
  return '';
};