<template>
  <div class="home-view">
    <div class="home-header">
      <div class="home-header-left">
        <WelcomeBanner />
        <DashboardCards />
      </div>
      <div class="home-header-right">
        <CalendarFilter />
      </div>
    </div>
    <div class="home-content">
      <HospitalTrend />
      <AppointmentList />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppointmentList from '../components/business/home/AppointmentList.vue';
import CalendarFilter from '../components/business/home/CalendarFilter.vue';
import DashboardCards from '../components/business/home/DashboardCards.vue';
import HospitalTrend from '../components/business/home/HospitalTrend.vue';
import WelcomeBanner from '../components/business/home/WelcomeBanner.vue';
</script>

<style scoped lang="scss">
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: start;

  &-left {
    display: flex;
    flex-direction: column;
    gap: 2.1rem;
  }
}

.home-content {
  display: flex;
  gap: 2.1rem;
}
</style>