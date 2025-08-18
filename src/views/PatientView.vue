<template>
  <div class="patient-management-container">
    <div class="page-header">
      <h2>患者管理</h2>
      <div class="search-bar">
        <ElInput
          v-model="searchQuery"
          placeholder="搜索患者姓名或ID"
          prefix-icon="Search"
          class="search-input"
        />
        <ElButton type="primary" @click="searchPatients">搜索</ElButton>
        <ElButton type="default" @click="resetSearch">重置</ElButton>
      </div>
    </div>

    <div class="filter-section">
      <ElSelect v-model="departmentFilter" placeholder="选择科室" class="filter-select">
        <ElOption v-for="dept in departments" :key="dept.id" :label="dept.name" :value="dept.id" />
      </ElSelect>
      <ElSelect v-model="statusFilter" placeholder="选择状态" class="filter-select">
        <ElOption label="全部" value="all" />
        <ElOption label="已预约" value="appointed" />
        <ElOption label="已就诊" value="treated" />
        <ElOption label="已出院" value="discharged" />
      </ElSelect>
      <ElButton type="primary" @click="openAddPatientDialog">新增患者</ElButton>
    </div>

    <div class="patient-table-container">
      <ElTable :data="patientsData" style="width: 100%">
        <ElTableColumn prop="id" label="患者ID" width="80" />
        <ElTableColumn prop="name" label="姓名" width="120" />
        <ElTableColumn prop="gender" label="性别" width="80" />
        <ElTableColumn prop="age" label="年龄" width="80" />
        <ElTableColumn prop="phone" label="手机号" width="150" />
        <ElTableColumn prop="department" label="科室" width="120" />
        <ElTableColumn prop="doctorName" label="主治医生" width="120" />
        <ElTableColumn prop="status" label="状态" width="100" />
        <ElTableColumn label="操作" width="150" fixed="right">
          <template #default="scope">
            <ElButton type="primary" size="small" @click="viewPatientDetails(scope.row)">详情</ElButton>
            <ElButton type="success" size="small" @click="editPatient(scope.row)">编辑</ElButton>
            <ElButton type="danger" size="small" @click="deletePatient(scope.row.id)">删除</ElButton>
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
        :total="totalPatients"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 新增/编辑患者对话框 -->
    <ElDialog v-model="showPatientDialog" :title="isEditing ? '编辑患者' : '新增患者'" width="50%">
      <ElForm :model="patientForm" :rules="patientRules" ref="patientFormRef">
        <ElFormItem label="姓名" prop="name">
          <ElInput v-model="patientForm.name" placeholder="请输入患者姓名" />
        </ElFormItem>
        <ElFormItem label="性别" prop="gender">
          <ElSelect v-model="patientForm.gender" placeholder="请选择性别">
            <ElOption label="男" value="男" />
            <ElOption label="女" value="女" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="年龄" prop="age">
          <ElInput v-model.number="patientForm.age" type="number" placeholder="请输入年龄" />
        </ElFormItem>
        <ElFormItem label="手机号" prop="phone">
          <ElInput v-model="patientForm.phone" placeholder="请输入手机号" />
        </ElFormItem>
        <ElFormItem label="科室" prop="departmentId">
          <ElSelect v-model="patientForm.departmentId" placeholder="请选择科室">
            <ElOption v-for="dept in departments" :key="dept.id" :label="dept.name" :value="dept.id" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="主治医生" prop="doctorId">
          <ElSelect v-model="patientForm.doctorId" placeholder="请选择医生">
            <ElOption v-for="doctor in doctors" :key="doctor.id" :label="doctor.name" :value="doctor.id" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="状态" prop="status">
          <ElSelect v-model="patientForm.status" placeholder="请选择状态">
            <ElOption label="已预约" value="appointed" />
            <ElOption label="已就诊" value="treated" />
            <ElOption label="已出院" value="discharged" />
          </ElSelect>
        </ElFormItem>
      </ElForm>
      <template #footer>
        <ElButton @click="showPatientDialog = false">取消</ElButton>
        <ElButton type="primary" @click="savePatient">确定</ElButton>
      </template>
    </ElDialog>

    <!-- 患者详情对话框 -->
    <ElDialog v-model="showPatientDetailDialog" title="患者详情" width="60%">
      <div v-if="selectedPatient" class="patient-detail-card">
        <div class="detail-header">
          <h3>{{ selectedPatient.name }} <span class="age-gender">{{ selectedPatient.age }}岁 {{ selectedPatient.gender }}</span></h3>
          <p>患者ID: {{ selectedPatient.id }}</p>
        </div>
        <div class="detail-body">
          <div class="detail-item">
            <span class="label">手机号:</span>
            <span class="value">{{ selectedPatient.phone }}</span>
          </div>
          <div class="detail-item">
            <span class="label">科室:</span>
            <span class="value">{{ selectedPatient.department }}</span>
          </div>
          <div class="detail-item">
            <span class="label">主治医生:</span>
            <span class="value">{{ selectedPatient.doctorName }}</span>
          </div>
          <div class="detail-item">
            <span class="label">状态:</span>
            <span class="value">{{ selectedPatient.status }}</span>
          </div>
          <div class="detail-item">
            <span class="label">就诊日期:</span>
            <span class="value">{{ selectedPatient.visitDate }}</span>
          </div>
          <div class="detail-item">
            <span class="label">诊断结果:</span>
            <span class="value">{{ selectedPatient.diagnosis }}</span>
          </div>
          <div class="detail-item">
            <span class="label">治疗方案:</span>
            <span class="value">{{ selectedPatient.treatmentPlan }}</span>
          </div>
        </div>
      </div>
      <template #footer>
        <ElButton @click="showPatientDetailDialog = false">关闭</ElButton>
      </template>
    </ElDialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { ElTable, ElTableColumn, ElInput, ElButton, ElSelect, ElOption, ElPagination, ElDialog, ElForm, ElFormItem, ElMessage } from 'element-plus';
