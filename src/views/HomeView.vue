<template>
  <div class="home-wrapper">
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
.home-wrapper {
  margin: 0 auto;
  box-sizing: border-box;
  min-height: 100vh;
  background: #f5f7fa;
}

.home-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  flex-wrap: wrap;

  &-left {
    display: flex;
    flex-direction: column;
    gap: 21px;
    flex: 1 1 0;
    min-width: 0;
  }

  &-right {
    flex: 0 0 460px;
    min-width: 320px;
    max-width: 100%;
  }
}

.home-content {
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}

.welcome-banner {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

.hospital-trend,
.appointment-list {
  flex: 1 1 380px;
  min-width: 320px;
  max-width: 100%;
  box-sizing: border-box;
}
</style>