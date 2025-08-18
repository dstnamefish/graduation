<template>
  <div class="header-container">
    <div class="header-left">
      {{ headerTitle }}
    </div>
    <div class="header-right">
      <ElDropdown @command="handleCommand">
        <span class="user-info">
          <ElAvatar :size="32" :src="userAvatar">
            {{ userInitials }}
          </ElAvatar>
          <span class="username">{{ currentUser?.name || '用户' }}</span>
          <ElIcon><ArrowDown /></ElIcon>
        </span>
        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem command="profile">个人信息</ElDropdownItem>
            <ElDropdownItem command="settings">设置</ElDropdownItem>
            <ElDropdownItem divided command="logout">退出登录</ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useAuthStore } from '../../store/auth';

const router = useRouter();
const authStore = useAuthStore();

const headerTitle = ref('首页');

// 获取当前用户信息
const currentUser = computed(() => authStore.currentUser);

// 用户头像
const userAvatar = computed(() => currentUser.value?.avatar || '');

// 用户姓名首字母
const userInitials = computed(() => {
  const name = currentUser.value?.name || '';
  return name.charAt(0).toUpperCase();
});

// 处理下拉菜单命令
const handleCommand = async (command: string) => {
  switch (command) {
    case 'profile':
      ElMessage.info('个人信息功能开发中...');
      break;
    case 'settings':
      ElMessage.info('设置功能开发中...');
      break;
    case 'logout':
      try {
        await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        });

        authStore.logout();
        ElMessage.success('已退出登录');
        router.push('/user/login');
      } catch {
        // 用户取消
      }
      break;
  }
};
</script>

<style scoped lang="scss">
@charset "UTF-8";

@use '../../assets/styles/base/_variables.scss' as variables;

.header-container {
  display: flex;
  height: 80px;
  padding: 10px 20px;
  background-color: variables.$header-color;
  align-items: center;
  justify-content: space-between;
}

.header-right {
  .user-info {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 6px;
    transition: background-color 0.2s;

    &:hover {
      background-color: rgb(0 0 0 / 5%);
    }

    .username {
      font-size: 14px;
      color: #333;
      font-weight: 500;
    }
  }
}
</style>