<template>
  <div class="wellnest-button-more">
    <button
      :class="buttonClasses"
      :type="buttonConfig.htmlType || 'button'"
      :disabled="disabled || loading"
      @click="handleClick"
    >
      <!-- 加载状态图标 -->
      <i
        v-if="loading"
        class="button-icon loading-icon"
      >
        ⏳
      </i>

      <!-- 正常状态图标 -->
      <i
        v-else-if="displayIcon && !iconOnly"
        :class="['button-icon', displayIcon]"
      >
        {{ getIconSymbol(displayIcon) }}
      </i>

      <!-- 按钮文本 -->
      <span
        v-if="!iconOnly"
        class="button-text"
      >
        {{ displayText }}
      </span>

      <!-- 只显示图标 -->
      <i
        v-if="iconOnly && displayIcon"
        :class="['button-icon-only', displayIcon]"
      >
        {{ getIconSymbol(displayIcon) }}
      </i>
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  ButtonProps,
  ButtonEmit,
  BUTTON_ACTION_CONFIGS,
} from '@/types/component/button';

defineOptions({ name: 'WellnestButtonMore' });

const emit = defineEmits<ButtonEmit>();
const props = withDefaults(defineProps<ButtonProps>(), {
  action: 'custom',
  block: false,
  disabled: false,
  htmlType: 'button',
  iconOnly: false,
  loading: false,
  size: 'medium',
  type: 'primary',
});

/**
 * 获取按钮动作配置
 */
const buttonConfig = computed(() => {
  return BUTTON_ACTION_CONFIGS[props.action] || BUTTON_ACTION_CONFIGS.custom;
});

/**
 * 显示的文本
 */
const displayText = computed(() => {
  if (props.loading && props.loadingText) {
    return props.loadingText;
  }
  return props.text || buttonConfig.value.text;
});

/**
 * 显示的图标
 */
const displayIcon = computed(() => {
  return props.icon || buttonConfig.value.icon;
});

/**
 * 按钮样式类
 */
const buttonClasses = computed(() => {
  const classes = ['wellnest-button'];

  // 按钮类型
  const buttonType = props.type || buttonConfig.value.type;
  classes.push(`button-${buttonType}`);

  // 按钮大小
  classes.push(`button-${props.size}`);

  // 动作类型
  classes.push(`button-action-${props.action}`);

  // 状态类
  if (props.loading) {classes.push('button-loading');}
  if (props.disabled) {classes.push('button-disabled');}
  if (props.block) {classes.push('button-block');}
  if (props.iconOnly) {classes.push('button-icon-only');}

  return classes;
});

/**
 * 获取图标符号 - 使用接口获取而非本地图片
 */
const getIconSymbol = (iconName: string): string => {
  // 返回空字符串，让父组件通过接口提供图标内容
  // 或者可以在这里调用图标接口
  return '';
};

/**
 * 处理按钮点击事件
 */
const handleClick = (event: Event) => {
  if (props.disabled || props.loading) {
    event.preventDefault();
    return;
  }

  emit('click', event);
};
</script>

<style lang="scss" scoped>
.wellnest-button-more {
  display: inline-block;

  .wellnest-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px 16px;
    border: 1px solid transparent;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.5;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    transition: all 0.2s ease;

    &:focus {
      box-shadow: 0 0 0 2px rgb(64 158 255 / 20%);
      outline: none;
    }

    .button-icon {
      font-size: 16px;

      &.loading-icon {
        animation: spin 1s linear infinite;
      }
    }

    .button-text {
      font-size: inherit;
    }

    .button-icon-only {
      font-size: 18px;
    }

    // 按钮类型样式
    &.button-primary {
      border-color: #409eff;
      color: #fff;
      background-color: #409eff;

      &:hover:not(.button-disabled, .button-loading) {
        border-color: #66b1ff;
        background-color: #66b1ff;
      }

      &:active:not(.button-disabled, .button-loading) {
        border-color: #3a8ee6;
        background-color: #3a8ee6;
      }
    }

    &.button-secondary {
      border-color: #dcdfe6;
      color: #606266;
      background-color: #fff;

      &:hover:not(.button-disabled, .button-loading) {
        border-color: #c6e2ff;
        color: #409eff;
        background-color: #f5f7fa;
      }

      &:active:not(.button-disabled, .button-loading) {
        border-color: #3a8ee6;
        color: #3a8ee6;
        background-color: #ecf5ff;
      }
    }

    &.button-success {
      border-color: #67c23a;
      color: #fff;
      background-color: #67c23a;

      &:hover:not(.button-disabled, .button-loading) {
        border-color: #85ce61;
        background-color: #85ce61;
      }

      &:active:not(.button-disabled, .button-loading) {
        border-color: #5daf34;
        background-color: #5daf34;
      }
    }

    &.button-warning {
      border-color: #e6a23c;
      color: #fff;
      background-color: #e6a23c;

      &:hover:not(.button-disabled, .button-loading) {
        border-color: #ebb563;
        background-color: #ebb563;
      }

      &:active:not(.button-disabled, .button-loading) {
        border-color: #cf9236;
        background-color: #cf9236;
      }
    }

    &.button-danger {
      border-color: #f56c6c;
      color: #fff;
      background-color: #f56c6c;

      &:hover:not(.button-disabled, .button-loading) {
        border-color: #f78989;
        background-color: #f78989;
      }

      &:active:not(.button-disabled, .button-loading) {
        border-color: #dd6161;
        background-color: #dd6161;
      }
    }

    &.button-info {
      border-color: #909399;
      color: #fff;
      background-color: #909399;

      &:hover:not(.button-disabled, .button-loading) {
        border-color: #a6a9ad;
        background-color: #a6a9ad;
      }

      &:active:not(.button-disabled, .button-loading) {
        border-color: #82848a;
        background-color: #82848a;
      }
    }

    // 按钮大小
    &.button-small {
      padding: 6px 12px;
      font-size: 12px;

      .button-icon {
        font-size: 14px;
      }

      .button-icon-only {
        font-size: 16px;
      }
    }

    &.button-medium {
      padding: 8px 16px;
      font-size: 14px;
    }

    &.button-large {
      padding: 12px 24px;
      font-size: 16px;

      .button-icon {
        font-size: 18px;
      }

      .button-icon-only {
        font-size: 20px;
      }
    }

    // 状态样式
    &.button-disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &.button-loading {
      cursor: not-allowed;
    }

    &.button-block {
      width: 100%;
    }

    &.button-icon-only {
      padding: 8px;

      &.button-small {
        padding: 6px;
      }

      &.button-large {
        padding: 12px;
      }
    }

    // 动作类型特殊样式
    &.button-action-submit {
      min-width: 80px;
    }

    &.button-action-continue {
      min-width: 80px;
    }

    &.button-action-reset {
      min-width: 60px;
    }

    &.button-action-cancel {
      min-width: 60px;
    }
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>