<template>
  <ElConfigProvider size="default" :locale="locales[language]" :zIndex="3000">
    <RouterView></RouterView>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import en from 'element-plus/es/locale/lang/en';
import zh from 'element-plus/es/locale/lang/zh-cn';

import { useUserStore } from './store/modules/user';
import { checkStorageCompatibility } from './utils/storage';
import { systemUpgrade } from './utils/sys';
import { setThemeTransitionClass } from './utils/theme/animation';

const userStore = useUserStore();
const { language } = storeToRefs(userStore);

const locales = {
  en: en,
  zh: zh,
};

onBeforeMount(() => {
  setThemeTransitionClass(true);
});

onMounted(() => {
  // 检查存储兼容性
  checkStorageCompatibility();

  // 提升暗黑主题下页面刷新视觉体验
  setThemeTransitionClass(false);

  // 系统升级
  systemUpgrade();
});
</script>