<template>
  <el-card class="reservation-form">
    <template #header>
      <div class="reservation-form__header">
        <span>{{ title }}</span>
      </div>
    </template>

    <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="患者姓名" prop="patientName">
        <el-input v-model="formData.patientName" placeholder="请输入患者姓名" />
      </el-form-item>

      <el-form-item label="手机号码" prop="patientPhone">
        <el-input v-model="formData.patientPhone" placeholder="请输入手机号码" />
      </el-form-item>

      <el-form-item label="选择医生" prop="doctorId">
        <el-select v-model="formData.doctorId" placeholder="请选择医生">
          <el-option v-for="doctor in doctors" :key="doctor.id" :label="doctor.name" :value="doctor.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="预约日期" prop="appointmentDate">
        <el-date-picker v-model="formData.appointmentDate" type="date" placeholder="请选择预约日期" />
      </el-form-item>

      <el-form-item label="预约时间段" prop="timeSlotId">
        <el-select v-model="formData.timeSlotId" placeholder="请选择预约时间段" :disabled="!formData.appointmentDate || !formData.doctorId">
          <el-option v-for="slot in availableTimeSlots" :key="slot.id" :label="`${slot.startTime} - ${slot.endTime}`" :value="slot.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="就诊原因" prop="reason">
        <el-input v-model="formData.reason" type="textarea" placeholder="请输入就诊原因" rows="4" />
      </el-form-item>

      <el-form-item>
        <div class="reservation-form__actions">
          <el-button type="primary" @click="submitForm">提交预约</el-button>
          <el-button @click="resetForm">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { ElForm } from 'element-plus';
import { Doctor, TimeSlot } from '@/types/components/doctor';
import { ReservationRequest } from '@/types/components/reservation';
import { formatPhone } from '@/utils/string';

defineProps<{
  title: string;
  doctors: Doctor[];
  onSubmit: (data: ReservationRequest) => void;
}>();

defineEmits<{
  (e: 'submit', data: ReservationRequest): void;
  (e: 'reset'): void;
}>();

const formRef = ref<InstanceType<typeof ElForm>>();

const formData = reactive<{
  patientName: string;
  patientPhone: string;
  doctorId: string;
  appointmentDate: string;
  timeSlotId: string;
  reason: string;
}>({
  patientName: '',
  patientPhone: '',
  doctorId: '',
  appointmentDate: '',
  timeSlotId: '',
  reason: '',
});

// 模拟可用时间段数据
const availableTimeSlots = computed<TimeSlot[]>(() => {
  // 实际应用中，这里应该根据选择的医生和日期从API获取可用时间段
  if (!formData.doctorId || !formData.appointmentDate) {
    return [];
  }

  // 模拟数据
  return [
    { id: '1', doctorId: formData.doctorId, date: formData.appointmentDate, startTime: '09:00', endTime: '10:00', status: 'available' },
    { id: '2', doctorId: formData.doctorId, date: formData.appointmentDate, startTime: '10:00', endTime: '11:00', status: 'available' },
    { id: '3', doctorId: formData.doctorId, date: formData.appointmentDate, startTime: '14:00', endTime: '15:00', status: 'available' },
    { id: '4', doctorId: formData.doctorId, date: formData.appointmentDate, startTime: '15:00', endTime: '16:00', status: 'available' },
  ];
});

const rules = {
  patientName: [
    { required: true, message: '请输入患者姓名', trigger: 'blur' },
  ],
  patientPhone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' },
  ],
  doctorId: [
    { required: true, message: '请选择医生', trigger: 'change' },
  ],
  appointmentDate: [
    { required: true, message: '请选择预约日期', trigger: 'change' },
  ],
  timeSlotId: [
    { required: true, message: '请选择预约时间段', trigger: 'change' },
  ],
  reason: [
    { required: true, message: '请输入就诊原因', trigger: 'blur' },
    { min: 5, max: 200, message: '就诊原因长度在5-200个字符之间', trigger: 'blur' },
  ],
};

const submitForm = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      const requestData: ReservationRequest = {
        patientId: '1', // 实际应用中，这里应该从登录状态获取患者ID
        doctorId: formData.doctorId,
        appointmentDate: formData.appointmentDate,
        appointmentTimeSlotId: formData.timeSlotId,
        reason: formData.reason,
      };

      emit('submit', requestData);
    }
  });
};

const resetForm = () => {
  formRef.value?.resetFields();
  emit('reset');
};

// 格式化手机号码
watch(() => formData.patientPhone, (newValue) => {
  if (newValue) {
    formData.patientPhone = formatPhone(newValue.replace(/\D/g, ''));
  }
});
</script>

<style scoped lang="scss">
.reservation-form {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
}
</style>