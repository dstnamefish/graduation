<!-- 登录、注册、忘记密码左侧背景 -->
<template>
  <div class="login-left-container"></div>
</template>
<script setup lang="ts">
defineOptions({
  name: 'LoginLeftView',
});
</script>
<style lang="scss" scoped>
.login-left-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 65vw;
  height: 100vh;
  background: var(--primary-color);
}
</style>