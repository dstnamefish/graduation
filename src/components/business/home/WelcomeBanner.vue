<template>
  <div class="welcome-banner">
    <div class="welcome-text">
      <div class="welcome-title"> 欢迎回来！</div>
      <div class="welcome-subtitle">祝您工作愉快！</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use '../../../assets/styles/base/_variables.scss' as variables;

.welcome-banner {
  display: flex;
  width: 1100px;
  height: 246px;
  background: variables.$primary-color;
  align-items: center;
  justify-content: space-between;
  border-radius: variables.$border-radius-base;

  .welcome-text {
    padding: 0 216px;
    font-weight: variables.$font-weight-regular;

    .welcome-title {
      color: variables.$text-color;
      font-size: 48px;
    }

    .welcome-subtitle {
      color: variables.$text-color;
      opacity: 0.6;
      font-size: 24px;
    }
  }
}
</style>