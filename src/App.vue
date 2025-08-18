<template>
  <div class="screen-bg">
    <div class="screen-content">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<style lang="scss">
@use './assets/styles/base/_variables.scss' as variables;

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.screen-bg {
  display: flex;
  width: 100vw;
  height: 100vh;
  background: variables.$third-color;
  align-items: center;
  justify-content: center;
  overflow: auto;
}

.screen-content {
  display: flex;
  width: 1920px;
  height: 1080px;
  background: transparent;
  overflow: hidden;
  flex-direction: column;
}
</style>