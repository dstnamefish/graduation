<template>
  <form class="custom-form" @submit.prevent="handleSubmit">
    <div class="form-field" v-for="field in fields" :key="field.name">
      <!-- 标签 -->
      <label :for="field.name" class="field-label">{{ field.label }}</label>

      <div
        class="input-container"
        :class="{ error: errors[field.name], focused: focusedFields[field.name] }"
      >
        <!-- 前缀图标 -->
        <span v-if="field.prefixIcon" class="prefix-icon">
          <component :is="field.prefixIcon" />
        </span>

        <!-- 输入框 -->
        <input
          :id="field.name"
          v-if="['text', 'email', 'password', 'number', 'tel'].includes(field.type)"
          :type="field.type === 'password' && !passwordVisibility[field.name] ? 'password' : 'text'"
          v-model="formData[field.name]"
          :placeholder="focusedFields[field.name] ? '' : field.placeholder"
          :required="field.required"
          :disabled="field.disabled"
          class="field-input"
          :class="{ 'has-prefix': field.prefixIcon, 'has-suffix': field.type === 'password' }"
          @blur="handleBlur(field)"
          @input="handleInput(field)"
          @focus="handleFocus(field)"
          ref="inputRefs"
        />

        <!-- 验证码发送 -->
        <button
          v-if="field.name === 'code'"
          type="button"
          class="send-code-btn"
          @click="sendCode"
          :disabled="codeCountdown > 0 || !isEmailValid"
          :class="{ disabled: codeCountdown > 0 || !isEmailValid }"
        >
          {{ codeCountdown > 0 ? `${codeCountdown}s后重新发送` : '发送验证码' }}
        </button>

        <!-- 后缀图标 -->
        <span
          v-if="field.type === 'password' && formData[field.name]"
          class="suffix-icon"
          @click="togglePasswordVisibility(field)"
          :class="{ visible: passwordVisibility[field.name] }"
        >
          <Transition name="icon-fade" mode="out-in">
            <component
              :is="passwordVisibility[field.name] ? EyeOpenIcon : EyeCloseIcon"
              class="icon-animated"
              :key="passwordVisibility[field.name]"
            />
          </Transition>
        </span>
      </div>

      <!-- 错误提示 -->
      <div v-if="errors[field.name]" class="error-message">
        {{ errors[field.name] }}
      </div>
    </div>

    <!-- 用户协议 -->
    <div class="agreement-section">
      <slot name="agreement"></slot>
    </div>

    <!-- 提交按钮 -->
    <div class="submit-container">
      <button
        type="submit"
        class="submit-button"
        :disabled="!isFormValid || isSubmitting"
        :class="{ disabled: !isFormValid || isSubmitting, submitting: isSubmitting }"
      >
        <span v-if="isSubmitting" class="submitting-content">
          <span class="spinner"></span>
          <slot class="submitting-text">{{ submittingText }}</slot>
        </span>
        <span v-else class="submit-content">
          <slot class="submit-text">{{ submitText }}</slot>
        </span>
      </button>
    </div>

    <!-- 自定义分隔线 -->
    <slot class="divider">
      <div class="default-divider" v-if="showDivider">
        <div class="divider-line"></div>
        <div class="divider-text">{{ dividerText }}</div>
        <div class="divider-line"></div>
      </div>
    </slot>

    <!-- 其他注册/登录方式 -->
    <ThirdPartyLogin @login="handleThirdPartyLogin" />

    <!-- 自定义底部链接 -->
    <div class="footer-links">
      <slot name="footer-links"></slot>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';

import EmailIcon from '../../assets/icons/form/email.svg';
import EyeCloseIcon from '../../assets/icons/form/eye-close.svg';
import EyeOpenIcon from '../../assets/icons/form/eye-open.svg';
import PasswordIcon from '../../assets/icons/form/password.svg';
import UserIcon from '../../assets/icons/form/user.svg';

import ThirdPartyLogin from './ThirdPartyLogin.vue';

import type {
  CustomFormData,
  CustomFormField,
  CustomFormError,
  CustomFormProps,
} from '../../types/components/ui/custom-form';

const props = withDefaults(defineProps<CustomFormProps>(), {
  initialData: () => ({}),
  validateOnBlur: true,
  validateOnInput: false,
  showDivider: true,
  dividerText: 'or',
  submitText: '提交',
  submittingText: '提交中...',
});

const emit = defineEmits(['submit', 'thirdPartyLogin', 'fieldChange', 'sendCode']);

