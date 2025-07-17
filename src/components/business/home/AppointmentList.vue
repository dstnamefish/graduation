<template>
  <div class="appointment-list">
    <table>
      <thead>
        <tr>
          <th>预约编号</th>
          <th>就诊状态</th>
          <th>姓名</th>
          <th>科室</th>
          <th>看诊医生</th>
          <th>最后更新时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.department }}</td>
          <td>{{ item.doctor }}</td>
          <td>{{ item.updatedAt }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const list = [
  {
    id: 'A001',
    status: '待看诊',
    name: '张三',
    department: '内科',
    doctor: '李医生',
    updatedAt: '2024-07-01 09:00',
  },
  {
    id: 'A002',
    status: '看诊中',
    name: '李四',
    department: '外科',
    doctor: '王医生',
    updatedAt: '2024-07-01 09:10',
  },
  {
    id: 'A003',
    status: '已看诊',
    name: '王五',
    department: '儿科',
    doctor: '赵医生',
    updatedAt: '2024-07-01 09:20',
  },
];
</script>

<style scoped>
.appointment-list {
  padding: 24px;
  background: #fff;
  border-radius: 10px;
  width: 78rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px 12px;
  border-bottom: 1px solid #eee;
  text-align: left;
}

th {
  background: #f5f7fa;
}
</style>
