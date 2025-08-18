<template>
  <div class="other-container">
    <div class="other-buttons">
      <button class="other-button" @click="handleLogin('wechat')">
        <component :is="WechatIcon" alt="微信登录" />
      </button>
      <button class="other-button" @click="handleLogin('qq')">
        <component :is="QQIcon" alt="QQ登录" />
      </button>
      <button class="other-button" @click="handleLogin('weibo')">
        <component :is="WeiboIcon" alt="微博登录" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';

import QQIcon from '../../assets/icons/form/qq.svg';
import WechatIcon from '../../assets/icons/form/wechat.svg';
import WeiboIcon from '../../assets/icons/form/weibo.svg';

const emit = defineEmits(['login']);

const handleLogin = (platform: string) => {
  // 添加用户反馈
  console.log(`用户选择${platform}登录`);
  
  // 在实际应用中，这里应该调用相应的API或跳转到登录页面
  // 模拟API调用
  setTimeout(() => {
    alert(`正在使用${platform}登录...`);
    emit('login', platform);
  }, 500);
};
</script>

<style lang="scss" scoped>
@charset "UTF-8";

.other-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .other-buttons {
    display: flex;
    gap: 20px;

    .other-button {
      width: 48px;
      height: 48px;
      padding: 0;
      border: 1px solid #e0e0e0;
      border-radius: 50%;
      background-color: #fff;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
      }

      :deep(svg) {
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>