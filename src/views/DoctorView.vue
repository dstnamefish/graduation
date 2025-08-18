<template>
  <div class="doctor-management-container">
    <div class="page-header">
      <h2>医生管理</h2>
      <div class="search-bar">
        <ElInput
          v-model="searchQuery"
          placeholder="搜索医生姓名或ID"
          prefix-icon="Search"
          class="search-input"
        />
        <ElButton type="primary" @click="searchDoctors">搜索</ElButton>
        <ElButton type="default" @click="resetSearch">重置</ElButton>
      </div>
    </div>

    <div class="filter-section">
      <ElSelect v-model="departmentFilter" placeholder="选择科室" class="filter-select">
        <ElOption label="全部" value="all" />
        <ElOption v-for="dept in departments" :key="dept.id" :label="dept.name" :value="dept.id" />
      </ElSelect>
      <ElButton type="primary" @click="openAddDoctorDialog">新增医生</ElButton>
    </div>

    <div class="doctor-table-container">
      <ElTable :data="doctorsData" style="width: 100%">
        <ElTableColumn prop="id" label="医生ID" width="80" />
        <ElTableColumn prop="name" label="姓名" width="120" />
        <ElTableColumn prop="gender" label="性别" width="80" />
        <ElTableColumn prop="age" label="年龄" width="80" />
        <ElTableColumn prop="department" label="科室" width="120" />
        <ElTableColumn prop="title" label="职称" width="120" />
        <ElTableColumn prop="expertise" label="专长" width="180" />
        <ElTableColumn prop="phone" label="手机号" width="150" />
        <ElTableColumn label="操作" width="150" fixed="right">
          <template #default="scope">
            <ElButton type="primary" size="small" @click="viewDoctorDetails(scope.row)">详情</ElButton>
            <ElButton type="success" size="small" @click="editDoctor(scope.row)">编辑</ElButton>
            <ElButton type="danger" size="small" @click="deleteDoctor(scope.row.id)">删除</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </div>

    <div class="pagination-container">
      <ElPagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalDoctors"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 新增/编辑医生对话框 -->
    <ElDialog v-model="showDoctorDialog" :title="isEditing ? '编辑医生' : '新增医生'" width="50%">
      <ElForm :model="doctorForm" :rules="doctorRules" ref="doctorFormRef">
        <ElFormItem label="姓名" prop="name">
          <ElInput v-model="doctorForm.name" placeholder="请输入医生姓名" />
        </ElFormItem>
        <ElFormItem label="性别" prop="gender">
          <ElSelect v-model="doctorForm.gender" placeholder="请选择性别">
            <ElOption label="男" value="男" />
            <ElOption label="女" value="女" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="年龄" prop="age">
          <ElInput v-model.number="doctorForm.age" type="number" placeholder="请输入年龄" />
        </ElFormItem>
        <ElFormItem label="科室" prop="departmentId">
          <ElSelect v-model="doctorForm.departmentId" placeholder="请选择科室">
            <ElOption v-for="dept in departments" :key="dept.id" :label="dept.name" :value="dept.id" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="职称" prop="title">
          <ElInput v-model="doctorForm.title" placeholder="请输入职称" />
        </ElFormItem>
        <ElFormItem label="专长" prop="expertise">
          <ElInput v-model="doctorForm.expertise" placeholder="请输入专长" />
        </ElFormItem>
        <ElFormItem label="手机号" prop="phone">
          <ElInput v-model="doctorForm.phone" placeholder="请输入手机号" />
        </ElFormItem>
        <ElFormItem label="简介" prop="introduction">
          <ElInput
            v-model="doctorForm.introduction"
            type="textarea"
            placeholder="请输入医生简介"
            :rows="4"
          />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <ElButton @click="showDoctorDialog = false">取消</ElButton>
        <ElButton type="primary" @click="saveDoctor">确定</ElButton>
      </template>
    </ElDialog>

    <!-- 医生详情对话框 -->
    <ElDialog v-model="showDoctorDetailDialog" title="医生详情" width="60%">
      <div v-if="selectedDoctor" class="doctor-detail-card">
        <div class="detail-header">
          <div class="avatar-container">
            <img :src="selectedDoctor.avatar || '/default-avatar.png'" alt="医生头像" class="avatar">
          </div>
          <div class="header-info">
            <h3>{{ selectedDoctor.name }} <span class="age-gender">{{ selectedDoctor.age }}岁 {{ selectedDoctor.gender }}</span></h3>
            <p class="title">{{ selectedDoctor.title }} - {{ selectedDoctor.department }}</p>
          </div>
        </div>
        <div class="detail-body">
          <div class="detail-item">
            <span class="label">医生ID:</span>
            <span class="value">{{ selectedDoctor.id }}</span>
          </div>
          <div class="detail-item">
            <span class="label">手机号:</span>
            <span class="value">{{ selectedDoctor.phone }}</span>
          </div>
          <div class="detail-item">
            <span class="label">专长:</span>
            <span class="value">{{ selectedDoctor.expertise }}</span>
          </div>
          <div class="detail-item full-width">
            <span class="label">简介:</span>
            <span class="value">{{ selectedDoctor.introduction }}</span>
          </div>
          <div class="detail-item full-width">
            <span class="label">出诊时间:</span>
            <div class="schedule-container">
              <div v-for="(schedule, index) in selectedDoctor.schedule" :key="index" class="schedule-item">
                {{ schedule.day }}: {{ schedule.startTime }} - {{ schedule.endTime }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <ElButton @click="showDoctorDetailDialog = false">关闭</ElButton>
      </template>
    </ElDialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { ElTable, ElTableColumn, ElInput, ElButton, ElSelect, ElOption, ElPagination, ElDialog, ElForm, ElFormItem, ElMessage } from 'element-plus';
// 暂时注释掉API导入，因为相关模块尚未实现
// import { doctorAPI, departmentAPI } from '@/services';

// 模拟API调用
const doctorAPI = {
  getDoctors: async () => ({ data: { items: [], total: 0 } }),
  createDoctor: async () => ({}),
  updateDoctor: async () => ({}),
  deleteDoctor: async () => ({})
};

const departmentAPI = {
  getDepartments: async () => ({ data: [] })
};
import type { Doctor } from '@/types/components/doctor';
import type { Department } from '@/types/components/department';

// 搜索和过滤参数
const searchQuery = ref('');
const departmentFilter = ref('all');
const currentPage = ref(1);
const pageSize = ref(10);
const totalDoctors = ref(0);

// 数据列表
const doctorsData = ref<Doctor[]>([]);
const departments = ref<Department[]>([]);

// 对话框状态
const showDoctorDialog = ref(false);
const showDoctorDetailDialog = ref(false);
const isEditing = ref(false);
const selectedDoctor = ref<Doctor | null>(null);

// 表单数据和规则
const doctorForm = reactive<Partial<Doctor>>({
  name: '',
  gender: '',
  age: 0,
  departmentId: '',
  title: '',
  expertise: '',
  phone: '',
  introduction: ''
});

const doctorRules = ref<Record<string, any>>({
  name: [{ required: true, message: '请输入医生姓名', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', min: 25, max: 70, message: '年龄必须在25-70之间', trigger: 'blur' }
  ],
  departmentId: [{ required: true, message: '请选择科室', trigger: 'change' }],
  title: [{ required: true, message: '请输入职称', trigger: 'blur' }],
  expertise: [{ required: true, message: '请输入专长', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
  ]
});

const doctorFormRef = ref<InstanceType<typeof ElForm>>();

// 生命周期钩子
onMounted(() => {
  fetchDoctors();
  fetchDepartments();
});

// 获取医生列表
const fetchDoctors = async () => {
  try {
    const params = {
      page: currentPage.value,
      pageSize: pageSize.value,
      keyword: searchQuery.value,
      departmentId: departmentFilter.value !== 'all' ? departmentFilter.value : undefined
    };

    const response = await doctorAPI.getDoctors(params);
    doctorsData.value = response.data.items;
    totalDoctors.value = response.data.total;
  } catch (error: any) {
    ElMessage.error(error.message || '获取医生列表失败');
  }
};

// 获取科室列表
const fetchDepartments = async () => {
  try {
    const response = await departmentAPI.getDepartments();
    departments.value = response.data;
  } catch (error: any) {
    ElMessage.error(error.message || '获取科室列表失败');
  }
};

// 搜索医生
const searchDoctors = () => {
  currentPage.value = 1;
  fetchDoctors();
};

// 重置搜索
const resetSearch = () => {
  searchQuery.value = '';
  departmentFilter.value = 'all';
  currentPage.value = 1;
  fetchDoctors();
};

// 分页处理
const handleSizeChange = (size: number) => {
  pageSize.value = size;
  fetchDoctors();
};

const handleCurrentChange = (current: number) => {
  currentPage.value = current;
  fetchDoctors();
};

// 打开新增医生对话框
const openAddDoctorDialog = () => {
  isEditing.value = false;
  Object.keys(doctorForm).forEach(key => {
    doctorForm[key as keyof typeof doctorForm] = '';
  });
  showDoctorDialog.value = true;
};

// 编辑医生
const editDoctor = (doctor: Doctor) => {
  isEditing.value = true;
  Object.assign(doctorForm, doctor);
  showDoctorDialog.value = true;
};

// 查看医生详情
const viewDoctorDetails = (doctor: Doctor) => {
  selectedDoctor.value = doctor;
  showDoctorDetailDialog.value = true;
};

// 保存医生信息
const saveDoctor = () => {
  doctorFormRef.value?.validate(async (valid) => {
    if (valid) {
      try {
        if (isEditing.value && doctorForm.id) {
          await doctorAPI.updateDoctor(doctorForm.id, doctorForm);
          ElMessage.success('医生信息更新成功');
        } else {
          await doctorAPI.createDoctor(doctorForm);
          ElMessage.success('医生添加成功');
        }
        showDoctorDialog.value = false;
        fetchDoctors();
      } catch (error: any) {
        ElMessage.error(error.message || '保存医生信息失败');
      }
    }
  });
};

// 删除医生
const deleteDoctor = async (id: string) => {
  try {
    await doctorAPI.deleteDoctor(id);
    ElMessage.success('医生删除成功');
    fetchDoctors();
  } catch (error: any) {
    ElMessage.error(error.message || '删除医生失败');
  }
};
</script>

<style scoped lang="scss">
.doctor-management-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  gap: 10px;
}

.search-input {
  width: 300px;
}

.filter-section {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  align-items: center;
}

.filter-select {
  width: 180px;
}

.doctor-table-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-bottom: 20px;
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
}

.doctor-detail-card {
  padding: 20px;
}

.detail-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.avatar-container {
  margin-right: 20px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f0f0f0;
}

.header-info {
  flex: 1;
}

.age-gender {
  font-size: 14px;
  color: #666;
  margin-left: 10px;
}

.title {
  color: #666;
  margin-top: 5px;
}

.detail-body {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.detail-item {
  display: flex;
  margin-bottom: 10px;
}

.full-width {
  grid-column: 1 / -1;
}

.label {
  width: 100px;
  color: #666;
  font-weight: bold;
}

.value {
  flex: 1;
}

.schedule-container {
  flex: 1;
}

.schedule-item {
  margin-bottom: 5px;
  padding: 5px;
  background-color: #f9f9f9;
  border-radius: 4px;
}
</style>