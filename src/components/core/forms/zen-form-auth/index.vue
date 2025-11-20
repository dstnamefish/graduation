<template>
  <form
    class="form-auth"
    @submit="handleSubmit"
  >
    <div
      class="form-field"
      v-for="field in fields"
      :key="field.name"
    >
      <!--输入框或选择框-->
      <div class="input-container">
        <!-- 普通输入框 -->
        <input
          v-if="field.type !== 'select'"
          class="field-input"
          :class="{
            'input-error': fieldErrors[field.name],
            'input-filled': formData[field.name],
            'input-focused': focusedField === field.name,
          }"
          :id="field.name"
          :placeholder="' '"
          :type="field.type || 'text'"
          :name="field.name"
          :required="field.required"
          :disabled="field.isDisabled || isSubmitting"
          :autocomplete="
            field.name === 'password'
              ? 'current-password'
              : field.name === 'username'
                ? 'username'
                : undefined
          "
          v-model="formData[field.name]"
          @input="handleInput(field.name, $event)"
          @focus="handleFocus(field.name, $event)"
          @blur="handleBlur(field.name, $event)"
        />
        <!-- 选择框 -->
        <select
          v-else
          class="field-input"
          :class="{
            'input-error': fieldErrors[field.name],
            'input-filled': formData[field.name],
            'input-focused': focusedField === field.name,
          }"
          :id="field.name"
          :name="field.name"
          :required="field.required"
          :disabled="field.isDisabled || isSubmitting"
          v-model="formData[field.name]"
          @change="handleSelectChange(field.name, $event)"
          @focus="handleFocus(field.name, $event)"
          @blur="handleBlur(field.name, $event)"
        >
          <option
            value=""
            disabled
          >
            {{ field.placeholder || '请选择' }}
          </option>
          <option
            v-for="option in field.options"
            :key="option.value"
            :value="option.value"
            :disabled="option.disabled"
          >
            {{ option.label }}
          </option>
        </select>
        <label
          :for="field.name"
          class="field-label"
          :class="{
            'label-error': fieldErrors[field.name],
            'label-required': field.required,
          }"
        >
          {{ field.label || field.placeholder }}
        </label>
        <div class="input-border"></div>
      </div>
      <div
        v-if="fieldErrors[field.name] && (touchedFields[field.name] || isSubmitted)"
        class="error-message"
      >
        <i class="error-icon">!</i>
        <span class="error-text">{{ fieldErrors[field.name] }}</span>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import type {
  FormProps,
  FormData,
  FormEmit,
  ValidatorFunction,
  ValidatorRule,
} from '@/types/component/form.ts';

// 移除内置验证器导入，只支持自定义验证器

defineOptions({ name: 'ZenFormAuth' });
const props = withDefaults(defineProps<FormProps>(), {
  initialData: () => ({}),
});
const emit = defineEmits<FormEmit>();
const { fields } = toRefs(props);

/**
 * 响应式数据
 *
 * @property {FormData} formData - 表单数据
 * @property {Record<string, string>} formErrors - 字段级错误信息
 * @property {boolean} isSubmitting - 提交状态
 * @property {Record<string, boolean>} touchedFields - 已触摸字段
 * @property {boolean} isSubmitted - 提交状态
 */
const formData = reactive<Record<string, any>>({ ...props.initialData });
const formErrors = reactive<Record<string, string>>({});
const isSubmitting = ref<boolean>(false);
const touchedFields = reactive<Record<string, boolean>>({});
const isSubmitted = ref<boolean>(false);
const focusedField = ref<string>('');

/**
 * 执行自定义验证器
 * @param validator 验证器
 * @param value 值
 * @param field 字段配置
 * @param formData 表单数据
 * @returns 验证结果
 */
const executeValidator = async (
  validator: string | RegExp | ValidatorFunction | ValidatorRule,
  value: any,
  field: any,
  formData: Record<string, any>,
): Promise<string> => {
  // 移除内置验证器支持，字符串类型验证器将被忽略
  if (typeof validator === 'string') {
    emit('validationWarning', `不再支持内置验证器: ${validator}，请使用自定义验证函数`);
    return '';
  }

  // 正则表达式类型
  if (validator instanceof RegExp) {
    const isValid = !value || validator.test(value.toString());
    return isValid ? '' : '输入格式不正确';
  }

  // 验证规则对象
  if (typeof validator === 'object' && 'validator' in validator) {
    const rule = validator as ValidatorRule;
    let result: boolean | string;

    if (typeof rule.validator === 'string') {
      // 不再支持内置验证器
      emit('validationWarning', `不再支持内置验证器: ${rule.validator}，请使用自定义验证函数`);
      return '';
    } else {
      // 自定义验证函数
      result = await rule.validator(value, field, formData);
    }

    if (result === true) {
      return '';
    } else if (typeof result === 'string') {
      return result;
    } else {
      return rule.message || '验证失败';
    }
  }

  // 直接的验证函数
  if (typeof validator === 'function') {
    const result = await validator(value, field, formData);
    if (result === true) {
      return '';
    } else if (typeof result === 'string') {
      return result;
    } else {
      return '验证失败';
    }
  }

  return '';
};

