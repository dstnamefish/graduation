// 表格列配置类型
export interface ColumnOption<T = any> {
  prop?: keyof T | string
  label?: string
  type?: string
  checked?: boolean
  width?: string | number
  minWidth?: string | number
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  resizable?: boolean
  showOverflowTooltip?: boolean
  fixed?: 'left' | 'right' | boolean
  formatter?: (row: T, column: any, cellValue: any, index: number) => any
  render?: (h: any, scope: { $index: number; column: any; row: T; }) => any
  [key: string]: any
}