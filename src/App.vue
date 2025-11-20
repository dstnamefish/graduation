<template>
  <ElConfigProvider
    size="default"
    :locale="locales[language]"
    :zIndex="3000"
  >
    <RouterView></RouterView>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { useUserStore } from './store/modules/user';
import zh from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/es/locale/lang/en';
import { systemUpgrade } from './utils/sys';
import { toggleTransition } from './utils/ui/animation';
import { checkStorageCompatibility } from './utils/storage';

const userStore = useUserStore();
const { language } = storeToRefs(userStore);

const locales = {
  en: en,
  zh: zh,
};

onBeforeMount(() => {
  toggleTransition(true);
});

onMounted(() => {
  checkStorageCompatibility();
  toggleTransition(false);
  systemUpgrade();
});
</script>