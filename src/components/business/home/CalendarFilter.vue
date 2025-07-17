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
    <div class="calendar-content">
      <DateGrid :year="year" :month="month" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import CustomSelect from '../../ui/CustomSelect.vue';
import DateGrid from '../../ui/DateGrid.vue';

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const year = ref(currentYear);
const month = ref(currentMonth);

const yearOptions = Array.from({ length: 16 }, (_, i) => {
  const y = currentYear - 10 + i;
  return { label: `${y} 年`, value: y };
});
const monthOptions = Array.from({ length: 12 }, (_, i) => ({
  label: `${i + 1} 月`,
  value: i + 1,
}));
</script>

<style scoped lang="scss">
@use '../../../assets/styles/base/_variables.scss' as variables;

.calendar-filter-container {
  display: flex;
  flex-direction: column;
  background-color: variables.$light-color;
  width: 46rem;
  height: 44.7rem;
  border-radius: 1.2rem;

  .calendar-header {
    display: flex;
    width: 100%;
    height: 7.1rem;
    align-items: center;
    padding: 0 4.2rem 0 3.2rem;
    justify-content: space-between;
    border-bottom: 0.2rem solid variables.$custom-color;

    .calendar-header-left {
      font-size: 1.8rem;
      color: variables.$dark-text-color;
    }
  }

  .calendar-content {
    flex: 1;
    padding: 2rem 3.2rem;
  }
}

.calendar-header-right {
  display: flex;

  .header-right-year {
    margin-right: 1.2rem;
  }

  .header-right-month {
    margin-right: 1.2rem;
  }
}
</style>