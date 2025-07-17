export interface CalendarCell {
  day: number;
  type: 'prev' | 'current' | 'next';
  isToday?: boolean;
}

export interface DateGridProps {
  year: number;
  month: number;
}