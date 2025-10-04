// 外部依赖（external组） - 按字母顺序
import { createApp } from 'vue';
import 'element-plus/dist/index.css';
import '@styles/index.scss';

import App from './App.vue';
import language from './locales';
import { initRouter } from './router';
import { initStore } from './store';

const app = createApp(App);

initStore(app);
initRouter(app);

app.use(language);

app.mount('#app');