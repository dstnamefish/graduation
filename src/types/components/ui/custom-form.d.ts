/**
 * 自定义表单组件字段
 * @param name 字段名
 * @param type 字段类型
 * @param placeholder 占位符
 * @param required 是否必填
 * @param disabled 是否禁用
 * @param validator 校验函数
 */
export interface CustomFormField {
  name: string;
  label: string;
  type: 'text' | 'password' | 'email' | 'number' | 'tel';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  validator?: (value: string) => string | null;
  defaultValue?: string | number | boolean;
  prefixIcon?: string;
  suffixIcon?: string;
  showPassword?: boolean | 'password' | 'text';
}

/**
 * 自定义表单组件属性
 * @param fields 表单字段
 * @param initialData 初始数据
 * @param validateOnBlur 是否在失去焦点时校验
 * @param validateOnInput 是否在输入时校验
 * @param dividerText 分隔线文本
 * @param submitText 提交按钮文本
 * @param submittingText 提交中按钮文本
 */
export interface CustomFormProps {
  fields: CustomFormField[];
  initialData?: CustomFormData;
  validateOnBlur?: boolean;
  validateOnInput?: boolean;
  showDivider?: boolean;
  dividerText?: string;
  submitText?: string;
  submittingText?: string;
}

export type CustomFormData = Record<string, string | number | boolean>;

export type CustomFormError = Record<string, string>;