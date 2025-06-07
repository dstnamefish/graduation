# 编码规范文档
本编码规范文档适用于基于 **Vue 3 + Composition API + Vite + Element Plus + Pinia + TypeScript** 技术栈的前端项目，旨在统一团队开发标准、提升代码可读性和可维护性。文档涵盖**代码结构、命名规则、组件开发、状态管理、样式规范**等核心内容，并提供具体示例和最佳实践。

## 一、项目结构规范
```
├─.vscode/
│  └─extensions.json           # VS Code 扩展配置
├─docs/                        #          
│  ├─cmd-docs/                 # 命令文档
│  ├─design-docs/              # 设计文档
│  ├─dev-docs/                 # 开发文档
│  ├─user-docs/                # 用户文档
│  └─Vite-docs/                # Vite文档
├─public/
│  └─favicon.ico               # 网站图标
├─src/
│  ├─assets/
│  │  ├─styles/                # 样式文件                     
│  │  │  ├─base/               # 基础样式（变量、混合器）
│  │  │  │  ├─_variables.scss  # 变量
│  │  │  │  └─_mixins.scss     # 混合器
│  │  │  ├─components/         # 通用组件样式
│  │  │  ├─pages/              # 页面样式
│  │  │  │  └─Home.scss        # 首页样式
│  │  │  └─global.scss         # 全局样式
│  │  ├─icons/                 # 图标资源
│  │  └─images/                # 图片资源
│  ├─components/               # 通用组件
│  ├─hooks/                    # 自定义钩子
│  ├─router/                   # 路由配置
│  │  └─index.ts               # 路由主文件
│  ├─store/                    # Pinia 状态管理
│  ├─types/                    # 类型定义
│  ├─utils/                    # 工具函数目录
│  ├─views/                    # 页面组件（业务逻辑）
│  │  └─Home.vue               # 首页组件
│  ├─vite-env.d.ts             # Vite 环境变量类型
│  ├─main.ts                   # 应用入口文件
│  └─App.vue                   # 根组件
├─package.json                 # 依赖配置文件
├─package-lock.json            # 依赖锁文件
├─tsconfig.json                # TypeScript 全局配置
├─tsconfig.app.json            # 应用专属 TypeScript 配置
├─tsconfig.node.json           # Node.js 专属 TypeScript 配置
├─vite.config.ts               # Vite 构建配置
├─README.md                    # 项目说明文档
├─coding-style.md              # 编码规范主文档
├─.gitignore                   # Git 忽略规则
├─index.html                   # 入口 HTML 文件
├─.env.production              # 生产环境变量
└─.env.development             # 开发环境变量
```

## 二、TypeScript规范
### 1. 类型定义优先
- 所有接口、组件 Props、Store 状态必须定义类型
- 使用 interface 定义对象类型，type 定义基础类型或联合类型
```typescript
// 接口示例：用户信息
interface UserInfo {
  id: number;
  name: string;
  email?: string;
}

// Props 类型
const props = defineProps<{
  user: UserInfo;
  isLoading: boolean;
}>();
```

### 2. 避免 any 类型
- 严格模式下禁止使用 any，使用 unknown 替代不确定类型
```typescript
// 错误：使用 any
let data: any = {};

// 正确：使用 unknown + 类型断言
let data: unknown = {};
if (typeof data === 'object') data = data as Record<string, any>;
```

### 3. 泛型使用
- 封装工具函数或组件时使用泛型提高复用性
```typescript
// 通用响应类型
interface ResponseData<T> {
  code: number;
  data: T;
  message: string;
}

// 接口函数示例
const getUser = async <T>(): Promise<ResponseData<T>> => {
  return await http.get('/user');
};
```


## 三、Vue组件规范
### 1. 单文件组件结构
```vue
<template>
  <!-- 模板：保持简洁，避免复杂逻辑，使用注释划分区域 -->
  <div class="container">
    <!-- 头部 -->
    <Header />
    <!-- 主体 -->
    <main v-if="data" :class="theme">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
// 导入：按顺序（Vue 内置、自定义、第三方）
import { ref, computed } from 'vue';
import Header from '@/components/Header.vue';
import { useUserStore } from '@/store/userStore';

// 状态：使用 ref/reactive/computed
const userStore = useUserStore();
const theme = computed(() => userStore.theme);
const data = ref<UserInfo | null>(null);

// 生命周期：onMounted/onUnmounted 等
onMounted(() => {
  fetchData();
});

// 方法：使用箭头函数或普通函数（根据是否需要 `this`）
const fetchData = async () => {
  data.value = await userStore.getUser();
};
</script>

<style scoped lang="scss">
// 样式：scoped 避免全局污染，使用 BEM 命名规范
.container {
  .header {
    // BEM 示例：块-元素-修饰符
    &-title {
      font-size: 1.5rem;
    }
    &--fixed {
      position: sticky;
    }
  }
}
</style>
```

