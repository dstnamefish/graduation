<template>
  <div class="doctor-list">
    <div class="doctor-list__header">
      <slot name="header"></slot>
    </div>
    <el-card v-for="doctor in doctors" :key="doctor.id" class="doctor-card">
      <div class="doctor-card__content">
        <img :src="doctor.avatar" alt="{{ doctor.name }}" class="doctor-card__avatar" />
        <div class="doctor-card__info">
          <h3 class="doctor-card__name">{{ doctor.name }} <span class="doctor-card__title">{{ doctor.title }}</span></h3>
          <p class="doctor-card__department">{{ doctor.departmentName }}</p>
          <p class="doctor-card__specialty">{{ doctor.specialty }}</p>
          <div class="doctor-card__meta">
            <span class="doctor-card__experience">{{ doctor.experience }}年经验</span>
            <span class="doctor-card__rating">评分: {{ doctor.rating }}</span>
            <span class="doctor-card__fee">诊疗费: ¥{{ doctor.consultationFee }}</span>
          </div>
        </div>
      </div>
      <div class="doctor-card__actions">
        <slot name="actions" :doctor="doctor"></slot>
      </div>
    </el-card>
    <div v-if="doctors.length === 0" class="doctor-list__empty">
      暂无医生数据
    </div>
  </div>
</template>

<script setup lang="ts">
import { Doctor } from '@/types/components/doctor';

defineProps<{
  doctors: Doctor[];
}>();
</script>

<style scoped lang="scss">
.doctor-list {
  &__header {
    margin-bottom: 20px;
  }

  &__empty {
    text-align: center;
    padding: 40px 0;
    color: #999;
  }
}

.doctor-card {
  margin-bottom: 16px;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &__content {
    display: flex;
    padding: 16px;
  }

  &__avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 16px;
  }

  &__info {
    flex: 1;
  }

  &__name {
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 8px 0;

    .doctor-card__title {
      font-size: 14px;
      font-weight: normal;
      color: #666;
      margin-left: 8px;
    }
  }

  &__department {
    color: #666;
    margin: 0 0 4px 0;
  }

  &__specialty {
    color: #333;
    margin: 0 0 8px 0;
  }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    color: #666;
    font-size: 12px;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    padding: 16px;
    border-top: 1px solid #eee;
  }
}
</style>