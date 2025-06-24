import js from '@eslint/js';                                   // ESLint 官方推荐的 JS 规则
import tseslintPlugin from '@typescript-eslint/eslint-plugin'; // TypeScript ESLint 插件
import tsParser from '@typescript-eslint/parser';              // TypeScript 解析器
import { defineConfig } from 'eslint/config';                  // 定义 ESLint 配置
import importPlugin from 'eslint-plugin-import';               // 导入处理import/export语法的插件
import pluginVue from 'eslint-plugin-vue';                     // Vue ESLint 插件
import globals from 'globals';                                 // 提供浏览器/Node 等全局变量
import tseslint from 'typescript-eslint';                      // TypeScript ESLint 插件
import vueParser from 'vue-eslint-parser';                     // Vue 解析器 

/**
 * files：指定规则适用的文件（如 **.vue 匹配所有 Vue 文件）。 
 * plugins：加载插件（如 js、vue）。
 * extends：继承预设规则（如 js/recommended）。
 * languageOptions.globals：定义全局变量（如 browser 包含 window、document）。
 * tseslint.configs.recommended：TypeScript 推荐规则（类似 @typescript-eslint/recommended）。
 * pluginVue.configs["flat/essential"]：Vue 基础规则（如模板语法检查）。
 * parserOptions.parser：Vue 文件使用 typescript-eslint 解析器（支持 <script lang="ts">）。 
 * */ 
export default defineConfig([
  /* ---------------------------------------------------- 
    1. 基础规则 
  ---------------------------------------------------- */
  { 
    // 适用于所有 JS/TS/Vue 文件 
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'], 
    // 忽略dist和node_modules目录
    ignores: ['**/dist/**', '**/node_modules/**','vite.config.ts'],
    plugins: { 
      js, // ESLint官方JS规则
      vue: pluginVue, // Vue.js支持
      import: importPlugin, // import/export语法检查
      '@typescript-eslint': tseslintPlugin, // TypeScript支持
    }, 
    extends: ['js/recommended'],
    // 语言环境配置
    languageOptions: {
      // 定义全局变量（浏览器+Node+ES2025）
      globals: {
        ...globals.browser, // window/document等
        ...globals.node, // require/module等
        ...globals.es2025, // ES2021全局对象    
        // Vue 3 宏编辑器 
        // 1.防止被意外修改（如 defineProps = {} 会导致错误）
        // 2.提示开发者这些是特殊语法，不是普通函数或变量。
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly'
      },
      // 解析器选项
      parserOptions: {
        ecmaVersion: 'latest', // 使用最新ECMAScript标准
        sourceType: 'module', // 使用ES模块语法
        extraFileExtensions: ['.vue']
      },
    },
    // 插件特定设置
    settings: {
      // 配置import解析器
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true, // 优先尝试TypeScript类型解析
          project: './tsconfig.app.json'
        },
        node: true
      },
      // 指定哪些文件由TS解析器处理
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.mts', '.cts'],
      },
    },

    // 代码风格规则
    rules: {
      // 强制单引号（允许字符串中包含其他引号）
      'quotes': ['error', 'single', { avoidEscape: true }],
      // 必须使用分号
      'semi': ['error', 'always'],
      // 2空格缩进（switch case特殊处理）
      'indent': ['error', 2, { SwitchCase: 1 }],
      // 仅多行时允许尾随逗号
      'comma-dangle': ['error', 'only-multiline'],
      // 对象花括号内强制空格
      'object-curly-spacing': ['error', 'always'],
      // 函数定义时括号前空格
      'space-before-function-paren': ['error', 'never'],
      // 箭头函数参数括号前空格
      'arrow-parens': ['error', 'as-needed'],
      // 强制注释风格（* 开头）
      'spaced-comment': ['error', 'always', {
        'line':{
          // 针对 /// 三斜线注释（如 TypeScript）
          'markers': ['/'],
          // 允许注释后紧跟 - 或 +（如 JSDoc）
          'exceptions': ['-', '+'] 
        },
        'block':{
          // 针对 /*! 特殊注释（如 LICENSE 声明）
          'markers': ['!'],
          // 允许 /* 后紧跟 * 
          'exceptions': ['*'], 
          // 要求 /* 和 */ 对称
          'balanced': true 
        }
      }],

      /* ---------------
        vue特定规则
      --------------- */
      // 多单词组件名（白名单例外）
      'vue/multi-word-component-names': ['error', {
        ignores: ['Breadcrumb', 'SideBar'],
      }],
      // 模板中使用双引号
      'vue/html-quotes': ['error', 'double'],
      'vue/component-api-style': ['error', ['script-setup']],

      /* -------------------
        TypeScript特定规则
      ------------------ */
      // 不强制显式返回类型
      '@typescript-eslint/explicit-function-return-type': 'off',
      // 使用any时警告
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',

      /* -------------------
        导入/导出规则
      ------------------ */
      // 导入分组排序
      'import/order': ['error', {
        groups: [
          'builtin',    // Node内置模块
          'external',   // npm包
          'internal',   // 项目内部模块
          'parent',     // 父目录模块
          'sibling',    // 同级目录模块
          'index',      // 目录下的index文件
        ],
        'newlines-between': 'always', // 组间空行
        alphabetize: { order: 'asc' }
      }],

      /* -------------------
        其他规则
      ------------------- */
      // 生产环境禁止console，开发环境警告
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

    }
  },

  /* ---------------------------------------------------- 
    2. 纯JavaScript文件配置 
  ---------------------------------------------------- */
  {
    // 仅适用于.js/.mjs/.cjs文件
    files: ['**/*.{js,mjs,cjs}'],
    // 继承ESLint官方推荐规则
    extends: [js.configs.recommended],
  },

  /* ---------------------------------------------------- 
    3. TypeScript文件配置
  ---------------------------------------------------- */
  {
    // 仅适用于.ts/.mts/.cts文件
    files: ['**/*.{ts,mts,cts}'],
    // 继承TypeScript推荐规则
    extends: [tseslint.configs.recommended],
    languageOptions: {
      parser: tsParser, // 使用TS专用解析器
      parserOptions: {
        project: './tsconfig.app.json', // 关联TS配置文件
        tsconfigRootDir: import.meta.dirname
      },
    },
  },
  
  /* ---------------------------------------------------- 
    4. Vue文件配置
  ---------------------------------------------------- */
  {
    // 仅适用于.vue文件
    files: ['**/*.vue'],
    plugins: {
      vue: pluginVue,
    },
    // 继承Vue基础规则
    ...pluginVue.configs['vue3-recommended'],
    languageOptions: {
      parser: vueParser, // 使用Vue专用解析器
      parserOptions: {
        parser: tsParser, // Vue文件中<script>部分使用TS解析器
        project: './tsconfig.app.json', // 关联TS配置
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: ['.vue'], // 额外识别.vue扩展名
      },
    },
  },
  {
    files: ['eslint.config.js'],
    rules: {
      // 禁用TypeScript的consistent-type-imports规则
      '@typescript-eslint/consistent-type-imports': 'off',
    },
  }
]);