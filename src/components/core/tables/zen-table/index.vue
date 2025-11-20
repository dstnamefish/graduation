<!-- 表格组件 -->
<template>
  <div class="zen-table" :class="{ 'is-empty': isEmpty }" :style="containerHeight">
    <ElTable
      ref="elTableRef"
      v-loading="!!loading"
      v-bind="{ ...$attrs, ...props, height, stripe, border, size, headerCellStyle }"
    >
      <template v-for="col in columns" :key="col.prop || col.type">
        <!-- 渲染普通列 -->
        <ElTableColumn v-bind="cleanColumnProps(col)">
          <template v-if="col.useHeaderSlot && col.prop" #header="headerScope">
            <slot :name="col.headerSlotName || `${col.prop}-header`" v-bind="{ ...headerScope, prop: col.prop, label: col.label }">
              {{ col.label }}
            </slot>
          </template>
          <template v-if="col.useSlot && col.prop" #default="slotScope">
            <slot
              :name="col.slotName || col.prop"
              v-bind="{ ...slotScope, prop: col.prop, value: col.prop ? slotScope.row[col.prop] : undefined,}"
            />
          </template>
        </ElTableColumn>
      </template>

      <template
        v-if="$slots.default"
        #default
      >
        <slot />
      </template>

      <!-- 空数据模板 -->
      <template #empty>
        <div v-if="loading"></div>
        <ElEmpty
          v-else
          :description="emptyText"
          :imageSize="120"
        />
      </template>
    </ElTable>

    <!-- 分页器 -->
    <div
      class="pagination custom-pagination"
      v-if="showPagination"
      :class="mergedPaginationOptions?.align"
      ref="paginationRef"
    >
      <ElPagination
        v-bind="mergedPaginationOptions"
        :total="pagination?.total"
        :disabled="loading"
        :pageSize="pagination?.size"
        :currentPage="pagination?.current"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import { ElPagination, ElTable, ElTableColumn, ElEmpty, type TableProps } from 'element-plus';
import { storeToRefs } from 'pinia';
import { ColumnOption } from '@/types';
import { useTableStore } from '@/store/modules/table';
import { useCommon } from '@/hooks/index';
import { useTableHeight } from '@/hooks/core/useTableHeight';
import { useResizeObserver, useWindowSize } from '@vueuse/core';

defineOptions({ name: 'ZenTable' });

const { width } = useWindowSize();
const elTableRef = ref<InstanceType<typeof ElTable> | null>(null);
const tableHeaderRef = ref<HTMLElement>();
const paginationRef = ref<HTMLElement>();
const tableStore = useTableStore();
const { isHeaderBackground, isZebra, tableSize } = storeToRefs(tableStore);

/**
 * @description 分页配置接口
 * @property {number} current 当前页码
 * @property {number} size 每页条数
 * @property {number} total 总条数
 */
interface PaginationConfig {
  current: number;
  size: number;
  total: number;
}

/**
 * @description 分页器配置选项接口
 * @property {number[]} pageSizes 每页条数选项
 * @property {'left' | 'center' | 'right'} align 分页组件对齐方式
 * @property {string} layout 分页组件布局
 * @property {boolean} background 是否显示背景
 * @property {boolean} hideOnSinglePage 是否在只有一页时隐藏分页组件
 * @property {'small' | 'default' | 'large'} size 分页组件尺寸
 * @property {number} pagerCount 分页组件显示页码数量
 */
interface PaginationOptions {
  pageSizes?: number[];
  align?: 'left' | 'center' | 'right';
  layout?: string;
  background?: boolean;
  hideOnSinglePage?: boolean;
  size?: 'small' | 'default' | 'large';
  pagerCount?: number;
}

interface ZenTableProps extends TableProps<Record<string, any>> {
  loading?: boolean;
  columns?: ColumnOption[];
  pagination?: PaginationConfig;
  paginationOptions?: PaginationOptions;
  emptyHeight?: string;
  emptyText?: string;
  showTableHeader?: boolean;
}

const props = withDefaults(defineProps<ZenTableProps>(), {
  border: undefined,
  columns: () => [],
  emptyHeight: '100%',
  emptyText: '暂无数据',
  fit: true,
  showHeader: true,
  showTableHeader: true,
  size: undefined,
  stripe: undefined,
});

const LAYOUT = {
  DESKTOP: 'total, prev, pager, next, sizes, jumper',
  IPAD: 'prev, pager, next, jumper, total',
  MOBILE: 'prev, pager, next, sizes, jumper, total',
};

const layout = computed(() => {
  if (width.value < 768) {
    return LAYOUT.MOBILE;
  } else if (width.value < 1024) {
    return LAYOUT.IPAD;
  } else {
    return LAYOUT.DESKTOP;
  }
});

