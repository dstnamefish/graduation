<template>
  <div class="container">
    <div class="header"></div>
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
          <tr v-for="appointment in appointments" :key="appointment.id">
            <td>{{ appointment.id }}</td>
            <td>
              <span :class="['status', getStatusClass(appointment.status)]">
                {{ appointment.status }}
              </span>
            </td>
            <td>{{ appointment.name }}</td>
            <td>{{ appointment.department }}</td>
            <td>{{ appointment.doctor }}</td>
            <td>{{ appointment.updateTime }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Appointment {
  id: string;
  status: string;
  name: string;
  department: string;
  doctor: string;
  updateTime: string;
}

const appointments: Appointment[] = [
  {
    id: '4720898',
    status: '待看诊',
    name: '锤宇',
    department: '妇一科',
    doctor: '李强',
    updateTime: '2021-12-18 13:54:12',
  },
  {
    id: '2932942',
    status: '待看诊',
    name: '潘小志',
    department: '妇一科',
    doctor: '程雷',
    updateTime: '2021-12-18 13:54:12',
  },
  {
    id: '8580212',
    status: '待看诊',
    name: '段永平',
    department: '妇一科',
    doctor: '李慧',
    updateTime: '2021-12-18 13:54:12',
  },
  {
    id: '4773636',
    status: '看诊中',
    name: '雷诗诗',
    department: '妇一科',
    doctor: '薛力鑫',
    updateTime: '2021-12-18 13:54:12',
  },
  {
    id: '8745137',
    status: '已看诊',
    name: '罗文',
    department: '妇一科',
    doctor: '杨小梁',
    updateTime: '2021-12-18 13:54:12',
  },
  {
    id: '2653166',
    status: '已看诊',
    name: '徐慧',
    department: '妇一科',
    doctor: '李子宣',
    updateTime: '2021-12-18 13:54:12',
  },
];

const getStatusClass = (status: string): string => {
  switch (status) {
    case '待看诊':
      return 'pending';
    case '看诊中':
      return 'in-progress';
    case '已看诊':
      return 'completed';
    default:
      return '';
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 780px;
  background: #fff;
  border-radius: 12px;
}

.header {
  height: 82px;
  border-bottom: 2px solid #f5f7ff;
}

.appointment-list {
  padding: 18px 30px;

  table {
    width: 100%;
    height: 19px;
    border-collapse: collapse;

    th,
    td {
      padding: 6px;
      text-align: center;
      font-size: 18px;
    }

    th {
      color: #333;
      background: #f4f7fc;
      font-weight: normal;
    }

    td {
      border-bottom: 1px solid #eee;
    }
  }
}

.appointment-list thead th {
  height: 60px;
  font-size: 18px;
  font-family: 400;
}

.status {
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  font-size: 18px;

  &.pending {
    color: #ff9e49;

    &::before {
      content: '●';
      margin-right: 4px;
    }
  }

  &.in-progress {
    color: #00baad;

    &::before {
      content: '●';
      margin-right: 4px;
    }
  }

  &.completed {
    color: #d6d6d6;

    &::before {
      content: '●';
      margin-right: 4px;
    }
  }
}
</style>