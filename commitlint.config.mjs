/**
 * @file commitlint.config.mjs
 * @description Git Commit Message 规范配置
 * @author Frontend Team
 * @extends @commitlint/config-conventional - 继承标准约定式提交规则
 * @version 1.0.0
 */

/**
 * Commitlint配置说明：
 * - 遵循Angular Commit Message规范
 * - 用于规范化Git提交信息格式
 * - 配合Husky使用，在提交前进行校验
 */
export default {
  // 继承基础配置
  extends: ['@commitlint/config-conventional'],

  // 忽略检查的文件
  ignoreFiles: ['**/dist/**', '**/node_modules/**'],

  // 高级解析配置
  parserPreset: {
    parserOpts: {
      headerCorrespondence: ['type', 'scope', 'subject'],
      headerPattern: /^(\w*)(?:\((.*)\))?:\s(.*)$/,
    },
  },

  // 自定义插件（当前未使用）
  plugins: [],

  // 自定义规则
  rules: {
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

    // 类型必须小写
    'type-case': [2, 'always', 'lower-case'],

    // 类型不能为空
    'type-empty': [2, 'never'],

    /**
     * --------------------------
     * 提交类型 (type) 规则
     * --------------------------
     * type是提交的类别，用于标识提交的性质
     * type必须是以下值之一：
     * - feat：新功能
     * - fix：修复错误
     * - docs：文档更新
     * - style：代码样式修改
     * - refactor：代码重构
     * - test：添加或修改测试
     * - chore：构建或工具链修改
     * - revert：回滚提交
     * - perf：性能优化
     * 级别：2表示错误，1表示警告，0表示关闭
     * 应用方式：always表示始终应用
     */
    'type-enum': [
      2,
      'always',
      [
        // 新功能：添加新的功能或API
        'feat',

        // Bug修复：修复代码中的错误
        'fix',

        // 文档更新：仅修改文档，不涉及代码
        'docs',

        // 代码样式：不影响代码功能的修改，如格式化、空格、分号等
        'style',

        // 代码重构：既不添加功能也不修复bug的代码修改
        'refactor',

        // 测试相关：添加或修改测试代码
        'test',

        // 构建或工具链：修改构建系统或外部依赖
        'chore',

        // 回滚提交：撤销之前的提交
        'revert',

        // 性能优化
        'perf',
      ],
    ],
  },
};