<template>
  <ElForm :inline="true" class="filter-bar">
    <ElFormItem label="看诊状态:" class="el-form-item">
      <ElSelect v-model="localFilters.status" placeholder="全部" class="el-select">
        <ElOption label="全部" value="" />
        <ElOption label="待看诊" value="pending" />
        <ElOption label="已完成" value="done" />
      </ElSelect>
    </ElFormItem>
    <ElFormItem label="创建时间:">
      <ElDatePicker
        v-model="localFilters.date"
        type="daterange"
        rangeSeparator="至"
        startPlaceholder="开始日期"
        endPlaceholder="结束日期"
        style="width: 220px"
      />
    </ElFormItem>
    <ElFormItem label="科室:">
      <ElSelect v-model="localFilters.department" placeholder="全部" style="width: 100px">
        <ElOption label="全部" value="" />
        <ElOption label="妇产一科" value="妇产一科" />
      </ElSelect>
    </ElFormItem>
    <ElFormItem label="输入姓名:">
      <ElInput v-model="localFilters.name" placeholder="请输入患者/医生姓名" style="width: 180px" />
    </ElFormItem>
    <ElFormItem>
      <ElButton @click="$emit('search')">查询</ElButton>
      <ElButton @click="$emit('reset')">重置</ElButton>
      <ElButton>保存</ElButton>
    </ElFormItem>
  </ElForm>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
const props = defineProps({
  filters: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['update:filters', 'search', 'reset']);

const localFilters = computed({
  get: () => props.filters,
  set: () => emit('update:filters'),
});
</script>

<style lang="scss" scoped>
.filter-bar {
  background: #fff;

  .el-form-item {
    font-size: 18px;
    font-weight: 400;
    color: #383838;

    .el-select {
      width: 117px;
    }
  }
}
</style>