import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

import { StorageConfig } from '@/utils/storage';

import type { App } from 'vue';

export const store = createPinia();

// 配置持久化插件
store.use(
  createPersistedState({
    key: (storeId: string) => {
      const key = StorageConfig.generateStorageKey(storeId);
      return key;
    },
    serializer: {
      deserialize: JSON.parse,
      serialize: JSON.stringify,
    },
    storage: localStorage,
  }),
);

/**
 * 初始化 Store
 */
export function initStore(app: App<Element>): void {
  app.use(store);
}