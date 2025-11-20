<!-- 顶部栏 -->
<template>
  <div class="w-full bg-amber-200 ">
    <div class="relative flex-b box-border h-[60px] line-height-60">
      <div class="">
        <!-- 面包屑 -->
        <ZenBreadcrumb v-if="showBreadcrumb" />

        <!-- 全局搜索 -->
        <ZenGlobalSearch v-if="showGlobalSearch" />
      </div>

      <div class="right">
        <!-- 通知 -->
        <ZenNotification v-if="showNotification" />

        <!-- 语言 -->
        <ZenLanguage v-if="showLanguage" />

        <!-- 设置 -->
        <ZenSetting v-if="showSettings" />

        <!-- 主题切换 -->
        <!-- 用户信息、菜单 -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { ElMessageBox } from 'element-plus';
import { useWindowSize } from '@vueuse/core';
import { LanguageEnum } from '@/enums/appEnum';
import { useSettingStore } from '@/store/modules/setting';
import { useUserStore } from '@/store/modules/user';
import { useMenuStore } from '@/store/modules/menu';

import { WEB_LINKS } from '@/utils/constants';
import { mittBus } from '@/utils/sys';
import { useHeaderBar } from '@/hooks/core/useHeaderBar';
import { HeaderBarFeatureConfig } from '@/types/config';

defineOptions({ name: 'ZenHeaderBar' });

interface Props {
  config?: Partial<HeaderBarFeatureConfig>;
}

const props = withDefaults(defineProps<Props>(), {
  config: () => ({}),
});

const headerBar = useHeaderBar(props.config);

// 直接使用配置
const { showBreadcrumb, showChat, showGlobalSearch, showLanguage, showNotification, showSettings, showThemeToggle } = headerBar;

// 原有的业务逻辑保持不变
const router = useRouter();
const { locale, t } = useI18n();
const { width } = useWindowSize();

const settingStore = useSettingStore();
const userStore = useUserStore();
const menuStore = useMenuStore();

const { showSettingGuide, systemThemeColor, tabStyle } = storeToRefs(settingStore);
const { getUserInfo: userInfo, language } = storeToRefs(userStore);
const { menuList } = storeToRefs(menuStore);

const showNotice = ref(false);
const notice = ref(null);
const userMenuPopover = ref();

// 检测操作系统类型
const isWindows = navigator.userAgent.includes('Windows');

// 暗色主题状态
const isDark = computed(() => settingStore.theme === 'dark');

onMounted(() => {
  initLanguage();
  document.addEventListener('click', bodyCloseNotice);
});

onUnmounted(() => {
  document.removeEventListener('click', bodyCloseNotice);
});

// 原有的业务方法保持不变
const goPage = (path: string): void => {
  router.push(path);
};

const toDocs = (): void => {
  window.open(WEB_LINKS.DOCS);
};

const toGithub = (): void => {
  window.open(WEB_LINKS.GITHUB);
};

const loginOut = (): void => {
  closeUserMenu();
  setTimeout(() => {
    ElMessageBox.confirm(t('common.logOutTips'), t('common.tips'), {
      cancelButtonText: t('common.cancel'),
      confirmButtonText: t('common.confirm'),
      customClass: 'login-out-dialog',
    }).then(() => {
      userStore.logOut();
    });
  }, 200);
};

const initLanguage = (): void => {
  locale.value = language.value;
};

const changeLanguage = (lang: LanguageEnum): void => {
  if (locale.value === lang) {
    return;
  }
  locale.value = lang;
  userStore.setLanguage(lang);
};

const openSetting = (): void => {
  mittBus.emit('openSetting');
  if (showSettingGuide.value) {
    settingStore.hideSettingGuide();
  }
};

const bodyCloseNotice = (e: any): void => {
  let { className } = e.target;
  if (showNotice.value) {
    if (typeof className === 'object') {
      showNotice.value = false;
      return;
    }
    if (className.indexOf('notice-btn') === -1) {
      showNotice.value = false;
    }
  }
};

const visibleNotice = (): void => {
  showNotice.value = !showNotice.value;
};

const emitEvent = (eventName: string): void => {
  mittBus.emit(eventName);
};

const lockScreen = () => emitEvent('openLockScreen');

const closeUserMenu = (): void => {
  setTimeout(() => {
    userMenuPopover.value.hide();
  }, 100);
};
</script>