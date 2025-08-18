/**
 * 日期网格组件的单元格
 * @param day 日期
 * @param type 类型
 * @param isToday 是否是今天
 * @param isSelected 是否被选中
 */
export interface CalendarCell {
  day: number;
  type: 'prev' | 'current' | 'next';
  isToday?: boolean;
  isSelected?: boolean;
}

/**
 * 日期网格组件的属性
 * @param year 年份
 * @param month 月份
 * @param selectedDate 选中的日期
 * @param onDateClick 日期点击事件回调
 */
export interface DateGridProps {
  year: number;
  month: number;
  selectedDate?: Date;
  onDateClick?: (date: Date, type: 'prev' | 'current' | 'next') => void;
}