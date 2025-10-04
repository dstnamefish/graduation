/**
 * @description 按钮尺寸类型
 * 定义按钮的尺寸规格，用于统一界面风格
 *
 * @typedef {'small' | 'medium' | 'large'} ButtonSize
 * @value 'small' 小尺寸按钮，适用于紧凑布局
 * @value 'medium' 中等尺寸按钮，默认尺寸
 * @value 'large' 大尺寸按钮，适用于重要操作或醒目位置
 */
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * @description 按钮主题类型
 * 定义按钮的颜色主题，用于区分不同操作类型
 *
 * @typedef {'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'success'} ButtonType
 * @value 'primary' 主要按钮，用于主要操作
 * @value 'secondary' 次要按钮，用于辅助操作
 * @value 'danger' 危险按钮，用于删除等危险操作
 * @value 'warning' 警告按钮，用于需要谨慎的操作
 * @value 'info' 信息按钮，用于普通信息操作
 * @value 'success' 成功按钮，用于成功状态的操作
 */
export type ButtonType =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'warning'
  | 'info'
  | 'success';

/**
 * @description 按钮动作类型
 * 定义按钮的功能行为类型，用于关联特定的业务逻辑
 *
 * @typedef {'submit' | 'continue' | 'cancel' | 'reset' | 'save' | 'delete' | 'edit' | 'add' | 'confirm' | 'back' | 'custom'} ButtonAction
 * @value 'submit' 提交表单
 * @value 'continue' 继续下一步操作
 * @value 'cancel' 取消当前操作
 * @value 'reset' 重置表单数据
 * @value 'save' 保存数据
 * @value 'delete' 删除数据
 * @value 'edit' 编辑内容
 * @value 'add' 添加新项目
 * @value 'confirm' 确认操作
 * @value 'back' 返回上一步
 * @value 'custom' 自定义动作
 */
export type ButtonAction =
  | 'submit'
  | 'continue'
  | 'cancel'
  | 'reset'
  | 'save'
  | 'delete'
  | 'edit'
  | 'add'
  | 'confirm'
  | 'back'
  | 'custom';

/**
 * @description 按钮组件属性接口
 * 定义按钮组件的所有可配置属性，支持多种样式和功能配置
 *
 * @interface ButtonProps
 * @property {ButtonAction} [action] - 按钮动作类型，决定按钮的默认行为和样式
 * @property {ButtonType} [type] - 按钮主题类型，控制按钮的颜色风格
 * @property {ButtonSize} [size] - 按钮尺寸，控制按钮的大小
 * @property {boolean} [block] - 是否为块级元素，true时宽度占满父容器
 * @property {boolean} [loading] - 加载状态，true时显示加载动画
 * @property {boolean} [disabled] - 禁用状态，true时按钮不可点击
 * @property {string} [text] - 按钮显示文本，可覆盖默认文本
 * @property {string} [loadingText] - 加载状态下显示的文本
 * @property {string} [icon] - 按钮图标，支持图标类名或图标组件
 * @property {boolean} [iconOnly] - 是否只显示图标，true时隐藏文本
 * @property {'button' | 'submit' | 'reset'} [htmlType] - HTML原生按钮类型
 */
export interface ButtonProps {
  action?: ButtonAction;
  type?: ButtonType;
  size?: ButtonSize;
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  text?: string;
  loadingText?: string;
  icon?: string;
  iconOnly?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
}

/**
 * @description 按钮事件接口
 * 定义按钮组件触发的事件类型
 *
 * @interface ButtonEmit
 * @method (e: 'click', event: Event) 点击事件，当按钮被点击时触发
 */
export interface ButtonEmit {
  (e: 'click', event: Event): void;
}

/**
 * @description 按钮动作配置接口
 * 定义每种按钮动作类型的默认配置信息
 *
 * @interface ButtonActionConfig
 * @property {string} text - 按钮默认显示文本
 * @property {ButtonType} type - 按钮默认主题类型
 * @property {string} [icon] - 按钮默认图标
 * @property {'button' | 'submit' | 'reset'} [htmlType] - HTML按钮类型
 */
export interface ButtonActionConfig {
  text: string;
  type: ButtonType;
  icon?: string;
  htmlType?: 'button' | 'submit' | 'reset';
}

/**
 * @description 按钮动作配置映射
 * 提供按钮动作类型到默认配置的映射关系
 * 用于快速获取特定动作类型的默认样式和文本
 *
 * @constant {Record<ButtonAction, ButtonActionConfig>} BUTTON_ACTION_CONFIGS
 * @property {ButtonActionConfig} submit - 提交按钮配置
 * @property {ButtonActionConfig} continue - 继续按钮配置
 * @property {ButtonActionConfig} cancel - 取消按钮配置
 * @property {ButtonActionConfig} reset - 重置按钮配置
 * @property {ButtonActionConfig} save - 保存按钮配置
 * @property {ButtonActionConfig} delete - 删除按钮配置
 * @property {ButtonActionConfig} edit - 编辑按钮配置
 * @property {ButtonActionConfig} add - 添加按钮配置
 * @property {ButtonActionConfig} confirm - 确认按钮配置
 * @property {ButtonActionConfig} back - 返回按钮配置
 * @property {ButtonActionConfig} custom - 自定义按钮配置
 */
export const BUTTON_ACTION_CONFIGS: Record<ButtonAction, ButtonActionConfig> = {
  add: { icon: 'ep:plus', text: '添加', type: 'primary' },
  back: { icon: 'ep:arrow-left', text: '返回', type: 'secondary' },
  cancel: { icon: 'ep:close', text: '取消', type: 'secondary' },
  confirm: { icon: 'ep:check', text: '确认', type: 'primary' },
  continue: { icon: 'ep:arrow-right', text: '继续', type: 'primary' },
  custom: { text: '按钮', type: 'primary' },
  delete: { icon: 'ep:delete', text: '删除', type: 'danger' },
  edit: { icon: 'ep:edit', text: '编辑', type: 'info' },
  reset: { htmlType: 'reset', icon: 'ep:refresh', text: '重置', type: 'warning' },
  save: { icon: 'ep:document', text: '保存', type: 'success' },
  submit: { htmlType: 'submit', icon: 'ep:check', text: '提交', type: 'primary' },
};

/**
 * @description 表单操作按钮组属性接口
 * 定义表单底部操作按钮组的配置属性
 * 用于快速配置表单的提交、重置、取消等操作按钮
 *
 * @interface FormActionsProps
 * @property {boolean} [showSubmit=true] - 是否显示提交按钮
 * @property {boolean} [showReset=true] - 是否显示重置按钮
 * @property {boolean} [showCancel=true] - 是否显示取消按钮
 * @property {ButtonAction} [submitAction='submit'] - 提交按钮的动作类型
 * @property {ButtonAction} [resetAction='reset'] - 重置按钮的动作类型
 * @property {ButtonAction} [cancelAction='cancel'] - 取消按钮的动作类型
 * @property {ButtonType} [submitType='primary'] - 提交按钮的主题类型
 * @property {ButtonType} [resetType='warning'] - 重置按钮的主题类型
 * @property {ButtonType} [cancelType='secondary'] - 取消按钮的主题类型
 * @property {ButtonSize} [size='medium'] - 按钮组尺寸
 * @property {boolean} [block=false] - 按钮是否为块级布局
 * @property {boolean} [loading=false] - 按钮组加载状态
 * @property {boolean} [disabled=false] - 按钮组禁用状态
 * @property {boolean} [hasErrors=false] - 表单是否有错误，影响提交按钮状态
 * @property {string} [submitText] - 提交按钮自定义文本
 * @property {string} [resetText] - 重置按钮自定义文本
 * @property {string} [cancelText] - 取消按钮自定义文本
 * @property {string} [loadingText] - 加载状态文本
 */
export interface FormActionsProps {
  showSubmit?: boolean;
  showReset?: boolean;
  showCancel?: boolean;
  submitAction?: ButtonAction;
  resetAction?: ButtonAction;
  cancelAction?: ButtonAction;
  submitType?: ButtonType;
  resetType?: ButtonType;
  cancelType?: ButtonType;
  size?: ButtonSize;
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  hasErrors?: boolean;
  submitText?: string;
  resetText?: string;
  cancelText?: string;
  loadingText?: string;
}

/**
 * @description 表单操作按钮组事件接口
 * 定义表单按钮组触发的事件类型
 *
 * @interface FormActionsEmit
 * @method (e: 'submit', event: Event) 提交表单事件
 * @method (e: 'reset', event: Event) 重置表单事件
 * @method (e: 'cancel', event: Event) 取消操作事件
 */
export interface FormActionsEmit {
  (e: 'submit', event: Event): void;
  (e: 'reset', event: Event): void;
  (e: 'cancel', event: Event): void;
}