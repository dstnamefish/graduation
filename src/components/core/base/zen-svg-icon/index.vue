<!-- 图标组件 -->
<template>
  <Icon v-if="icon" :icon="icon" v-bind="bindAttrs"
class="zen-svg-icon inline" />
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineOptions({ inheritAttrs: false, name: 'ZenSvgIcon' });

interface Props {
  icon?: string
}

defineProps<Props>();

const attrs = useAttrs();

const bindAttrs = computed<{ class: string; style: string }>(() => ({
  class: (attrs.class as string) || '',
  style: (attrs.style as string) || '',
}));
</script>