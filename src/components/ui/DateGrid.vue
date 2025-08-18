<template>
  <div class="date-grid">
    <div class="date-grid-week-row week-header">
      <span v-for="w in ['一', '二', '三', '四', '五', '六', '日']" :key="w" class="date-grid-week">
        {{ w }}
      </span>
    </div>
    <div class="date-grid-days">
      <div class="date-grid-week-row" v-for="(week, wIdx) in weeks" :key="wIdx">
        <span
          v-for="(cell, idx) in week"
          :key="idx"
          :class="['date-grid-day', cell.type, { today: cell.isToday, selected: cell.isSelected }]"
          @click="handleDateClick(cell)"
        >
          {{ cell.day }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { CalendarCell, DateGridProps } from '../../types/components/ui/date-grid';

const props = defineProps<DateGridProps>();


const firstDayOfWeek = computed(() => {
  // 0=周日, 1=周一...，我们以周一为第一天
  const jsDay = new Date(props.year, props.month - 1, 1).getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
});
const daysInMonth = computed(() => {
  return new Date(props.year, props.month, 0).getDate();
});
const daysInPrevMonth = computed(() => {
  return new Date(props.year, props.month - 1, 0).getDate();
});

const handleDateClick = (cell: CalendarCell) => {
  if (!props.onDateClick) {
    return;
  }

  let clickedDate: Date;

  if (cell.type === 'current') {
    // 当前月的日期
    clickedDate = new Date(props.year, props.month - 1, cell.day);
  } else if (cell.type === 'prev') {
    // 上个月的日期
    const prevMonth = props.month === 1 ? 12 : props.month - 1;
    const prevYear = props.month === 1 ? props.year - 1 : props.year;
    clickedDate = new Date(prevYear, prevMonth - 1, cell.day);
  } else {
    // 下个月的日期
    const nextMonth = props.month === 12 ? 1 : props.month + 1;
    const nextYear = props.month === 12 ? props.year + 1 : props.year;
    clickedDate = new Date(nextYear, nextMonth - 1, cell.day);
  }

  props.onDateClick(clickedDate, cell.type);
};

const calendarGrid = computed<CalendarCell[]>(() => {
  const days: CalendarCell[] = [];
  let start = firstDayOfWeek.value;

  // 上月灰色天数
  for (let i = start - 1; i >= 0; i--) {
    const day = daysInPrevMonth.value - i;
    const prevMonth = props.month === 1 ? 12 : props.month - 1;
    const prevYear = props.month === 1 ? props.year - 1 : props.year;
    const cellDate = new Date(prevYear, prevMonth - 1, day);

    days.push({
      day,
      type: 'prev',
      isSelected:
        props.selectedDate &&
        cellDate.getFullYear() === props.selectedDate.getFullYear() &&
        cellDate.getMonth() === props.selectedDate.getMonth() &&
        cellDate.getDate() === props.selectedDate.getDate(),
    });
  }

  // 本月天数
  for (let i = 1; i <= daysInMonth.value; i++) {
    const cellDate = new Date(props.year, props.month - 1, i);

    days.push({
      day: i,
      type: 'current',
      isSelected:
        props.selectedDate &&
        cellDate.getFullYear() === props.selectedDate.getFullYear() &&
        cellDate.getMonth() === props.selectedDate.getMonth() &&
        cellDate.getDate() === props.selectedDate.getDate(),
    });
  }

  // 下月灰色天数
  while (days.length % 7 !== 0) {
    const day = days.length - (start + daysInMonth.value) + 1;
    const nextMonth = props.month === 12 ? 1 : props.month + 1;
    const nextYear = props.month === 12 ? props.year + 1 : props.year;
    const cellDate = new Date(nextYear, nextMonth - 1, day);

    days.push({
      day,
      type: 'next',
      isSelected:
        props.selectedDate &&
        cellDate.getFullYear() === props.selectedDate.getFullYear() &&
        cellDate.getMonth() === props.selectedDate.getMonth() &&
        cellDate.getDate() === props.selectedDate.getDate(),
    });
  }

  // 保证总天数为 6*7=42
  while (days.length < 42) {
    const day = days.length - (start + daysInMonth.value) + 1;
    const nextMonth = props.month === 12 ? 1 : props.month + 1;
    const nextYear = props.month === 12 ? props.year + 1 : props.year;
    const cellDate = new Date(nextYear, nextMonth - 1, day);
    days.push({
      day,
      type: 'next',
      isSelected:
        props.selectedDate &&
        cellDate.getFullYear() === props.selectedDate.getFullYear() &&
        cellDate.getMonth() === props.selectedDate.getMonth() &&
        cellDate.getDate() === props.selectedDate.getDate(),
    });
  }
  return days;
});

const weeks = computed<CalendarCell[][]>(() => {
  const arr: CalendarCell[][] = [];
  for (let i = 0; i < calendarGrid.value.length; i += 7) {
    arr.push(calendarGrid.value.slice(i, i + 7));
  }
  return arr;
});
</script>

<style scoped lang="scss">
@use '../../assets/styles/base/_variables.scss' as variables;

.date-grid {
  .date-grid-week-row {
    display: flex;
    justify-content: space-between;
    color: #000;
    opacity: 0.6;
    font-size: 1.4rem;
    font-weight: variables.$font-weight-regular;
  }

  .date-grid-week-row.week-header {
    margin-bottom: 1.08rem;
  }
}

.date-grid-week {
  padding: 0 1.698rem;
  color: #000;
  text-align: center;
  font-weight: 400;
}

.date-grid-days {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.date-grid-day {
  position: relative;
  display: flex;
  width: 5rem;
  height: 5rem;
  color: #000;
  background: transparent;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.4rem;
  font-weight: variables.$font-weight-medium;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;

  &:hover {
    background-color: variables.$custom-color;
  }

  &:active {
    transform: scale(0.95);
  }
}

.date-grid-day.prev,
.date-grid-day.next {
  color: #000;
  background: transparent;
  opacity: 0.26;

  &:hover {
    color: #000;
    opacity: 1;
    background-color: variables.$custom-color;
  }
}

.date-grid-day.selected {
  color: #0052d9;
  font-weight: variables.$font-weight-medium;
  background: transparent;

  &:hover {
    background-color: variables.$custom-color;
  }

  &::after {
    position: absolute;
    top: 67%;
    left: 33%;
    display: block;
    width: 0.6rem;
    height: 0.6rem;
    background: #0052d9;
    content: '';
    transform: translate(-50%, 0);
    border-radius: 50%;
  }
}

// 保证今天被选中时也只显示选中样式
.date-grid-day.selected.today::after {
  display: block;
}
</style>