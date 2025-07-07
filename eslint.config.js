/**
 * ESLint 官方推荐的 JS 规则
 * TypeScript ESLint 插件
 * TypeScript 解析器
 * 定义 ESLint 配置
 * 导入处理import/export语法的插件
 * Vue ESLint 插件
 * 提供浏览器/Node 等全局变量
 * TypeScript ESLint 插件
 * Vue 解析器
 */

import js from '@eslint/js';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

/**
 * files：指定规则适用的文件（如 **.vue 匹配所有 Vue 文件）。
 * plugins：加载插件（如 js、vue）。
 * extends：继承预设规则（如 js/recommended）。
 * languageOptions.globals：定义全局变量（如 browser 包含 window、document）。
 * tseslint.configs.recommended：TypeScript 推荐规则（类似 @typescript-eslint/recommended）。
 * pluginVue.configs["flat/essential"]：Vue 基础规则（如模板语法检查）。
 * parserOptions.parser：Vue 文件使用 typescript-eslint 解析器（支持 <script lang="ts">）。
 */
export default defineConfig([
  /**
   * ---------------------------------------------------------------------
   * 1. 全局规则
   * ---------------------------------------------------------------------
   */
  {
    // 适用于所有 JS/TS/Vue 文件
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],

    // 忽略dist和node_modules目录
    ignores: ['**/dist/**', '**/node_modules/**', 'vite.config.ts'],
    plugins: {
      js,
      'vue': pluginVue,
      'import': importPlugin,
      '@typescript-eslint': tseslintPlugin,
    },
    extends: ['js/recommended'],

    // 语言环境配置
    languageOptions: {
      // 定义全局变量（浏览器+Node+ES2025）
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2025,
      },

      // 解析器选项
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },

    // 插件特定设置
    settings: {
      // 配置import解析器
      'import/resolver': {
        typescript: {
          // 优先尝试TypeScript类型解析
          alwaysTryTypes: true,
          project: './tsconfig.app.json',
        },
        node: true,
      },

      // 指定哪些文件由TS解析器处理
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.mts', '.cts'],
      },
    },

    // 规则配置
    rules: {
      /**
       * ---------------------------------------------------------------------
       *  1.1 默认 & 最佳实践
       * ---------------------------------------------------------------------
       */
      // 生产环境禁止console，开发环境警告
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

      // 强制所有控制语句使用大括号
      'curly': ['error', 'all'],

      /**
       * ---------------------------------------------------------------------
       * 1.2 注释规范
       * ---------------------------------------------------------------------
       */
      // 强制注释风格
      'spaced-comment': [
        'error',
        'always',
        {
          line: {
            // 允许三斜线注释
            markers: ['/', '-', '+', '#'],

            // 允许 //- //+ //#
            exceptions: ['-', '+', '#'],
          },
          block: {
            // 允许 /** 和 /*!
            markers: ['!', '*'],

            // 允许 /* 后紧跟 * （文档注释）
            exceptions: ['*'],

            // 要求 /* 和 */ 对称
            balanced: true,
          },
        },
      ],

      // 单行注释在行首
      'line-comment-position': ['error', { position: 'above' }],

      // 注释前必须有空行（除非在块开始处）
      'lines-around-comment': [
        'error',
        {
          beforeLineComment: true,
          beforeBlockComment: true,
          allowBlockStart: true,
          allowObjectStart: true,
          allowArrayStart: true,
        },
      ],

      /**
       * ---------------------------------------------------------------------
       * 1.3 导入/导出规则
       * ---------------------------------------------------------------------
       */

      // 导入分组排序
      'import/order': [
        'error',
        {
          'groups': [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'pathGroups': [
            // 将 Vue 相关导入放在 external 组前面
            {
              pattern: 'vue',
              group: 'external',
              position: 'before',
            },

            // 处理 @/ 别名路径的组排序
            {
              pattern: '@/**',
              group: 'internal',
            },

            // 将样式文件归入 object 组
            {
              pattern: '*.{css,scss,sass,less}',
              group: 'object',
              patternOptions: { matchBase: true },
            },
          ],

          // 字母顺序排序 (a-z)
          'alphabetize': {
            order: 'asc',
            caseInsensitive: true,
          },

          // 组间需要空行分隔
          'newlines-between': 'always',

          // 允许未分组的导入出现在任意位置
          'warnOnUnassignedImports': true,
        },
      ],

      /**
       * ---------------------------------------------------------------------
       * 1.4 Prettier 代码格式化
       * prettier只进行格式化，保存文件时自动应用
       * eslint只负责检查代码规范
       * ---------------------------------------------------------------------
       */
      // 必须有分号
      'semi': ['error', 'always'],

      // 缩进规范
      'indent': [
        'error',
        2,
        {
          SwitchCase: 1,
          ignoredNodes: ['TemplateLiteral *'],
        },
      ],

      // 使用单引号
      'quotes': ['error', 'single', { avoidEscape: true }],

      // 多行结构必须有尾随逗号
      'comma-dangle': ['error', 'always-multiline'],

      // 对象大括号之间有空格
      'object-curly-spacing': ['error', 'always'],

      // 箭头函数参数无括号
      'arrow-parens': ['error', 'as-needed'],

      // 对象属性引号一致
      'quote-props': ['error', 'consistent'],

      // JSX 使用双引号
      'jsx-quotes': ['error', 'prefer-double'],

      // 禁止文件末尾换行
      'eol-last': ['error', 'never'],
    },
  },

  /**
   * ---------------------------------------------------------------------
   * 2. TypeScript文件特定配置
   * ---------------------------------------------------------------------
   */
  {
    // 仅适用于.ts/.mts/.cts文件
    files: ['**/*.{ts,mts,cts}'],

    // 继承TypeScript推荐规则
    extends: [tseslint.configs.recommended],
    languageOptions: {
      // 使用TS专用解析器
      parser: tsParser,
      parserOptions: {
        // 关联TS配置文件
        project: './tsconfig.app.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // 命名规范规则
      '@typescript-eslint/naming-convention': [
        'error',

        // 禁止下划线/美元符结尾
        {
          selector: ['variable', 'function', 'parameter', 'method'],

          // 禁用默认format检查
          format: null,
          custom: {
            // 不能以下划线或美元符结束
            regex: '^[a-zA-Z][a-zA-Z0-9]*(?<![_$])$',
            match: true,
          },
        },

        // 全局常量（全大写+下划线）
        {
          selector: 'variable',
          modifiers: ['const'],
          types: ['boolean', 'number', 'string'],
          format: ['UPPER_CASE'],
          custom: {
            regex: '^[A-Z][A-Z0-9]*(_[A-Z0-9]+)+$',
            match: true,
          },

          // 通过文件名/路径限定全局常量
          filter: {
            // 仅匹配特定文件名或路径
            regex: '',
            match: true,
          },
        },

        // 普通变量/参数/方法使用小驼峰
        {
          selector: ['variable', 'function', 'parameter', 'property', 'method'],

          // 排除私有成员
          modifiers: ['private'],
          format: ['camelCase'],

          // 禁止下划线前缀
          leadingUnderscore: 'forbid',
        },

        // 私有成员必须下划线前缀
        {
          selector: 'memberLike',
          modifiers: ['private'],
          format: ['camelCase'],

          // 必须下划线前缀
          leadingUnderscore: 'require',
        },

        // 类/接口
        {
          selector: ['class', 'interface'],
          format: ['PascalCase'],
        },

        // 布尔值前缀
        {
          selector: ['variable', 'property'],
          types: ['boolean'],
          format: ['camelCase'],

          // 前缀指定
          prefix: ['is', 'has', 'can'],
        },

        // 枚举成员
        {
          selector: 'enumMember',
          format: ['PascalCase', 'UPPER_CASE'],
        },
      ],

      // 禁止使用 any 类型，如果使用了会发出 警告（warn），但不会阻止代码运行
      '@typescript-eslint/no-explicit-any': 'warn',

      // 关闭强制要求函数必须显式声明返回类型
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },

  /**
   * ---------------------------------------------------------------------
   * 3. Vue文件配置
   * ---------------------------------------------------------------------
   */
  {
    // 仅适用于.vue文件
    files: ['**/*.vue'],
    plugins: {
      vue: pluginVue,
    },

    // 继承Vue基础规则
    ...pluginVue.configs['vue3-recommended'],
    languageOptions: {
      // 使用Vue专用解析器
      parser: vueParser,
      parserOptions: {
        // Vue文件中<script>部分使用TS解析器
        parser: tsParser,

        // 关联TS配置
        project: './tsconfig.app.json',
        tsconfigRootDir: import.meta.dirname,

        // 额外识别.vue扩展名
        extraFileExtensions: ['.vue'],
      },
      globals: {
        // Vue 3 宏编辑器
        // 1.防止被意外修改（如 defineProps = {} 会导致错误）
        // 2.提示开发者这些是特殊语法，不是普通函数或变量。
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
      },
    },
    rules: {
      // 模板中组件名帕斯卡命名
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          // 对所有组件生效（包括全局注册的）
          registeredComponentsOnly: false,

          // 可忽略的组件名
          ignores: [],
        },
      ],

      // 多单词组件名
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: [],
        },
      ],

      // 模板中使用双引号
      'vue/html-quotes': ['error', 'double'],

      // 强制 Composition API 风格
      'vue/component-api-style': ['error', ['script-setup']],

      // SFC 组件中强制顺序 强制script为setup 强制style为scoped script setup 中的代码块顺序规则
      'vue/block-order': [
        'error',
        {
          order: [
            // 模板
            'template',

            // 脚本
            'script[setup]',

            // 优先scoped
            'style[scoped]',

            // 全局样式
            'style',

            // 文档
            'docs',
          ],
        },
      ],

      // script/style块语言
      'vue/block-lang': [
        'error',
        {
          script: {
            // 允许 ts/js
            lang: ['ts', 'js'],
            allowNoLang: true,
          },
          style: {
            // 允许 css/scss
            lang: ['css', 'scss'],

            // 允许不指定 lang
            allowNoLang: true,
          },
        },
      ],

      // 每行最多属性数
      'vue/max-attributes-per-line': [
        'error',
        {
          // 单行最多3个属性
          singleline: 3,

          // 多行每行最多1个属性
          multiline: 3,
        },
      ],

      // 强制 v-bind 使用缩写 (:)
      'vue/v-bind-style': ['error', 'shorthand'],

      // 强制 v-on 使用缩写 (@)
      'vue/v-on-style': ['error', 'shorthand'],

      // 强制 v-slot 使用缩写 (#)
      'vue/v-slot-style': ['error', 'shorthand'],

      // 强制 v-for 必须设置 key
      'vue/require-v-for-key': 'error',

      // 定义宏的顺序
      'vue/define-macros-order': [
        'error',
        {
          order: ['import', 'defineProps', 'defineEmits', 'defineExpose', 'withDefaults'],
        },
      ],

      // Vue 中属性小驼峰
      'vue/attribute-hyphenation': [
        'error',
        'never',
        {
          // 允许特定前缀
          ignore: [
            'data-*',
            'aria-*',
            'slot-scope',
            'v-bind:*',
            'v-slot',
            'v-for',
            'v-if',
            'v-else',
            'v-else-if',
            'v-show',
            'v-model',
            'v-on:*',
            'v-text',
            'v-html',
            'v-pre',
            'v-cloak',
            'v-once',
          ],
        },
      ],

      /**
       * ---------------------------------------------------------------------
       * Prop 规范规则
       * ---------------------------------------------------------------------
       */
      // Prop 名称使用 camelCase
      'vue/prop-name-casing': ['error', 'camelCase'],

      // Prop 指定类型
      'vue/require-prop-types': 'error',

      // 必须添加 required 或 default
      'vue/require-default-prop': 'error',

      // validator 验证 禁止使用 v-html
      'vue/require-valid-default-prop': 'error',
    },
  },

  /**
   * ---------------------------------------------------------------------
   * 4. 特殊文件覆盖
   * ---------------------------------------------------------------------
   */
  {
    files: ['eslint.config.js'],
    rules: {
      // 禁用TypeScript的consistent-type-imports规则
      '@typescript-eslint/consistent-type-imports': 'off',
    },
  },

  {
    files: ['vite.config.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.vite.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
]);