import NProgress from 'nprogress';
import { Router } from 'vue-router';

import { useCommon } from '@/composables/useCommon';
import { useSettingStore } from '@/store/modules/setting';

/**
 * 设置路由全局后置守卫
 *
 * 在路由导航完成后执行清理和重置操作，包括：
 * - 滚动页面到顶部
 * - 关闭顶部进度条显示
 * - 执行其他页面切换后的清理工作
 *
 * @param router - Vue Router 实例，用于注册后置守卫
 */
export function setupAfterEachGuard(router: Router): void {
  router.afterEach(() => {
    // 滚动到页面顶部，提供更好的用户体验
    useCommon().scrollToTop();

    // 如果开启了进度条显示，则关闭进度条
    if (useSettingStore().showNprogress) {
      NProgress.done();
    }
  });
}