### 2. 组件命名
- 单文件组件使用 帕斯卡命名法（MyComponent.vue）
- 基础组件以 Base 开头（如 BaseButton.vue）
- 业务组件放在 views 目录，页面级组件以 Page 结尾（如 UserPage.vue）

### 3. Props & Emits
- Props 定义使用 defineProps 结合类型断言
- Emits 定义事件类型，避免魔法字符串

```typescript
// Props 定义
const props = defineProps<{
  modelValue: string;
  disabled: boolean;
}>();

// Emits 定义
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'click'): void;
}>();
```


## 四、Element Plus规范
### 1. 按需引入
- 使用 unplugin-vue-components 自动按需引入组件
- 避免全量引入（提升打包速度）

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    Vue(),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
});
```

### 2. 样式自定义
- 在 assets/styles/element/index.scss 中覆盖 Element Plus 样式
- 使用官方提供的 CSS 变量（避免直接修改 DOM 选择器）

```scss
// 自定义按钮颜色
:deep(.el-button--primary) {
  background-color: $primary-color; // 使用项目定义的 SCSS 变量
  border-color: $primary-color;
}
```

## 五、Pinia 规范
### 1. Store 命名
- Store 文件以 Store 结尾（如 userStore.ts）
- 状态、getters、actions 分开定义，保持单一职责

```typescript
// userStore.ts
import { defineStore } from 'pinia';

interface UserState {
  userInfo: UserInfo | null;
  token: string | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userInfo: null,
    token: null,
  }),
  getters: {
    isLoggedIn(): boolean {
      return !!this.token;
    },
  },
  actions: {
    async login(username: string, password: string) {
      const res = await loginApi(username, password);
      this.token = res.token;
      this.userInfo = res.user;
    },
  },
});
```

### 2. 组合式 API 使用
- 复杂逻辑使用组合式 API（defineStore 第二个参数为函数）

```typescript
export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo | null>(null);
  const token = ref<string | null>(null);

  const isLoggedIn = computed(() => !!token.value);

  const login = async (username: string, password: string) => {
    // 登录逻辑
  };

  return { userInfo, token, isLoggedIn, login };
});
```


## 六、SCSS 规范
### 1. **变量命名**
- 全局变量以 $base-/$primary- 开头（如 $base-font-size）
- 模块私有变量以 $_ 开头（如 $_padding-sm）

```scss
// 全局变量（在 base/variables.scss 中定义）
$primary-color: #165DFF;
$base-font-family: 'Inter', sans-serif;

// 私有变量（仅在当前文件使用）
$_header-height: 60px;
```
### 2. **混合器（Mixin）**
- 混合器命名使用动词短语（如 @mixin center-content）
- 带参数混合器添加默认值

```scss
@mixin center-content($display: flex) {
  display: $display;
  justify-content: center;
  align-items: center;
}

// 使用示例
.container {
  @include center-content;
}
```

### 3. **模块化导入**
- 使用 @use 替代 @import（Dart Sass 推荐语法）
- 添加命名空间避免污染

```scss
// 导入变量和混合器
@use 'base/variables' as vars;
@use 'base/mixins' as mixins;

