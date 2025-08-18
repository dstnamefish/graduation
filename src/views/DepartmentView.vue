<template>
  <div class="department-management-container">
    <div class="page-header">
      <h2>科室管理</h2>
      <div class="search-bar">
        <ElInput
          v-model="searchQuery"
          placeholder="搜索科室名称或ID"
          prefix-icon="Search"
          class="search-input"
        />
        <ElButton type="primary" @click="searchDepartments">搜索</ElButton>
        <ElButton type="default" @click="resetSearch">重置</ElButton>
      </div>
    </div>

    <div class="action-section">
      <ElButton type="primary" @click="openAddDepartmentDialog">新增科室</ElButton>
    </div>

    <div class="department-table-container">
      <ElTable :data="departmentsData" style="width: 100%">
        <ElTableColumn prop="id" label="科室ID" width="80" />
        <ElTableColumn prop="name" label="科室名称" width="150" />
        <ElTableColumn prop="description" label="科室描述" width="300" />
        <ElTableColumn prop="doctorCount" label="医生数量" width="100" />
        <ElTableColumn prop="patientCount" label="患者数量" width="100" />
        <ElTableColumn label="操作" width="150" fixed="right">
          <template #default="scope">
            <ElButton type="primary" size="small" @click="viewDepartmentDetails(scope.row)">详情</ElButton>
            <ElButton type="success" size="small" @click="editDepartment(scope.row)">编辑</ElButton>
            <ElButton type="danger" size="small" @click="deleteDepartment(scope.row.id)">删除</ElButton>
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
        :total="totalDepartments"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 新增/编辑科室对话框 -->
    <ElDialog v-model="showDepartmentDialog" :title="isEditing ? '编辑科室' : '新增科室'" width="50%">
      <ElForm :model="departmentForm" :rules="departmentRules" ref="departmentFormRef">
        <ElFormItem label="科室名称" prop="name">
          <ElInput v-model="departmentForm.name" placeholder="请输入科室名称" />
        </ElFormItem>
        <ElFormItem label="科室描述" prop="description">
          <ElInput
            v-model="departmentForm.description"
            type="textarea"
            placeholder="请输入科室描述"
            :rows="4"
          />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <ElButton @click="showDepartmentDialog = false">取消</ElButton>
        <ElButton type="primary" @click="saveDepartment">确定</ElButton>
      </template>
    </ElDialog>

    <!-- 科室详情对话框 -->
    <ElDialog v-model="showDepartmentDetailDialog" title="科室详情" width="60%">
      <div v-if="selectedDepartment" class="department-detail-card">
        <div class="detail-header">
          <h3>{{ selectedDepartment.name }}</h3>
          <p>科室ID: {{ selectedDepartment.id }}</p>
        </div>
        <div class="detail-body">
          <div class="detail-item full-width">
            <span class="label">科室描述:</span>
            <span class="value">{{ selectedDepartment.description }}</span>
          </div>
          <div class="detail-item">
            <span class="label">医生数量:</span>
            <span class="value">{{ selectedDepartment.doctorCount }}</span>
          </div>
          <div class="detail-item">
            <span class="label">患者数量:</span>
            <span class="value">{{ selectedDepartment.patientCount }}</span>
          </div>
          <div class="detail-item full-width">
            <span class="label">科室医生:</span>
            <div class="doctors-container">
              <div v-for="(doctor, index) in selectedDepartment.doctors" :key="index" class="doctor-item">
                {{ doctor.name }} ({{ doctor.title }})
              </div>
              <div v-if="!selectedDepartment.doctors || selectedDepartment.doctors.length === 0" class="no-data">
                暂无医生信息
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <ElButton @click="showDepartmentDetailDialog = false">关闭</ElButton>
      </template>
    </ElDialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { ElTable, ElTableColumn, ElInput, ElButton, ElPagination, ElDialog, ElForm, ElFormItem, ElMessage } from 'element-plus';
import { departmentAPI } from '@/services';
import type { Department, Doctor } from '@/types/components';

