<!-- 按钮组件 -->
<template>
  <div
    class="size-12 inline-flex bg-(--default-box-bg) flex-cc c-p text-g-600 dark:text-g-800 text-xl rounded tad-300 hover:bg-hover-color"
    :class="{ 'rounded-full': circle }"
  >
    <ZenSvgIcon :icon="icon"></ZenSvgIcon>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'ZenIconButton' });

/**
 * 图标按钮组件
 * @param icon 图标名称
 * @param circle 是否圆角按钮
 */
interface Props {
  icon: string
  circle?: boolean
}

withDefaults(defineProps<Props>(), {});
</script>