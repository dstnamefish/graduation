<template>
  <div class="login-panel">
    <div class="login-title">MEDICAL</div>
    <div class="login-subtitle">登录</div>
    <CustomForm
      :fields="formFields"
      :initialData="initialFormData"
      :validateOnBlur="true"
      :validateOnInput="false"
      :showDivider="true"
      dividerText="or"
      submitText="登录"
      submittingText="登录中..."
      @submit="handleSubmit"
    >
      <template #footer-links>
        <div class="login-footer-title">
          <span>还没有账号？</span>
          <a @click.prevent="switchToRegister" class="register-link">去注册</a>
        </div>
      </template>
      <template #agreement>
        <div class="agreement-text">
          <label>
            <input type="checkbox" v-model="agreementAccepted" />
            我已阅读并同意
            <a href="#" @click.prevent="handleLinkClick('/agreement')">用户协议</a>
            和
            <a href="#" @click.prevent="handleLinkClick('/privacy')">隐私政策</a>
          </label>
        </div>
      </template>
    </CustomForm>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import CustomForm from '../components/ui/CustomForm.vue';
import { CustomFormField } from '../types/components/ui/custom-form';
import { getLogin } from '../apis/user';
import { useAuthStore } from '../store/auth';

const router = useRouter();
const route = useRoute();
const agreementAccepted = ref(false);

const formFields: CustomFormField[] = [
  {
    name: 'username',
    label: '用户名',
    type: 'text',
    placeholder: '请输入用户名',
    required: true,
  },
  {
    name: 'password',
    label: '密码',
    type: 'password',
    placeholder: '请输入密码',
    required: true,
  },
];

const initialFormData = {
  username: '',
  password: '',
};

const handleSubmit = async (data: any) => {
  // 检查用户协议
  if (!agreementAccepted.value) {
    ElMessage.error('请先阅读并同意用户协议和隐私政策');
    return;
  }

  try {
    // 调用登录API
    const response = await getLogin(data);

    if (response.data) {
      // 登录成功，保存token等信息
      const authStore = useAuthStore();
      authStore.login({ username: data.username, password: data.password });

      ElMessage.success('登录成功');

      // 获取redirect参数，如果没有则默认跳转到/home
      const redirect = route.query.redirect as string || '/home';
      router.push(redirect);
    } else {
      ElMessage.error(response.msg || '登录失败');
    }
  } catch (error) {
    console.error('登录异常:', error);
    ElMessage.error('登录异常，请稍后重试');
  }
};

const switchToRegister = () => {
  emit('switch-view', 'register');
};

const emit = defineEmits(['switch-view']);
</script>
<style lang="scss" scoped>
@charset "UTF-8";

@use '../assets/styles/base/_variables.scss' as variables;

.login-panel {
  position: absolute;
  z-index: 333;
  top: -20%;
  left: 5%;
  display: flex;
  width: 30%;
  height: 140%;
  box-shadow: 0 8px 32px rgb(66 133 244 / 15%);
  background-color: variables.$body-bg;
  border-radius: 32px;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, -50%);

  .login-title {
    color: #4285f4;
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    padding-top: 50px;
  }

  .login-subtitle {
    color: #333;
    text-align: center;
    font-size: 36px;
    font-weight: 500;
    padding-top: 20px;
    padding-bottom: 24px;
  }

  .login-form {
    width: 100%;
    max-width: 400px;
    margin-top: 30px;
  }

  .login-btn {
    width: 100%;
    height: 50px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 10px;
  }

  .form-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    font-size: 14px;
    color: #666;
  }

  .forgot-password {
    color: #3161ff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .register-link {
    padding: 0;
    border: none;
    color: #3161ff;
    background: transparent;
    cursor: pointer;
    text-decoration: underline;

    &:hover {
      color: #4671ff;
    }
  }

  .agreement-text {
    font-size: 16px;
    color: #666;
    text-align: center;
    margin-top: 20px;

    [type='checkbox'] {
      width: 16px;
      height: 16px;
    }

    a {
      color: #3161ff;
      text-decoration: none;
    }
  }
}
</style>