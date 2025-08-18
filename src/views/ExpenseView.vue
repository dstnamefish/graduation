<template>
  <div class="expense-management-container">
    <div class="page-header">
      <h2>费用管理</h2>
      <div class="search-bar">
        <ElInput
          v-model="searchQuery"
          placeholder="搜索患者姓名或费用ID"
          prefix-icon="Search"
          class="search-input"
        />
        <ElButton type="primary" @click="searchExpenses">搜索</ElButton>
        <ElButton type="default" @click="resetSearch">重置</ElButton>
      </div>
    </div>

    <div class="filter-section">
      <ElSelect v-model="expenseTypeFilter" placeholder="选择费用类型" class="filter-select">
        <ElOption label="全部" value="all" />
        <ElOption v-for="type in expenseTypes" :key="type.value" :label="type.label" :value="type.value" />
      </ElSelect>
      <ElDatePicker
        v-model="dateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        class="date-picker"
      />
      <ElButton type="primary" @click="openAddExpenseDialog">新增费用</ElButton>
    </div>

    <div class="expense-table-container">
      <ElTable :data="expensesData" style="width: 100%">
        <ElTableColumn prop="id" label="费用ID" width="80" />
        <ElTableColumn prop="patientName" label="患者姓名" width="120" />
        <ElTableColumn prop="patientId" label="患者ID" width="80" />
        <ElTableColumn prop="type" label="费用类型" width="120" />
        <ElTableColumn prop="amount" label="金额(元)" width="100" />
        <ElTableColumn prop="status" label="支付状态" width="100" />
        <ElTableColumn prop="date" label="日期" width="150" />
        <ElTableColumn label="操作" width="150" fixed="right">
          <template #default="scope">
            <ElButton type="primary" size="small" @click="viewExpenseDetails(scope.row)">详情</ElButton>
            <ElButton type="success" size="small" @click="editExpense(scope.row)">编辑</ElButton>
            <ElButton type="danger" size="small" @click="deleteExpense(scope.row.id)">删除</ElButton>
            <ElButton v-if="scope.row.status === 'unpaid'" type="warning" size="small" @click="markAsPaid(scope.row.id)">标记支付</ElButton>
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
        :total="totalExpenses"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 新增/编辑费用对话框 -->
    <ElDialog v-model="showExpenseDialog" :title="isEditing ? '编辑费用' : '新增费用'" width="50%">
      <ElForm :model="expenseForm" :rules="expenseRules" ref="expenseFormRef">
        <ElFormItem label="患者ID" prop="patientId">
          <ElInput v-model="expenseForm.patientId" placeholder="请输入患者ID" />
        </ElFormItem>
        <ElFormItem label="患者姓名" prop="patientName">
          <ElInput v-model="expenseForm.patientName" placeholder="请输入患者姓名" />
        </ElFormItem>
        <ElFormItem label="费用类型" prop="type">
          <ElSelect v-model="expenseForm.type" placeholder="请选择费用类型">
            <ElOption v-for="type in expenseTypes" :key="type.value" :label="type.label" :value="type.value" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="金额" prop="amount">
          <ElInput v-model.number="expenseForm.amount" type="number" placeholder="请输入费用金额" />
        </ElFormItem>
        <ElFormItem label="支付状态" prop="status">
          <ElSelect v-model="expenseForm.status" placeholder="请选择支付状态">
            <ElOption label="未支付" value="unpaid" />
            <ElOption label="已支付" value="paid" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="日期" prop="date">
          <ElDatePicker v-model="expenseForm.date" type="date" placeholder="请选择日期" />
        </ElFormItem>
        <ElFormItem label="描述" prop="description">
          <ElInput
            v-model="expenseForm.description"
            type="textarea"
            placeholder="请输入费用描述"
            :rows="4"
          />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <ElButton @click="showExpenseDialog = false">取消</ElButton>
        <ElButton type="primary" @click="saveExpense">确定</ElButton>
      </template>
    </ElDialog>

    <!-- 费用详情对话框 -->
    <ElDialog v-model="showExpenseDetailDialog" title="费用详情" width="60%">
      <div v-if="selectedExpense" class="expense-detail-card">
        <div class="detail-header">
          <h3>费用详情 #{{ selectedExpense.id }}</h3>
        </div>
        <div class="detail-body">
          <div class="detail-item">
            <span class="label">患者ID:</span>
            <span class="value">{{ selectedExpense.patientId }}</span>
          </div>
          <div class="detail-item">
            <span class="label">患者姓名:</span>
            <span class="value">{{ selectedExpense.patientName }}</span>
          </div>
          <div class="detail-item">
            <span class="label">费用类型:</span>
            <span class="value">{{ selectedExpense.type }}</span>
          </div>
          <div class="detail-item">
            <span class="label">金额:</span>
            <span class="value">{{ selectedExpense.amount }} 元</span>
          </div>
          <div class="detail-item">
            <span class="label">支付状态:</span>
            <span class="value">{{ selectedExpense.status }}</span>
          </div>
          <div class="detail-item">
            <span class="label">日期:</span>
            <span class="value">{{ selectedExpense.date }}</span>
          </div>
          <div class="detail-item full-width">
            <span class="label">描述:</span>
            <span class="value">{{ selectedExpense.description }}</span>
          </div>
          <div v-if="selectedExpense.paymentDetails" class="detail-item full-width">
            <span class="label">支付详情:</span>
            <span class="value">{{ selectedExpense.paymentDetails }}</span>
          </div>
        </div>
      </div>
      <template #footer>
        <ElButton @click="showExpenseDetailDialog = false">关闭</ElButton>
      </template>
    </ElDialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { ElTable, ElTableColumn, ElInput, ElButton, ElSelect, ElOption, ElPagination, ElDialog, ElForm, ElFormItem, ElMessage, ElDatePicker } from 'element-plus';
