<template>
  <div class="header-container">
    <div class="header-left">
      {{ headerTitle }}
    </div>
    <div class="header-right">

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const headerTitle = ref('首页');
</script>

<style scoped lang="scss">
@charset "UTF-8";

@use '../../assets/styles/base/_variables.scss' as variables;

.header-container {
  display: flex;
  height: 8rem;
  padding: 2rem 3rem;
  border: 1px solid variables.$danger-color;
  background-color: variables.$header-color;
  align-items: center;
  justify-content: space-between;
}
</style>