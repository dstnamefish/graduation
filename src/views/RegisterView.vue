<template>
  <div class="register-panel">
    <div class="register-title">MEDICAL</div>
    <div class="register-subtitle">注册</div>
    <CustomForm
      :fields="formFields"
      :initialData="initialFormData"
      :validateOnBlur="true"
      :validateOnInput="false"
      :showDivider="true"
      dividerText="or"
      submitText="注册"
      :submittingText="submittingText"
      @submit="handleSubmit"
      @sendCode="handleSendCode"
    >
      <template #footer-links>
        <div class="register-footer-title">
          <span>已经有账号了？</span>
          <a @click.prevent="switchToLogin" class="login-link">去登录</a>
        </div>
      </template>
    </CustomForm>
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import { getRegister, getSendCode } from '../apis/user';
import CustomForm from '../components/ui/CustomForm.vue';
import { CustomFormField } from '../types/components/ui/custom-form';

const router = useRouter();
const route = useRoute();

const formFields: CustomFormField[] = [
  {
    name: 'username',
    label: '用户名',
    type: 'text',
    placeholder: '请输入用户名',
    required: true,
    validator: (value: string) => {
      if (value.length < 3) {
        return '用户名至少需要3个字符';
      }
      if (value.length > 20) {
        return '用户名不能超过20个字符';
      }
      if (!/^[a-zA-Z0-9_一-龥]+$/.test(value)) {
        return '用户名只能包含字母、数字、下划线和中文';
      }
      return null;
    },
  },

  {
    name: 'password',
    label: '密码',
    type: 'password',
    placeholder: '请输入密码',
    required: true,
    validator: (value: string) => {
      if (value.length < 6) {
        return '密码至少需要6个字符';
      }
      if (value.length > 20) {
        return '密码不能超过20个字符';
      }

      // 检查是否包含至少一个字母和一个数字
      if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(value)) {
        return '密码必须包含至少一个字母和一个数字';
      }
      return null;
    },
  },
  {
    name: 'confirmPassword',
    label: '确认密码',
    type: 'password',
    placeholder: '请再次输入密码',
    required: true,
  },
  {
    name: 'email',
    label: '邮箱',
    type: 'email',
    placeholder: '请输入邮箱地址',
    required: true,
    validator: (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return '请输入有效的邮箱地址';
      }
      return null;
    },
  },
  {
    name: 'code',
    label: '验证码',
    type: 'text',
    placeholder: '请输入验证码',
    required: true,
    validator: (value: string) => {
      if (value.length < 4) {
        return '验证码至少需要4个字符';
      }
      if (value.length > 6) {
        return '验证码不能超过6个字符';
      }
      return null;
    },
  },
];
const initialFormData = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  code: '',
};

const submittingText = computed(() => {
  return '注册中...';
});

const isSubmitting = ref(false);

const handleSubmit = async (formData: any) => {
  // 验证确认密码
  if (formData.password !== formData.confirmPassword) {
    ElMessage({
      message: '两次输入的密码不一致',
      type: 'error',
    });
    return;
  }

  try {
    isSubmitting.value = true;

    // 调用注册接口
    await getRegister({
      username: formData.username,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      email: formData.email,
      verificationCode: formData.code,
    });

    ElMessage({
      message: `注册成功！欢迎 ${formData.username}`,
      type: 'success',
    });

    // 注册成功后跳转到登录页面，并传递redirect参数
    const redirect = (route.query.redirect as string) || '/home';
    router.push({
      path: '/login',
      query: { redirect },
    });
  } catch (error: any) {
    console.error('注册失败:', error);
    ElMessage({
      message: `注册失败: ${error.message || '未知错误'}`,
      type: 'error',
    });
  } finally {
    isSubmitting.value = false;
  }
};

const switchToLogin = () => {
  emit('switch-view', 'login');
};

const emit = defineEmits(['switch-view']);

const handleSendCode = async (email: string) => {
  // 验证邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    ElMessage({
      message: '请输入有效的邮箱地址',
      type: 'error',
    });
    return;
  }

  try {
    // 调用发送验证码接口
    const response = await getSendCode({ email });

    ElMessage({
      message: `验证码已发送到 ${email}`,
      type: 'success',
    });
  } catch (error: any) {
    console.error('发送验证码失败:', error);
    ElMessage({
      message: `发送验证码失败: ${error.message || '未知错误'}`,
      type: 'error',
    });
  }
};
</script>
<style lang="scss" scoped>
@charset "UTF-8";

@use '../assets/styles/base/_variables.scss' as variables;

.register-panel {
  position: absolute;
  z-index: 333;
  top: -20%;
  right: 5%;
  display: flex;
  width: 30%;
  height: 140%;
  box-shadow: 0 8px 32px rgb(66 133 244 / 15%);
  transform: translate(-50%, -50%);
  background-color: variables.$body-bg;
  border-radius: 32px;
  flex-direction: column;
  align-items: center;

  .register-title {
    color: #4285f4;
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    padding-top: 50px;
  }

  .register-subtitle {
    color: #333;
    text-align: center;
    font-size: 36px;
    font-weight: 500;
    padding-top: 20px;
    padding-bottom: 24px;
  }
}

.login-link {
  cursor: pointer;
}
</style>