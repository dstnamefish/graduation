<template>
  <div class="sidebar-container">
    <!-- 标题 -->
    <div class="sidebar-header">
      <h1 class="sidebar-logo">医院管理系统</h1>
    </div>

    <!-- 菜单列表 -->
    <nav class="sidebar-menu">
      <ul>
        <MenuItems
          v-for="item in menuItems"
          :key="item.id"
          :item="item"
          :currentPath="currentPath"
          @menu-click="handleMenuClick"
        />
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import DepartmentIcon from '../../../assets/icons/menu/department.svg';
import DoctorIcon from '../../../assets/icons/menu/doctor.svg';
import ExpenseIcon from '../../../assets/icons/menu/expense.svg';
import HomeIcon from '../../../assets/icons/menu/home.svg';
import MedicineIcon from '../../../assets/icons/menu/medicine.svg';
import PatientIcon from '../../../assets/icons/menu/patient.svg';
import ReservationIcon from '../../../assets/icons/menu/reservation.svg';

import MenuItems from './MenuItems.vue';

import type { MenuItem } from '../../../types/components/layout/side-bar.d.ts';

const menuItems: MenuItem[] = [
  { id: 1, label: '首页', path: '/home', icon: HomeIcon },
  {
    id: 2,
    label: '预约管理',
    path: '/reservation',
    icon: ReservationIcon,
    children: [
      { id: 201, label: '预约挂号', path: '/reservation/register' },
      { id: 202, label: '预约查询', path: '/reservation/query' },
    ],
  },
  { id: 3, label: '患者管理', path: '/patient', icon: PatientIcon },
  { id: 4, label: '医生管理', path: '/doctor', icon: DoctorIcon },
  { id: 5, label: '科室管理', path: '/department', icon: DepartmentIcon },
  { id: 6, label: '药品管理', path: '/medicine', icon: MedicineIcon },
  { id: 7, label: '费用管理', path: '/expense', icon: ExpenseIcon },
];

const router = useRouter();
const route = useRoute();

const currentPath = ref('route.path');
watch(
  () => route.path,
  (newPath: string) => {
    currentPath.value = newPath;
  },
);
const handleMenuClick = (path: string) => {
  router.push(path);
};
</script>

<style lang="scss" scoped>
@charset "UTF-8";

@use '../../../assets/styles/base/_variables.scss' as variables;

.sidebar-container {
  width: 28rem;
  height: 100%;
  color: variables.$text-color;
  background-color: variables.$primary-color;

  .sidebar-header {
    padding: 20px;

    .sidebar-logo {
      font-size: 3.6rem;
      color: variables.$text-color;
    }
  }
}

.sidebar-menu {
  ul {
    margin: 0;
    list-style: none;
  }
}
</style>