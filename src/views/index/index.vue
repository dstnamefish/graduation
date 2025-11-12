<template>
  <div class="app-layout">
    <aside class="app-sidebar">
      <ZenSidebarMenu />
    </aside>

    <main id="app-main">
      <div class="app-header">
        <ZenHeaderBar
          :showBreadcrumb="route.meta.showBreadcrumb"
          :showGlobalSearch="route.meta.showGlobalSearch"
          :showNotification="route.meta.showNotification"
          :showChat="route.meta.showChat"
          :showLanguage="route.meta.showLanguage"
          :showSettings="route.meta.showSettings"
          :showThemeToggle="route.meta.showThemeToggle"
        />
      </div>
      <div class="app-content">
        <ZenPageContent />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import ZenPageContent from '@/components/core/layouts/zen-page-content/index.vue';
import ZenSidebarMenu from '@/components/core/layouts/zen-sidebar-menu/index.vue';
import ZenHeaderBar from '@/components/core/layouts/zen-header-bar/index.vue';

defineOptions({ name: 'AppLayout' });

const route = useRoute();
</script>

<style lang="scss" scoped>
@forward './index.scss';
</style>