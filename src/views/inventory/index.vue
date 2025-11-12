<template>
  <div class="inventory">
    <ZenTableHeader
      :columns="columns"
      :searchConfig="searchConfig"
      @search-data="handleSearchData"
      @search="handleSearch"
    />
    <ZenTable
      :columns="columns"
      :data="inventoryData"
      :loading="loading"
      :pagination="pagination"
      @pagination:size-change="handlePaginationSizeChange"
      @pagination:current-change="handlePaginationCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { fetchInventoryTableList, fetchInventoryByItemName } from '@/api/inventory';
import type { InventoryTableDTO, GetInventoryListRequest } from '@/types/api/inventory';
import type { ColumnOption } from '@/types/component';

defineOptions({ name: 'Inventory' });

// 表格列配置
const columns = reactive<ColumnOption[]>([
  { fixed: 'left', label: '物品编码', prop: 'itemCode', width: 120 },
  { label: '物品名称', prop: 'itemName', width: 180 },
  { label: '物品规格', prop: 'specification', width: 150 },
  { label: '单位', prop: 'unit', width: 80 },
  { label: '物理库存', prop: 'qtyInStock', width: 100 },
  { label: '记录库存', prop: 'qtyInRecorder', width: 100 },
  { label: '在途数量', prop: 'inTransitQuantity', width: 100 },
  { label: '已锁定数量', prop: 'lockedQuantity', width: 120 },
  { label: '物品分类', prop: 'category', width: 120 },
  {
    formatter: (row: InventoryTableDTO) => {
      const statusMap = {
        'Available': '可用',
        'Low': '库存低',
        'Out of Recorder': '记录缺货',
        'Out of Stock': '缺货',
      };
      return statusMap[row.availability] || row.availability;
    },
    label: '状态',
    prop: 'availability',
    width: 100,
  },
]);

// 数据状态
const inventoryData = ref<InventoryTableDTO[]>([]);
const loading = ref(false);
const pagination = reactive({
  current: 1,
  size: 10,
  total: 0,
});
const showSearchBar = ref(false);
const searchKeyword = ref('');

// 搜索配置
const searchConfig = reactive({
  gutter: 20,
  items: [
    {
      key: 'itemName',
      label: '物品名称',
      placeholder: '请输入物品名称',
      props: {},
      type: 'input',
    },
    {
      key: 'itemCode',
      label: '物品编码',
      placeholder: '请输入物品编码',
      props: {},
      type: 'input',
    },
    {
      key: 'category',
      label: '物品分类',
      placeholder: '请输入物品分类',
      props: {},
      type: 'input',
    },
  ],
  labelPosition: 'left' as const,
  labelWidth: 100,
  span: 8,
});

// 查询参数
const queryParams = reactive<GetInventoryListRequest>({
  pageNum: pagination.current,
  pageSize: pagination.size,
});

// 加载库存数据
const loadInventoryData = async () => {
  loading.value = true;
  try {
    const response = await fetchInventoryTableList(queryParams);
    inventoryData.value = response.list || [];
    pagination.total = response.total || 0;
    pagination.current = response.pageNum || 1;
    pagination.size = response.pageSize || 10;
  } catch (error) {
    console.error('加载库存数据失败:', error);
  } finally {
    loading.value = false;
  }
};

// 分页大小变化处理
const handlePaginationSizeChange = (newSize: number) => {
  pagination.size = newSize;
  pagination.current = 1; // 重置页码
  queryParams.pageSize = newSize;
  queryParams.pageNum = 1;
  loadInventoryData();
};

// 分页当前页变化处理
const handlePaginationCurrentChange = (newPage: number) => {
  pagination.current = newPage;
  queryParams.pageNum = newPage;
  loadInventoryData();
};

// 搜索数据处理
const handleSearchData = (searchData: Record<string, any>) => {
  // 清空之前的搜索条件
  Object.keys(queryParams).forEach((key) => {
    if (key !== 'pageNum' && key !== 'pageSize') {
      delete queryParams[key];
    }
  });

  // 添加新的搜索条件
  Object.entries(searchData).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      (queryParams as any)[key] = value;
    }
  });

  // 重置页码
  pagination.current = 1;
  queryParams.pageNum = 1;
};

// 搜索处理
const handleSearch = () => {
  loadInventoryData();
};

// 组件挂载时加载数据
onMounted(() => {
  loadInventoryData();
});
</script>

<style scoped lang="scss">
.inventory {
  min-height: 100%;
  padding: 20px;
  background-color: #fff;
}
</style>