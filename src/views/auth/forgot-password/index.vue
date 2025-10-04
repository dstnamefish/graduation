<template>
  <div class="background">
    <div class="login-container">
      <!-- 左侧背景区域 -->
      <div class="login-left">
        <div class="logo-area">
          <div class="logo">
            <svg viewBox="0 0 24 24" width="40" height="40"
class="logo-icon">
              <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM13 17H7V15H13V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z" fill="currentColor"/>
            </svg>
            <div class="logo-text">医疗管理系统</div>
          </div>
          <h3 class="logo-subtitle">专注于医疗服务的高效管理平台</h3>
        </div>

        <div class="features-section">
          <div class="feature-item">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
              </svg>
            </div>
            <div class="feature-text">安全可靠的医疗数据管理</div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM15.07 9.17L11.59 12.65L8.93 9.99L7.5 11.42L11.59 15.5L16.5 10.58L15.07 9.17Z" fill="currentColor"/>
              </svg>
            </div>
            <div class="feature-text">智能化的诊疗流程支持</div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
              </svg>
            </div>
            <div class="feature-text">全方位的患者健康管理</div>
          </div>
        </div>
      </div>

      <!-- 右侧表单区域 -->
      <div class="login-right">
        <div class="form-wrapper">
          <h2 class="form-title">忘记密码？</h2>
          <p class="form-subtitle">输入您的电子邮件，我们将发送重置密码链接</p>

          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="email" class="form-label">电子邮箱</label>
              <div class="input-container">
                <span class="input-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  placeholder="请输入您的电子邮件"
                  class="form-input"
                  :class="{ 'error': errors.email }"
                  autocomplete="email"
                />
              </div>
              <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
            </div>

            <button
              type="submit"
              class="submit-button"
              :disabled="isLoading"
            >
              <span v-if="!isLoading">提交</span>
              <span v-else class="loading-spinner">
                <svg viewBox="0 0 24 24" width="16" height="16"
class="spinner">
                  <circle cx="12" cy="12" r="10"
fill="none" stroke="currentColor" stroke-width="2"
stroke-dasharray="50.26548245743669" stroke-dashoffset="0" stroke-linecap="round"></circle>
                </svg>
                发送中...
              </span>
            </button>
          </form>

          <div class="form-footer">
            <button type="button" class="back-button" @click="goBack">
              <svg viewBox="0 0 24 24" width="16" height="16"
class="back-icon">
                <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="currentColor"/>
              </svg>
              返回登录
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

import { RoutesAlias } from '@/router/routesAlias';

defineOptions({ name: 'ForgotPasswordView' });

const router = useRouter();

// 表单数据
const form = reactive({
  email: '',
});

// 错误信息
const errors = reactive({
  email: '',
});

// 加载状态
const isLoading = ref(false);

// 表单验证
const validateForm = (): boolean => {
  let isValid = true;

  // 重置错误信息
  errors.email = '';

  // 验证邮箱
  if (!form.email.trim()) {
    errors.email = '请输入电子邮箱';
    isValid = false;
  } else if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(form.email)) {
    errors.email = '请输入有效的电子邮箱地址';
    isValid = false;
  }

  return isValid;
};

// 提交表单
const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    isLoading.value = true;

    // 模拟发送重置密码邮件的请求
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 成功后跳转回登录页并提示用户
    alert('重置密码链接已发送到您的邮箱，请查收');
    goBack();
  } catch (error) {
    console.error('发送重置密码邮件失败:', error);
    alert('发送重置密码邮件失败，请稍后重试');
  } finally {
    isLoading.value = false;
  }
};

// 返回登录页
const goBack = () => {
  router.push(RoutesAlias.Login);
};
</script>

<style lang="scss" scoped>
@use './index';

.login-container {
  display: flex;
  height: 100vh;

  // 左侧背景区域样式
  .login-left {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 65vw;
    height: 100vh;
    padding: 2rem;
    color: white;
    background: linear-gradient(135deg, var(--primary-color) 0%, #096dd9 100%);

    .logo-area {
      margin-bottom: 4rem;

      .logo {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;

        .logo-icon {
          margin-right: 0.75rem;
          color: white;
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 600;
        }
      }

      .logo-subtitle {
        font-size: 1rem;
        font-weight: 300;
        opacity: 0.9;
      }
    }

    .features-section {
      max-width: 400px;

      .feature-item {
        display: flex;
        align-items: center;
        margin-bottom: 1.5rem;

        .feature-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          margin-right: 1rem;
          border-radius: 50%;
          background-color: rgb(255 255 255 / 10%);

          svg {
            color: white;
          }
        }

        .feature-text {
          font-size: 1rem;
          font-weight: 400;
        }
      }
    }
  }

  // 右侧表单区域样式
  .login-right {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35vw;
    background-color: white;

    .form-wrapper {
      width: 100%;
      max-width: 360px;
      padding: 2rem;

      .form-title {
        margin-bottom: 0.5rem;
        font-size: 1.75rem;
        font-weight: 600;
        color: var(--text-primary);
      }

      .form-subtitle {
        margin-bottom: 2rem;
        font-size: 1rem;
        color: var(--text-secondary);
      }

      .form-group {
        margin-bottom: 1.5rem;

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .input-container {
          position: relative;

          .input-icon {
            position: absolute;
            top: 50%;
            left: 1rem;
            color: var(--text-placeholder);
            transform: translateY(-50%);
          }

          .form-input {
            width: 100%;
            height: 44px;
            padding-right: 1rem;
            padding-left: 3rem;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            font-size: 1rem;
            color: var(--text-primary);
            transition: all 0.2s ease;

            &:focus {
              border-color: var(--primary-color);
              box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
              outline: none;
            }

            &.error {
              border-color: #f5222d;
            }

            &::placeholder {
              color: var(--text-placeholder);
            }
          }
        }

        .error-message {
          margin-top: 0.25rem;
          font-size: 0.8rem;
          color: #f5222d;
        }
      }

      .submit-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 44px;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
        color: white;
        background-color: var(--primary-color);
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover:not(:disabled) {
          background-color: #096dd9;
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .loading-spinner {
          display: flex;
          align-items: center;

          .spinner {
            margin-right: 0.5rem;
            animation: spin 1s linear infinite;
          }
        }
      }

      .form-footer {
        margin-top: 1.5rem;
        text-align: center;

        .back-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 40px;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          font-size: 0.9rem;
          color: var(--text-primary);
          background-color: white;
          cursor: pointer;
          transition: all 0.2s ease;

          .back-icon {
            margin-right: 0.5rem;
          }

          &:hover {
            border-color: var(--primary-color);
            color: var(--primary-color);
          }
        }
      }
    }
  }
}

// 响应式设计
@media (width <= 768px) {
  .login-container {
    flex-direction: column;

    .login-left {
      width: 100%;
      height: auto;
      padding: 2rem 1.5rem;
      text-align: center;

      .logo-area {
        margin-bottom: 2rem;
      }

      .features-section {
        max-width: 100%;
        margin: 0 auto;

        .feature-item {
          justify-content: center;
          margin-bottom: 1rem;
        }
      }
    }

    .login-right {
      width: 100%;
      height: auto;
      padding: 2rem 1.5rem;
    }
  }
}

// 加载动画
@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>