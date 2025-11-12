import { defineStore } from 'pinia';

/**
 * 全局搜索框状态管理
 * 管理全局搜索框的状态，包括关键词、历史记录等
 */

export const useSearchStore = defineStore(
  'searchStore',
  () => {
  /*   return {}; */
  },
  {
    persist: {
      key: 'search',
      storage: localStorage,
    },
  },
);