/**
 * 自定义下拉框组件选项
 * @param value 选项值
 * @param label 选项标签
 * @param isDisabled 是否禁用
 */
export interface CustomSelectOption {
  value: string | number;
  label: string;
  isDisabled?: boolean;
}

/**
 * 自定义下拉框组件属性
 * @param modelValue 绑定值
 * @param options 选项数组
 * @param placeholder 占位符文本
 * @param isDisabled 是否禁用
 */
export interface CustomSelectProps {
  modelValue?: string | number | null;
  options: CustomSelectOption[];
  placeholder?: string;
  isDisabled?: boolean;
}

/**
 * 自定义下拉框组件事件
 * @param {string} e - 事件
 * @param {string} value - 值
 */
export interface CustomSelectEmits {
  (e: 'update:modelValue', value: string | number | null): void;
  (e: 'change', value: string | number | null): void;
}