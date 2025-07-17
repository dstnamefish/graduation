import { createRouter, createWebHistory } from 'vue-router';

import DefaultLayout from '../components/layout/DefaultLayout.vue';

import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    redirect: '/home',
    children: [
      // 首页
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/HomeView.vue'),
        meta: { title: '首页' },
      },

      // 预约管理
      {
        path: '/reservation',
        name: 'Reservation',
        component: () => import('../views/ReservationView.vue'),
        meta: { title: '预约管理' },
        redirect: '/reservation/register',
        children: [
          {
            path: 'register',
            name: 'ReservationRegister',
            component: () => import('../views/RegisterView.vue'),
            meta: { title: '预约挂号' },
          },
          {
            path: 'query',
            name: 'ReservationQuery',
            component: () => import('../views/QueryView.vue'),
            meta: { title: '预约查询' },
          },
        ],
      },

      // 患者管理
      {
        path: '/patient',
        name: 'Patient',
        component: () => import('../views/PatientView.vue'),
        meta: { title: '患者管理' },
      },

      // 医生管理
      {
        path: '/doctor',
        name: 'Doctor',
        component: () => import('../views/DoctorView.vue'),
        meta: { title: '医生管理' },
      },

      // 科室管理
      {
        path: '/department',
        name: 'Department',
        component: () => import('../views/DepartmentView.vue'),
        meta: { title: '科室管理' },
      },

      // 药品管理
      {
        path: '/medicine',
        name: 'Medicine',
        component: () => import('../views/MedicineView.vue'),
        meta: { title: '药品管理' },
      },

      // 费用管理
      {
        path: '/expense',
        name: 'Expense',
        component: () => import('../views/ExpenseView.vue'),
        meta: { title: '费用管理' },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 设置页面标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - 医院管理系统` : '医院管理系统';
  next();
});

export default router;