// 搜索参数
const searchQuery = ref('');
const currentPage = ref(1);
const pageSize = ref(10);
const totalDepartments = ref(0);

// 数据列表
const departmentsData = ref<Department[]>([]);

// 对话框状态
const showDepartmentDialog = ref(false);
const showDepartmentDetailDialog = ref(false);
const isEditing = ref(false);
const selectedDepartment = ref<(Department & { doctors?: Doctor[] }) | null>(null);

// 表单数据和规则
const departmentForm = reactive<Partial<Department>>({
  name: '',
  description: ''
});

const departmentRules = ref<Record<string, any>>({
  name: [{ required: true, message: '请输入科室名称', trigger: 'blur' }],
  description: [{ required: true, message: '请输入科室描述', trigger: 'blur' }]
});

const departmentFormRef = ref<InstanceType<typeof ElForm>>();

// 生命周期钩子
onMounted(() => {
  fetchDepartments();
});

// 获取科室列表
const fetchDepartments = async () => {
  try {
    const params = {
      page: currentPage.value,
      pageSize: pageSize.value,
      keyword: searchQuery.value
    };

    const response = await departmentAPI.getDepartments(params);
    departmentsData.value = response.data.items;
    totalDepartments.value = response.data.total;
  } catch (error: any) {
    ElMessage.error(error.message || '获取科室列表失败');
  }
};

// 搜索科室
const searchDepartments = () => {
  currentPage.value = 1;
  fetchDepartments();
};

// 重置搜索
const resetSearch = () => {
  searchQuery.value = '';
  currentPage.value = 1;
  fetchDepartments();
};

// 分页处理
const handleSizeChange = (size: number) => {
  pageSize.value = size;
  fetchDepartments();
};

const handleCurrentChange = (current: number) => {
  currentPage.value = current;
  fetchDepartments();
};

// 打开新增科室对话框
const openAddDepartmentDialog = () => {
  isEditing.value = false;
  Object.keys(departmentForm).forEach(key => {
    departmentForm[key as keyof typeof departmentForm] = '';
  });
  showDepartmentDialog.value = true;
};

// 编辑科室
const editDepartment = (department: Department) => {
  isEditing.value = true;
  Object.assign(departmentForm, department);
  showDepartmentDialog.value = true;
};

// 查看科室详情
const viewDepartmentDetails = async (department: Department) => {
  try {
    // 获取科室详情，包括医生列表
    const response = await departmentAPI.getDepartmentDetail(department.id);
    selectedDepartment.value = response.data;
    showDepartmentDetailDialog.value = true;
  } catch (error: any) {
    ElMessage.error(error.message || '获取科室详情失败');
  }
};

// 保存科室信息
const saveDepartment = () => {
  departmentFormRef.value?.validate(async (valid) => {
    if (valid) {
      try {
        if (isEditing.value && departmentForm.id) {
          await departmentAPI.updateDepartment(departmentForm.id, departmentForm);
          ElMessage.success('科室信息更新成功');
        } else {
          await departmentAPI.createDepartment(departmentForm);
          ElMessage.success('科室添加成功');
        }
        showDepartmentDialog.value = false;
        fetchDepartments();
      } catch (error: any) {
        ElMessage.error(error.message || '保存科室信息失败');
      }
    }
  });
};

// 删除科室
const deleteDepartment = async (id: string) => {
  try {
    await departmentAPI.deleteDepartment(id);
    ElMessage.success('科室删除成功');
    fetchDepartments();
  } catch (error: any) {
    ElMessage.error(error.message || '删除科室失败');
  }
};
</script>

<style scoped lang="scss">
.department-management-container {
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

.action-section {
  margin-bottom: 20px;
}

.department-table-container {
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

.department-detail-card {
  padding: 20px;
}

.detail-header {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
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

.doctors-container {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.doctor-item {
  padding: 5px 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
  display: inline-block;
}

.no-data {
  color: #999;
  font-style: italic;
}
</style>