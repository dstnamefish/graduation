<template>
  <div class="dashboard-cards">
    <div class="card" v-for="card in cards" :key="card.title">
      <div class="card-title">{{ card.title }}</div>
      <div class="card-value">{{ card.value }}</div>
      <div class="card-trend" :class="card.trend > 0 ? 'up' : 'down'">
        <span>{{ card.trend > 0 ? '↑' : '↓' }} {{ Math.abs(card.trend) }}%</span>
        <span class="card-desc">{{ card.desc }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const cards = [
  { title: '今日挂号人次', value: 128, trend: 23, desc: '较昨日上涨' },
  { title: '今日看诊人次', value: 102, trend: -17, desc: '较昨日下降' },
  { title: '今日药品出库量', value: 56, trend: -17, desc: '较昨日下降' },
  { title: '今日收入合计', value: '¥ 12,800', trend: -27, desc: '较昨日下降' },
];
</script>

<style scoped>
.dashboard-cards {
  display: flex;
  width: 110rem;
  gap: 12px;
  margin-bottom: 24px;
}

.card {
  display: flex;
  flex: 1;
  height: 18rem;
  padding: 20px 24px;
  background: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
  border-radius: 10px;
  flex-direction: column;
  align-items: flex-start;
}

.card-title {
  font-size: 1.1rem;
  color: #888;
  margin-bottom: 8px;
}

.card-value {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.card-trend {
  font-size: 1rem;
}

.card-trend.up {
  color: #2ecc71;
}

.card-trend.down {
  color: #e74c3c;
}

.card-desc {
  margin-left: 8px;
  color: #aaa;
}
</style>
