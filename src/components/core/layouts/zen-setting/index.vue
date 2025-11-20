<template>
  <ZenIconButton icon="ri:settings-line" class="ml-3" >
  </ZenIconButton>
</template>

<script setup lang="ts">
import { mittBus } from '@/utils/sys';

const openSetting = () => {
  mittBus.emit('openSetting');
};
</script>