<template>
  <!-- 外部容器，isOpen/isDisabled控制样式 -->
  <div
    class="custom-select"
    :class="{ 'is-open': isOpen, 'is-disabled': props.isDisabled }"
    ref="selectRef"
  >
    <!-- 选中项展示区 -->
    <div class="selected-option" @click="toggleDropdown">
      <span>{{ displayText }}</span>
      <div class="arrow-content">
        <component :is="isOpen ? ArrowUpIcon : ArrowDownIcon" class="arrow" />
      </div>
    </div>

    <!-- 下拉选项列表 -->
    <Transition name="dropdown">
      <div v-show="isOpen" class="options-container">
        <div
          v-for="option in filteredOptions"
          :key="option.value"
          class="option"
          :class="{
            'is-selected': isOptionSelected(option),
            'is-disabled': option.isDisabled,
          }"
          @click="selectOption(option)"
        >
          <slot name="option" :option="option">
            {{ option.label }}
          </slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';

import type {
  CustomSelectOption,
  CustomSelectProps,
  CustomSelectEmits,
} from '../../types/components/ui/custom-select';

import ArrowUpIcon from '../../assets/icons/common/arrow-up.svg';
import ArrowDownIcon from '../../assets/icons/common/arrow-down.svg';

// 组件事件
const emit = defineEmits<CustomSelectEmits>();

const props = withDefaults(
  defineProps<Omit<CustomSelectProps, 'isFilterable' | 'filterMethod'>>(),
  {
    placeholder: '请选择',
    isDisabled: false,
  },
);

// 下拉框DOM引用
const selectRef = ref<HTMLElement | null>(null);

// 下拉框展开状态
const isOpen = ref(false);

// 计算显示文本：选中项label或placeholder
const displayText = computed(() => {
  const selected = props.options.find((opt) => opt.value === props.modelValue);
  return selected?.label || props.placeholder;
});

// 过滤后的选项（不再过滤，始终返回全部）
const filteredOptions = computed(() => props.options);

// 判断选项是否被选中
const isOptionSelected = (option: CustomSelectOption) => option.value === props.modelValue;

// 切换下拉框展开/收起
const toggleDropdown = () => {
  if (props.isDisabled) {
    return;
  }
  isOpen.value = !isOpen.value;
};

// 选择某个选项
const selectOption = (option: CustomSelectOption) => {
  if (option.isDisabled) {
    return;
  }
  emit('update:modelValue', option.value);
  emit('change', option.value);
  isOpen.value = false;
};

// 点击外部关闭下拉
const handleClickOutside = (event: MouseEvent) => {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

// 键盘事件（可扩展键盘导航）
const handleKeydown = (event: KeyboardEvent) => {
  if (!isOpen.value) {
    return;
  }
  switch (event.key) {
    case 'Escape':
      isOpen.value = false;
      break;
    case 'ArrowDown':
    case 'ArrowUp':
      // 可扩展：键盘导航
      break;
    case 'Enter':
      // 可扩展：回车选择
      break;
  }
};

// 生命周期：监听全局点击和键盘
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleKeydown);
});

// 监听modelValue变化，自动收起下拉
watch(
  () => props.modelValue,
  () => {
    isOpen.value = false;
  },
);
</script>

<style lang="scss" scoped>
@use '../../assets/styles/base/_variables.scss' as variables;

.custom-select,
.options-container,
.option {
  user-select: none;
}

.custom-select {
  position: relative;
  display: flex;
  padding: 0.5rem 0.8rem 0.5rem 1.2rem;
  background-color: variables.$custom-color;
  font-size: 1.4rem;
  color: #000;
  cursor: pointer;
  border-radius: 0.3rem;
  font-weight: variables.$font-weight-regular;

  // 展开时样式
  &.is-open {
    background-color: variables.$custom-color;
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
}

// 选中项样式
.selected-option {
  display: flex;
  border-radius: 4px;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .arrow-content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.6rem;
    height: 1.6rem;
    margin-left: 0.8rem;

    .arrow {
      flex: 1;
      width: 0.8rem;
      height: 0.5rem;
      align-items: center;
      justify-content: center;
      color: #000;
      opacity: 0.4;
    }
  }
}

// 下拉选项列表样式
.options-container {
  position: absolute;
  z-index: 1000;
  top: 100%;
  right: 0;
  left: 0;
  border: 0.1rem solid #dcdfe6;
  box-sizing: border-box;
  box-shadow: 0 0.2rem 1.2rem 0 rgb(0 0 0 / 10%);
  margin-top: 0.4rem;
  border-radius: 0.4rem;
  background-color: #fff;
  max-height: 15.8rem;
  overflow-y: auto;

  // 自定义滚动条样式
  &::-webkit-scrollbar {
    width: 0;
    background: #f5f5f5;
    border-radius: 0.4rem;
  }

  &::-webkit-scrollbar-thumb {
    background: #dcdfe6;
    border-radius: 0.4rem;
    transition: background 0.3s;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #bfcbd9;
  }

  &::-webkit-scrollbar-corner {
    background: transparent;
  }
}

.options-container ::selection {
  color: inherit;
  background: transparent;
}

// 单个选项样式
.option {
  display: flex;
  padding: 0.5rem 0.8rem 0.5rem 1.2rem;
  transition: background-color 0.3s ease;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    background-color: #f5f7fa;
  }

  &.is-selected {
    color: #409eff;
    background-color: #ecf5ff;
  }

  &.is-disabled {
    color: #c0c4cc;
    cursor: not-allowed;
    background-color: #fff;

    &:hover {
      background-color: #fff;
    }
  }
}

// Transition下拉动画
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
