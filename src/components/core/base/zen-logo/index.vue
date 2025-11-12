<!-- 系统logo -->
<template>
  <div class="wellnest-logo">
    <TitleSvg
      :style="logoStyle"
      class="logo-svg"
    />
  </div>
</template>

<script setup lang="ts">
import TitleSvg from '@/assets/svg/menu/title.svg?component';

defineOptions({ name: 'ZenLogo' });

interface Props {
  size?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 36,
});

const logoStyle = computed(() => ({
  height: `${props.size}px`,
  width: `${props.size}px`,
}));
</script>

<style lang="scss" scoped>
.wellnest-logo {
  display: flex;
  align-items: center;
  justify-content: center;

  .logo-svg {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
