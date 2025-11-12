<template>
  <!-- 遍历过滤后的菜单项 -->
  <template
    v-for="item in filteredMenuItems"
    :key="item.path"
  >
    <!-- 包含子菜单的项目 -->
    <ElSubMenu
      v-if="hasChildren(item)"
      :index="item.path || item.meta.title"
      :level="level"
    >
      <template #title>
        <!-- 菜单项图标 -->
        <MenuItemIcon
          :icon="item.meta.icon"
          :color="theme?.iconColor"
        />
        <!-- 菜单项名称 -->
        <span class="menu-name">{{ formatMenuTitle(item.meta.title) }}</span>
      </template>

      <!-- 递归渲染子菜单 -->
      <SidebarSubmenu
        :list="item.children"
        :isMobile="isMobile"
        :level="level + 1"
        :theme="theme"
        @close="closeMenu"
      />
    </ElSubMenu>

    <!-- 普通菜单项（无子菜单） -->
    <ElMenuItem
      v-else
      :index="item.path || item.meta.title"
      :levelItem="level + 1"
      @click="goPage(item)"
    >
      <!-- 菜单项图标 -->
      <MenuItemIcon
        :icon="item.meta.icon"
        :color="theme?.iconColor"
      />
      <!-- 固定显示徽章 -->
      <div
        v-show="item.meta.showBadge && level === 0"
        class="wellnest-badge"
      />

      <template #title>
        <!-- 菜单项名称 -->
        <span class="menu-name">{{ formatMenuTitle(item.meta.title) }}</span>
        <!-- 徽章 -->
        <div
          v-if="item.meta.showBadge"
          class="wellnest-badge"
        />
        <!-- 文字徽章 -->
        <div
          v-if="item.meta.showTextBadge"
          class="wellnest-text-badge"
        >
          {{ item.meta.showTextBadge }}
        </div>
      </template>
    </ElMenuItem>
  </template>
</template>

<script setup lang="ts">
import { formatMenuTitle } from '@/router/utils/utils';
import { AppRouteRecord } from '@/types/router';
import { handleMenuJump } from '@/utils/navigation';

defineOptions({ name: 'SidebarSubmenu' });

interface MenuTheme {
  iconColor?: string;
}

interface Props {
  title?: string;
  list?: AppRouteRecord[];
  theme?: MenuTheme;
  isMobile?: boolean;
  level: number;
}

interface Emit {
  (e: 'close'): void;
}

const props = withDefaults(defineProps<Props>(), {
  isMobile: false,
  level: 0,
  list: () => [],
  theme: () => ({}),
  title: '',
});

const emit = defineEmits<Emit>();

/**
 * 筛选出可见的菜单项（过滤掉隐藏的菜单项）
 */
const filteredMenuItems = computed(() => filterRoutes(props.list));

/**
 * 跳转到指定页面
 * @param item 菜单项数据
 */
const goPage = (item: AppRouteRecord) => {
  // 关闭菜单
  closeMenu();

  // 处理菜单跳转
  handleMenuJump(item);
};

const closeMenu = (): void => {
  emit('close');
};

/**
 * 过滤路由菜单项
 * @param items 路由菜单项列表
 * @returns 过滤后的路由菜单项列表
 */
const filterRoutes = (items: AppRouteRecord[]): AppRouteRecord[] => {
  return items
    .filter((item) => {
      // 如果当前项被隐藏，直接过滤掉
      if (item.meta.isHide) {
        return false;
      }

      // 如果有子菜单，递归过滤子菜单
      if (item.children && item.children.length > 0) {
        const filteredChildren = filterRoutes(item.children);
        return filteredChildren.length > 0;
      }

      // 叶子节点且未被隐藏，保留
      return true;
    })
    .map((item) => ({
      ...item,
      children: item.children ? filterRoutes(item.children) : undefined,
    }));
};

/**
 * 判断菜单项是否有子菜单
 * @param item 菜单项数据
 * @returns 是否有子菜单
 */
const hasChildren = (item: AppRouteRecord): boolean => {
  if (!item.children || item.children.length === 0) {
    return false;
  }
  const filterChildren = filterRoutes(item.children);
  return filterChildren.length > 0;
};
</script>

<script lang="ts">

/**
 * 菜单图标组件
 * 用于渲染菜单项的图标
 */
const MenuItemIcon = defineComponent({
  name: 'MenuItemIcon',
  props: {
    /** 图标颜色 */
    color: {
      default: '',
      type: String,
    },

    /** 图标内容或SVG文件名 */
    icon: {
      default: '',
      type: String,
    },
  },
  setup(props) {
    // 判断是否为SVG图标（假设SVG图标不包含HTML标签，而Unicode图标包含）
    const isSvgIcon = computed(() => {
      return (
        props.icon && !props.icon.includes('<') && !props.icon.includes('&#')
      );
    });

    // 使用vite-svg-loader的默认行为，不使用?component后缀
    return () => {
      if (isSvgIcon.value) {
        try {
          // 直接使用img标签加载SVG文件
          return h('img', {
            alt: props.icon,
            class: 'menu-icon svg-icon',
            src: `/src/assets/svg/menu/${props.icon}.svg`,
            style: props.color ? { color: props.color } : undefined,
          });
        } catch (error) {
          console.error(`Failed to load SVG icon: ${props.icon}`, error);

          // 加载失败时回退到原始i标签
          return h('i', {
            class: 'menu-icon iconfont-sys',
            style: props.color ? { color: props.color } : undefined,
          });
        }
      } else {
        // 兼容原有Unicode图标
        return h('i', {
          class: 'menu-icon iconfont-sys',
          innerHTML: props.icon,
          style: props.color ? { color: props.color } : undefined,
        });
      }
    };
  },
});
</script>