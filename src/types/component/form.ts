/**
 * @description 自定义验证函数类型
 *
 * @typedef {Function} ValidatorFunction
 * @param {any} value - 需要验证的字段值
 * @param {FormField} field - 当前字段的完整配置信息
 * @param {Record<string, any>} formData - 整个表单的数据对象
 * @returns {boolean | string | Promise<boolean | string>} 验证结果
 */
export type ValidatorFunction = (
  value: any,
  field: FormField,
  formData: Record<string, any>,
) => boolean | string | Promise<boolean | string>;

/**
 * @description 验证规则对象
 *
 * @interface ValidatorRule
 * @property {string | ValidatorFunction} validator - 验证规则函数，可以是函数名，也可以是函数
 * @property {string} [message] - 错误信息
 * @property {'blur' | 'input' | 'change'} [trigger] - 触发验证的时机，可选值：blur（失焦时）、input（输入时）、change（值改变时）等
 */
export interface ValidatorRule {
  validator: string | ValidatorFunction;
  message?: string;
  trigger?: 'blur' | 'input' | 'change';
}

/**
 * @description 选择框选项接口
 *
 * @interface SelectOption
 * @property {string | number} value - 选项值
 * @property {string} label - 选项显示文本
 * @property {boolean} [disabled] - 是否禁用该选项
 */
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

/**
 * @description 表单字段配置接口
 *
 * @interface FormField
 * @property {string} name - 字段唯一标识名称，用于表单数据绑定和DOM元素ID
 * @property {string} label - 字段显示标签文本，用于用户界面展示
 * @property {'text' | 'password' | 'email' | 'tel' | 'number' | 'select'} [type='text'] - 字段类型，影响渲染的组件类型
 * @property {string} [placeholder] - 输入框占位符文本，为用户提供输入提示
 * @property {boolean} [required=false] - 是否为必填字段，影响表单验证
 * @property {string | RegExp | ValidatorFunction | ValidatorRule} [validator] - 自定义验证规则，支持多种格式
 * @property {number} [minLength] - 输入内容最小长度限制
 * @property {number} [maxLength] - 输入内容最大长度限制
 * @property {string} [prefixIcon] - 输入框前置图标类名
 * @property {string} [suffixIcon] - 输入框后置图标类名
 * @property {boolean} [isShow=true] - 是否显示该字段，用于动态控制字段可见性
 * @property {boolean} [isDisabled=false] - 是否禁用该字段，禁用时不可编辑
 * @property {SelectOption[]} [options] - 选择框选项列表，仅当type为'select'时有效
 */
export interface FormField {
  name: string;
  label?: string;
  type?: 'text' | 'password' | 'email' | 'tel' | 'number' | 'select';
  placeholder?: string;
  required?: boolean;
  validator?: string | RegExp | ValidatorFunction | ValidatorRule;
  minLength?: number;
  maxLength?: number;
  prefixIcon?: string;
  suffixIcon?: string;
  isShow?: boolean;
  isDisabled?: boolean;
  options?: SelectOption[];
}

/**
 * @description 表单数据接口
 *
 * @interface FormData
 * @property {string} [email] - 邮箱地址
 * @property {string} [password] - 密码
 */
export interface FormData {
  email?: string;
  password?: string;
}

/**
 * @description 表单组件属性接口
 *
 * @interface FormProps
 * @property {FormField[]} [fields] - 表单字段配置数组，定义要渲染的所有表单字段
 * @property {Record<string, any>} [initialData] - 表单初始数据，键为字段名，值为初始值
 */
export interface FormProps {
  fields: FormField[];
  initialData?: Record<string, any>;
}

/**
 * @description 表单事件接口
 *
 * @interface FormEmit
 * @property {string} submit - 提交事件，触发时携带表单数据
 * @property {string} focus - 聚焦事件，触发时携带字段名
 * @property {string} blur - 失焦事件，触发时携带字段名
 * @property {string} change - 变化事件，触发时携带字段名和新值
 * @property {string} error - 错误事件，触发时携带字段名和错误信息数组
 * @property {string} blur - 失焦事件，触发时携带字段名
 */
export interface FormEmit {
  (e: 'submit', data: FormData): void;
  (e: 'input', fieldName: string): void;
  (e: 'focus', fieldName: string): void;
  (e: 'blur', fieldName: string): void;
  (e: 'change', fieldName: string, value: any): void;
  (e: 'error', fieldName: string, errors: string[]): void;
}

/**
 * @description 表格列配置接口
 *
 * @interface ColumnOption
 * @template T - 表格数据行类型，默认为 any
 * @property {string} [type] - 列类型，可选值：selection（选择框）、expand（展开行）、index（行索引）、globalIndex（全局索引）
 * @property {string} [prop] - 列数据属性名，用于绑定表格数据行的属性值
 * @property {string} [label] - 列标题文本，用于显示在表格表头
 * @property {string | number} [width] - 列宽度，支持像素值或百分比
 * @property {string | number} [minWidth] - 列最小宽度，支持像素值或百分比
 * @property {boolean | 'left' | 'right'} [fixed] - 是否固定列位置，可选值：true（固定在左侧）、false（不固定）、'right'（固定在右侧）
 * @property {boolean} [sortable] - 是否可排序，默认值为 false
 * @property {any[]} [filters] - 列筛选选项数组，每个选项为一个对象，包含 value（筛选值）和 label（筛选标签）属性
 *
 */
export interface ColumnOption<T = any> {
  type?: 'selection' | 'expand' | 'index' | 'globalIndex';
  prop?: string;
  label?: string;
  width?: string | number;
  minWidth?: string | number;
  fixed?: boolean | 'left' | 'right';
  sortable?: boolean;
  filters?: any[];
  filterMethod?: (value: any, row: any) => boolean;
  filterPlacement?: string;
  disabled?: boolean;
  checked?: boolean;
  formatter?: (row: T) => any;
  useSlot?: boolean;
  slotName?: string;
  useHeaderSlot?: boolean;
  headerSlotName?: string;
  [key: string]: any;
}