import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { getHeaderBarConfig } from '@/config/headerBar';
import { useSettingStore } from '@/store/modules/setting';

import type { HeaderBarFeatureConfig } from '@/types/config';

export function useHeaderBar(customConfig?: Partial<HeaderBarFeatureConfig>) {
  const route = useRoute();
  const settingStore = useSettingStore();
  const { showCrumbs, showLanguage } = storeToRefs(settingStore);

  const routeBasedConfig = computed(() => {
    const routeName = route.name as string;
    return getHeaderBarConfig(routeName);
  });

  const mergedConfig = computed((): HeaderBarFeatureConfig => {
    const baseConfig = routeBasedConfig.value;
    return customConfig ? { ...baseConfig, ...customConfig } : baseConfig;
  });

  const finalConfig = computed(() => ({
    ...mergedConfig.value,
    breadcrumb: mergedConfig.value.breadcrumb && showCrumbs.value,
    language: mergedConfig.value.language && showLanguage.value,
  }));

  const createFeatureGetter = (feature: keyof HeaderBarFeatureConfig) => {
    return computed(() => finalConfig.value[feature]);
  };

  return {
    config: finalConfig,
    showBreadcrumb: createFeatureGetter('breadcrumb'),
    showChat: createFeatureGetter('chat'),
    showGlobalSearch: createFeatureGetter('globalSearch'),
    showLanguage: createFeatureGetter('language'),
    showNotification: createFeatureGetter('notification'),
    showSettings: createFeatureGetter('settings'),
    showThemeToggle: createFeatureGetter('themeToggle'),
  };
}