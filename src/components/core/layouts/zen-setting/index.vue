<template>
  <div class="setting" @click="openSetting">
    <SettingIcon class="setting-icon" />
  </div>
</template>

<script setup lang="ts">
import { mittBus } from '@/utils/sys';
import SettingIcon from '@/assets/svg/header-bar/setting.svg';

const openSetting = () => {
  mittBus.emit('openSetting');
};
</script>

<style lang="scss" scoped>
@forward './style.scss';
</style>