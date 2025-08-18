<template>
  <div class="auth-container">
    <div class="auth-bg-container">
      <div class="form-container" ref="formContainer">
        <component :is="currentComponent" :key="currentView" @switch-view="handleSwitchView" />
      </div>
      <div
        class="auth-title-right"
        :class="{ 'auth-title-left': currentView === 'register' }"
        ref="titlePanel"
      >
        <div class="title">医疗数据中枢，专业管理入口</div>
        <div class="sub-title">
          支持高并发访问，确保紧急情况下的系统稳定性,全方位保护患者隐私与数据安全,智能分析助力精准医疗决策。
        </div>
        <div class="third-title">欢迎来到医疗管理系统，你的问题将会得到高效解决。</div>
        <div class="link">了解更多</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { animate } from 'animejs';
import { ref, shallowRef, nextTick, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import LoginView from './LoginView.vue';
import RegisterView from './RegisterView.vue';

const route = useRoute();
const router = useRouter();

// 状态管理
const currentView = ref<'login' | 'register'>('login');
const currentComponent = shallowRef(LoginView);
const formContainer = ref<HTMLElement>();
const titlePanel = ref<HTMLElement>();

// 组件映射
const viewComponents = {
  login: LoginView,
  register: RegisterView,
};

// 动画配置
const animationConfig = {
  form: {
    duration: 10000,
    easing: '',
    translateX: 900,
    scale: 1,
  },
  title: {
    panel: {
      duration: 20000,
      easing: 'easeInOutBack',
    },
    items: {
      duration: 20000,
      easing: 'easeOutExpo',
      delay: 16000,
    },
  },
};

onMounted(() => {
  const panel = document.querySelector('.login-panel');
  if (panel) {
    animate(panel, {
      translateX: 0,
      translateY: 0,
      opacity: 1,
      scale: 1,
      duration: 0,
      autoplay: true,
    });
  }

  if (titlePanel.value) {
    const titleElements = Array.from(titlePanel.value.children) as HTMLElement[];
    titleElements.forEach((el, index) => {
      animate(el, {
        opacity: [0, 1],
        translateX: [100, 0],
        duration: 900,
        delay: index * 500,
        easing: 'easeOutQuad',
      });
    });
  }
});

// 视图切换处理
const handleSwitchView = async (view: 'login' | 'register') => {
  // 1. 执行离开动画
  await playFormAnimation(false, currentView.value);

  // 2. 切换组件
  currentView.value = view;
  currentComponent.value = viewComponents[view];

  // 3. 等待DOM更新
  await nextTick();

  // 4. 执行表单进入动画
  await playFormAnimation(true, view);

  // 5.执行标题进入动画
  await playTitlePanelAnimation(view);

  // 6. 更新URL参数
  const redirect = route.query.redirect as string || '/home';
  router.replace({
    path: `/user/${view}`,
    query: { redirect }
  });
};

// 表单动画控制
const playFormAnimation = (isEnter: boolean, viewType: string): Promise<void> => {
  return new Promise((resolve) => {
    // 获取当前面板元素
    const panelElement = document.querySelector(
      viewType === 'register' ? '.register-panel' : '.login-panel',
    );

    if (!panelElement) {
      return resolve();
    }

    const direction = viewType === 'register' ? -1 : 1;
    const translateX = isEnter
      ? [animationConfig.form.translateX * direction, 0]
      : [0, -animationConfig.form.translateX * direction];

    animate(panelElement, {
      x: translateX,
      opacity: isEnter ? [1, 1] : [1, 1],
      scale: isEnter ? [animationConfig.form.scale, 1] : [1, animationConfig.form.scale],
      duration: animationConfig.form.duration,
      easing: animationConfig.form.easing,
      complete: () => resolve(),
    });
  });
};

// 标题面板动画
const playTitlePanelAnimation = async (view: 'login' | 'register'): Promise<void> => {
  if (!titlePanel.value) {
    return;
  }

  const isRegister = view === 'register';
  const titleElements = Array.from(titlePanel.value.children) as HTMLElement[];

  // 重置元素状态
  animate(titleElements, {
    opacity: 0,
    translateX: isRegister ? -50 : 50,
    duration: 0,
    easing: 'easeOutQuad',
  });

  // 面板动画
  const panelAnimation = animate(titlePanel.value, {
    left: isRegister ? '5%' : '',
    right: isRegister ? '' : '5%',
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutQuad',
  });

  // 文本元素动画
  const textAnimations = titleElements.map((el, index) => {
    return animate(el, {
      translateX: [isRegister ? 0 : 680],
      opacity: [0, 1],
      duration: 1000,
      delay: index * 500,
      easing: 'easeOutQuad',
    });
  });

  await Promise.all([panelAnimation.finished, ...textAnimations.map((a) => a.finished)]);
};
</script>
<style lang="scss" scoped>
@use '../assets/styles/base/_variables.scss' as variables;

@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

// Common styles for title elements
.auth-title-right,
.auth-title-left {
  position: absolute;
  z-index: 22;
  top: 35%;
  display: flex;
  width: 55%;
  color: #4285f4;
  transition: all 0.5s ease;
  transform: translateY(-50%);
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  word-wrap: break-word;
}

.auth-title-right {
  right: 5%;
}

.auth-title-left {
  left: 5%;
}

.title,
.sub-title,
.third-title,
.link {
  opacity: 0;
  transform: translateX(50px);
}

.title {
  text-align: left;
  line-height: 1.2;
  font-size: 28px;
  font-weight: 700;
}

.sub-title {
  font-size: 40px;
  font-weight: 500;
  text-align: left;
  line-height: 1.3;
  word-wrap: break-word;
}

.third-title {
  color: #2d2d2d;
  text-align: left;
  line-height: 1.3;
  font-size: 15px;
  font-weight: 500;
}

.auth-container {
  z-index: 1;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: variables.$primary-color;
  justify-content: center;
  align-items: center;
}

.auth-bg-container {
  position: relative;
  width: 90%;
  height: 55%;
  background-color: #eff5ff;
  border-radius: 40px;
}
</style>