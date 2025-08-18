<template>
  <div class="calendar-filter-container">
    <div class="calendar-header">
      <div class="calendar-header-left">日历</div>
      <div class="calendar-header-right">
        <CustomSelect class="header-right-year" v-model="year" :options="yearOptions" />
        <CustomSelect class="header-right-month" v-model="month" :options="monthOptions" />
        <div class="header-right-switch"></div>
      </div>
    </div>
    <div class="calendar-content" @wheel="onDateGridWheel">
      <DateGrid
        :year="year"
        :month="month"
        :selectedDate="selectedDate"
        :onDateClick="handleDateClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import CustomSelect from '../../ui/CustomSelect.vue';
import DateGrid from '../../ui/DateGrid.vue';

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDate = new Date().getDate();
const year = ref(currentYear);
const month = ref(currentMonth);
const selectedDate = ref<Date>(new Date(currentYear, currentMonth - 1, currentDate));

const yearOptions = Array.from({ length: 16 }, (_, i) => {
  const y = currentYear - 10 + i;
  return { label: `${y} 年`, value: y };
});
const monthOptions = Array.from({ length: 12 }, (_, i) => ({
  label: `${i + 1} 月`,
  value: i + 1,
}));

const handleDateClick = (date: Date, type: 'prev' | 'current' | 'next') => {
  if (type === 'prev') {
    if (month.value === 1) {
      month.value = 12;
      year.value -= 1;
    } else {
      month.value -= 1;
    }
    selectedDate.value = date;
  } else if (type === 'next') {
    if (month.value === 12) {
      month.value = 1;
      year.value += 1;
    } else {
      month.value += 1;
    }
    selectedDate.value = date;
  } else {
    selectedDate.value = date;
  }
};

const minYear = yearOptions[0].value;
const maxYear = yearOptions[yearOptions.length - 1].value;

const onDateGridWheel = (e: WheelEvent) => {
  e.preventDefault();
  if (e.deltaY > 0) {
    // 下一个月
    if (month.value === 12) {
      if (year.value < maxYear) {
        month.value = 1;
        year.value += 1;
      }

      // 否则到达最大年，不能再往后
    } else {
      month.value += 1;
    }
  } else if (e.deltaY < 0) {
    // 上一个月
    if (month.value === 1) {
      if (year.value > minYear) {
        month.value = 12;
        year.value -= 1;
      }

      // 否则到达最小年，不能再往前
    } else {
      month.value -= 1;
    }
  }
};
</script>

<style scoped lang="scss">
@use '../../../assets/styles/base/_variables.scss' as variables;

.calendar-filter-container {
  display: flex;
  flex-direction: column;
  background-color: variables.$light-color;
  width: 460px;
  height: 447px;
  border-radius: 12px;

  .calendar-header {
    display: flex;
    width: 100%;
    height: 71px;
    align-items: center;
    padding: 0 42px 0 32px;
    justify-content: space-between;
    border-bottom: 2px solid variables.$custom-color;

    .calendar-header-left {
      font-size: 18px;
      color: variables.$dark-text-color;
    }
  }

  .calendar-content {
    flex: 1;
    padding: 20px 32px;
  }
}

.calendar-header-right {
  display: flex;

  .header-right-year {
    margin-right: 12px;
  }

  .header-right-month {
    margin-right: 12px;
  }
}
</style>
