<template>
  <div class="app-layout">
    <aside id="app-sidebar">
      <ZenSidebarMenu />
    </aside>

    <main id="app-main">
      <div id="app-header">
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

      <div id="app-content">
        <ZenPageContent />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
defineOptions({ name: 'AppLayout' });

const route = useRoute();
</script>

<style lang="scss" scoped>
@forward './index.scss';
</style>