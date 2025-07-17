<template>
  <li>
    <div
      class="menu-item"
      :class="{ active: isActive, hasChildren: item.children }"
      @click="handleItemClick"
    >
      <!-- 图标 -->
      <component :is="item.icon" class="menu-icon" />

      <!-- 菜单标签 -->
      <span class="menu-label">{{ item.label }}</span>

      <!-- 存在子菜单时，箭头指示器 -->
      <span v-if="item.children" class="menu-arrow">
        <component v-if="isOpen" :is="DownArrowIcon" class="icon-down" />
        <component v-else :is="RightArrowIcon" class="icon-right" />
      </span>
    </div>

    <!-- 子菜单 -->
    <ul v-if="item.children && isOpen" class="submenu">
      <MenuItems
        v-for="child in item.children"
        :key="child.id"
        :item="child"
        :currentPath="currentPath"
        @menu-click="$emit('menu-click', $event)"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed } from 'vue';

import DownArrowIcon from '../../../assets/icons/common/arrow-down.svg';
import RightArrowIcon from '../../../assets/icons/common/arrow-right.svg';

import type { MenuProps } from '../../../types/components/layout/menu-item';

const props = defineProps<MenuProps>();
const emits = defineEmits(['menu-click']);

// 子菜单展开状态
const isOpen = ref(false);

const hasChildren = computed(() => Boolean(props.item.children));
const isActive = computed(() => props.currentPath === props.item.path);

// 处理菜单项点击
const handleItemClick = () => {
  if (hasChildren.value) {
    isOpen.value = !isOpen.value;
  } else {
    emits('menu-click', props.item.path);
  }
};
</script>

<style lang="scss" scoped>
@charset "UTF-8";

@use '../../../assets/styles/base/_variables.scss' as variables;

.menu-item {
  display: flex;
  padding: 1.5rem 3.9rem 1.9rem 4rem;
  transition: all 0.2s ease;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: variables.$primary-active-color;
  }

  &.active {
    background-color: variables.$primary-active-color;
  }

  .menu-icon {
    font-size: 2rem;
    margin: 0 2rem 0 0;
    text-align: center;
  }

  .menu-label {
    flex: 1;
    font-size: 1.8rem;
  }

  .menu-arrow {
    display: flex;
    transition: transform 0.2s ease;
    align-items: center;
    justify-content: center;

  }
}

.submenu {
  list-style: none;

  .menu-item {
    padding: 1.8rem 3.9rem 1.3rem 8rem;
    font-size: 1.8rem;
    color: variables.$text-color;
    opacity: 0.6;
  }
}
</style>