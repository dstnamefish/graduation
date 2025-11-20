<!-- 用户菜单-->
<template>
  <ElPopover
    ref="userMenuPopover"
    placement="bottom-end"
    :width="220"
    trigger="hover"
    :showArrow="false"
    popperClass="user-menu-popover"
    popperStyle="padding: 4px 0;"
  >
    <template #reference>
      <div class="flex items-center gap-3 h-12 px-3 rounded-lg bg-(--default-box-bg) hover:bg-(--zen-hover-color) cursor-pointer transition-colors duration-200 -my-2">
        <!-- 用户头像 -->
        <div class="w-8 h-8 rounded-full bg-zen-primary flex items-center justify-center overflow-hidden">
          <img
            v-if="userInfo?.avatar"
            :src="userInfo.avatar"
            :alt="userInfo.realName || userInfo?.username"
            class="w-full h-full object-cover"
          >
          <span v-else class="text-zen-secondary font-medium text-sm">
            {{ getAvatarText(userInfo?.realName || userInfo?.username || 'U') }}
          </span>
        </div>

        <!-- 用户信息 -->
        <div class="flex flex-col">
          <span class="text-sm font-medium text-g-900 leading-none">
            {{ userInfo?.realName || userInfo?.username || '用户' }}
          </span>
          <span class="text-xs text-g-600 leading-none">
            {{ userInfo?.role || '用户' }}
          </span>
        </div>

        <!-- 下拉箭头 -->
        <svg class="w-4 h-4 text-g-400 transition-transform duration-200"
             :class="{ 'rotate-180': isPopoverVisible }"
             fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
    </template>

    <template #default>
      <div class="py-2">
        <!-- 用户信息卡片 -->
        <div class="px-4 py-3 border-b border-(--default-border) bg-(--zen-gray-50)">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-zen-primary flex items-center justify-center">
              <img
                v-if="userInfo?.avatar"
                :src="userInfo.avatar"
                :alt="userInfo.realName || userInfo?.username"
                class="w-full h-full object-cover"
              >
              <span v-else class="text-zen-secondary font-medium">
                {{ getAvatarText(userInfo?.realName || userInfo?.username || 'U') }}
              </span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-medium text-g-900 truncate">
                {{ userInfo?.realName || userInfo?.username || '用户' }}
              </div>
              <div class="text-sm text-g-600 truncate">
                {{ userInfo?.role || '用户' }}
              </div>
            </div>
          </div>
        </div>

        <!-- 菜单项 -->
        <div class="py-1">
          <div class="px-4 py-2 hover:bg-(--zen-hover-color) cursor-pointer flex items-center gap-3 transition-colors duration-150"
               @click="goToProfile">
            <svg class="w-4 h-4 text-g-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            <span class="text-sm text-g-700">个人资料</span>
          </div>

          <div class="px-4 py-2 hover:bg-(--zen-hover-color) cursor-pointer flex items-center gap-3 transition-colors duration-150"
               @click="goToSettings">
            <svg class="w-4 h-4 text-g-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span class="text-sm text-g-700">账户设置</span>
          </div>

          <div class="px-4 py-2 hover:bg-(--zen-hover-color) cursor-pointer flex items-center gap-3 transition-colors duration-150"
               @click="showThemeToggle">
            <svg class="w-4 h-4 text-g-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
            <span class="text-sm text-g-700">主题切换</span>
          </div>
        </div>

        <!-- 分隔线和退出 -->
        <div class="border-t border-(--default-border) mt-1 pt-1">
          <div class="px-4 py-2 hover:bg-red-50 cursor-pointer flex items-center gap-3 transition-colors duration-150"
               @click="handleLogout">
            <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            <span class="text-sm text-red-600">退出登录</span>
          </div>
        </div>
      </div>
    </template>
  </ElPopover>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { UserInfo } from '@/types/api/core/user';
import { fetchUserInfo } from '@/api/core/user';

defineOptions({ name: 'ZenUserMenu' });

// 组件引用
const userMenuPopover = ref();

// 响应式数据
const userInfo = ref<UserInfo | null>(null);
const loading = ref(false);

// 计算属性：Popover 是否可见
const isPopoverVisible = computed(() => {
  // Element Plus 没有直接暴露 popover 状态的 API
  return false;
});

const router = useRouter();

// 获取用户信息
const loadUserInfo = async () => {
  try {
    loading.value = true;
    userInfo.value = await fetchUserInfo();
  } catch (error) {
    console.error('Failed to load user info:', error);
    ElMessage.error('获取用户信息失败');
  } finally {
    loading.value = false;
  }
};

// 获取头像文本（用于默认头像显示）
const getAvatarText = (name: string = 'U'): string => {
  if (!name || name === '用户') {return 'U';}
  return name.charAt(0).toUpperCase();
};

// 导航到个人资料页面
const goToProfile = () => {
  router.push('/profile');

  // 关闭 popover
  userMenuPopover.value?.hide?.();
};

// 导航到设置页面
const goToSettings = () => {
  router.push('/settings');
  userMenuPopover.value?.hide?.();
};

// 显示主题切换
const showThemeToggle = () => {
  // 这里可以触发主题切换逻辑
  ElMessage.info('主题切换功能');
  userMenuPopover.value?.hide?.();
};

// 处理退出登录
const handleLogout = () => {
  // 显示确认对话框
  ElMessageBox.confirm(
    '确定要退出登录吗？',
    '退出确认',
    {
      cancelButtonText: '取消',
      confirmButtonText: '确定',
      type: 'warning',
    },
  ).then(() => {
    // 执行退出逻辑
    ElMessage.success('已退出登录');
    router.push('/login');
    userMenuPopover.value?.hide?.();
  }).catch(() => {
    ElMessage.info('已取消退出');
  });
};

// 组件挂载时加载用户信息
onMounted(() => {
  loadUserInfo();
});
</script>