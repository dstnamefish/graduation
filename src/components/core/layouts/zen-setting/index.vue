<template>
  <button class="setting" @click="openSetting" aria-label="Open Settings">
  </button>
</template>

<script setup lang="ts">
import { mittBus } from '@/utils/sys';

const openSetting = () => {
  mittBus.emit('openSetting');
};
</script>