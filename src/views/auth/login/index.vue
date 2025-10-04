<template>
  <div class="login">
    <LoginLeftView />
    <div class="login-form">
      <div class="login-header">
        <h1 class="login-title">医疗系统登录</h1>
        <p class="login-subtitle">请输入您的账号信息以继续</p>
      </div>

      <div class="form-container">
        <WellnestFormAuth
          ref="formRef"
          :fields="fields"
          @submit="handleLogin"
        />

        <!-- 只保留登录按钮 -->
        <FormActions
          :loading="isLoading"
          :hasErrors="hasFormErrors"
          submitText="登录"
          loadingText="登录中..."
          :showReset="false"
          @submit="handleFormSubmit"
        />
      </div>

      <div class="login-footer">
        <div class="login-options">
          <RouterLink
            :to="RoutesAlias.ForgotPassword"
            class="forgot-password"
          >
            忘记密码？
          </RouterLink>
          <RouterLink :to="RoutesAlias.Register">注册账号</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { fetchLogin } from '@/api/auth';
import FormActions from '@/components/core/forms/wellnest-form-actions/index.vue';
import WellnestFormAuth from '@/components/core/forms/wellnest-form-auth/index.vue';
import LoginLeftView from '@/components/core/views/login/LoginLeftView.vue';
import { RoutesAlias } from '@/router/routesAlias';
import { useUserStore } from '@/store/modules/user';
import type { LoginRequest } from '@/types/api/auth';
import type { FormProps, ValidatorFunction } from '@/types/component/form';

const router = useRouter();
const userStore = useUserStore();
const formRef = ref<InstanceType<typeof WellnestFormAuth>>();
const isLoading = ref(false);

// 自定义验证器：检查用户名是否包含特殊字符
const validateUsername: ValidatorFunction = async (value, field, formData) => {
  if (!value) {return true;} // 空值由 required 规则处理

  // 检查是否包含特殊字符（只允许字母、数字、下划线）
  const hasSpecialChars = /[^a-zA-Z0-9_]/.test(value);
  if (hasSpecialChars) {
    return '用户名只能包含字母、数字和下划线';
  }

  // 检查是否以数字开头
  if (/^\d/.test(value)) {
    return '用户名不能以数字开头';
  }

  return true;
};

// 自定义验证器：密码强度检查
const validatePasswordStrength: ValidatorFunction = async (
  value,
  field,
  formData,
) => {
  if (!value) {return true;} // 空值由 required 规则处理

  // 检查是否包含至少一个字母
  if (!/[a-zA-Z]/.test(value)) {
    return '密码必须包含至少一个字母';
  }

  // 检查是否包含至少一个数字
  if (!/\d/.test(value)) {
    return '密码必须包含至少一个数字';
  }

  // 检查密码强度（可选：包含特殊字符会更安全）
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
  if (value.length >= 8 && hasSpecialChar) {
    return true; // 强密码
  } else if (value.length >= 6) {
    return true; // 中等密码，通过但可以提示
  }

  return '密码强度不够，建议包含特殊字符';
};

// 定义表单字段配置
const fields = ref<FormProps['fields']>([
  {
    label: '用户名',
    maxLength: 20,
    minLength: 3,
    name: 'username',
    placeholder: '请输入用户名',
    required: true,

    // 使用自定义验证器
    validator: validateUsername,
  },
  {
    label: '密码',
    maxLength: 20,
    minLength: 6,
    name: 'password',
    placeholder: '请输入密码',
    required: true,
    type: 'password',

    // 使用验证规则对象，可以自定义错误消息
    validator: {
      message: '密码格式不符合要求',
      validator: validatePasswordStrength,
    },
  },
]);

// 计算属性：是否有表单错误
const hasFormErrors = computed(() => {
  return formRef.value?.hasErrors || false;
});

// 处理表单提交按钮点击
const handleFormSubmit = async () => {
  if (!formRef.value) {return;}

  const isValid = await formRef.value.validateForm();
  if (isValid) {
    await handleLogin(formRef.value.formData);
  }
};

const handleLogin = async (formData: Record<string, any>) => {
  try {
    isLoading.value = true;

    // 准备登录数据
    const loginData: LoginRequest = {
      password: formData.password,
      username: formData.username,
    };

    // 调用登录API
    const response = await fetchLogin(loginData);

    // 存储用户信息、token和refreshToken
    if (response.token) {
      userStore.setToken(response.token, response.refreshToken);
    }
    if (response.userInfo) {
      userStore.setUserInfo(response.userInfo);
    }
    userStore.setLoginStatus(true);

    ElMessage.success('登录成功！');

    router.push('/');
  } catch (error) {
    ElMessage.error('登录失败，请检查账号密码是否正确');
    console.error('登录错误:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>
<style lang="scss" scoped>
@forward './index';
</style>