// 使用示例
body {
  font-family: vars.$base-font-family;
  @include mixins.box-shadow(0 2px 4px rgba(0,0,0,0.1));
}
```

## 七、代码风格规范
### 1. 缩进与换行
- 使用 2 个空格缩进（禁止制表符）
- 每行代码不超过 120 字符（超出时换行）

### 2. 命名规范
|类型	      |规范	         |示例                            |
|-----------|--------------|-------------------------------|
|变量/函数  |驼峰命名法	    |userInfo, fetchData            |
|接口/类型  |帕斯卡命名法	  |UserInfo, ResponseData         |
|组件/文件  |帕斯卡命名法	  |UserPage.vue, BaseButton.vue   |
|SCSS       |变量	         |小写 + 短横线	$base-font-size   |
|SCSS       |混合器	       |小写 + 下划线	@mixin box_shadow |

### 3. 注释规范
#### Vue注释规范
- **组件头部注释（VueDoc 风格）**
    ```vue
    <!-- 
    * @description 用户信息卡片组件
    * @author 开发者姓名
    * @since 2023-05-10
    * @example <UserCard :user="user" @click="handleClick" />
    -->
    <template>
        <div class="user-card">
            <!-- 组件内容 -->
        </div>
    </template>
    ```

-  **Props 和 Emits 注释**
    ```typescript
    // script setup
    const props = defineProps<{
        /** 用户信息对象 */
        user: {
            id: number;
            name: string;
            avatar: string;
        };
        /** 是否显示操作按钮 */
        showActions?: boolean;
    }>();

    const emits = defineEmits<{
        /** 点击用户卡片触发 */
        (e: 'click', userId: number): void;
        /** 用户信息更新时触发 */
        (e: 'update', user: UserInfo): void;
    }>();
    ```

- **复杂逻辑注释**
    ```typescript
    // 计算用户等级（根据积分计算）
    const userLevel = computed(() => {
      // 等级划分规则：0-100: 青铜，101-500: 白银，501+: 黄金
      if (props.user.points <= 100) return 'bronze';
      if (props.user.points <= 500) return 'silver';
      return 'gold';
    });

    // 处理复杂表单提交逻辑
    const handleSubmit = async () => {
      // 1. 表单验证
      if (!validateForm()) return;
    
      // 2. 显示加载状态
      loading.value = true;
    
      try {
        // 3. 提交数据到 API
        const result = await submitApi(formData.value);

        // 4. 处理成功响应
        showSuccessToast('提交成功');
        emit('success', result);
      } catch (error) {
        // 5. 错误处理
        showErrorToast('提交失败');
        console.error('Form submit error:', error);
      } finally {
        // 6. 重置加载状态
        loading.value = false;
      }
    };
    ```

#### TypeScript 注释
-  **接口和类型定义** 
    ```typescript
    /**
     * 用户信息接口
     * @interface
     * @property {number} id - 用户ID
     * @property {string} name - 用户名
     * @property {string} [email] - 用户邮箱（可选）
     * @property {Date} createdAt - 创建时间
     */
    interface UserInfo {
      id: number;
      name: string;
      email?: string;
      createdAt: Date;
    }

    /**
     * 获取用户列表响应类型
     * @typedef {Object} UserListResponse
     * @property {UserInfo[]} data - 用户列表数据
     * @property {number} total - 总记录数
     * @property {number} page - 当前页码
     */
    type UserListResponse = {
      data: UserInfo[];
      total: number;
      page: number;
    };
    ```
    
- **函数和方法注释**
    ```typescript
    /**
     * 根据用户ID获取用户信息
     * @param {number} userId - 用户ID
     * @param {boolean} [withDetail=false] - 是否获取详细信息
     * @returns {Promise<UserInfo>} 返回用户信息对象
     * @throws {Error} 当用户不存在时抛出错误
     */
    const getUserById = async (userId: number, withDetail = false): Promise<UserInfo> => {
      const response = await fetch(`/api/users/${userId}?detail=${withDetail}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      return response.json();
    };
    ```
    
#### SCSS 注释
- **变量和混合器注释**
    ```typescript
    // 颜色系统
    $primary-color: #165DFF; // 主色调（蓝色）
    $secondary-color: #6C757D; // 辅助色（灰色）
    $success-color: #28A745; // 成功状态色（绿色）

    /**
     * 圆角混合器
     * @param {string} $radius - 圆角大小，默认 4px
     */
    @mixin border-radius($radius: 4px) {
      -webkit-border-radius: $radius;
      -moz-border-radius: $radius;
      border-radius: $radius;
    }
    ```
    
- **组件样式注释**
    ```scss
    /**
     * 用户卡片组件样式
     * @section components
     */
    .user-card {
      @include border-radius(8px);
      @include box-shadow(0 2px 10px rgba(0,0,0,0.1));
      padding: 16px;
      transition: all 0.3s ease;
    
      // 悬停状态
      &:hover {
        transform: translateY(-5px);
        @include box-shadow(0 5px 15px rgba(0,0,0,0.15));
      }
    
      // 标题样式
      .title {
        font-size: 1.25rem;
        font-weight: 600;
        color: $primary-color;
      }
    
      // 状态标签样式
      .status-tag {
        display: inline-block;
        padding: 2px 8px;
        @include border-radius(4px);
        font-size: 0.875rem;

        // 不同状态的样式
        &--active {
          background-color: $success-color/10;
          color: $success-color;
        }

        &--inactive {
          background-color: $secondary-color/10;
          color: $secondary-color;
        }
      }
    }
    ```

- **全局样式注释**
    ```scss
    /**
     * 全局重置样式
     * @section global
     */
    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /**
     * 基础文本样式
     * @section typography
     */
    body {
      font-family: $base-font-family;
      font-size: $base-font-size;
      line-height: 1.5;
      color: $text-color;
      background-color: $background-color;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: $heading-font-family;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    ```

#### 注释最佳实践
- **避免冗余注释**：不要为显而易见的代码添加注释（如 // 增加计数）。
- **解释意图而非实现**：注释应说明 “为什么” 而非 “怎么做”。
```javascript
// 错误：描述实现
for (let i = 0; i < 10; i++) { /* ... */ } // 循环10次

// 正确：解释意图
for (let i = 0; i < 10; i++) { /* ... */ } // 加载10条数据，API限制最大批量请求数
```
- **保持注释更新**：代码修改时同步更新注释，避免误导。
- **使用一致的风格**：团队统一使用 JSDoc、单行注释或多行注释的场景。


## 八、最佳实践
### 1. 组件设计
保持组件单一职责（UI 组件和逻辑组件分离）
使用 defineExpose 显式暴露组件方法

```typescript
const handleSubmit = () => { /* ... */ };
defineExpose({ handleSubmit }); // 对外暴露方法
```

### 2. 性能优化
大列表使用 v-for 时添加 key 和 v-slot:item
路由组件使用懒加载（() => import('./views/UserPage.vue')）

### 3. 错误处理
接口请求统一捕获错误（在 utils/request.ts 中封装）
Store 中的异步方法使用 try/catch

```typescript
const login = async () => {
  try {
    const res = await fetch('/api/login');
    // 处理成功逻辑
  } catch (error) {
    showErrorToast('登录失败'); // 自定义错误提示
  }
};
```

## 九、开发流程规范
### 1. 代码提交：使用 Conventional Commits 规范格式
```plaintext
<类型>(<范围>): <描述>
// 示例
feat(store): 添加用户登录状态管理
fix(router): 修复登录页重定向循环问题
```
**常用 type 类型**：
|类型	      |用途                       |
|-----------|---------------------------|
|feat	      |新增功能                   |
|fix	      |修复 bug                   |
|docs	      |文档变更                   |
|style	    |代码格式（空格、分号等）    |
|refactor	  |重构（非功能新增/修复）     |
|test	      |测试相关                   |
|chore	    |构建/工具链变更            |

### 2. 代码检查：配置 ESLint + Prettier
```bash
# 安装依赖
npm install eslint prettier eslint-plugin-vue @typescript-eslint/eslint-plugin --save-dev
```

3. **单元测试**：使用 Vitest 测试组件和 Store
```typescript
// 测试 UserStore
import { describe, it, expect } from 'vitest';
import { useUserStore } from '@/store/userStore';

describe('UserStore', () => {
  it('登录状态正确', () => {
    const store = useUserStore();
    store.login('user', 'pass');
    expect(store.isLoggedIn).toBe(true);
  });
});
```

## 十、参考资源
- Vue 3 官方文档
- Element Plus 样式指南
- Pinia 最佳实践
- SCSS 官方迁移指南

## 十一、附录

### 1. **版本历史**
- **v1.0.3** 2025-06-04
  - 文档标题修改问题

- **v1.0.2** 2025-05-21
   - 文档大纲优化
  
- **v1.0.1** 2025-05-20
  - 文档删除目录结构
  - 代码提交规范添加类型名称

- **v1.0.0** 2025-05-19
  - 初始发布
  - 编辑文档生成代码规范文档


***通过遵循以上规范，可以提高代码的可维护性、可读性和团队协作效率，同时避免常见的技术栈相关问题（如 SCSS 变量作用域、TypeScript 类型错误）。根据项目规模可进一步细化规范（如路由权限、国际化等）***