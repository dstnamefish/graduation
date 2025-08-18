<template>
  <div class="reservation-register-wrapper">
    <div class="reservation-register-card">
      <div class="reservation-register-title">预约转号</div>
      <ElForm
        :model="form"
        :rules="rules"
        ref="formRef"
        labelWidth="120px"
        labelPosition="right"
        class="reservation-register-form"
      >
        <ElFormItem label="来电号码" prop="phone" required>
          <ElInput v-model="form.phone" placeholder="请输入" class="form-input" />
        </ElFormItem>
        <ElFormItem label="姓名" prop="name" required>
          <ElInput v-model="form.name" placeholder="请输入" class="form-input" />
        </ElFormItem>
        <ElFormItem label="性别" prop="gender" required>
          <ElSelect v-model="form.gender" placeholder="请选择" class="form-select">
            <ElOption label="女" value="女" />
            <ElOption label="男" value="男" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="预约" prop="type">
          <ElRadioGroup v-model="form.type" class="form-radio-group">
            <ElRadio label="电话预约" />
            <ElRadio label="门诊预约" />
            <ElRadio label="住院预约" />
            <ElRadio label="核酸预约" />
          </ElRadioGroup>
        </ElFormItem>
        <ElFormItem label="预约项目" prop="item">
          <ElRadioGroup v-model="form.item" class="form-radio-group">
            <ElRadio label="NT检查" />
            <ElRadio label="四维彩超" />
          </ElRadioGroup>
        </ElFormItem>
        <ElFormItem label="预约时间" prop="date">
          <ElDatePicker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
            class="form-input"
            style="width: 298px"
          />
        </ElFormItem>
        <ElFormItem label="发送短信" prop="sendMsg">
          <ElSwitch v-model="form.sendMsg" class="form-switch" />
        </ElFormItem>
        <ElFormItem label="备注" prop="remark">
          <ElInput
            v-model="form.remark"
            type="textarea"
            :rows="4"
            placeholder="请输入"
            class="form-textarea"
          />
        </ElFormItem>
        <ElFormItem class="form-actions">
          <ElButton type="primary" @click="onSubmit" class="btn btn-primary">保存</ElButton>
          <ElButton @click="onReset" class="btn btn-default">清空</ElButton>
        </ElFormItem>
      </ElForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const formRef = ref();
const form = ref({
  phone: '',
  name: '',
  gender: '',
  type: '电话预约',
  item: 'NT检查',
  date: '',
  sendMsg: false,
  remark: '',
});

const rules = {
  phone: [{ required: true, message: '请输入来电号码', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
};

const onSubmit = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      ElMessage.success('保存成功');
    }
  });
};
const onReset = () => {
  formRef.value.resetFields();
};
</script>

<style scoped lang="scss">
@use 'sass:color';

.reservation-register-wrapper {
  display: flex;
  background: #f6f8fe;
  min-height: 100vh;
  align-items: start;
  justify-content: center;
  font-size: 18px;
}

.reservation-register-card {
  display: flex;
  width: 100%;
  padding: 18px 40px;
  background: #fff;
  border-radius: 12px;
  flex-direction: column;
}

.reservation-register-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 32px;
  color: #222;
}

.reservation-register-form {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.el-form-item {
  margin-bottom: 20px;
}

.form-input,
.form-select {
  height: 32px;
  background: #fff;
  border-radius: 4px;
  max-width: 298px;

}

.form-select {
  min-width: 120px;
}

.form-radio-group {
  display: flex;
  color: #222;
  flex-wrap: wrap;
}

.form-radio-group .el-radio {
  width: 80px;
  margin-right: 18px;
}

.form-radio-group label {
  display: flex;
  align-items: center;
}


.form-switch {
  width: 36px;
  height: 18px;
  accent-color: #3161FF;
  margin-top: 6px;
}

.form-textarea {
  flex: 1;
  width: 298px;
  padding: 12px;
  min-height: 60px;
  border-radius: 4px;
  resize: vertical;
}

.form-actions {
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 24px;
  margin-top: 32px;
}

.btn {
  min-width: 130px;
  height: 36px;
  border-radius: 4px;
  font-size: 18px;
  border: none;
  text-align: center;
  justify-content: center;
  cursor: pointer;
}

.btn-primary {
  color: #fff;
  background: #3161FF;

  &:hover {
    background: color.adjust(#3161FF, $lightness: -5%);
  }
}

.btn-default {
  border: 1px solid #808080;
  color: #222;
  background: #fff;

  &:hover {
    background: color.adjust(#f6f8fe, $lightness: -3%);
  }
}
</style>