<template>
  <div class="dashboard-cards">
    <div class="dashboard-card" v-for="card in cards" :key="card.title">
      <div class="card-title">
        {{ card.title.replace(/\(.*\)/, '') }}
        <span class="card-unit" v-if="card.title.match(/\(.*\)/)">
          {{ card.title.match(/\(.*\)/)?.[0] }}
        </span>
      </div>
      <div class="card-value" :style="card.value > 9999999 ? { fontSize: '3.8rem' } : {}">
        {{ card.value.toLocaleString('en-US') }}
      </div>
      <div class="card-desc">
        <span>{{ card.desc }}</span>
        <span :class="['card-rate', card.trend > 0 ? 'up' : 'down']">
          {{ Math.abs(card.trend) }}%
          <component :is="card.trend > 0 ? ArrowRateUp : ArrowRateDown" class="arrow-icon" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowRateDown from '../../../assets/icons/common/arrow-rate-down.svg';
import ArrowRateUp from '../../../assets/icons/common/arrow-rate-up.svg';

import type { DashboardCard } from '../../../types/components/business/home/dashboard-card.d.ts';

const cards: DashboardCard[] = [
  { title: '今日挂号人次(人)', value: 75, trend: 23, desc: '人数较昨日上涨' },
  { title: '今日看诊人次(人)', value: 64, trend: -17, desc: '人数较昨日下降' },
  { title: '今日药品出库量(元)', value: 4716999, trend: -17, desc: '出库量较昨日下降' },
  { title: '今日收入合计(元)', value: 24119, trend: -27, desc: '收入较昨日下降' },
];
</script>

<style scoped lang="scss">
@use '../../../assets/styles/base/_variables.scss' as variables;

.dashboard-cards {
  display: flex;
  gap: 17px;
}

.dashboard-card {
  display: flex;
  flex: 1;
  height: 180px;
  padding: 18px 16px;
  background: variables.$light-color;
  border-radius: 12px;
  flex-direction: column;
  align-items: flex-start;
}

.card-title {
  font-size: 18px;
  color: variables.$dark-text-color;
}

.card-unit {
  color: #a6a6a6;
  font-size: 18px;
}

.card-value {
  font-size: 48px;
  font-weight: 700;
  color: #222;
  margin-bottom: 8px;
}

.card-desc {
  display: flex;
  color: #808080;
  font-size: 14px;
  align-items: center;
}

.card-rate.up {
  display: flex;
  color: #e74c3c;
  align-items: center;
}

.card-rate.down {
  display: flex;
  color: #2ecc71;
  align-items: center;
}

.arrow-icon {
  width: 12px;
  height: 8px;
  margin-left: 5px;
  vertical-align: middle;
}
</style>
