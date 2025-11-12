<!-- 表格按钮 -->
<template>
  <div
    :class="['btn-text', buttonClass]"
    :style="{ backgroundColor: buttonBgColor, color: iconColor }"
    @click="handleClick"
  >
    <component
      v-if="iconContent"
      :is="iconContent"
      class="svg-icon"
      :style="{ color: iconColor }"
    />
  </div>
</template>

<script setup lang="ts">
import { BgColorEnum } from '@/enums/appEnum';

defineOptions({ name: 'ZenButtonTable' });

interface Props {
  type?: 'add' | 'edit' | 'delete' | 'more' | 'view';
  icon?: string;
  iconClass?: BgColorEnum;
  iconColor?: string;
  buttonBgColor?: string;
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const defaultButtons = {
  add: { color: BgColorEnum.SUCCESS, icon: 'add' },
  delete: { color: BgColorEnum.DANGER, icon: 'delete' },
  edit: { color: BgColorEnum.WARNING, icon: 'edit' },
  more: { color: BgColorEnum.INFO, icon: 'more' },
  view: { color: BgColorEnum.PRIMARY, icon: 'view' },
} as const;

const iconContent = computed(() => {
  return props.icon || (props.type ? defaultButtons[props.type]?.icon : '') || '';
});

const buttonClass = computed(() => {
  return props.iconClass || (props.type ? defaultButtons[props.type]?.color : '') || '';
});

const handleClick = () => {
  emit('click');
};
</script>

<style scoped lang="scss">
@forward './style.scss';
</style>