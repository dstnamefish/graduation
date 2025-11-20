<!-- 表格头部，包含表格大小、刷新、全屏、列设置、其他设置 -->
<template>
  <div
    class="flex-cb max-md:block!"
    id="zen-table-header"
  >
    <div class="left">
      <!-- 搜索栏组件 -->
      <ZenSearchBar
        v-if="searchConfig"
        v-model="searchFormData"
        v-bind="searchConfig"
        @search="handleSearch"
      />

      <slot name="left"></slot>
    </div>

    <div class="right">
      <!-- 列设置 -->
      <ElPopover
        v-if="shouldShow('columns')"
        placement="bottom"
        trigger="click"
      >
        <template #reference>
          <div class="btn">00</div>
        </template>
        <div>
          <VueDraggable
            v-model="columns"
            :disabled="false"
            filter=".fixed-column"
            :preventOnFilter="false"
          >
            <div
              v-for="item in columns"
              :key="item.prop || item.type"
              class="column-option"
              :class="{ 'fixed-column': item.fixed }"
            >
              <div
                class="drag-icon"
                :class="{ disabled: item.fixed }"
              >
                <i class="iconfont-sys">{{ item.fixed ? '&#xe648;' : '&#xe648;' }}</i>
              </div>
              <ElCheckbox
                v-model="item.checked"
                :disabled="item.disabled"
              >
                {{ item.label || (item.type === 'selection' ? t('table.selection') : '') }}
              </ElCheckbox>
            </div>
          </VueDraggable>
        </div>
      </ElPopover>

      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { TableSizeEnum } from '@/enums/formEnum';
import { useTableStore } from '@/store/modules/table';
import { ElPopover } from 'element-plus';
import { VueDraggable } from 'vue-draggable-plus';
import { useI18n } from 'vue-i18n';
import ZenSearchBar from '@/components/core/forms/zen-search-bar/index.vue';
import type { ColumnOption } from '@/types/component';
import type { SearchFormItem } from '@/components/core/forms/zen-search-bar/index.vue';

defineOptions({ name: 'ZenTableHeader' });

const { t } = useI18n();

interface SearchBarConfig {
  items: SearchFormItem[];
  span?: number;
  gutter?: number;
  labelPosition?: 'left' | 'right'| 'top';
  labelWidth?: string | number;
  buttonLeftLimit?: number;
  showSearch?: boolean;
  disabledSearch?: boolean;
}

interface Props {
  showZebra?: boolean;
  showBorder?: boolean;
  showHeaderBackground?: boolean;
  fullClass?: string;
  layout?: string;
  loading?: boolean;
  showSearchBar?: boolean;
  tableSize?: TableSizeEnum;
  isZebra?: boolean;
  isBorder?: boolean;
  isHeaderBackground?: boolean;
  searchConfig?: SearchBarConfig;
}

const props = withDefaults(defineProps<Props>(), {
  fullClass: 'art-page-view',
  isBorder: undefined,
  isHeaderBackground: undefined,
  isZebra: undefined,
  layout: 'search,size,columns,settings',
  searchConfig: undefined,
  showBorder: true,
  showHeaderBackground: true,
  showSearchBar: undefined,
  showZebra: true,
  tableSize: undefined,
});

const columns = defineModel<ColumnOption[]>('columns', {
  default: () => [],
  required: false,
});

const emit = defineEmits<{
  (e: 'search'): void;
  (e: 'update:showSearchBar', value: boolean): void;
  (e: 'search-data', data: Record<string, any>): void;
}>();

/** 表格大小选项配置 */
const tableSizeOptions = [
  { label: t('table.sizeOptions.small'), value: TableSizeEnum.SMALL },
  { label: t('table.sizeOptions.default'), value: TableSizeEnum.DEFAULT },
  { label: t('table.sizeOptions.large'), value: TableSizeEnum.LARGE },
];

/**
 * 获取表格大小对应的标签文本
 * @returns 表格大小标签
 */
const getTableSizeLabel = () => {
  const currentSize = props.tableSize ?? tableSize.value;
  const option = tableSizeOptions.find((item) => item.value === currentSize);
  return option ? option.label : '';
};

const tableStore = useTableStore();
const { tableSize } = storeToRefs(tableStore);

/** 解析 layout 属性，转换为数组 */
const layoutItems = computed(() => {
  return props.layout.split(',').map((item) => item.trim());
});

/**
 * 检查组件是否应该显示
 * @param componentName 组件名称
 * @returns 是否显示
 */
const shouldShow = (componentName: string) => {
  return layoutItems.value.includes(componentName);
};

/** 搜索表单数据 */
const searchFormData = ref<Record<string, any>>({});

/** 搜索事件处理 */
const search = () => {
  // 切换搜索栏显示状态
  emit('update:showSearchBar', !props.showSearchBar);
  emit('search');
};

/** 处理搜索栏搜索事件 */
const handleSearch = () => {
  emit('search-data', searchFormData.value);
  emit('search');
};


/**
 * 组件挂载时，如果父组件传入了相关配置，则更新store
 */
onMounted(() => {
  if (props.tableSize) {
    useTableStore().setTableSize(props.tableSize);
  }
  if (props.isZebra !== undefined) {
    tableStore.setIsZebra(props.isZebra);
  }
  if (props.isBorder !== undefined) {
    tableStore.setIsBorder(props.isBorder);
  }
  if (props.isHeaderBackground !== undefined) {
    tableStore.setIsHeaderBackground(props.isHeaderBackground);
  }
});

/**
 * 监听props.tableSize变化，实时更新store
 */
watch(
  () => props.tableSize,
  (newSize) => {
    if (newSize) {
      useTableStore().setTableSize(newSize);
    }
  },
  { immediate: false },
);

/**
 * 监听表格样式属性变化，实时更新store
 */
watch(
  () => props.isZebra,
  (newValue) => {
    if (newValue !== undefined) {
      tableStore.setIsZebra(newValue);
    }
  },
  { immediate: false },
);

watch(
  () => props.isBorder,
  (newValue) => {
    if (newValue !== undefined) {
      tableStore.setIsBorder(newValue);
    }
  },
  { immediate: false },
);

watch(
  () => props.isHeaderBackground,
  (newValue) => {
    if (newValue !== undefined) {
      tableStore.setIsHeaderBackground(newValue);
    }
  },
  { immediate: false },
);

</script>

<style scoped >
@reference '@styles/core/tailwind.css';
</style>