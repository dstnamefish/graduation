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
      :class="`menu-left-${getMenuTheme.theme}`"
      :style="{ background: getMenuTheme.background, width: getMenuOpenWidth }"
    >
      <ElScrollbar>
        <div
          class="header"
          @click="navigateToHome"
          :style="{ background: getMenuTheme.background }"
        >
          <ZenLogo class="logo" />
          <p
            :style="{
              color: getMenuTheme.systemNameColor,
              opacity: 1,
            }"
          >
            {{ AppConfig.systemInfo.name }}
          </p>
        </div>

        <ElMenu
          :class="'el-menu-' + getMenuTheme.theme"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCommon } from '@/composables/useCommon';
import AppConfig from '@/config';
import { MenuTypeEnum } from '@/enums/appEnum';
import { useMenuStore } from '@/store/modules/menu';
import { useSettingStore } from '@/store/modules/setting';
import { isIframe } from '@/utils/navigation';

import SidebarSubmenu from './widget/SidebarSubmenu.vue';

defineOptions({ name: 'ZenSidebarMenu' });

const route = useRoute();
const router = useRouter();
const settingStore = useSettingStore();

const { getMenuOpenWidth, getMenuTheme, menuType, uniqueOpened } = storeToRefs(settingStore);

// 组件内部状态
const defaultOpenedMenus = ref<string[]>([]);
const isMobileMode = ref(false);
const currentScreenWidth = ref(0);

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
 * 处理菜单关闭（来自子组件）
 */
const handleMenuClose = (): void => {
  // 移除菜单关闭逻辑，保持侧边栏始终打开
};

/**
 * 设置窗口大小监听器
 */
const setupWindowResizeListener = (): void => {
  currentScreenWidth.value = document.body.clientWidth;

  window.onresize = () => {
    currentScreenWidth.value = document.body.clientWidth;
  };
};

onMounted(() => {
  setupWindowResizeListener();
});
</script>

<style lang="scss">
@forward './style.scss';
</style>

<style lang="scss">
@use './theme.scss';

.layout-sidebar {
  /* SVG图标样式 - 确保统一大小 */
  .menu-icon.svg-icon {
    display: inline-block;

    /* 确保图标容器具有固定大小 */
    flex-shrink: 0;
    width: 20px; /* 增加图标大小以提高可见性 */
    height: 20px;
    margin-right: 10px;
    vertical-align: middle;

    /* 确保SVG图标可以被着色 */
    fill: currentcolor;

    /* 确保所有图标内容都适应容器 */
    object-fit: contain;
  }

  /* 确保在ElMenuItem和ElSubMenu中的图标也应用统一样式 */
  .el-menu-item,
  .el-submenu__title {
    .menu-icon.svg-icon {
      width: 20px;
      height: 20px;
    }
  }

  /* 确保移动端视图下图标大小依然统一 */
  .is-mobile {
    .menu-icon.svg-icon {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