// 表单数据
const formData = reactive<CustomFormData>({});

// 错误信息
const errors = reactive<CustomFormError>({});

// 提交状态
const isSubmitting = ref(false);

// 密码可见性状态管理
const passwordVisibility = ref<Record<string, boolean>>({});

// 验证码倒计时
const codeCountdown = ref(0);
const codeTimer = ref<number | null>(null);

// 聚焦状态
const focusedFields = ref<Record<string, boolean>>({});

// 初始化表单
const initializeFormData = () => {
  props.fields.forEach((field) => {
    formData[field.name] = props.initialData[field.name] ?? field.defaultValue ?? '';

    // 初始化密码可见性状态
    if (field.type === 'password') {
      passwordVisibility.value[field.name] = false;
    }

    // 初始化聚焦状态
    focusedFields.value[field.name] = false;

    // 自动设置前缀图标
    if (!field.prefixIcon) {
      field.prefixIcon =
        field.type === 'text'
          ? UserIcon
          : field.type === 'email'
            ? EmailIcon
            : field.type === 'password'
              ? PasswordIcon
              : undefined;
    }
  });
};

// 验证字段
const validateField = (field: CustomFormField) => {
  const value = formData[field.name]?.toString() || '';
  let error = '';

  // 特殊处理confirmPassword字段
  if (field.name === 'confirmPassword') {
    if (field.required && !value.trim()) {
      error = `${field.label}不能为空`;
    } else if (value !== formData.password) {
      error = '两次输入的密码不一致';
    }
  } else {
    if (field.required && !value.trim()) {
      error = `${field.label}不能为空`;
    } else if (field.validator) {
      // 执行自定义验证函数
      error = field.validator(value) || '';
    }
  }
  errors[field.name] = error;
};

// 防抖处理
const debounce = (fn: Function, delay: number) => {
  let timeoutId: number;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay) as unknown as number;
  };
};

const handleBlur = debounce((field: CustomFormField) => {
  if (props.validateOnBlur) {
    validateField(field);
  }
  focusedFields.value[field.name] = false;
}, 300);

const handleInput = (field: CustomFormField) => {
  if (props.validateOnInput) {
    validateField(field);
  } else {
    errors[field.name] = '';
  }
  emit('fieldChange', field.name, formData[field.name]);
};

const handleFocus = (field: CustomFormField) => {
  focusedFields.value[field.name] = true;
};

// 切换密码可见性
const togglePasswordVisibility = (field: CustomFormField) => {
  passwordVisibility.value[field.name] = !passwordVisibility.value[field.name];

  // 添加一个轻微的延迟来改善动画效果
  setTimeout(() => {
    const inputElement = document.getElementById(field.name);
    if (inputElement) {
      inputElement.focus();
    }
  }, 50);
};

// 表单验证状态
const isFormValid = computed(() => {
  return props.fields.every((field) => {
    const value = formData[field.name]?.toString() || '';
    if (field.required && !value.trim()) {
      return false;
    }
    if (field.validator && field.validator(value)) {
      return false;
    }
    return true;
  });
});

// 邮箱验证
const isEmailValid = computed(() => {
  const emailField = props.fields.find((field) => field.type === 'email');
  if (emailField) {
    const emailValue = formData[emailField.name];
    if (emailValue) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(emailValue);
    }
  }
  return false;
});

// 提交表单
const handleSubmit = async () => {
  isSubmitting.value = true;
  props.fields.forEach(validateField);

  if (!Object.values(errors).some(Boolean)) {
    try {
      await emit('submit', { ...formData });
    } finally {
      isSubmitting.value = false;
    }
  } else {
    isSubmitting.value = false;
  }
};

// 处理第三方登录
const handleThirdPartyLogin = (platform: string) => {
  emit('thirdPartyLogin', platform);
};

// 发送验证码
const sendCode = () => {
  // 如果正在倒计时，则不执行发送操作
  if (codeCountdown.value > 0) {
    return;
  }

  // 获取邮箱字段的值
  const emailField = props.fields.find((field) => field.type === 'email');
  if (emailField) {
    const emailValue = formData[emailField.name];
    if (emailValue) {
      // 发送验证码事件
      emit('sendCode', emailValue);

      // 启动倒计时
      codeCountdown.value = 60;
      codeTimer.value = setInterval(() => {
        codeCountdown.value--;
        if (codeCountdown.value <= 0 && codeTimer.value) {
          clearInterval(codeTimer.value);
          codeTimer.value = null;
        }
      }, 1000) as unknown as number;
    } else {
      // 如果没有邮箱地址，触发一个错误事件或者直接在UI上显示错误
      console.log('请先填写邮箱地址');
    }
  }
};

