import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

import './assets/styles/global.scss';

const app = createApp(App);

// 配置路由
app.use(router);

// 配置Pinia
const pinia = createPinia();
app.use(pinia);

// 初始化认证状态
const { useAuthStore } = await import('./store/auth');
const authStore = useAuthStore();
authStore.initAuth();

// 配置ElementPlus
app.use(ElementPlus);

// 挂载应用
app.mount('#app');