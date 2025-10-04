/**
 * @file eslint.config.mjs
 * @description ESLint 配置文件
 * @author Frontend Team
 * @version 1.0.0
 */

/**
 * ESLint配置说明：
 * - 基于ESLint最新的扁平配置格式
 * - 集成TypeScript、Vue3、Import等插件
 * - 提供严格且合理的代码质量检查规则
 */

// 导入ESLint核心及相关插件
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import pluginVue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

/**
 * 配置项说明：
 * - files: 指定规则适用的文件模式
 * - ignores: 忽略检查的文件或目录
 * - plugins: 加载并使用的ESLint插件
 * - extends: 继承的预设规则集
 * - languageOptions: 语言选项配置
 * - rules: 自定义规则覆盖
 */
export default defineConfig([
  /**
   * ---------------------------------------------------------------------
   * 1. 全局规则
   * ---------------------------------------------------------------------
   */
  {
    extends: ['js/recommended'],

    // 适用于所有 JS/TS/Vue 文件
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],

    // 忽略dist和node_modules目录
    ignores: ['**/dist/**', '**/node_modules/**', './vite.config.ts'],

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
        extraFileExtensions: ['.vue'],
        sourceType: 'module',
      },
    },

    plugins: {
      'import': importPlugin,
      js,
      'perfectionist': perfectionistPlugin,
      'vue': pluginVue,
    },

    // 规则配置
    rules: {
      // 箭头函数参数必须括号
      'arrow-parens': ['error', 'always'],

      // 多行结构必须有尾随逗号
      'comma-dangle': ['error', 'always-multiline'],

      // 强制所有控制语句使用大括号
      'curly': ['error', 'all'],

      // 禁止文件末尾换行
      'eol-last': ['error', 'never'],

      // 导入排序规则 - 使用perfectionist插件的规则(在下方定义)
      'import/order': 'off',

      /**
       * ---------------------------------------------------------------------
       * 1.3 导入/导出规则
       * ---------------------------------------------------------------------
       */

      // 缩进规范
      'indent': [
        'error',
        2,
        {
          ignoredNodes: ['TemplateLiteral *'],
          SwitchCase: 1,
        },
      ],

      // JSX 使用双引号
      'jsx-quotes': ['error', 'prefer-double'],

      // 单行注释在行首
      'line-comment-position': ['error', { position: 'above' }],

      // 注释前必须有空行（除非在块开始处）
      'lines-around-comment': [
        'error',
        {
          allowArrayStart: true,
          allowBlockStart: true,
          allowObjectStart: true,
          beforeBlockComment: true,
          beforeLineComment: true,
        },
      ],

      /**
       * ---------------------------------------------------------------------
       *  1.1 默认 & 最佳实践
       * ---------------------------------------------------------------------
       */
      // 生产环境禁止console，开发环境警告
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

      // 禁止使用空格缩进
      'no-trailing-spaces': ['error', { ignoreComments: false, skipBlankLines: false }],

      // 对象大括号之间有空格
      'object-curly-spacing': ['error', 'always'],

      // Perfectionist 插件规则 - 导入排序(替代 import/order，提供更丰富的功能)
      'perfectionist/sort-imports': ['error', {
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
        'internalPattern': ['^@/'],
        'order': 'asc',
        'type': 'alphabetical',
      }],

      // Perfectionist 插件规则 - 排序命名导出
      'perfectionist/sort-named-exports': ['error', {
        order: 'asc',
        type: 'alphabetical',
      }],

      // Perfectionist 插件规则 - 排序对象类型
      'perfectionist/sort-object-types': ['error', {
        order: 'asc',
        type: 'alphabetical',
      }],

      // Perfectionist 插件规则 - 排序对象属性
      'perfectionist/sort-objects': ['error', {
        order: 'asc',
        type: 'alphabetical',
      }],

      // 对象属性引号一致
      'quote-props': ['error', 'consistent'],

      // 使用单引号
      'quotes': ['error', 'single', { avoidEscape: true }],

      /**
       * ---------------------------------------------------------------------
       * 1.4 Prettier 代码格式化
       * prettier只进行格式化，保存文件时自动应用
       * eslint只负责检查代码规范
       * ---------------------------------------------------------------------
       */
      // 必须有分号
      'semi': ['error', 'always'],

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
          block: {
            // 要求 /* 和 */ 对称
            balanced: true,

            // 允许 /* 后紧跟 * （文档注释）
            exceptions: ['*'],

            // 允许 /** 和 /*!
            markers: ['!', '*'],
          },
          line: {
            // 允许 //- //+ //#
            exceptions: ['-', '+', '#'],

            // 允许三斜线注释
            markers: ['/', '-', '+', '#'],
          },
        },
      ],
    },

    // 插件特定设置
    settings: {
      // 指定哪些文件由TS解析器处理
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.mts', '.cts'],
      },

      // 配置import解析器
      'import/resolver': {
        node: true,
        typescript: {
          // 优先尝试TypeScript类型解析
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
  },

  /**
   * ---------------------------------------------------------------------
   * 2. TypeScript文件特定配置
   * ---------------------------------------------------------------------
   */
  {
    // 继承TypeScript推荐规则
    extends: [tseslint.configs.recommended],

    // 仅适用于.ts/.mts/.cts文件
    files: ['**/*.{ts,mts,cts}'],
    languageOptions: {
      // 使用TS专用解析器
      parser: tsParser,
      parserOptions: {
        // 关联TS配置文件
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // 关闭强制要求函数必须显式声明返回类型
      '@typescript-eslint/explicit-function-return-type': 'off',

      // 命名规范规则
      '@typescript-eslint/naming-convention': [
        'error',

        // 禁止下划线/美元符结尾（针对所有标识符）
        {
          custom: {
            match: true,
            regex: '^[a-zA-Z][a-zA-Z0-9]*(?<![_$])$',
          },
          format: null,
          selector: 'default',
        },

        // 全局常量（全大写+下划线）
        {
          custom: {
            match: true,
            regex: '^[A-Z][A-Z0-9]*(_[A-Z0-9]+)+$',
          },

          // 通过文件名/路径限定全局常量
          filter: {
            match: true,

            // 仅匹配常量文件或配置文件
            regex: '(constants|config|enum|enums)\\.(ts|js)$',
          },
          format: ['UPPER_CASE'],
          modifiers: ['const'],
          selector: 'variable',
          types: ['boolean', 'number', 'string'],
        },

        // 普通变量使用小驼峰
        {
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'forbid',
          selector: 'variable',
        },

        // 函数使用小驼峰
        {
          format: ['camelCase'],
          leadingUnderscore: 'forbid',
          selector: 'function',
        },

        // 参数使用小驼峰
        {
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          selector: 'parameter',
        },

        // 属性使用小驼峰
        {
          format: ['camelCase'],
          leadingUnderscore: 'forbid',
          selector: 'property',
        },

        // 方法使用小驼峰
        {
          format: ['camelCase'],
          leadingUnderscore: 'forbid',
          selector: 'method',
        },

        // 私有成员必须下划线前缀
        {
          format: ['camelCase'],
          leadingUnderscore: 'require',
          modifiers: ['private'],
          selector: 'memberLike',
        },

        // 类使用帕斯卡命名
        {
          format: ['PascalCase'],
          selector: 'class',
        },

        // 接口使用帕斯卡命名
        {
          format: ['PascalCase'],
          selector: 'interface',
        },

        // 枚举成员
        {
          format: ['PascalCase', 'UPPER_CASE'],
          selector: 'enumMember',
        },
      ],

      // 禁止使用 any 类型，如果使用了会发出 警告（warn），但不会阻止代码运行
      '@typescript-eslint/no-explicit-any': 'warn',
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
      globals: {
        computed: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',

        // Vue 3 宏编辑器
        // 1.防止被意外修改（如 defineProps = {} 会导致错误）
        // 2.提示开发者这些是特殊语法，不是普通函数或变量。
        defineProps: 'readonly',

        inject: 'readonly',
        nextTick: 'readonly',
        onBeforeMount: 'readonly',
        onBeforeUnmount: 'readonly',
        onMounted: 'readonly',
        onUnmounted: 'readonly',
        provide: 'readonly',
        reactive: 'readonly',
        readonly: 'readonly',

        // Vue Composition API functions
        ref: 'readonly',
        toRefs: 'readonly',
        watch: 'readonly',
        watchEffect: 'readonly',
        withDefaults: 'readonly',
      },

      // 使用Vue专用解析器
      parser: vueParser,
      parserOptions: {
        // 额外识别.vue扩展名
        extraFileExtensions: ['.vue'],

        // Vue文件中<script>部分使用TS解析器
        parser: tsParser,

        // 关联TS配置
        project: './tsconfig.json',

        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // 禁用命名规范检查
      '@typescript-eslint/naming-convention': 'off',

      // 允许使用any类型
      '@typescript-eslint/no-explicit-any': 'off',

      // 禁用import插件的导入顺序检查
      'import/order': 'off',

      // 禁用注释位置检查
      'line-comment-position': 'off',

      // 允许console语句
      'no-console': 'off',

      // 允许未定义变量（可能是全局注入的）
      'no-undef': 'off',

      // 允许未使用变量
      'no-unused-vars': 'off',

      // 允许不必要的转义字符
      'no-useless-escape': 'off',

      // 禁用导入排序检查
      'perfectionist/sort-imports': 'off',

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

      // script/style块语言
      'vue/block-lang': [
        'error',
        {
          script: {
            allowNoLang: true,

            // 允许 ts/js
            lang: ['ts', 'js'],
          },
          style: {
            // 允许不指定 lang
            allowNoLang: true,

            // 允许 css/scss
            lang: ['css', 'scss'],
          },
        },
      ],

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

      // 强制 Composition API 风格
      'vue/component-api-style': ['error', ['script-setup']],

      // 模板中组件名帕斯卡命名
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          // 可忽略的组件名
          ignores: [],

          // 对所有组件生效（包括全局注册的）
          registeredComponentsOnly: false,
        },
      ],

      // 定义宏的顺序
      // 临时禁用，因为它与其他规则可能有冲突
      'vue/define-macros-order': 'off',

      // 模板中使用双引号
      'vue/html-quotes': ['error', 'double'],

      // 每行最多属性数
      'vue/max-attributes-per-line': [
        'error',
        {
          // 多行每行最多1个属性
          multiline: 3,

          // 单行最多3个属性
          singleline: 3,
        },
      ],

      // 多单词组件名 - 允许单单词组件名（如index.vue）
      'vue/multi-word-component-names': 'off',

      /**
       * ---------------------------------------------------------------------
       * Prop 规范规则
       * ---------------------------------------------------------------------
       */
      // Prop 名称使用 camelCase
      'vue/prop-name-casing': ['error', 'camelCase'],

      // 必须添加 required 或 default
      'vue/require-default-prop': 'error',

      // Prop 指定类型
      'vue/require-prop-types': 'error',

      // 强制 v-for 必须设置 key
      'vue/require-v-for-key': 'error',

      // validator 验证 禁止使用 v-html
      'vue/require-valid-default-prop': 'error',

      // 强制 v-bind 使用缩写 (:)
      'vue/v-bind-style': ['error', 'shorthand'],

      // 强制 v-on 使用缩写 (@)
      'vue/v-on-style': ['error', 'shorthand'],

      // 强制 v-slot 使用缩写 (#)
      'vue/v-slot-style': ['error', 'shorthand'],
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
    files: ['./vite.config.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/naming-convention': 'off',
    },
  },
]);