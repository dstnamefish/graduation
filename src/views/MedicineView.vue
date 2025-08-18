<template>
  <div class="medicine-management-container">
    <div class="page-header">
      <h2>药品管理</h2>
      <div class="search-bar">
        <ElInput
          v-model="searchQuery"
          placeholder="搜索药品名称或ID"
          prefix-icon="Search"
          class="search-input"
        />
        <ElButton type="primary" @click="searchMedicines">搜索</ElButton>
        <ElButton type="default" @click="resetSearch">重置</ElButton>
      </div>
    </div>

    <div class="filter-section">
      <ElSelect v-model="categoryFilter" placeholder="选择药品分类" class="filter-select">
        <ElOption label="全部" value="all" />
        <ElOption v-for="category in categories" :key="category.id" :label="category.name" :value="category.id" />
      </ElSelect>
      <ElButton type="primary" @click="openAddMedicineDialog">新增药品</ElButton>
    </div>

    <div class="medicine-table-container">
      <ElTable :data="medicinesData" style="width: 100%">
        <ElTableColumn prop="id" label="药品ID" width="80" />
        <ElTableColumn prop="name" label="药品名称" width="150" />
        <ElTableColumn prop="category" label="分类" width="120" />
        <ElTableColumn prop="specification" label="规格" width="150" />
        <ElTableColumn prop="unit" label="单位" width="80" />
        <ElTableColumn prop="price" label="价格(元)" width="100" />
        <ElTableColumn prop="stock" label="库存" width="100" />
        <ElTableColumn prop="status" label="状态" width="100" />
        <ElTableColumn label="操作" width="150" fixed="right">
          <template #default="scope">
            <ElButton type="primary" size="small" @click="viewMedicineDetails(scope.row)">详情</ElButton>
            <ElButton type="success" size="small" @click="editMedicine(scope.row)">编辑</ElButton>
            <ElButton type="danger" size="small" @click="deleteMedicine(scope.row.id)">删除</ElButton>
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
        :total="totalMedicines"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 新增/编辑药品对话框 -->
    <ElDialog v-model="showMedicineDialog" :title="isEditing ? '编辑药品' : '新增药品'" width="50%">
      <ElForm :model="medicineForm" :rules="medicineRules" ref="medicineFormRef">
        <ElFormItem label="药品名称" prop="name">
          <ElInput v-model="medicineForm.name" placeholder="请输入药品名称" />
        </ElFormItem>
        <ElFormItem label="药品分类" prop="categoryId">
          <ElSelect v-model="medicineForm.categoryId" placeholder="请选择药品分类">
            <ElOption v-for="category in categories" :key="category.id" :label="category.name" :value="category.id" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="规格" prop="specification">
          <ElInput v-model="medicineForm.specification" placeholder="请输入药品规格" />
        </ElFormItem>
        <ElFormItem label="单位" prop="unit">
          <ElInput v-model="medicineForm.unit" placeholder="请输入药品单位" />
        </ElFormItem>
        <ElFormItem label="价格" prop="price">
          <ElInput v-model.number="medicineForm.price" type="number" placeholder="请输入药品价格" />
        </ElFormItem>
        <ElFormItem label="库存" prop="stock">
          <ElInput v-model.number="medicineForm.stock" type="number" placeholder="请输入药品库存" />
        </ElFormItem>
        <ElFormItem label="状态" prop="status">
          <ElSelect v-model="medicineForm.status" placeholder="请选择药品状态">
            <ElOption label="正常" value="normal" />
            <ElOption label="缺货" value="outOfStock" />
            <ElOption label="禁用" value="disabled" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="描述" prop="description">
          <ElInput
            v-model="medicineForm.description"
            type="textarea"
            placeholder="请输入药品描述"
            :rows="4"
          />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <ElButton @click="showMedicineDialog = false">取消</ElButton>
        <ElButton type="primary" @click="saveMedicine">确定</ElButton>
      </template>
    </ElDialog>

    <!-- 药品详情对话框 -->
    <ElDialog v-model="showMedicineDetailDialog" title="药品详情" width="60%">
      <div v-if="selectedMedicine" class="medicine-detail-card">
        <div class="detail-header">
          <h3>{{ selectedMedicine.name }}</h3>
          <p>药品ID: {{ selectedMedicine.id }}</p>
        </div>
        <div class="detail-body">
          <div class="detail-item">
            <span class="label">药品分类:</span>
            <span class="value">{{ selectedMedicine.category }}</span>
          </div>
          <div class="detail-item">
            <span class="label">规格:</span>
            <span class="value">{{ selectedMedicine.specification }}</span>
          </div>
          <div class="detail-item">
            <span class="label">单位:</span>
            <span class="value">{{ selectedMedicine.unit }}</span>
          </div>
          <div class="detail-item">
            <span class="label">价格:</span>
            <span class="value">{{ selectedMedicine.price }} 元</span>
          </div>
          <div class="detail-item">
            <span class="label">库存:</span>
            <span class="value">{{ selectedMedicine.stock }}</span>
          </div>
          <div class="detail-item">
            <span class="label">状态:</span>
            <span class="value">{{ selectedMedicine.status }}</span>
          </div>
          <div class="detail-item full-width">
            <span class="label">描述:</span>
            <span class="value">{{ selectedMedicine.description }}</span>
          </div>
          <div class="detail-item full-width">
            <span class="label">用法用量:</span>
            <span class="value">{{ selectedMedicine.usage }}</span>
          </div>
        </div>
      </div>
      <template #footer>
        <ElButton @click="showMedicineDetailDialog = false">关闭</ElButton>
      </template>
    </ElDialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { ElTable, ElTableColumn, ElInput, ElButton, ElSelect, ElOption, ElPagination, ElDialog, ElForm, ElFormItem, ElMessage } from 'element-plus';
