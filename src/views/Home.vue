<template>
  <div class="home-view">
    <!-- 页面标题 -->
    <div class="text-center py-12">
      <h1 class="text-[clamp(2rem,5vw,3.5rem)] font-bold text-gray-800 mb-4">
        欢迎来到我的应用
      </h1>
      <p class="text-[clamp(1rem,2vw,1.25rem)] text-gray-600 max-w-2xl mx-auto">
        这是一个使用 Vue 3 和 TypeScript 构建的现代化单页应用
      </p>
      <div class="mt-8">
        <router-link 
          to="/about" 
          class="bg-primary-color hover:bg-primary-color/90 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          了解更多 <i class="fa fa-arrow-right ml-2"></i>
        </router-link>
      </div>
    </div>

    <!-- 特性卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4 py-12">
      <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
        <div class="w-14 h-14 bg-primary-color/10 rounded-full flex items-center justify-center mb-4">
          <i class="fa fa-bolt text-primary-color text-2xl"></i>
        </div>
        <h3 class="text-xl font-semibold mb-2 text-gray-800">快速响应</h3>
        <p class="text-gray-600">
          采用最新的前端技术栈，确保应用响应迅速，交互流畅。
        </p>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
        <div class="w-14 h-14 bg-primary-color/10 rounded-full flex items-center justify-center mb-4">
          <i class="fa fa-shield text-primary-color text-2xl"></i>
        </div>
        <h3 class="text-xl font-semibold mb-2 text-gray-800">安全可靠</h3>
        <p class="text-gray-600">
          多层次安全防护，保障用户数据安全，让您的信息无后顾之忧。
        </p>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
        <div class="w-14 h-14 bg-primary-color/10 rounded-full flex items-center justify-center mb-4">
          <i class="fa fa-cog text-primary-color text-2xl"></i>
        </div>
        <h3 class="text-xl font-semibold mb-2 text-gray-800">高度可定制</h3>
        <p class="text-gray-600">
          灵活的架构设计，支持各种扩展需求，轻松定制您的专属功能。
        </p>
      </div>
    </div>

    <!-- 统计数据 -->
    <div class="bg-gray-50 py-16">
      <div class="max-w-5xl mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="p-6">
            <div class="text-4xl font-bold text-primary-color mb-2" id="counter-users">0</div>
            <p class="text-gray-600">活跃用户</p>
          </div>
          <div class="p-6">
            <div class="text-4xl font-bold text-primary-color mb-2" id="counter-projects">0</div>
            <p class="text-gray-600">项目完成</p>
          </div>
          <div class="p-6">
            <div class="text-4xl font-bold text-primary-color mb-2" id="counter-reviews">0</div>
            <p class="text-gray-600">好评数</p>
          </div>
          <div class="p-6">
            <div class="text-4xl font-bold text-primary-color mb-2" id="counter-awards">0</div>
            <p class="text-gray-600">获得奖项</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 页脚行动号召 -->
    <div class="bg-primary-color text-white py-16 text-center">
      <div class="max-w-3xl mx-auto px-4">
        <h2 class="text-3xl font-bold mb-6">准备好开始了吗？</h2>
        <p class="text-lg mb-8 opacity-90">
          加入我们的社区，获取最新的功能更新和专业支持
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <router-link 
            to="/login" 
            class="bg-white text-primary-color hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-all duration-300"
          >
            登录账户
          </router-link>
          <router-link 
            to="/register" 
            class="bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium py-3 px-8 rounded-lg transition-all duration-300"
          >
            注册新账户
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

// 数字增长动画函数
const animateCounter = (id: string, target: number, duration: number = 2000) => {
  const element = document.getElementById(id)
  if (!element) return

  const start = 0
  const increment = target / (duration / 16) // 60fps
  let current = start

  const updateCounter = () => {
    current += increment
    if (current >= target) {
      element.textContent = target.toString()
      return
    }
    element.textContent = Math.floor(current).toString()
    requestAnimationFrame(updateCounter)
  }

  updateCounter()
}

onMounted(() => {
  // 触发统计数字动画
  animateCounter('counter-users', 12000)
  animateCounter('counter-projects', 543)
  animateCounter('counter-reviews', 1459)
  animateCounter('counter-awards', 12)
})
</script>

<style scoped>
/* 自定义主色调 - 可根据需要修改 */
:root {
  --primary-color: #165DFF;
}

/* 全局过渡效果 */
.router-link-exact-active {
  color: var(--primary-color);
  font-weight: 500;
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}

/* 响应式文本 */
@media (max-width: 640px) {
  .text-center {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>