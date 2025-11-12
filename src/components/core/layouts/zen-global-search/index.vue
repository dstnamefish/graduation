<!-- 全局搜索组件 -->
<template>
  <div class="global-search">
    <ElInput
      v-model.trim="searchValue"
      :placeholder="$t('common.placeholder')"
      @input="search"
      @blur="searchBlur"
      @focus="openDropdown"
      ref="searchInput"
      :class="{ 'global-search--active': showDropdown }"
    />
    <Transition name="dropdown">
      <div
        v-show="showDropdown"
        class="search-dropdown"
      ></div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { router } from '@/router';
import { AppRouteRecord } from '@/types';
import { createSmartDebounce } from '@/utils/table/tableUtils';

/**
 * TODO: 表格搜索组件
 * 需要实现的逻辑
 * 1. 输入框输入内容后，触发搜索事件
 * 2. 点击搜索按钮，触发搜索事件 支持键盘的回车和删除触发搜索事件
 * 3. 输入框有内容时，点击删除按钮，清空输入框内容
 *
 * 需要实现的特性
 * 1. 全局快捷键 Ctrl+K
 * 2. 智能搜索
 * 3. 键盘导航：
 *    - 按下方向键上，聚焦到上一个搜索结果
 *    - 按下方向键下，聚焦到下一个搜索结果
 *    - 按下回车，选择当前聚焦的搜索结果
 * 4. 防抖处理
 * 5. 可扩展
 * 6. 响应式设计
 * 7. 无障碍支持
 *
 * UI特效
 * 1. 悬停hover 背景颜色变化 鼠标指针变化
 * 2. 激活active 输入框向右移动 且弹出下拉列表 下拉列表显示历史记录，历史记录为标签卡 清空按钮 收起（显示和隐藏）
 * 3. 输入时，下方列表改为搜索结果，当输入结果为空时，显示之前输入的前一值的输入结果
 * 4. 鼠标移出输入框时和下拉列表时，鼠标指针变化且鼠标点击时，下拉列表收起，此时输入框改为激活，不显示下拉列表
 * 5. 搜索条数为固定值 默认为{{number}}条
 * 6. 针对ELementPlus的二次开发
 * 7. 中文输入时，需要输入完成才触发搜索事件 英文搜索时，输入就触发搜索事件
 */

defineOptions({ name: 'ZenGlobalSearch' });

// 历史记录最大的长度限制
const HISTORY_MAX_LENGTH = 10;

/**
 * state
 * 定义搜索组件的状态
 * @property {boolean} showDropdown - 是否显示下拉列表
 * @property {string} searchValue - 当前输入框中的搜索值
 * @property {SearchResult[]} searchResult - 用户输入是触发搜索事件后，返回的搜索结果数组
 * @property {AppRouteRecord[]} historyResult - 搜索历史记录数组
 * @property {HTMLInputElement | null} searchInput - 搜索输入框的引用
 * @property {boolean} isKeyboardNavigating - 是否通过键盘导航选择搜索结果
 * @property {number} hoverIndex - 当前鼠标悬停的搜索结果索引
 * @property {number} keyboardIndex - 当前键盘导航的搜索结果索引
 */
const showDropdown = ref(false);
const searchInput = ref<HTMLInputElement | null>(null);
const isKeyboardNavigating = ref(false);
const hoverIndex = ref(-1);
const keyboardIndex = ref(-1);
const searchValue = ref('');

// 数据存储
const searchResult = ref<AppRouteRecord[]>([]);
const historyResult = ref<AppRouteRecord[]>([]);

const { locale, t } = useI18n();
onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  // 移除全局键盘事件监听器
  document.removeEventListener('keydown', handleKeydown);
});

const handleKeydown = (event: KeyboardEvent) => {
  const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
  const isCommandKey = isMac ? event.metaKey : event.ctrlKey;

  if (isCommandKey && event.key.toLowerCase() == 'k') {
    event.preventDefault();
    showDropdown.value = true;
    focusInput();
  }

  // 搜索下拉框打开时,键盘操作
  if (showDropdown.value) {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      highlightPrevious();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      highlightNext();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      selectHighlighted();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      showDropdown.value = false;
    }
  }
};

const focusInput = () => {
  setTimeout(() => {
    searchInput.value?.focus();
  }, 100);
};

const highlightPrevious = () => {
  const list = searchValue.value ? searchResult.value : historyResult.value;
  if (keyboardIndex.value === -1) {
    // 从无高亮状态直接跳到最后一项
    keyboardIndex.value = list.length - 1;
  } else {
    keyboardIndex.value = keyboardIndex.value - 1;
    if (keyboardIndex.value < 0) {
      // 到达第一个项目后再按上箭头，变成无高亮状态
      keyboardIndex.value = -1;
    }
  }
};

const highlightNext = () => {
  const list = searchValue.value ? searchResult.value : historyResult.value;
  if (keyboardIndex.value === -1) {
    // 从无高亮状态直接跳到第一项
    keyboardIndex.value = 0;
  } else {
    keyboardIndex.value = keyboardIndex.value + 1;
    if (keyboardIndex.value >= list.length) {
      // 到达最后一个项目后再按下箭头，变成无高亮状态
      keyboardIndex.value = -1;
    }
  }
};

const selectHighlighted = () => {
  if (searchValue.value && searchResult.value.length && keyboardIndex.value >= 0) {
    searchGoPage(searchResult.value[keyboardIndex.value]);
  }
};

const searchGoPage = (item: AppRouteRecord) => {
  showDropdown.value = false;
  addHistory(item);
  router.push(item.path);
  searchValue.value = '';
  searchResult.value = [];
};

const updateHistory = () => {
  if (Array.isArray(historyResult.value)) {
    userStore.setSearchHistory(historyResult.value);
  }
};

const addHistory = (item: AppRouteRecord) => {
  const hasItemIndex = historyResult.value.findIndex(
    (historyItem: AppRouteRecord) => historyItem.path === item.path,
  );

  if (hasItemIndex !== -1) {
    historyResult.value.splice(hasItemIndex, 1);
  } else if (historyResult.value.length >= HISTORY_MAX_LENGTH) {
    historyResult.value.pop();
  }

  const cleanedItem = { ...item };
  delete cleanedItem.children;
  delete cleanedItem.meta.authList;
  historyResult.value.unshift(cleanedItem);
  updateHistory();
};

// TODO: 添加一键删除历史标签卡功能
const deleteHistory = (index: number) => {
  historyResult.value.splice(index, 1);
  updateHistory();
};

const openDropdown = () => {
  showDropdown.value = true;
  focusInput();
};

const closeDropdown = () => {
  searchValue.value = '';
  searchResult.value = [];
  showDropdown.value = false;
  keyboardIndex.value = -1;
};

/**
 * search 搜索
 * @param value 搜索值
 * 当搜索时，value 存在则显示搜索结果，否则显示输入值前一个搜索结果
 */
const search = (value: string) => {};

const searchBlur = () => {
  setTimeout(() => {
    closeDropdown();
  }, 200);
};
</script>

<style lang="scss" scoped>
@forward './style.scss';
</style>