import { expenseAPI } from '@/services';
import type { Expense } from '@/types/components';

// 搜索和过滤参数
const searchQuery = ref('');
const expenseTypeFilter = ref('all');
const dateRange = ref<[string, string] | null>(null);
const currentPage = ref(1);
const pageSize = ref(10);
const totalExpenses = ref(0);

// 数据列表
const expensesData = ref<Expense[]>([]);
const expenseTypes = ref([
  { label: '挂号费', value: 'registration' },
  { label: '检查费', value: 'examination' },
  { label: '药品费', value: 'medicine' },
  { label: '治疗费', value: 'treatment' },
  { label: '手术费', value: 'surgery' },
  { label: '其他', value: 'other' }
]);

// 对话框状态
const showExpenseDialog = ref(false);
const showExpenseDetailDialog = ref(false);
const isEditing = ref(false);
const selectedExpense = ref<Expense | null>(null);

// 表单数据和规则
const expenseForm = reactive<Partial<Expense>>({
  patientId: '',
  patientName: '',
  type: '',
  amount: 0,
  status: 'unpaid',
  date: '',
  description: ''
});

const expenseRules = ref<Record<string, any>>({
  patientId: [{ required: true, message: '请输入患者ID', trigger: 'blur' }],
  patientName: [{ required: true, message: '请输入患者姓名', trigger: 'blur' }],
  type: [{ required: true, message: '请选择费用类型', trigger: 'change' }],
  amount: [
    { required: true, message: '请输入费用金额', trigger: 'blur' },
    { type: 'number', min: 0, message: '金额不能为负数', trigger: 'blur' }
  ],
  status: [{ required: true, message: '请选择支付状态', trigger: 'change' }],
  date: [{ required: true, message: '请选择日期', trigger: 'change' }]
});

const expenseFormRef = ref<InstanceType<typeof ElForm>>();

// 生命周期钩子
onMounted(() => {
  fetchExpenses();
});

// 获取费用列表
const fetchExpenses = async () => {
  try {
    const params = {
      page: currentPage.value,
      pageSize: pageSize.value,
      keyword: searchQuery.value,
      type: expenseTypeFilter.value !== 'all' ? expenseTypeFilter.value : undefined,
      startDate: dateRange.value?.[0],
      endDate: dateRange.value?.[1]
    };

    const response = await expenseAPI.getExpenses(params);
    expensesData.value = response.data.items;
    totalExpenses.value = response.data.total;
  } catch (error: any) {
    ElMessage.error(error.message || '获取费用列表失败');
  }
};

// 搜索费用
const searchExpenses = () => {
  currentPage.value = 1;
  fetchExpenses();
};

// 重置搜索
const resetSearch = () => {
  searchQuery.value = '';
  expenseTypeFilter.value = 'all';
  dateRange.value = null;
  currentPage.value = 1;
  fetchExpenses();
};

// 分页处理
const handleSizeChange = (size: number) => {
  pageSize.value = size;
  fetchExpenses();
};

const handleCurrentChange = (current: number) => {
  currentPage.value = current;
  fetchExpenses();
};

// 打开新增费用对话框
const openAddExpenseDialog = () => {
  isEditing.value = false;
  Object.keys(expenseForm).forEach(key => {
    expenseForm[key as keyof typeof expenseForm] = '';
  });
  expenseForm.amount = 0;
  expenseForm.status = 'unpaid';
  showExpenseDialog.value = true;
};

// 编辑费用
const editExpense = (expense: Expense) => {
  isEditing.value = true;
  Object.assign(expenseForm, expense);
  showExpenseDialog.value = true;
};

// 查看费用详情
const viewExpenseDetails = async (expense: Expense) => {
  try {
    // 获取费用详情
    const response = await expenseAPI.getExpenseDetail(expense.id);
    selectedExpense.value = response.data;
    showExpenseDetailDialog.value = true;
  } catch (error: any) {
    ElMessage.error(error.message || '获取费用详情失败');
  }
};

// 保存费用信息
const saveExpense = () => {
  expenseFormRef.value?.validate(async (valid) => {
    if (valid) {
      try {
        if (isEditing.value && expenseForm.id) {
          await expenseAPI.updateExpense(expenseForm.id, expenseForm);
          ElMessage.success('费用信息更新成功');
        } else {
          await expenseAPI.createExpense(expenseForm);
          ElMessage.success('费用添加成功');
        }
        showExpenseDialog.value = false;
        fetchExpenses();
      } catch (error: any) {
        ElMessage.error(error.message || '保存费用信息失败');
      }
    }
  });
};

// 删除费用
const deleteExpense = async (id: string) => {
  try {
    await expenseAPI.deleteExpense(id);
    ElMessage.success('费用删除成功');
    fetchExpenses();
  } catch (error: any) {
    ElMessage.error(error.message || '删除费用失败');
  }
};

// 标记为已支付
const markAsPaid = async (id: string) => {
  try {
    await expenseAPI.updateExpenseStatus(id, { status: 'paid' });
    ElMessage.success('已标记为支付');
    fetchExpenses();
  } catch (error: any) {
    ElMessage.error(error.message || '更新支付状态失败');
  }
};
</script>

<style scoped lang="scss">
.expense-management-container {
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
  flex-wrap: wrap;
}

.filter-select {
  width: 180px;
}

.date-picker {
  width: 280px;
}

.expense-table-container {
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

.expense-detail-card {
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