<template>
  <el-card v-if="doctor" class="doctor-detail">
    <div class="doctor-detail__header">
      <img :src="doctor.avatar" alt="{{ doctor.name }}" class="doctor-detail__avatar" />
      <div class="doctor-detail__info">
        <h2 class="doctor-detail__name">{{ doctor.name }} <span class="doctor-detail__title">{{ doctor.title }}</span></h2>
        <p class="doctor-detail__department">{{ doctor.departmentName }}</p>
        <div class="doctor-detail__meta">
          <span class="doctor-detail__experience">{{ doctor.experience }}年经验</span>
          <span class="doctor-detail__rating">评分: {{ doctor.rating }}</span>
          <span class="doctor-detail__fee">诊疗费: ¥{{ doctor.consultationFee }}</span>
        </div>
      </div>
    </div>

    <div class="doctor-detail__content">
      <div class="doctor-detail__section">
        <h3 class="doctor-detail__section-title">医生简介</h3>
        <p class="doctor-detail__introduction">{{ doctor.introduction }}</p>
      </div>

      <div class="doctor-detail__section">
        <h3 class="doctor-detail__section-title">专长领域</h3>
        <p class="doctor-detail__specialty">{{ doctor.specialty }}</p>
      </div>

      <div class="doctor-detail__section">
        <h3 class="doctor-detail__section-title">可用时间段</h3>
        <div class="doctor-detail__time-slots">
          <div v-for="slot in doctor.availableTimeSlots" :key="slot.id" class="time-slot" :class="{ 'time-slot--available': slot.status === 'available' }">
            <div class="time-slot__date">{{ slot.date }}</div>
            <div class="time-slot__time">{{ slot.startTime }} - {{ slot.endTime }}</div>
            <div class="time-slot__status">{{ slot.status === 'available' ? '可预约' : '已预约' }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="doctor-detail__actions">
      <slot name="actions" :doctor="doctor"></slot>
    </div>
  </el-card>
  <div v-else class="doctor-detail__empty">
    暂无医生详情
  </div>
</template>

<script setup lang="ts">
import { Doctor } from '@/types/components/doctor';

defineProps<{
  doctor: Doctor | null;
}>();
</script>

<style scoped lang="scss">
.doctor-detail {
  &__header {
    display: flex;
    padding: 20px;
    border-bottom: 1px solid #eee;
  }

  &__avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
  }

  &__info {
    flex: 1;
  }

  &__name {
    font-size: 24px;
    font-weight: bold;
    margin: 0 0 10px 0;

    .doctor-detail__title {
      font-size: 16px;
      font-weight: normal;
      color: #666;
      margin-left: 10px;
    }
  }

  &__department {
    color: #666;
    margin: 0 0 10px 0;
    font-size: 16px;
  }

  &__meta {
    display: flex;
    gap: 20px;
    color: #666;
  }

  &__content {
    padding: 20px;
  }

  &__section {
    margin-bottom: 24px;
  }

  &__section-title {
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 12px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
  }

  &__introduction,
  &__specialty {
    line-height: 1.6;
    color: #333;
  }

  &__time-slots {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    padding: 20px;
    border-top: 1px solid #eee;
  }

  &__empty {
    text-align: center;
    padding: 60px 0;
    color: #999;
  }
}

time-slot {
  display: flex;
  flex-direction: column;
  width: 140px;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #f9f9f9;

  &--available {
    border-color: #4096ff;
    background-color: #f0f7ff;
  }

  &__date {
    font-weight: bold;
    margin-bottom: 6px;
  }

  &__time {
    margin-bottom: 6px;
  }

  &__status {
    font-size: 12px;
    color: #666;
  }
}
</style>