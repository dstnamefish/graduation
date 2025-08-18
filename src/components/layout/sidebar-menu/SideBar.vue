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
      { id: 202, label: '预约中心', path: '/reservation/query' },
    ],
  },
  { id: 3,
    label: '患者管理',
    path: '/patient',
    icon: PatientIcon,
    children: [
      { id: 301, label: '患者管理', path: '/patient/manage' },
      { id: 302, label: '售后回访', path: '/patient/visit' },
    ],
  },
  {
    id: 4,
    label: '医生管理',
    path: '/doctor',
    icon: DoctorIcon,
    children: [
      { id: 401, label: '医生档案', path: '/doctor/profile' },
      { id: 402, label: '排班管理', path: '/doctor/schedule' },
      { id: 403, label: '绩效统计', path: '/doctor/performance' },
    ],
  },
  {
    id: 5,
    label: '科室管理',
    path: '/department',
    icon: DepartmentIcon,
    children: [
      { id: 501, label: '科室信息', path: '/department/info' },
      { id: 502, label: '排班设置', path: '/department/schedule' },
      { id: 503, label: '运营分析', path: '/department/analysis' },
    ],
  },
  {
    id: 6,
    label: '药品管理',
    path: '/medicine',
    icon: MedicineIcon,
    children: [
      { id: 601, label: '药品库', path: '/medicine/library' },
      { id: 602, label: '库存监控', path: '/medicine/inventory' },
      { id: 603, label: '药品统计', path: '/medicine/statistics' },
    ],
  },
  {
    id: 7,
    label: '费用管理',
    path: '/expense',
    icon: ExpenseIcon,
    children: [
      { id: 701, label: '收费结算', path: '/expense/settlement' },
      { id: 702, label: '退费处理', path: '/expense/refund' },
      { id: 703, label: '财务统计', path: '/expense/statistics' },
      { id: 704, label: '医保对接', path: '/expense/medical' },
    ],
  },
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
  color: variables.$text-color;
  background-color: variables.$primary-color;

  .sidebar-header {
    padding: 2rem;

    .sidebar-logo {
      font-size: 3.6rem;
      color: variables.$text-color;
    }
  }
}

.sidebar-menu {
  ul {
    width: 28rem;
    margin: 0;
    list-style: none;
  }
}
</style>