// 移除内置验证器错误消息函数，只支持自定义验证器

const hasErrors = computed(() => {
  return Object.keys(formErrors).length > 0;
});
const fieldErrors = computed(() => formErrors);

/**
 * 处理输入事件
 */
const handleInput = (fieldName: string, event: Event) => {
  const target = event.target as HTMLInputElement;
  formData[fieldName] = target.value;
  emit('input', fieldName);
  emit('change', fieldName, target.value);

  // 输入时清除该字段错误
  if (touchedFields[fieldName]) {
    validateField(fieldName);
  }
};

/**
 * 处理选择框变化事件
 */
const handleSelectChange = (fieldName: string, event: Event) => {
  const target = event.target as HTMLSelectElement;
  formData[fieldName] = target.value;
  emit('input', fieldName);
  emit('change', fieldName, target.value);

  // 选择时清除该字段错误
  if (touchedFields[fieldName]) {
    validateField(fieldName);
  }
};

/**
 * 处理聚焦事件
 *
 * @param fieldName 字段名
 * @param event 事件
 */
const handleFocus = (fieldName: string) => {
  focusedField.value = fieldName;
  emit('focus', fieldName);
};

/**
 * 处理失焦事件
 */
const handleBlur = (fieldName: string) => {
  focusedField.value = '';
  touchedFields[fieldName] = true;
  validateField(fieldName);
  emit('blur', fieldName);
};

/**
 * 验证单个字段
 */
const validateField = async (fieldName: string) => {
  const field = fields.value.find((f) => f.name === fieldName);
  if (!field) {
    return;
  }

  const value = formData[fieldName];
  let fieldError = '';

  // 必填验证
  if (field.required && (!value || value.toString().trim() === '')) {
    fieldError = '此字段为必填项';
  }

  // 最小长度验证
  if (
    !fieldError &&
    field.minLength !== undefined &&
    value &&
    value.toString().length < field.minLength
  ) {
    fieldError = `至少需要输入${field.minLength}个字符`;
  }

  // 最大长度验证
  if (
    !fieldError &&
    field.maxLength !== undefined &&
    value &&
    value.toString().length > field.maxLength
  ) {
    fieldError = `最多只能输入${field.maxLength}个字符`;
  }

  // 自定义验证器
  if (!fieldError && field.validator && value) {
    try {
      fieldError = await executeValidator(field.validator, value, field, formData);
    } catch (error) {
      emit('validationError', { error, field: fieldName });
      fieldError = '验证失败';
    }
  }

  // 设置或清除错误
  if (fieldError) {
    formErrors[fieldName] = fieldError;
  } else {
    delete formErrors[fieldName];
  }
};

/**
 * 验证整个表单
 */
const validateForm = async (): Promise<boolean> => {
  // 清空所有错误
  Object.keys(formErrors).forEach((key) => delete formErrors[key]);

  // 验证每个字段
  const validationPromises = fields.value
    .filter((field) => field.isShow !== false)
    .map((field) => validateField(field.name));

  await Promise.all(validationPromises);

  isSubmitted.value = true;
  return Object.keys(formErrors).length === 0;
};

/**
 * 重置表单
 */
const resetForm = () => {
  // 重置表单数据
  // 清除现有数据
  Object.keys(formData).forEach((key) => {
    delete formData[key];
  });

  // 恢复初始数据
  Object.assign(formData, props.initialData);

  // 清空错误和状态
  Object.keys(formErrors).forEach((key) => delete formErrors[key]);
  Object.keys(touchedFields).forEach((key) => delete touchedFields[key]);
  isSubmitted.value = false;
  isSubmitting.value = false;
};

/**
 * 处理表单提交
 */
const handleSubmit = async (event: Event) => {
  // 阻止默认表单提交
  event.preventDefault();

  if (isSubmitting.value) {
    return;
  }

  // 验证表单
  const isValid = await validateForm();
  if (!isValid) {
    return;
  }

  try {
    isSubmitting.value = true;

    // 触发提交事件
    emit('submit', formData as FormData);
  } catch (err) {
    emit('submitError', err);
  } finally {
    isSubmitting.value = false;
  }
};

/**
 * 暴露方法给父组件
 */
defineExpose({
  formData: readonly(formData),
  hasErrors: readonly(hasErrors),
  isSubmitting: readonly(isSubmitting),
  resetForm,
  validateForm,
});
</script>

<style lang="scss" scoped>
@forward './index';
</style>