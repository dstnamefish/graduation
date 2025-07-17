<template>
  <div class="date-grid">
    <div class="date-grid-week-row">
      <span v-for="w in ['一', '二', '三', '四', '五', '六', '日']" :key="w" class="date-grid-week">
        {{ w }}
      </span>
    </div>
    <div class="date-grid-days">
      <div class="date-grid-week-row" v-for="(week, wIdx) in weeks" :key="wIdx">
        <span
          v-for="(cell, idx) in week"
          :key="idx"
          :class="['date-grid-day', cell.type, { today: cell.isToday }]"
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

const today = new Date();

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
const calendarGrid = computed<CalendarCell[]>(() => {
  const days: CalendarCell[] = [];
  let start = firstDayOfWeek.value;

  // 上月灰色天数
  for (let i = start - 1; i >= 0; i--) {
    days.push({
      day: daysInPrevMonth.value - i,
      type: 'prev',
    });
  }

  // 本月天数
  for (let i = 1; i <= daysInMonth.value; i++) {
    days.push({
      day: i,
      type: 'current',
      isToday:
        props.year === today.getFullYear() &&
        props.month === today.getMonth() + 1 &&
        i === today.getDate(),
    });
  }

  // 下月灰色天数
  while (days.length % 7 !== 0) {
    days.push({
      day: days.length - (start + daysInMonth.value) + 1,
      type: 'next',
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
    padding-bottom: 1.08rem;
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
  width: 5.258rem;
  height: 5.258rem;
  color: #000;
  background: transparent;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.4rem;
  font-weight: variables.$font-weight-medium;
}

.date-grid-day.prev,
.date-grid-day.next {
  color: #000;
  background: transparent;
  opacity: 0.26;
}

.date-grid-day.today {
  color: #0052d9;
  font-weight: variables.$font-weight-medium;
  background: transparent;
}

.date-grid-day.today::after {
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
</style>