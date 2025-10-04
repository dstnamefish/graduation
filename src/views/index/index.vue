<template>
  <div class="app-layout">
    <aside class="app-sidebar">
      <WellnestSidebarMenu />
    </aside>

    <main id="app-main">
      <div class="app-header">
        <WellnestHeaderBar />
      </div>
      <div class="app-content">
        <WellnestPageContent />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppLayout' });
</script>

<style lang="scss" scoped>
@forward './index.scss'
</style>