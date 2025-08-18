<template>
  <div class="medicine-list">
    <div class="medicine-list__header">
      <slot name="header"></slot>
    </div>
    <el-table :data="medicines" style="width: 100%" border>
      <el-table-column prop="name" label="药品名称" width="180" />
      <el-table-column prop="category" label="药品类别" width="120" />
      <el-table-column prop="specification" label="规格" width="180" />
      <el-table-column prop="manufacturer" label="生产厂家" width="180" />
      <el-table-column prop="unit" label="单位" width="80" />
      <el-table-column prop="price" label="价格" width="100" formatter="formatPrice" />
      <el-table-column prop="stock" label="库存" width="100" />
      <el-table-column label="操作" width="150" fixed="right">
        <template #default="{ row }">
          <slot name="actions" :medicine="row"></slot>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="medicines.length === 0" class="medicine-list__empty">
      暂无药品数据
    </div>
  </div>
</template>

<script setup lang="ts">
import { Medicine } from '@/types/components/medicine';

defineProps<{
  medicines: Medicine[];
}>();

// 格式化价格
const formatPrice = (row: Medicine) => {
  return `¥${row.price}`;
};
</script>

<style scoped lang="scss">
.medicine-list {
  &__header {
    margin-bottom: 20px;
  }

  &__empty {
    text-align: center;
    padding: 40px 0;
    color: #999;
  }
}
</style>