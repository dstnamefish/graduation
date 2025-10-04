<!-- 布局内容 -->
<template>
  <div class="layout-content" :class="{ 'no-basic-layout': isFullPage }" :style="containerStyle">
    <RouterView v-if="isRefresh" #default="{ Component, route }" :style="contentStyle">
      <!-- 路由信息调试 -->
      <div v-if="isOpenRouteInfo === 'true'" class="route-info">
        router meta：{{ route.meta }}
      </div>

      <!-- 缓存路由 -->
      <KeepAlive :include="keepAliveComponents" :max="10">
        <component
          class="art-page-view"
          :is="Component"
          :key="route.path"
          v-if="route.meta.keepAlive"
        />
      </KeepAlive>

      <!-- 非缓存路由 -->
      <component
        class="art-page-view"
        :is="Component"
        :key="route.path"
        v-if="!route.meta.keepAlive && Component"
      />
    </RouterView>

    <!-- 全屏页面切换过渡遮罩（用于提升页面切换视觉体验） -->
    <Teleport to="body" v-if="showTransitionMask">
      <div class="full-page-mask" />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties, Component } from 'vue';

import { useRoute } from 'vue-router';

import { useCommon } from '@/composables/useCommon';
import { useSettingStore } from '@/store/modules/setting';
















defineOptions({ name: 'WellNestPageContent' });

const route = useRoute();
const { containerMinHeight } = useCommon();
const { containerWidth, pageTransition, refresh } = storeToRefs(useSettingStore());

const isRefresh = shallowRef(true);
const isOpenRouteInfo = import.meta.env.VITE_OPEN_ROUTE_INFO;
const showTransitionMask = ref(false);
const keepAliveComponents = ref<string[]>([]);

// 检查当前路由是否需要使用无基础布局模式
const isFullPage = computed(() => route.matched.some((r) => r.meta?.isFullPage));
const prevIsFullPage = ref(isFullPage.value);

// 监听全屏状态变化，显示过渡遮罩
watch(isFullPage, (val, oldVal) => {
  if (val !== oldVal) {
    showTransitionMask.value = true;

    // 延迟隐藏遮罩，给足时间让页面完成切换
    setTimeout(() => {
      showTransitionMask.value = false;
    }, 50);
  }

  nextTick(() => {
    prevIsFullPage.value = val;
  });
});

const containerStyle = computed(
  (): CSSProperties =>
    isFullPage.value
      ? {
        background: 'var(--art-bg-color)',
        height: '100vh',
        left: 0,
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 2500,
      }
      : {
        maxWidth: containerWidth.value,
      },
);

const contentStyle = computed(
  (): CSSProperties => ({
    minHeight: containerMinHeight.value,
  }),
);

const reload = () => {
  isRefresh.value = false;
  nextTick(() => {
    isRefresh.value = true;
  });
};

watch(refresh, reload, { flush: 'post' });
</script>

<style lang="scss" scoped>
  .layout-content {
    &.no-basic-layout {
      overflow: auto;
    }
  }

  .route-info {
    margin-bottom: 12px;
    padding: 6px 8px;
    border: 1px solid var(--art-border-dashed-color);
    border-radius: 6px;
    font-size: 14px;
    color: var(--art-gray-600);
    background: var(--art-gray-200);
  }

  .full-page-mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2000;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    background-color: var(--art-main-bg-color);
  }
</style>