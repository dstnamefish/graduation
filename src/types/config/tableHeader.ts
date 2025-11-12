// 通用类型定义
export type Position = 'left' | 'right';
export type ButtonStyle = 'default' | 'primary' | 'text';
export type FilterType = 'select' | 'multiple' | 'date' | 'daterange' | 'number' | 'custom';
export type ButtonType = 'add' | 'edit' | 'delete' | 'export' | 'import' | 'refresh' | 'custom';
export type ToolbarItem = 'density' | 'fullscreen' | 'column-settings' | 'refresh';
export type FieldType = 'input' | 'select' | 'date' | 'number';

/**
 * @description 筛选器选项配置
 */
export interface FilterOption {
  label: string;
  value: string | number | boolean;
  disabled?: boolean;
}

/**
 * @description 高级搜索字段配置
 */
export interface AdvancedSearchField {
  key: string;
  label: string;
  type: FieldType;
  options?: FilterOption[];
}

/**
 * @description 搜索框配置
 */
export interface SearchConfig {
  key: string;
  enabled: boolean;
  placeholder?: string;
  position: Position;
  width?: string;
  advanced?: {
    enabled: boolean;
    fields: AdvancedSearchField[];
  };
}

/**
 * @description 筛选器配置
 */
export interface FilterConfig {
  key: string;
  enabled: boolean;
  type: FilterType;
  label?: string;
  options?: FilterOption[];
  position: Position;
  width?: string;
  props?: Record<string, unknown>;
}

/**
 * @description 操作按钮配置
 */
export interface ActionButtonConfig {
  type: ButtonType;
  text?: string;
  icon?: string;
  disabled?: boolean;
  permission?: string;
  props?: Record<string, unknown>;
}

/**
 * @description 操作组配置
 */
export interface ActionGroupConfig {
  key: string;
  enabled: boolean;
  buttons: ActionButtonConfig[];
  position: Position;
  style?: ButtonStyle;
}

/**
 * @description 工具栏配置
 */
export interface ToolbarConfig {
  enabled: boolean;
  position: Position;
  items: ToolbarItem[];
}

/**
 * @description 表格顶部栏配置
 */
export interface TableHeaderConfig {
  search: SearchConfig[];
  filters: FilterConfig[];
  action: ActionGroupConfig[];
  toolbar: ToolbarConfig;
}