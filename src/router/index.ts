import { createRouter, createWebHistory } from 'vue-router';

import DefaultLayout from '../components/layout/DefaultLayout.vue';

import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/AuthView.vue'),
    meta: { isRequiresAuth: false },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('../views/LoginView.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('../views/RegisterView.vue'),
      },
    ],
  },
  {
    path: '/',
    component: DefaultLayout,
    redirect: '/home',
    meta: { isRequiresAuth: true },
    children: [
      // 首页
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/HomeView.vue'),
        meta: { title: '首页', isRequiresAuth: true },
      },

      // 预约管理
      {
        path: '/reservation',
        name: 'Reservation',
        meta: { title: '预约管理', isRequiresAuth: true },
        redirect: '/reservation/register',
        children: [
          {
            path: 'register',
            name: 'ReservationRegister',
            component: () => import('../views/ReservationRegisterView.vue'),
            meta: { title: '预约挂号', isRequiresAuth: true },
          },
          {
            path: 'query',
            name: 'ReservationQuery',
            component: () => import('../views/QueryView.vue'),
            meta: { title: '预约中心', isRequiresAuth: true },
          },
        ],
      },

      // 患者管理
      {
        path: '/patient',
        name: 'Patient',
        meta: { title: '患者管理', isRequiresAuth: true },
        redirect: '/patient/manage',
        children: [
          {
            path: 'manage',
            name: 'PatientManage',
            component: () => import('../views/PatientView.vue'),
            meta: { title: '患者管理', isRequiresAuth: true },
          },
          {
            path: 'visit',
            name: 'PatientVisit',
            component: () => import('../views/QueryView.vue'),
            meta: { title: '售后回访', isRequiresAuth: true },
          },
        ],
      },

      // 医生管理
      {
        path: '/doctor',
        name: 'Doctor',
        meta: { title: '医生管理', isRequiresAuth: true },
        redirect: '/doctor/profile',
        children: [
          {
            path: 'profile',
            name: 'DoctorProfile',
            component: () => import('../views/DoctorView.vue'),
            meta: { title: '医生档案', isRequiresAuth: true },
          },
          {
            path: 'schedule',
            name: 'DoctorSchedule',
            component: () => import('../views/QueryView.vue'),
            meta: { title: '排班管理', isRequiresAuth: true },
          },
          {
            path: 'performance',
            name: 'DoctorPerformance',
            component: () => import('../views/QueryView.vue'),
            meta: { title: '绩效统计', isRequiresAuth: true },
          },
        ],
      },

      // 科室管理
      {
        path: '/department',
        name: 'Department',
        meta: { title: '科室管理', isRequiresAuth: true },
        redirect: '/department/info',
        children: [
          {
            path: 'info',
            name: 'DepartmentInfo',
            component: () => import('../views/DepartmentView.vue'),
            meta: { title: '科室信息', isRequiresAuth: true },
          },
          {
            path: 'schedule',
            name: 'DepartmentSchedule',
            component: () => import('../views/QueryView.vue'),
            meta: { title: '排班设置', isRequiresAuth: true },
          },
          {
            path: 'analysis',
            name: 'DepartmentAnalysis',
            component: () => import('../views/QueryView.vue'),
            meta: { title: '运营分析', isRequiresAuth: true },
          },
        ],
      },

      // 药品管理
      {
        path: '/medicine',
        name: 'Medicine',
        meta: { title: '药品管理', isRequiresAuth: true },
        redirect: '/medicine/library',
        children: [
          {
            path: 'library',
            name: 'MedicineLibrary',
            component: () => import('../views/MedicineView.vue'),
            meta: { title: '药品库', isRequiresAuth: true },
          },
          {
            path: 'inventory',
            name: 'MedicineInventory',
            component: () => import('../views/QueryView.vue'),
            meta: { title: '库存监控', isRequiresAuth: true },
          },
          {
            path: 'statistics',
            name: 'MedicineStatistics',
            component: () => import('../views/QueryView.vue'),
            meta: { title: '药品统计', isRequiresAuth: true },
          },
        ],
      },

      // 费用管理
      {
        path: '/expense',
        name: 'Expense',
        meta: { title: '费用管理', isRequiresAuth: true },
        redirect: '/expense/settlement',
        children: [
          {
            path: 'settlement',
            name: 'ExpenseSettlement',
            component: () => import('../views/ExpenseView.vue'),
            meta: { title: '收费结算', isRequiresAuth: true },
          },
          {
            path: 'refund',
            name: 'ExpenseRefund',
            component: () => import('../views/QueryView.vue'),
            meta: { title: '退费处理', isRequiresAuth: true },
          },
          {
            path: 'statistics',
            name: 'ExpenseStatistics',
            component: () => import('../views/QueryView.vue'),
            meta: { title: '财务统计', isRequiresAuth: true },
          },
          {
            path: 'medical',
            name: 'ExpenseMedical',
            component: () => import('../views/QueryView.vue'),
            meta: { title: '医保对接', isRequiresAuth: true },
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫
router.beforeEach(async (to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - 医院管理系统` : '医院管理系统';

  // 检查路由是否需要认证
  const needsAuth = to.matched.some((record) => record.meta.isRequiresAuth);

  if (needsAuth) {
    // 导入认证store
    const { useAuthStore } = await import('../store/auth');
    const authStore = useAuthStore();

    // 初始化认证状态
    authStore.initAuth();

    // 检查是否已登录
    if (!authStore.isLoggedIn) {
      // 未登录，重定向到登录页
      next({ name: 'Login', query: { redirect: to.fullPath } });
      return;
    }

    // 检查token有效性
    if (!authStore.checkTokenValidity()) {
      // token无效，重定向到登录页
      next({ name: 'Login', query: { redirect: to.fullPath } });
      return;
    }
  }

  // 如果访问登录页且已登录，重定向到首页
  if (to.name === 'Login') {
    const { useAuthStore } = await import('../store/auth');
    const authStore = useAuthStore();
    authStore.initAuth();

    if (authStore.isLoggedIn) {
      next({ name: 'Home' });
      return;
    }
  }

  next();
});

export default router;