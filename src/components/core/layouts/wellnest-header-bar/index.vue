<!-- 顶部栏 -->
<template>
  <div class="layout-top-bar">
    <div class="left" display="flex">
      <!-- 菜单按钮 -->

    </div>

    <div class="right" >

    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useHeaderBar } from '@/composables/useHeaderBar';

const { t } = useI18n();
const route = useRoute();
const { 
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
} = useHeaderBar();

defineOptions({ name: 'WellNestHeaderBar' });
</script>

<style scoped lang="scss">
@use './style.scss'
</style>