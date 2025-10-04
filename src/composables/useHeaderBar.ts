/**
 * 顶部栏功能管理组合式函数
 * 提供顶部栏功能的配置管理和状态控制
 */

import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useSettingStore } from '@/store/modules/setting';
import { headerBarConfig } from '@/config/headerBar';
import { HeaderBarFeatureConfig } from '@/types';

/**
 * 顶部栏功能管理
 * @returns 顶部栏功能相关的状态和方法
 */

export function useHeaderBar() {
  const route = useRoute();
  const settingStore = useSettingStore();
  
  // 获取顶部栏配置
  const headerBarConfigRef = computed<HeaderBarFeatureConfig>(() => headerBarConfig);
  
  // 修改这些计算属性
  const shouldShowMenuButton = computed(() => {
    return route.meta.showMenuButton !== undefined ? route.meta.showMenuButton : true;
  });

  const shouldShowRefreshButton = computed(() => {
    return route.meta.showRefreshButton !== undefined ? route.meta.showRefreshButton : true;
  });

  const shouldShowFastEnter = computed(() => {
    return route.meta.showFastEnter !== undefined ? route.meta.showFastEnter : true;
  });

  const shouldShowBreadcrumb = computed(() => {
    return route.meta.showBreadcrumb !== undefined ? route.meta.showBreadcrumb : true;
  });

  const shouldShowLanguage = computed(() => {
    return route.meta.showLanguage !== undefined ? route.meta.showLanguage : true;
  });

  // 其他计算属性保持不变
  const shouldShowGlobalSearch = computed(() => {
    return headerBarConfig.globalSearch.enabled;
  });

  const shouldShowFullscreen = computed(() => {
    return headerBarConfig.fullscreen.enabled;
  });

  const shouldShowNotification = computed(() => {
    return headerBarConfig.notification.enabled;
  });

  const shouldShowChat = computed(() => {
    return headerBarConfig.chat.enabled;
  });

  const shouldShowSettings = computed(() => {
    return headerBarConfig.settings.enabled;
  });

  const shouldShowThemeToggle = computed(() => {
    return headerBarConfig.themeToggle.enabled;
  });
  
  return {
    headerBarConfigRef,
    shouldShowMenuButton,
    shouldShowRefreshButton,
    shouldShowFastEnter,
    shouldShowBreadcrumb,
    shouldShowLanguage,
    shouldShowGlobalSearch,
    shouldShowFullscreen,
    shouldShowNotification,
    shouldShowChat,
    shouldShowSettings,
    shouldShowThemeToggle
  };
}