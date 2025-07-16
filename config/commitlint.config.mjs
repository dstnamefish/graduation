/**
 * @file commitlint.config.js
 * @description Git Commit Message 规范配置
 * @extends @commitlint/config-conventional - 继承标准约定式提交规则
 * @rules 自定义规则覆盖
 */
export default {
  // 继承基础配置
  extends: ['@commitlint/config-conventional'],

  // 自定义插件
  plugins: [],

  // 忽略检查的文件（通常不需要配置）
  ignoreFiles: ['**/dist/**', '**/node_modules/**'],

  // 自定义规则
  rules: {
    /**
     * --------------------------
     * 提交类型 (type) 规则
     * --------------------------
     */
    'type-enum': [
      2,
      'always',
      [
        // 新功能
        'feat',

        // Bug修复
        'fix',

        // 文档更新
        'docs',

        // 代码样式调整（不影响逻辑）
        'style',

        // 代码重构
        'refactor',

        // 测试相关
        'test',

        // 构建或工具链变更
        'chore',

        // 回滚提交
        'revert',

        // 性能优化
        'perf',
      ],
    ],

    // 类型必须小写
    'type-case': [2, 'always', 'lower-case'],

    // 类型不能为空
    'type-empty': [2, 'never'],

    /**
     * --------------------------
     * 提交范围 (scope) 规则
     * --------------------------
     */
    // 范围必须小写
    'scope-case': [2, 'always', 'lower-case'],

    // 范围建议填写（警告级别）
    'scope-empty': [1, 'never'],

    /**
     * --------------------------
     * 提交主题 (subject) 规则
     * --------------------------
     */
    // 主题大小写不限制（关闭规则）
    'subject-case': [0],

    // 主题不能为空
    'subject-empty': [2, 'never'],

    // 允许主题以句号结尾
    'subject-full-stop': [0],

    // 主题最长72字符
    'subject-max-length': [2, 'always', 72],

    /**
     * --------------------------
     * 正文和脚注规则
     * --------------------------
     */
    // 正文前需空行
    'body-leading-blank': [2, 'always'],

    // 正文行长度警告
    'body-max-line-length': [1, 'always', 100],

    // 脚注前需空行
    'footer-leading-blank': [2, 'always'],

    // 脚注行长度警告
    'footer-max-line-length': [1, 'always', 100],
  },

  // 高级解析配置
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w*)(?:\((.*)\))?:\s(.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },
};