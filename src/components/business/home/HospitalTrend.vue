<template>
  <div class="hospital-trend">
    <div class="trend-header">
      <span class="trend-title">医院出入院人数总览</span>
      <div class="trend-filters">
        <button :class="{ active: selected === '7' }" @click="selected = '7'">近7天</button>
        <button :class="{ active: selected === '30' }" @click="selected = '30'">近30天</button>
      </div>
    </div>
    <div class="trend-chart">
      <!-- 图表占位，可集成echarts等 -->
      <div class="chart-placeholder">[趋势图表]</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const selected = ref('7');
</script>

<style scoped>
.hospital-trend {
  width: 78rem;
  padding: 24px;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 24px;
}

.trend-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.trend-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.trend-filters button {
  margin-left: 8px;
  padding: 4px 12px;
  border: none;
  border-radius: 4px;
  background: #f0f1f2;
  cursor: pointer;
}

.trend-filters .active {
  color: #fff;
  background: #409eff;
}

.chart-placeholder {
  display: flex;
  height: 180px;
  color: #bbb;
  background: #f5f7fa;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
}
</style>
