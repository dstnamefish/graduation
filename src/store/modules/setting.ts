import { defineStore } from 'pinia';
import { ref, computed, nextTick } from 'vue';

import AppConfig from '@/config';
import {
  SystemThemeEnum,
  MenuThemeEnum,
  MenuTypeEnum,
  ContainerWidthEnum,
} from '@/enums/appEnum';
import { MenuThemeType } from '@/types/store';
import { StorageConfig } from '@/utils';
import { setElementThemeColor } from '@/utils/ui';

const { defaultCustomRadius, defaultMenuWidth, defaultTabStyle } =
  AppConfig.systemSetting;

export const useSettingStore = defineStore(
  'settingStore',
  () => {
    // 菜单相关设置
    const menuType = ref(MenuTypeEnum.LEFT);
    const menuOpenWidth = ref(defaultMenuWidth);
    const menuOpen = ref(true);
    const dualMenuShowText = ref(false);

    // 主题相关设置
    const systemThemeType = ref(SystemThemeEnum.AUTO);
    const systemThemeMode = ref(SystemThemeEnum.AUTO);
    const menuThemeType = ref(MenuThemeEnum.DESIGN);
    const systemThemeColor = ref(AppConfig.elementPlusTheme.primary);

    // 界面显示设置 - 只保留用户可全局控制的设置
    const showCrumbs = ref(true);
    const showLanguage = ref(true);
    const showWorkTab = ref(true);
    const showNprogress = ref(true);
    const showSettingGuide = ref(true);

    // 功能设置
    const autoClose = ref(false);
    const uniqueOpened = ref(true);
    const colorWeak = ref(false);
    const refresh = ref(false);

    // 样式设置
    const boxBorderMode = ref(true);
    const pageTransition = ref('slide-left');
    const tabStyle = ref(defaultTabStyle);
    const customRadius = ref(defaultCustomRadius);
    const containerWidth = ref(ContainerWidthEnum.FULL);
    const watermarkVisible = ref(false);

    // 计算属性保持不变
    const getMenuTheme = computed((): MenuThemeType => {
      const list = AppConfig.themeList.filter(
        (item) => item.theme === menuThemeType.value,
      );
      if (isDark.value) {
        return AppConfig.darkMenuStyles[0];
      } else {
        return list[0];
      }
    });

    const isDark = computed((): boolean => {
      return systemThemeType.value === SystemThemeEnum.DARK;
    });

    const getMenuOpenWidth = computed((): string => {
      return menuOpenWidth.value + 'px' || defaultMenuWidth + 'px';
    });

    const getCustomRadius = computed((): string => {
      return customRadius.value + 'rem' || defaultCustomRadius + 'rem';
    });

    // 方法修改：移除不再需要的设置方法
    const switchMenuLayouts = (type: MenuTypeEnum) => {
      menuType.value = type;
    };

    const setMenuOpenWidth = (width: number) => {
      menuOpenWidth.value = width;
    };

    const setGlopTheme = (
      theme: SystemThemeEnum,
      themeMode: SystemThemeEnum,
    ) => {
      systemThemeType.value = theme;
      systemThemeMode.value = themeMode;
      localStorage.setItem(StorageConfig.THEME_KEY, theme);
    };

    const switchMenuStyles = (theme: MenuThemeEnum) => {
      menuThemeType.value = theme;
    };

    const setElementTheme = (theme: string) => {
      systemThemeColor.value = theme;
      setElementThemeColor(theme);
    };

    const setBorderMode = () => {
      boxBorderMode.value = !boxBorderMode.value;
    };

    const setContainerWidth = (width: ContainerWidthEnum) => {
      containerWidth.value = width;
    };

    const setUniqueOpened = () => {
      uniqueOpened.value = !uniqueOpened.value;
    };

    // 移除的方法：
    // const setButton = () => { ... }        // ❌ 移除
    // const setFastEnter = () => { ... }     // ❌ 移除
    // const setShowRefreshButton = () => { ... } // ❌ 移除

    // 保留用户全局偏好的设置方法
    const setCrumbs = () => {
      showCrumbs.value = !showCrumbs.value;
    };

    const setWorkTab = (show: boolean) => {
      showWorkTab.value = show;
    };

    const setLanguage = () => {
      showLanguage.value = !showLanguage.value;
    };

    const setNprogress = () => {
      showNprogress.value = !showNprogress.value;
    };

    const setAutoClose = () => {
      autoClose.value = !autoClose.value;
    };

    const setColorWeak = () => {
      colorWeak.value = !colorWeak.value;
    };

    const hideSettingGuide = () => {
      showSettingGuide.value = false;
    };

    const openSettingGuide = () => {
      showSettingGuide.value = true;
    };

    const setPageTransition = (transition: string) => {
      pageTransition.value = transition;
    };

    const setTabStyle = (style: string) => {
      tabStyle.value = style;
    };

    const setMenuOpen = (open: boolean) => {
      menuOpen.value = open;
    };

    const reload = () => {
      refresh.value = !refresh.value;
    };

    const setWatermarkVisible = (visible: boolean) => {
      watermarkVisible.value = visible;
    };

    const setCustomRadius = (radius: string) => {
      customRadius.value = radius;
      document.documentElement.style.setProperty(
        '--custom-radius',
        `${radius}rem`,
      );
    };

    const setDualMenuShowText = (show: boolean) => {
      dualMenuShowText.value = show;
    };

    const initThemeStyles = () => {
      setElementThemeColor(systemThemeColor.value);
      document.documentElement.style.setProperty(
        '--custom-radius',
        `${customRadius.value}rem`,
      );
    };

    nextTick(() => {
      initThemeStyles();
    });

    return {
      // 状态
      autoClose,
      boxBorderMode,
      colorWeak,
      containerWidth,
      customRadius,
      dualMenuShowText,

      // 计算属性
      getCustomRadius,
      getMenuOpenWidth,
      getMenuTheme,

      // 方法
      hideSettingGuide,
      isDark,
      menuOpen,
      menuOpenWidth,
      menuThemeType,
      menuType,
      openSettingGuide,
      pageTransition,
      refresh,
      reload,
      setAutoClose,
      setBorderMode,
      setColorWeak,
      setContainerWidth,

      setCrumbs,
      setCustomRadius,
      setDualMenuShowText,
      setElementTheme,

      setGlopTheme,
      setLanguage,
      setMenuOpen,
      setMenuOpenWidth,
      setNprogress,
      setPageTransition,
      setTabStyle,
      setUniqueOpened,
      setWatermarkVisible,
      setWorkTab,
      showCrumbs,
      showLanguage,
      showNprogress,
      showSettingGuide,
      showWorkTab,
      switchMenuLayouts,
      switchMenuStyles,
      systemThemeColor,
      systemThemeMode,
      systemThemeType,
      tabStyle,
      uniqueOpened,
      watermarkVisible,
    };
  },
  {
    persist: {
      key: 'setting',
      storage: localStorage,
    },
  },
);