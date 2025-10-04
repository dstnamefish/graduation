/**
 * @file stylelint.config.mjs
 * @description Stylelint 样式检查配置
 * @author Frontend Team
 * @version 1.0.0
 */

/**
 * Stylelint配置说明：
 * - 用于规范CSS/SCSS/Vue文件的样式编写
 * - 集成了标准规则集和SCSS特定规则
 * - 提供样式排序、命名规范等检查功能
 */
export default {
  /**
   * 继承的规则集
   * 包含标准CSS、SCSS、属性排序等规则
   * 用于统一项目的样式规范
   * stylelint-config-standard 包含标准的CSS规则
   * stylelint-config-standard-scss 包含SCSS特定规则
   * stylelint-config-clean-order 包含属性排序规则
   * stylelint-config-recess-order 包含推荐的属性排序规则
   */
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-clean-order',
    'stylelint-config-recess-order',
    'stylelint-config-recommended-vue',
  ],

  // 忽略检查的文件
  ignoreFiles: [
    '**/dist/**',
    '**/node_modules/**',
    '**/coverage/**',
    '**/*.min.css',
  ],

  // 针对不同文件类型的覆盖配置
  overrides: [
    {
      customSyntax: 'postcss-html',
      files: ['**/*.vue'],
    },
    {
      customSyntax: 'postcss-scss',
      files: ['**/*.scss'],
    },
    {
      customSyntax: 'postcss-html',
      files: ['**/*.html'],
    },
  ],

  /**
   * 启用的插件
   * 提供额外的语法支持、属性排序、浏览器兼容性检查等功能
   * stylelint-scss 提供SCSS语法支持
   * stylelint-order 提供属性排序功能
   * stylelint-no-unsupported-browser-features 检查浏览器兼容性
   * stylelint-declaration-block-no-ignored-properties 避免无效属性
   */
  plugins: [
    'stylelint-scss',
    'stylelint-order',
    'stylelint-no-unsupported-browser-features',
    'stylelint-declaration-block-no-ignored-properties',
  ],

  // 自定义规则
  rules: {
    // 禁止在@规则前空行
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['first-nested', 'blockless-after-blockless'],
        ignore: ['after-comment', 'inside-block'],
      },
    ],

    // Support for SCSS-specific at-rules
    'at-rule-no-unknown': [true, {
      ignoreAtRules: ['forward', 'use', 'mixin', 'include', 'if', 'else', 'each', 'for', 'function', 'return', 'extend', 'content', 'error'],
    }],

    // 注释前后空行规则
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['stylelint-commands', 'after-comment'],
      },
    ],

    // 禁止空注释
    'comment-no-empty': true,

    // 注释内容前后空格
    'comment-whitespace-inside': 'always',

    // 禁止重复属性声明
    'declaration-block-no-duplicate-properties': true,

    // 放宽关键帧命名规范，允许camelCase
    'keyframes-name-pattern': [
      '^[a-z][a-z0-9]*(-[a-z0-9]+)*|^[A-Z][a-zA-Z0-9]*$',
      {
        message: 'Keyframe name should be lowercase with hyphens (like "fade-in") or camelCase (like "fadeIn")',
      },
    ],

    'nesting-selector-no-missing-scoping-root': null,

    // 关闭选择器优先级规则
    'no-descending-specificity': null,

    /**
     * ------------------------------------------
     * 基础规则
     * ------------------------------------------
     */
    // 不允许空样式文件
    'no-empty-source': true,



    // 允许单行注释 (//)
    'no-invalid-double-slash-comments': null,

    /**
     * ------------------------------------------
     * 属性相关
     * ------------------------------------------
     */

    /**
     * ------------------------------------------
     * 禁止规则
     * ------------------------------------------
     */
    // 允许@import在任何位置使用
    'no-invalid-position-at-import-rule': null,

    // 不允许未知的动画名称
    'no-unknown-animations': true,

    // 强制声明顺序（变量 → @extend → @include → 自身样式 → 嵌套 → 媒体查询）
    'order/order': [
      // css 自定义
      // 'custom-properties',
      'dollar-variables',
      {
        name: 'extend',
        type: 'at-rule',
      },
      {
        name: 'include',
        type: 'at-rule',
      },
      'declarations',
      'rules',
      {
        name: 'media',
        type: 'at-rule',
      },
    ],

    /**
     * ------------------------------------------
     * 属性顺序
     * ------------------------------------------
     */
    // 属性书写顺序规则（布局→盒模型→排版→视觉→动画）
    'order/properties-order': [
      // 定位
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',

      // 盒模型 - 布局
      'display',
      'flex',
      'grid',
      'flex-basis',
      'flex-direction',
      'flex-flow',
      'flex-grow',
      'flex-shrink',
      'flex-wrap',
      'grid-area',
      'grid-auto-columns',
      'grid-auto-flow',
      'grid-auto-rows',
      'grid-column',
      'grid-column-end',
      'grid-column-gap',
      'grid-column-start',
      'grid-gap',
      'grid-row',
      'grid-row-end',
      'grid-row-gap',
      'grid-row-start',
      'grid-template',
      'grid-template-areas',
      'grid-template-columns',
      'grid-template-rows',
      'align-content',
      'align-items',
      'align-self',
      'justify-content',
      'justify-items',
      'justify-self',
      'order',
      'float',
      'clear',

      // 盒模型 - 尺寸
      'width',
      'height',
      'min-width',
      'min-height',
      'max-width',
      'max-height',
      'box-sizing',

      // 盒模型 - 内外边距
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',

      // 盒模型 - 边框
      'border',
      'border-top',
      'border-right',
      'border-bottom',
      'border-left',
      'border-width',
      'border-top-width',
      'border-right-width',
      'border-bottom-width',
      'border-left-width',
      'border-style',
      'border-top-style',
      'border-right-style',
      'border-bottom-style',
      'border-left-style',
      'border-color',
      'border-top-color',
      'border-right-color',
      'border-bottom-color',
      'border-left-color',
      'border-radius',
      'border-top-left-radius',
      'border-top-right-radius',
      'border-bottom-right-radius',
      'border-bottom-left-radius',

      // 排版 - 字体
      'font',
      'font-family',
      'font-size',
      'font-weight',
      'font-style',

      // 排版 - 文本
      'line-height',
      'color',
      'text-align',
      'text-decoration',
      'text-indent',
      'text-overflow',
      'text-shadow',
      'text-transform',
      'vertical-align',
      'white-space',
      'word-spacing',
      'letter-spacing',

      // 视觉 - 背景
      'background',
      'background-color',
      'background-image',
      'background-position',
      'background-repeat',
      'background-size',

      // 视觉 - 其他
      'box-shadow',
      'filter',
      'opacity',
      'outline',
      'visibility',
      'cursor',

      // 动画
      'transition',
      'transition-delay',
      'transition-duration',
      'transition-property',
      'transition-timing-function',
      'animation',
      'animation-name',
      'animation-duration',
      'animation-timing-function',
      'animation-delay',
      'animation-iteration-count',
      'animation-direction',
      'animation-fill-mode',
      'animation-play-state',
    ],

    // 不允许未知的CSS属性
    'property-no-unknown': true,

    'scss/at-else-empty-line-before': 'never',

    // @extend必须使用占位符选择器
    'scss/at-extend-no-missing-placeholder': true,

    // 要求@if语句的大括号换行
    'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',

    // 变量名使用kebab-case格式
    'scss/dollar-variable-pattern': '^[a-z][a-z0-9]*(-[a-z0-9]+)*$',

    // 禁止行内 // 注释
    'scss/double-slash-comment-inline': 'never',

    // 允许文件前缀带_
    'scss/load-no-partial-leading-underscore': null,

    /**
     * ------------------------------------------
     * SCSS规范
     * ------------------------------------------
     */
    // 允许不包含扩展名的@forward和@use语句
    'scss/load-partial-extension': null,

    // 在mixins中允许使用&符号作为嵌套选择器
    'scss/selector-no-redundant-nesting-selector': null,

    /**
     * ------------------------------------------
     * 命名规范
     * ------------------------------------------
     */
    // 类名使用kebab-case或camelCase
    // 错误提示示例：Class name should be lowercase with hyphens (like "news-list")
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(-[a-z0-9]+)*|^[a-z][a-zA-Z0-9]*$',
      { message: 'Class name should be lowercase with hyphens (like "news-list") or camelCase' },
    ],

    // 强制 ID 选择器使用短横线命名法 (kebab-case)
    'selector-id-pattern': [
      '^[a-z][a-z0-9]*(-[a-z0-9]+)*$',
      {
        message: 'ID 选择器应使用小写字母和短横线命名（如 "#main-nav"）',
      },
    ],

    // 允许使用ID选择器允许每个选择器中有一个ID选择器
    'selector-max-id': 1,

    // 最大嵌套深度为3层
    /*     'max-nesting-depth': 3, */

    /**
     * ------------------------------------------
     * 嵌套规则
     * -----------------------------------------
     */

    /**
     * ------------------------------------------
     * 注释规范
     * ------------------------------------------
     */

    // 禁止类型限定(如div.my-class)
    'selector-no-qualifying-type': true,

    // 允许Vue的deep伪类
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'v-deep', 'v-global', 'v-slotted'],
      },
    ],

    // 允许Vue的v-deep伪元素
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['deep', 'v-deep', 'v-global', 'v-slotted'],
      },
    ],

    // 禁止未知类型选择器
    'selector-type-no-unknown': [true, { ignoreTypes: [] }],

    // 禁止冗余的缩写属性值
    'shorthand-property-no-redundant-values': true,
  },
};