import { medicineAPI } from '@/services';
import type { Medicine, MedicineCategory } from '@/types/components';

// 搜索和过滤参数
const searchQuery = ref('');
const categoryFilter = ref('all');
const currentPage = ref(1);
const pageSize = ref(10);
const totalMedicines = ref(0);

// 数据列表
const medicinesData = ref<Medicine[]>([]);
const categories = ref<MedicineCategory[]>([]);

// 对话框状态
const showMedicineDialog = ref(false);
const showMedicineDetailDialog = ref(false);
const isEditing = ref(false);
const selectedMedicine = ref<Medicine | null>(null);

// 表单数据和规则
const medicineForm = reactive<Partial<Medicine>>({
  name: '',
  categoryId: '',
  specification: '',
  unit: '',
  price: 0,
  stock: 0,
  status: 'normal',
  description: '',
  usage: ''
});

const medicineRules = ref<Record<string, any>>({
  name: [{ required: true, message: '请输入药品名称', trigger: 'blur' }],
  categoryId: [{ required: true, message: '请选择药品分类', trigger: 'change' }],
  specification: [{ required: true, message: '请输入药品规格', trigger: 'blur' }],
  unit: [{ required: true, message: '请输入药品单位', trigger: 'blur' }],
  price: [
    { required: true, message: '请输入药品价格', trigger: 'blur' },
    { type: 'number', min: 0, message: '价格不能为负数', trigger: 'blur' }
  ],
  stock: [
    { required: true, message: '请输入药品库存', trigger: 'blur' },
    { type: 'number', min: 0, message: '库存不能为负数', trigger: 'blur' }
  ],
  status: [{ required: true, message: '请选择药品状态', trigger: 'change' }]
});

const medicineFormRef = ref<InstanceType<typeof ElForm>>();

// 生命周期钩子
onMounted(() => {
  fetchMedicines();
  fetchCategories();
});

// 获取药品列表
const fetchMedicines = async () => {
  try {
    const params = {
      page: currentPage.value,
      pageSize: pageSize.value,
      keyword: searchQuery.value,
      categoryId: categoryFilter.value !== 'all' ? categoryFilter.value : undefined
    };

    const response = await medicineAPI.getMedicines(params);
    medicinesData.value = response.data.items;
    totalMedicines.value = response.data.total;
  } catch (error: any) {
    ElMessage.error(error.message || '获取药品列表失败');
  }
};

// 获取药品分类
const fetchCategories = async () => {
  try {
    const response = await medicineAPI.getCategories();
    categories.value = response.data;
  } catch (error: any) {
    ElMessage.error(error.message || '获取药品分类失败');
  }
};

// 搜索药品
const searchMedicines = () => {
  currentPage.value = 1;
  fetchMedicines();
};

// 重置搜索
const resetSearch = () => {
  searchQuery.value = '';
  categoryFilter.value = 'all';
  currentPage.value = 1;
  fetchMedicines();
};

// 分页处理
const handleSizeChange = (size: number) => {
  pageSize.value = size;
  fetchMedicines();
};

const handleCurrentChange = (current: number) => {
  currentPage.value = current;
  fetchMedicines();
};

// 打开新增药品对话框
const openAddMedicineDialog = () => {
  isEditing.value = false;
  Object.keys(medicineForm).forEach(key => {
    medicineForm[key as keyof typeof medicineForm] = '';
  });
  medicineForm.price = 0;
  medicineForm.stock = 0;
  medicineForm.status = 'normal';
  showMedicineDialog.value = true;
};

// 编辑药品
const editMedicine = (medicine: Medicine) => {
  isEditing.value = true;
  Object.assign(medicineForm, medicine);
  showMedicineDialog.value = true;
};

// 查看药品详情
const viewMedicineDetails = async (medicine: Medicine) => {
  try {
    // 获取药品详情
    const response = await medicineAPI.getMedicineDetail(medicine.id);
    selectedMedicine.value = response.data;
    showMedicineDetailDialog.value = true;
  } catch (error: any) {
    ElMessage.error(error.message || '获取药品详情失败');
  }
};

// 保存药品信息
const saveMedicine = () => {
  medicineFormRef.value?.validate(async (valid) => {
    if (valid) {
      try {
        if (isEditing.value && medicineForm.id) {
          await medicineAPI.updateMedicine(medicineForm.id, medicineForm);
          ElMessage.success('药品信息更新成功');
        } else {
          await medicineAPI.createMedicine(medicineForm);
          ElMessage.success('药品添加成功');
        }
        showMedicineDialog.value = false;
        fetchMedicines();
      } catch (error: any) {
        ElMessage.error(error.message || '保存药品信息失败');
      }
    }
  });
};

// 删除药品
const deleteMedicine = async (id: string) => {
  try {
    await medicineAPI.deleteMedicine(id);
    ElMessage.success('药品删除成功');
    fetchMedicines();
  } catch (error: any) {
    ElMessage.error(error.message || '删除药品失败');
  }
};
</script>

<style scoped lang="scss">
.medicine-management-container {
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

.medicine-table-container {
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

.medicine-detail-card {
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
</style>