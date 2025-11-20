<template>
  <div class="form-actions">
    <div class="button-group">
      <slot name="prefix"></slot>

      <!-- 主要操作按钮 -->
      <ZenButtonMore
        v-if="showSubmit"
        ref="submitButtonRef"
        :action="submitAction"
        :type="submitType"
        :size="size"
        :loading="loading"
        :disabled="disabled || hasErrors"
        :text="submitText"
        :loadingText="loadingText"
        :block="block"
        htmlType="submit"
        @click="handleSubmit"
      />

      <!-- 次要操作按钮 -->
      <ZenButtonMore
        v-if="showReset"
        :action="resetAction"
        :type="resetType"
        :size="size"
        :text="resetText"
        :disabled="loading"
        htmlType="reset"
        @click="handleReset"
      />

      <!-- 取消按钮 -->
      <ZenButtonMore
        v-if="showCancel"
        :action="cancelAction"
        :type="cancelType"
        :size="size"
        :text="cancelText"
        :disabled="loading"
        @click="handleCancel"
      />

      <!-- 自定义按钮插槽 -->
      <slot name="actions"></slot>

      <slot name="suffix"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormActionsEmit, FormActionsProps } from '@/types/component/button.ts';

import ZenButtonMore from '../zen-button-more/index.vue';

defineOptions({ name: 'FormActions' });

const emit = defineEmits<FormActionsEmit>();
const props = withDefaults(defineProps<FormActionsProps>(), {
  block: false,
  cancelAction: 'cancel',
  cancelText: '',

  cancelType: 'secondary',
  disabled: false,
  hasErrors: false,

  loading: false,
  loadingText: '',
  resetAction: 'reset',

  resetText: '',
  resetType: 'warning',
  showCancel: false,
  showReset: false,
  showSubmit: true,

  size: 'medium',
  submitAction: 'submit',
  submitText: '',
  submitType: 'primary',
});

const {} = toRefs(props);
const submitButtonRef = ref();

/**
 * 处理提交事件
 */
const handleSubmit = (event: Event) => {
  emit('submit', event);
};

/**
 * 处理重置事件
 */
const handleReset = (event: Event) => {
  emit('reset', event);
};

/**
 * 处理取消事件
 */
const handleCancel = (event: Event) => {
  emit('cancel', event);
};

/**
 * 暴露方法给父组件
 */
defineExpose({
  /** 聚焦提交按钮 */
  focus: () => {
    submitButtonRef.value?.$el?.focus();
  },

  /** 点击提交按钮 */
  submit: () => {
    submitButtonRef.value?.$el?.click();
  },
});
</script>

<style lang="scss" scoped>
@forward './index';
</style>