<template>
  <div class="layout-container">
    <!-- 侧边栏 -->
    <Sidebar />
    <div class="main-content">
      <!-- 顶部导航 -->
      <Header />
      <!-- 页面内容 -->
      <div class="content-wrapper">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '../layout/HeaderBar.vue';
import Sidebar from '../layout/sidebar-menu/SideBar.vue';
</script>

<style lang="scss" scoped>
@charset "UTF-8";

@use '../../assets/styles/base/_variables.scss' as variables;

.layout-container {
  display: flex;
  height: 100vh;
  overflow: hidden;

  .main-content {
    display: flex;
    flex: 1;
    height: 100vh;
    flex-direction: column;
  }

  .content-wrapper {
    background-color: variables.$third-color;
    flex: 1;
    overflow: hidden;
    padding: 20px 30px;
  }
}
</style>