// 默认分页常量
const DEFAULT_PAGINATION_OPTIONS: PaginationOptions = {
  align: 'center',
  background: true,
  hideOnSinglePage: false,
  layout: layout.value,
  pagerCount: width.value > 1200 ? 7 : 5,
  pageSizes: [10, 20, 30, 50, 100],
  size: 'default',
};

// 合并分页配置
const mergedPaginationOptions = computed(() => ({
  ...DEFAULT_PAGINATION_OPTIONS,
  ...props.paginationOptions,
}));

// 斑马纹
const stripe = computed(() => props.stripe ?? isZebra.value);

// 表格尺寸
const size = computed(() => props.size ?? tableSize.value);

// 数据是否为空
const isEmpty = computed(() => props.data?.length === 0);

// 动态计算表格头部高度
const paginationHeight = ref(0);
const tableHeaderHeight = ref(0);

// 使用 useResizeObserver 监听分页器高度变化
useResizeObserver(paginationRef, (entries) => {
  const entry = entries[0];
  if (entry) {
    // 使用 requestAnimationFrame 避免 ResizeObserver loop 警告
    requestAnimationFrame(() => {
      paginationHeight.value = entry.contentRect.height;
    });
  }
});

// 使用 useResizeObserver 监听表格头部高度变化
useResizeObserver(tableHeaderRef, (entries) => {
  const entry = entries[0];
  if (entry) {
    // 使用 requestAnimationFrame 避免 ResizeObserver loop 警告
    requestAnimationFrame(() => {
      tableHeaderHeight.value = entry.contentRect.height;
    });
  }
});

// 分页器与表格之间的间距常量（计算属性，响应 showTableHeader 变化）
const PAGINATION_SPACING = computed(() => (props.showTableHeader ? 6 : 15));

// 使用表格高度计算 Hook
const { containerHeight } = useTableHeight({
  paginationHeight,
  paginationSpacing: PAGINATION_SPACING,
  showTableHeader: computed(() => props.showTableHeader),
  tableHeaderHeight,
});

// 表格高度逻辑
const height = computed(() => {
  // 空数据且非加载状态时固定高度
  if (isEmpty.value && !props.loading) {return props.emptyHeight;}

  // 使用传入的高度
  if (props.height) {return props.height;}

  // 默认占满容器高度
  return '100%';
});

// 表头背景颜色样式
const headerCellStyle = computed(() => ({
  background: isHeaderBackground.value
    ? 'var(--el-fill-color-lighter)'
    : 'var(--default-box-color)',
  ...(props.headerCellStyle || {}),
}));

// 是否显示分页器
const showPagination = computed(() => props.pagination && !isEmpty.value);

// 清理列属性，移除插槽相关的自定义属性，确保它们不会被 ElTableColumn 错误解释
const cleanColumnProps = (col: ColumnOption) => {
  const columnProps = { ...col };

  // 删除自定义的插槽控制属性
  delete columnProps.useHeaderSlot;
  delete columnProps.headerSlotName;
  delete columnProps.useSlot;
  delete columnProps.slotName;
  return columnProps;
};

// 分页大小变化
const handleSizeChange = (val: number) => {
  emit('pagination:size-change', val);
};

// 分页当前页变化
const handleCurrentChange = (val: number) => {
  emit('pagination:current-change', val);
  scrollToTop(); // 页码改变后滚动到表格顶部
};

const { scrollToTop: scrollPageToTop } = useCommon();

// 滚动表格内容到顶部，并可以联动页面滚动到顶部
const scrollToTop = () => {
  nextTick(() => {
    elTableRef.value?.setScrollTop(0); // 滚动 ElTable 内部滚动条到顶部
    scrollPageToTop(); // 调用公共 composable 滚动页面到顶部
  });
};

const emit = defineEmits<{
    (e: 'pagination:size-change', val: number): void
    (e: 'pagination:current-change', val: number): void
  }>();

// 查找并绑定表格头部元素 - 使用 VueUse 优化
const findTableHeader = () => {
  if (!props.showTableHeader) {
    tableHeaderRef.value = undefined;
    return;
  }

  const tableHeader = document.getElementById('zen-table-header');
  if (tableHeader) {
    tableHeaderRef.value = tableHeader;
  } else {
    // 如果找不到表格头部，设置为 undefined，useElementSize 会返回 0
    tableHeaderRef.value = undefined;
  }
};

watchEffect(
  () => {
    // 访问响应式数据以建立依赖追踪
    void props.data?.length; // 追踪数据变化
    const shouldShow = props.showTableHeader;

    // 只有在需要显示表格头部时才查找
    if (shouldShow) {
      nextTick(() => {
        findTableHeader();
      });
    } else {
      // 不显示时清空引用
      tableHeaderRef.value = undefined;
    }
  },
  { flush: 'post' },
);

defineExpose({
  elTableRef,
  scrollToTop,
});
</script>
<style lang="scss" scoped>
@forward './style.scss'
</style>