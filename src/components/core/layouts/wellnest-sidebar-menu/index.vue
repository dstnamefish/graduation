<!-- 左侧菜单 -->
<template>
  <div
    class="layout-sidebar"
    v-if="showLeftMenu"
    :class="{ 'no-border': menuList.length === 0 }"
  >
    <!-- 左侧菜单 -->
    <div
      v-show="menuList.length > 0"
      class="menu-left"
      :class="`menu-left-${getMenuTheme.theme} menu-left-${!menuOpen ? 'close' : 'open'}`"
      :style="{ background: getMenuTheme.background }"
    >
      <ElScrollbar >
        <div
          class="header"
          @click="navigateToHome"
          :style="{ background: getMenuTheme.background }"
        >
          <p
            :style="{
              color: getMenuTheme.systemNameColor,
              opacity: !menuOpen ? 0 : 1
            }"
          >
            {{ AppConfig.systemInfo.name }}
          </p>
        </div>

        <ElMenu
          :class="'el-menu-' + getMenuTheme.theme"
          :collapse="!menuOpen"
          :defaultActive="routerPath"
          :textColor="getMenuTheme.textColor"
          :uniqueOpened="uniqueOpened"
          :backgroundColor="getMenuTheme.background"
          :activeTextColor="getMenuTheme.textActiveColor"
          :defaultOpeneds="defaultOpenedMenus"
          :popperClass="`menu-left-${getMenuTheme.theme}-popper`"
          :showTimeout="50"
          :hideTimeout="50"
        >
          <SidebarSubmenu
            :list="menuList"
            :isMobile="isMobileMode"
            :theme="getMenuTheme"
            :level="0"
            @close="handleMenuClose"
          />
        </ElMenu>
      </ElScrollbar>

      <div
        class="menu-model"
        @click="toggleMenuVisibility"
        :style="{
          opacity: !menuOpen ? 0 : 1,
          transform: showMobileModal ? 'scale(1)' : 'scale(0)'
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCommon } from '@/composables/useCommon';
import AppConfig from '@/config';
import { MenuTypeEnum, MenuWidth } from '@/enums/appEnum';
import { useMenuStore } from '@/store/modules/menu';
import { useSettingStore } from '@/store/modules/setting';
import { isIframe } from '@/utils/navigation';
import { handleMenuJump } from '@/utils/navigation';

import SidebarSubmenu from './widget/SidebarSubmenu.vue';

defineOptions({ name: 'WellNestSidebarMenu' });

const MOBILE_BREAKPOINT = 800;
const ANIMATION_DELAY = 350;
const MENU_CLOSE_WIDTH = MenuWidth.CLOSE;

const route = useRoute();
const router = useRouter();
const settingStore = useSettingStore();

const { getMenuOpenWidth, getMenuTheme, menuOpen, menuType, uniqueOpened } = storeToRefs(settingStore);

// 组件内部状态
const defaultOpenedMenus = ref<string[]>([]);
const isMobileMode = ref(false);
const showMobileModal = ref(false);
const currentScreenWidth = ref(0);

// 菜单宽度相关
const menuopenwidth = computed(() => getMenuOpenWidth.value);
const menuclosewidth = computed(() => MENU_CLOSE_WIDTH);

// 菜单类型判断
const showLeftMenu = computed(
  () => menuType.value === MenuTypeEnum.LEFT || menuType.value === MenuTypeEnum.TOP_LEFT,
);

// 路由相关
const routerPath = computed(() => String(route.meta.activePath || route.path));

// 菜单数据
const menuList = computed(() => {
  const menuStore = useMenuStore();
  const allMenus = menuStore.menuList;

  // 处理 iframe 路径
  if (isIframe(route.path)) {
    return findIframeMenuList(route.path, allMenus);
  }

  return allMenus;
});

/**
   * 检查是否为移动端屏幕
   */
const isMobileScreen = (): boolean => {
  return document.body.clientWidth < MOBILE_BREAKPOINT;
};

/**
   * 延迟隐藏移动端模态框
   */
const delayHideMobileModal = (): void => {
  setTimeout(() => {
    showMobileModal.value = false;
  }, ANIMATION_DELAY);
};

/**
   * 查找 iframe 对应的二级菜单列表
   */
const findIframeMenuList = (currentPath: string, menuList: any[]) => {
  // 递归查找包含当前路径的菜单项
  const hasPath = (items: any[]): boolean => {
    for (const item of items) {
      if (item.path === currentPath) {
        return true;
      }
      if (item.children && hasPath(item.children)) {
        return true;
      }
    }
    return false;
  };

  // 遍历一级菜单查找匹配的子菜单
  for (const menu of menuList) {
    if (menu.children && hasPath(menu.children)) {
      return menu.children;
    }
  }
  return [];
};

/**
   * 导航到首页
   */
const navigateToHome = (): void => {
  router.push(useCommon().homePath.value);
};

/**
   * 切换菜单显示/隐藏
   */
const toggleMenuVisibility = (): void => {
  settingStore.setMenuOpen(!menuOpen.value);

  // 移动端模态框控制逻辑
  if (isMobileScreen()) {
    if (!menuOpen.value) {
      // 菜单即将打开，立即显示模态框
      showMobileModal.value = true;
    } else {
      // 菜单即将关闭，延迟隐藏模态框
      delayHideMobileModal();
    }
  }
};

/**
   * 处理菜单关闭（来自子组件）
   */
const handleMenuClose = (): void => {
  if (isMobileScreen()) {
    settingStore.setMenuOpen(false);
    delayHideMobileModal();
  }
};

/**
   * 处理屏幕尺寸变化
   */
const handleScreenResize = (): void => {
  // 小屏幕自动折叠菜单
  if (currentScreenWidth.value < MOBILE_BREAKPOINT) {
    settingStore.setMenuOpen(false);

    // 在小屏幕上，如果菜单关闭则隐藏模态框
    if (!menuOpen.value) {
      showMobileModal.value = false;
    }
  } else {
    // 大屏幕上始终隐藏模态框
    showMobileModal.value = false;
  }
};

/**
   * 设置窗口大小监听器
   */
const setupWindowResizeListener = (): void => {
  currentScreenWidth.value = document.body.clientWidth;
  handleScreenResize();

  window.onresize = () => {
    currentScreenWidth.value = document.body.clientWidth;
    handleScreenResize();
  };
};

/**
   * 监听菜单开关状态变化
   */
watch(
  () => menuOpen.value,
  (isMenuOpen: boolean) => {
    if (!isMobileScreen()) {
      // 大屏幕设备上，模态框始终隐藏
      showMobileModal.value = false;
    } else {
      // 小屏幕设备上，根据菜单状态控制模态框
      if (isMenuOpen) {
        // 菜单打开时立即显示模态框
        showMobileModal.value = true;
      } else {
        // 菜单关闭时延迟隐藏模态框，确保动画完成
        delayHideMobileModal();
      }
    }
  },
);

onMounted(() => {
  setupWindowResizeListener();

  // TODO: 强制设置菜单为开启状态，覆盖本地存储的设置
  settingStore.setMenuOpen(true);
});
</script>

<style lang="scss" >
  @forward './style.scss'
</style>

<style lang="scss">
  @use './theme.scss';

  .layout-sidebar {
    // 展开的宽度
    .el-menu:not(.el-menu--collapse) {
      width: v-bind(menuopenwidth);
    }

    // 折叠后宽度
    .el-menu--collapse {
      width: v-bind(menuclosewidth);
    }
  }
</style>