import { patientAPI, departmentAPI, doctorAPI } from '@/services';
import type { Patient, Department, Doctor } from '@/types/components';
import { formatDate } from '@/utils/date';

// 搜索和过滤参数
const searchQuery = ref('');
const departmentFilter = ref('');
const statusFilter = ref('all');
const currentPage = ref(1);
const pageSize = ref(10);
const totalPatients = ref(0);

// 数据列表
const patientsData = ref<Patient[]>([]);
const departments = ref<Department[]>([]);
const doctors = ref<Doctor[]>([]);

// 对话框状态
const showPatientDialog = ref(false);
const showPatientDetailDialog = ref(false);
const isEditing = ref(false);
const selectedPatient = ref<Patient | null>(null);

// 表单数据和规则
const patientForm = reactive<Partial<Patient>>({
  name: '',
  gender: '',
  age: 0,
  phone: '',
  departmentId: '',
  doctorId: '',
  status: 'appointed'
});

const patientRules = ref<Record<string, any>>({
  name: [{ required: true, message: '请输入患者姓名', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', min: 0, max: 120, message: '年龄必须在0-120之间', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
  ],
  departmentId: [{ required: true, message: '请选择科室', trigger: 'change' }],
  doctorId: [{ required: true, message: '请选择医生', trigger: 'change' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
});

const patientFormRef = ref<InstanceType<typeof ElForm>>();

// 生命周期钩子
onMounted(() => {
  fetchPatients();
  fetchDepartments();
  fetchDoctors();
});

// 获取患者列表
const fetchPatients = async () => {
  try {
    const params = {
      page: currentPage.value,
      pageSize: pageSize.value,
      keyword: searchQuery.value,
      departmentId: departmentFilter.value,
      status: statusFilter.value !== 'all' ? statusFilter.value : undefined
    };

    const response = await patientAPI.getPatients(params);
    patientsData.value = response.data.items;
    totalPatients.value = response.data.total;
  } catch (error: any) {
    ElMessage.error(error.message || '获取患者列表失败');
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

// 获取医生列表
const fetchDoctors = async () => {
  try {
    const response = await doctorAPI.getDoctors();
    doctors.value = response.data;
  } catch (error: any) {
    ElMessage.error(error.message || '获取医生列表失败');
  }
};

// 搜索患者
const searchPatients = () => {
  currentPage.value = 1;
  fetchPatients();
};

// 重置搜索
const resetSearch = () => {
  searchQuery.value = '';
  departmentFilter.value = '';
  statusFilter.value = 'all';
  currentPage.value = 1;
  fetchPatients();
};

// 分页处理
const handleSizeChange = (size: number) => {
  pageSize.value = size;
  fetchPatients();
};

const handleCurrentChange = (current: number) => {
  currentPage.value = current;
  fetchPatients();
};

// 打开新增患者对话框
const openAddPatientDialog = () => {
  isEditing.value = false;
  Object.keys(patientForm).forEach(key => {
    patientForm[key as keyof typeof patientForm] = '';
  });
  patientForm.status = 'appointed';
  showPatientDialog.value = true;
};

// 编辑患者
const editPatient = (patient: Patient) => {
  isEditing.value = true;
  Object.assign(patientForm, patient);
  showPatientDialog.value = true;
};

// 查看患者详情
const viewPatientDetails = (patient: Patient) => {
  selectedPatient.value = patient;
  showPatientDetailDialog.value = true;
};

// 保存患者信息
const savePatient = () => {
  patientFormRef.value?.validate(async (valid) => {
    if (valid) {
      try {
        if (isEditing.value && patientForm.id) {
          await patientAPI.updatePatient(patientForm.id, patientForm);
          ElMessage.success('患者信息更新成功');
        } else {
          await patientAPI.createPatient(patientForm);
          ElMessage.success('患者添加成功');
        }
        showPatientDialog.value = false;
        fetchPatients();
      } catch (error: any) {
        ElMessage.error(error.message || '保存患者信息失败');
      }
    }
  });
};

// 删除患者
const deletePatient = async (id: string) => {
  try {
    await patientAPI.deletePatient(id);
    ElMessage.success('患者删除成功');
    fetchPatients();
  } catch (error: any) {
    ElMessage.error(error.message || '删除患者失败');
  }
};
</script>

<style scoped lang="scss">
.patient-management-container {
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

.patient-table-container {
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

.patient-detail-card {
  padding: 20px;
}

.detail-header {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.age-gender {
  font-size: 14px;
  color: #666;
  margin-left: 10px;
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

.label {
  width: 100px;
  color: #666;
  font-weight: bold;
}

.value {
  flex: 1;
}
</style>