<template>
  <div class="register">
    <LoginLeftView />

    <div class="right-warp">
      <!-- 顶部进度指示器 -->
      <div class="progress-indicator">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="progress-step"
          :class="{
            'progress-step--active': currentStep === index + 1,
            'progress-step--completed': currentStep > index + 1,
          }"
        >
          <div class="step-circle">
            <ElIcon
              v-if="currentStep > index + 1"
              class="check-icon"
            >
              <Check />
            </ElIcon>
            <span v-else>{{ index + 1 }}</span>
          </div>
          <div class="step-label">{{ step.title }}</div>
        </div>
        <div
          class="progress-line"
          :style="{
            '--progress-width': `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }"
        ></div>
      </div>

      <!-- 内容区 -->
      <div class="content-area">
        <Transition
          name="fade"
          mode="out-in"
        >
          <div
            :key="currentStep"
            class="step-card"
          >
            <div class="step-header">
              <h2 class="step-title">
                第{{ currentStep }}步：{{ steps[currentStep - 1].title }}
              </h2>
              <p class="step-description">
                {{ steps[currentStep - 1].description }}
              </p>
              <div class="progress-text">
                已完成 {{ currentStep - 1 }}/{{ steps.length }} 步
              </div>
            </div>

            <!-- 表单 -->
            <div class="step-form">
              <WellnestFormAuth
                :fields="currentStepFields"
                :initData="currentStepData"
                @submit="handleStepSubmit"
                @change="handleFormChange"
                @error="handleFormError"
              />

              <!-- 密码强度提示 -->
              <div
                v-if="currentStep === 2 && formData.password"
                class="password-strength"
              >
                <div class="strength-bar">
                  <div :class="['bar', passwordStrength]" />
                </div>
                <p class="strength-text">密码强度：{{ strengthText }}</p>
              </div>

              <!-- 邮箱验证码发送区域 -->
              <div
                v-if="currentStep === 3 && formData.email"
                class="email-verification"
              >
                <ElButton
                  type="primary"
                  @click="sendEmailCode"
                  :disabled="emailCountdown > 0"
                  :loading="sendingEmailCode"
                >
                  {{ emailCountdown > 0 ? `${emailCountdown}s 后重发` : '发送验证码' }}
                </ElButton>
                <p v-if="emailCodeSent" class="success-tip">
                  验证码已发送至您的邮箱，请注意查收
                </p>
              </div>

              <!-- 注册信息确认 -->
              <div
                v-if="currentStep === 4"
                class="completion-summary"
              >
                <h4>请确认以下信息：</h4>
                <div class="summary-card">
                  <p>
                    <strong>工号：</strong>
                    {{ formData.employeeId }}
                  </p>
                  <p>
                    <strong>姓名：</strong>
                    {{ formData.realName }}
                  </p>
                  <p>
                    <strong>账号：</strong>
                    {{ formData.username }}
                  </p>
                  <p>
                    <strong>邮箱：</strong>
                    {{ formData.email }}
                  </p>
                </div>
              </div>

              <!-- 步骤内操作按钮 -->
              <div class="step-actions">
                <!-- 上一步按钮 -->
                <ElButton
                  v-if="currentStep > 1"
                  @click="prevStep"
                  class="btn-secondary"
                >
                  上一步
                </ElButton>

                <!-- 继续/注册按钮 -->
                <ElButton
                  v-if="currentStep < steps.length && currentStep !== 3"
                  type="primary"
                  @click="nextStep"
                  :disabled="!isCurrentStepValid"
                  :loading="validating"
                  class="btn-primary btn-continue"
                >
                  继续
                  <ElIcon><ArrowRight /></ElIcon>
                </ElButton>
                <ElButton
                  v-if="currentStep === steps.length"
                  type="primary"
                  @click="submitForm"
                  :loading="submitting"
                  class="btn-primary btn-complete"
                >
                  注册
                </ElButton>
              </div>

              <!-- 已有账号链接 -->
              <div
                v-if="currentStep === 1"
                class="login-link"
              >
                <span class="login-text">已有账号？</span>
                <a
                  href="/auth/login"
                  class="login-link-btn"
                  @click.prevent="goToLogin"
                >
                  请登录
                </a>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, Check } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';

import { fetchRegister, fetchSendEmailCode, fetchCheckEmployeeIdAndRealName } from '@/api/auth';
import WellnestFormAuth from '@/components/core/forms/wellnest-form-auth/index.vue';
import LoginLeftView from '@/components/core/views/login/LoginLeftView.vue';
import { RoutesAlias } from '@/router/routesAlias';
import type { RegisterRequest } from '@/types/api/auth';
import type {
  FormField,
  ValidatorFunction,
  SelectOption,
} from '@/types/component/form';

/** 动态步骤配置 */
const steps = [
  { description: '请填写您的工号和真实姓名', title: '基本信息' },
  { description: '设置登录账号和密码', title: '账号设置' },
  { description: '请输入您的邮箱地址', title: '邮箱验证' },
  { description: '请输入邮箱验证码', title: '验证码确认' },
];

const router = useRouter();
const currentStep = ref(1);
const validating = ref(false);
const submitting = ref(false);
const emailCodeSent = ref(false);
const emailCountdown = ref(0);
const sendingEmailCode = ref(false);

interface FormData {
  employeeId: string;
  realName: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  emailCode: string;
}

const formData = reactive<FormData>({
  confirmPassword: '',
  email: '',
  emailCode: '',
  employeeId: '',
  password: '',
  realName: '',
  username: '',
});

/** ====== 自定义校验器 ====== */
// 邮箱唯一性校验 - 移除API验证，由后端sendCode方法处理
const validateEmail: ValidatorFunction = async (value) => {
  if (!value) {return '邮箱不能为空';}
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
    return '请输入正确的邮箱格式';
  }
  return true;
};

// 用户名唯一性校验
const validateUsername: ValidatorFunction = async (value) => {
  if (!value) {return '用户名不能为空';}

  // 基本格式验证
  if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(value)) {
    return '用户名只能以字母开头，包含字母、数字和下划线';
  }

  if (value.length < 3) {
    return '用户名长度不能少于3位';
  }

  if (value.length > 20) {
    return '用户名长度不能超过20位';
  }

  // API唯一性验证（可选，在后端不可用时跳过）
  try {
    const response = await fetch(`/api/auth/validate/username?value=${value}`);
    if (response.ok) {
      const { exists } = await response.json();
      return exists ? '用户名已存在' : true;
    } else {
      // API不可用时，仅进行基本验证
      console.warn('用户名唯一性验证API不可用，跳过验证');
      return true;
    }
  } catch (error) {
    // 网络错误时，仅进行基本验证
    console.warn('用户名唯一性验证失败，跳过API验证:', error);
    return true;
  }
};

// 密码强度校验
const validatePassword: ValidatorFunction = async (value) => {
  if (value.length < 8) {return '密码不能少于8位';}
  if (!/[A-Z]/.test(value)) {return '需包含大写字母';}
  if (!/[a-z]/.test(value)) {return '需包含小写字母';}
  if (!/\d/.test(value)) {return '需包含数字';}
  if (!/[!@#$%^&*]/.test(value)) {return '需包含特殊字符';}
  return true;
};

// 邮箱验证码校验
const validateEmailCode: ValidatorFunction = async (value) => {
  if (!value) {return '验证码不能为空';}
  if (!/^\d{6}$/.test(value)) {return '请输入6位数字验证码';}

  // 这里可以添加验证码有效性验证的API调用
  // 目前仅做基本格式验证
  return true;
};

// 确认密码
const validateConfirm: ValidatorFunction = async (value, _, data) => {
  return value === data.password ? true : '两次输入的密码不一致';
};

/** ====== 动态表单字段 ====== */
const currentStepFields = computed<FormField[]>(() => {
  switch (currentStep.value) {
    case 1:
      return [
        {
          label: '工号',
          name: 'employeeId',
          placeholder: '请输入工号',
          required: true,
          type: 'text',
        },
        {
          label: '真实姓名',
          name: 'realName',
          placeholder: '请输入真实姓名',
          required: true,
          type: 'text',
        },
      ];
    case 2:
      return [
        {
          label: '用户名',
          name: 'username',
          placeholder: '请输入用户名',
          required: true,
          type: 'text',
          validator: validateUsername,
        },
        {
          label: '密码',
          name: 'password',
          placeholder: '请输入密码',
          required: true,
          type: 'password',
          validator: validatePassword,
        },
        {
          label: '确认密码',
          name: 'confirmPassword',
          placeholder: '请再次输入密码',
          required: true,
          type: 'password',
          validator: validateConfirm,
        },
      ];
    case 3:
      return [
        {
          label: '邮箱',
          name: 'email',
          placeholder: '请输入邮箱地址',
          required: true,
          type: 'email',
          validator: validateEmail,
        },
      ];
    case 4:
      return [
        {
          label: '邮箱验证码',
          maxLength: 6,
          name: 'emailCode',
          placeholder: '请输入6位验证码',
          required: true,
          type: 'text',
          validator: validateEmailCode,
        },
      ];
    default:
      return [];
  }
});

const currentStepData = computed(() => {
  const result: Record<string, any> = {};
  currentStepFields.value.forEach(
    (f) => (result[f.name] = formData[f.name as keyof FormData] || ''),
  );
  return result;
});

/** ====== 密码强度计算 ====== */
const passwordStrength = computed(() => {
  const pwd = formData.password;
  let score = 0;
  if (pwd.length >= 8) {score++;}
  if (/[A-Z]/.test(pwd)) {score++;}
  if (/[a-z]/.test(pwd)) {score++;}
  if (/\d/.test(pwd)) {score++;}
  if (/[!@#$%^&*]/.test(pwd)) {score++;}
  if (score <= 2) {return 'weak';}
  if (score === 3 || score === 4) {return 'medium';}
  return 'strong';
});
const strengthText = computed(() =>
  passwordStrength.value === 'weak'
    ? '弱'
    : passwordStrength.value === 'medium'
      ? '中'
      : '强',
);

/** ====== 步骤逻辑 ====== */
const isCurrentStepValid = computed(() => {
  if (currentStep.value === 1)
  {return formData.employeeId && formData.realName;}
  if (currentStep.value === 2)
  {return (
    formData.username &&
      formData.password &&
      formData.confirmPassword
  );}
  if (currentStep.value === 3)
  {return formData.email;}
  if (currentStep.value === 4)
  {return formData.emailCode;}
  return true;
});

const handleStepSubmit = async () => {
  if (currentStep.value < steps.length) {nextStep();}
  else {submitForm();}
};

const handleFormChange = (name: string, value: any) => {
  (formData as any)[name] = value;
};

const handleFormError = () => {
  ElMessage.error('请检查表单填写是否正确');
};

const nextStep = async () => {
  if (!isCurrentStepValid.value) {return ElMessage.error('请完善当前表单');}
  validating.value = true;

  try {
    // 第一步：校验工号和真实姓名
    if (currentStep.value === 1) {
      await fetchCheckEmployeeIdAndRealName(formData.employeeId, formData.realName);
    }

    // 第二步：验证用户名和密码规则
    if (currentStep.value === 2) {
      const usernameResult = await validateUsername(formData.username, { label: '用户名', name: 'username', placeholder: '请输入用户名', required: true, type: 'text' }, formData);
      if (usernameResult !== true) {
        if (typeof usernameResult === 'string') {
          throw new Error(usernameResult);
        }
      }

      const passwordResult = await validatePassword(formData.password, { label: '密码', name: 'password', placeholder: '请输入密码', required: true, type: 'password' }, formData);
      if (passwordResult !== true) {
        if (typeof passwordResult === 'string') {
          throw new Error(passwordResult);
        }
      }

      // 验证确认密码
      if (formData.password !== formData.confirmPassword) {
        throw new Error('两次输入的密码不一致');
      }
    }

    // 第三步：发送验证码并自动进入下一步
    if (currentStep.value === 3) {
      await sendEmailCode();
      currentStep.value++;
    } else {
      await new Promise((r) => setTimeout(r, 300));
      currentStep.value++;
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : (error as any)?.response?.data?.msg || '验证失败，请检查表单信息';
    ElMessage.error(errorMessage);
  } finally {
    validating.value = false;
  }
};

const prevStep = () => currentStep.value > 1 && currentStep.value--;

const submitForm = async () => {
  submitting.value = true;

  try {
    // 准备注册数据
    const registerData: RegisterRequest = {
      confirmPassword: formData.confirmPassword,
      email: formData.email,
      employeeId: formData.employeeId,
      password: formData.password,
      realName: formData.realName,
      username: formData.username,
      verificationCode: formData.emailCode,
    };

    // 调用注册API
    await fetchRegister(registerData);

    await ElMessageBox.alert('注册成功，请等待管理员审核', '提示', {
      type: 'success',
    });

    router.push('/auth/login');
  } catch (error) {
    console.error('注册失败:', error);
    ElMessage.error('注册失败，请检查表单信息或稍后再试');
  } finally {
    submitting.value = false;
  }
};

/**
 * 发送邮箱验证码
 */
const sendEmailCode = async () => {
  if (!formData.email) {
    ElMessage.error('请先填写邮箱地址');
    return;
  }

  sendingEmailCode.value = true;
  try {
    // 调用发送验证码API - 邮箱唯一性验证由后端处理
    await fetchSendEmailCode({ email: formData.email });

    emailCodeSent.value = true;
    emailCountdown.value = 60;

    // 开始倒计时
    const timer = setInterval(() => {
      emailCountdown.value--;
      if (emailCountdown.value <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    ElMessage.success('验证码已发送至您的邮箱');

    // 在第三步成功发送验证码后立即跳转到第四步
    if (currentStep.value === 3) {
      setTimeout(() => {
        currentStep.value++;
      }, 500); // 延迟500ms，确保用户能看到成功消息
    }
  } catch (error) {
    console.error('发送邮箱验证码失败:', error);
    const errorMessage = error instanceof Error ? error.message :
      (error as any)?.response?.data?.msg ||
      '发送验证码失败，请稍后再试';
    ElMessage.error(errorMessage);
  } finally {
    sendingEmailCode.value = false;
  }
};

/**
 * 跳转到登录页面
 */
const goToLogin = () => {
  router.push('/auth/login');
};
</script>

<style lang="scss" scoped>
@forward './index';
</style>