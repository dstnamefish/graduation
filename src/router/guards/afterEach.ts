import NProgress from 'nprogress';
import { Router } from 'vue-router';

import { useCommon } from '@/hooks/core/useCommon';
import { useSettingStore } from '@/store/modules/setting';

/** 路由全局后置守卫 */
export function setupAfterEachGuard(router: Router) {
  const { scrollToTop } = useCommon();

  router.afterEach(() => {
    scrollToTop();
    if (useSettingStore().showNprogress) {NProgress.done();}
  });
}