<template>
  <div class="query-view">
    <!-- 筛选栏 -->
    <QueryFilterBar
      v-model:filters="filters"
      @search="onSearch"
      @reset="onReset"
      style="margin: 0; padding: 31px 0 0 33px"
    />

    <!-- 卡片列表 -->
    <ElRow :gutter="0" class="card-list">
      <ElCol :span="6" v-for="item in pagedData" :key="item.id" style="padding: 13.5px 12px">
        <div class="patient-card">
          <div class="card-container">
            <div class="avatar">G</div>
            <div class="card-content">
              <div class="card-header">
                <div class="name">{{ item.name }}</div>
                <div class="status" :class="item.statusClass">{{ item.statusText }}</div>
              </div>
              <div class="card-info">
                <div style="margin-bottom: 6px">
                  性别:
                  <b style="margin-right: 24px">{{ item.gender }}</b>
                  年龄:
                  <b>{{ item.age }}</b>
                </div>
                <div style="margin-bottom: 6px">
                  手机号:
                  <b>{{ item.phone }}</b>
                </div>
                <div style="margin-bottom: 6px">
                  科室:
                  <b style="margin-right: 20px">{{ item.department }}</b>
                  医生:
                  <b>{{ item.doctor }}</b>
                </div>
                <div>
                  创建时间:
                  <b>{{ item.createTime }}</b>
                </div>
              </div>
            </div>
          </div>

          <div class="card-actions">
            <ElButton type="primary" size="small" style="border-bottom-left-radius: 10px">
              看诊
            </ElButton>
            <ElButton size="small" plain style="border-bottom-right-radius: 10px">
              查看信息
            </ElButton>
          </div>
        </div>
      </ElCol>
    </ElRow>

    <!-- 分页 -->
    <div class="pagination-bar">
      <ElPagination
        background
        layout="prev, pager, next, jumper, ->, total"
        :total="data.length"
        :pageSize="pageSize"
        v-model:currentPage="currentPage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

import QueryFilterBar from '@/components/ui/QueryFilterBar.vue';

const filters = ref({
  status: '',
  date: [],
  department: '',
  name: '',
});

const data = ref(
  Array.from({ length: 80 }, (_, i) => ({
    id: i + 1,
    name: '高小青',
    gender: '女',
    age: 23,
    phone: '192 4512 8456',
    department: '妇产一科',
    doctor: '夏夏',
    createTime: '2021-12-18 16:12',
    status: 'pending',
    statusText: '待看诊',
    statusClass: 'pending',
  })),
);

const pageSize = 12;
const currentPage = ref(1);

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return data.value.slice(start, start + pageSize);
});

const onSearch = () => {
  // TODO: 实现筛选逻辑
};
const onReset = () => {
  filters.value = { status: '', date: [], department: '', name: '' };
};
</script>

<style lang="scss" scoped>
.card-list {
  background-color: #fff;
  padding: 0 25px;

  .patient-card {
    display: flex;
    background: #fff;
    flex-direction: column;
    justify-content: space-between;
    min-height: 240px;
  }

  .card-container {
    display: flex;
    flex-direction: row;
    gap: 15px;

    .avatar {
      display: flex;
      width: 40px;
      height: 40px;
      margin: 17px 0 0 25px;
      background: #f0f4ff;
      border-radius: 50%;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 18px;
    }
  }

  .card-content {
    flex: 1;
    width: 100%;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 41px 0 12px;
    }

    .name {
      font-weight: bold;
      font-size: 18px;
    }

    .status {
      font-size: 14px;

      &.pending {
        color: #f90;
      }

      &.done {
        color: #67c23a;
      }
    }
  }

  .card-info {
    padding: 12px;
    color: #a6a6a6;
    font-size: 16px;
    font-weight: 400;

    b {
      color: #383838;
      font-weight: 400;
    }
  }

  .card-actions {
    display: flex;

    .el-button {
      width: 50%;
      height: 51px;
      margin: 0;
      border: none;
      border-radius: 0;
      font-weight: 500;
      font-size: 18px;
    }
  }
}

.pagination-bar {
  display: flex;
  flex-direction: flex-start;
  padding: 14px 29px;
  background: #fff;
}
</style>