onMounted(() => initializeFormData());

// 监听字段变化
watch(() => props.fields, initializeFormData, { deep: true });
</script>

<style lang="scss" scoped>
.custom-form {
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 0 56px;

  .form-field {
    position: relative;
    width: 100%;
    height: 48px;
    padding: 12px 14px;
    border: 1px solid #dcdbdd;
    border-radius: 8px;
    transition: all 0.2s ease;

    &.focused {
      border-color: #4285f4;
      box-shadow: 0 0 0 2px rgb(66 133 244 / 20%);
    }

    &.error {
      border-color: #ff4d4f;
      box-shadow: 0 0 0 2px rgb(255 77 79 / 20%);
    }

    .input-container {
      display: flex;
      height: 100%;
      transition: all 0.3s ease;
      align-items: center;

      &:hover {
        border-color: #b3b3b3;
      }

      .prefix-icon,
      .suffix-icon {
        display: flex;
        width: 24px;
        margin: 0 8px;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #84818a;
        transition: color 0.2s ease;

        &:hover {
          color: #4285f4;
        }
      }

      .suffix-icon {
        &.visible {
          color: #4285f4;
        }
      }

      .field-input {
        flex: 1;
        width: 100%;
        height: 24px;
        padding: 0 2px;
        border: none;
        color: #333;
        line-height: 24px;
        background-color: #fff;
        outline: none;
        font-weight: 800;
        font-size: 16px;

        &::placeholder {
          color: #b3b3b3;
          font-weight: normal;
        }
      }

      .send-code-btn {
        padding: 4px 8px;
        border: none;
        color: #4285f4;
        background: none;
        transition: all 0.2s ease;
        font-size: 14px;
        cursor: pointer;
        border-radius: 4px;
        font-weight: 500;

        &:hover:not(.disabled) {
          background-color: rgb(66 133 244 / 10%);
        }

        &.disabled {
          color: #b3b3b3;
          cursor: not-allowed;
        }
      }
    }

    .field-label {
      position: absolute;
      top: -10px;
      left: 24px;
      padding: 0 4px;
      color: #84818a;
      transition: all 0.2s ease;
      font-size: 14px;
      background-color: white;
      font-weight: 500;

      .focused & {
        color: #4285f4;
      }
    }

    .error-message {
      position: absolute;
      top: 50px;
      left: 0;
      color: #ff4d4f;
      animation: error-popup 0.3s forwards;
      font-size: 14px;
    }
  }

  .submit-container {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 48px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgb(66 133 244 / 30%);
    transition: box-shadow 0.3s ease;

    &:hover:not(.disabled) {
      box-shadow: 0 6px 16px rgb(66 133 244 / 40%);
    }

    .submit-button {
      position: relative;
      width: 100%;
      height: 100%;
      border: none;
      color: #fff;
      transition: all 0.3s ease;
      background-color: #4285f4;
      font-size: 16px;
      cursor: pointer;
      font-weight: 500;
      overflow: hidden;

      &.submitting {
        pointer-events: none;
      }

      &.disabled {
        background-color: #b3b3b3;
        cursor: not-allowed;
      }

      .submitting-content {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }

      .spinner {
        width: 16px;
        height: 16px;
        border: 2px solid rgb(255 255 255 / 30%);
        border-top: 2px solid #fff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
    }
  }

  .default-divider {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 8px;
    background-color: #fff;

    .divider-line {
      width: 100%;
      height: 1px;
      border: 1px solid #dcdbdd;
    }

    .divider-text {
      padding: 0 16px;
      font-size: 18px;
      color: #84818a;
      font-weight: 500;
    }
  }

  .footer-links {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: #fff;

    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;

      .register-link {
        color: #4285f4;
        text-decoration: none;
        cursor: pointer;
        transition: color 0.3s ease;
        font-weight: 500;

        &:hover {
          color: #1a56db;
          text-decoration: underline;
        }
      }
    }
  }
}

// Animations
@keyframes error-popup {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.icon-animated {
  transition:
    transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
    opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    transform: scale(1.1);
  }
}

.icon-fade-enter-active,
.icon-fade-leave-active {
  transition:
    opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
    transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.icon-fade-enter-from,
.icon-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>