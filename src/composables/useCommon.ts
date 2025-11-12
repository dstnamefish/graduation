import { useMenuStore } from '@/store/modules/menu';
import { useSettingStore } from '@/store/modules/setting';

// 通用函数
export function useCommon() {
  const settingStore = useSettingStore();

  // 是否是前端控制模式
  const isFrontendMode = computed(() => {
    return import.meta.env.VITE_ACCESS_MODE === 'frontend';
  });

  // 首页路径
  const homePath = computed(() => useMenuStore().getHomePath());

  // 刷新页面
  const refresh = () => {
    settingStore.reload();
  };

  // 回到顶部
  const scrollToTop = () => {
    const scrollContainer = document.getElementById('app-main');
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  };

  // 页面最小高度
  const containerMinHeight = computed(() => {
    // 移除了与标签页相关的高度计算
    return 'calc(100vh - 60px)';
  });

  // 设置容器高度CSS变量
  const setContainerHeightCssVar = () => {
    const height = containerMinHeight.value;
    document.documentElement.style.setProperty('--art-full-height', height);
  };

  // 监听容器高度变化并更新CSS变量
  watchEffect(() => {
    setContainerHeightCssVar();
  });

  return {
    containerMinHeight,
    homePath,
    isFrontendMode,
    refresh,
    scrollToTop,
    setContainerHeightCssVar,
  };
}