/**
 * @file stylelint.config.js
 * @description Stylelint configuration for SCSS
 * extends: 继承自 stylelint-config-standard-scss
 * plugins: 使用 stylelint-scss 插件
 * rules: 定义了一些样式规则
 * ignoreFiles: 忽略特定目录下的文件
 */
export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-clean-order',
  ],
  plugins: [
    'stylelint-scss',
    'stylelint-no-unsupported-browser-features',
    'stylelint-order',
  ],
  ignoreFiles: [
    '**/dist/**', 
    '**/node_modules/**',
  ],
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
  rules: {
    /**
     * ------------------------------------------
     * 基础规则
     * ------------------------------------------
     */
    // 允许空样式文件
    'no-empty-source': null,

    /**
     * ------------------------------------------
     * 命名规范
     * ------------------------------------------
     */
    // 类名必须使用短横线命名法(kebab-case)
    // 错误提示示例：Class name should be lowercase with hyphens (like "news-list")
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(-[a-z0-9]+)*$',
      { message: 'Class name should be lowercase with hyphens (like "news-list")' },
    ],
  
    // 强制 ID 选择器使用短横线命名法 (kebab-case)
    'selector-id-pattern': [
      '^[a-z][a-z0-9]*(-[a-z0-9]+)*$', 
      { 
        message: 'ID 选择器应使用小写字母和短横线命名（如 "#main-nav"）', 
      },
    ],

    /**
     * ------------------------------------------
     * 属性相关
     * ------------------------------------------
     */
  
    // 禁止冗余的缩写属性值
    'shorthand-property-no-redundant-values': true,
    
    /**
     * ------------------------------------------
     * SCSS规范
     * ------------------------------------------
     */
    // @import必须包含扩展名
    'scss/load-partial-extension': 'always',
  
    // @extend必须使用占位符选择器  
    'scss/at-extend-no-missing-placeholder': true,
  
    // 变量名使用kebab-case格式
    'scss/dollar-variable-pattern': '^[a-z][a-z0-9]*(-[a-z0-9]+)*$',
    
    // 强制声明顺序（变量 → @extend → @include → 自身样式 → 嵌套 → 媒体查询）
    'order/order': [
      // css 自定义
      // 'custom-properties',
      'dollar-variables',
      {
        type: 'at-rule',
        name: 'extend',
      },
      {
        type: 'at-rule',
        name: 'include',
      },
      'declarations',
      'rules',
      {
        type: 'at-rule',
        name: 'media',      
      },
    ],

    /**
     * ------------------------------------------
     * 禁止规则
     * ------------------------------------------
     */
    // 允许@import在任何位置使用
    'no-invalid-position-at-import-rule': null,
  
    // 禁止重复属性声明  
    'declaration-block-no-duplicate-properties': true,
  
    // 禁止未知类型选择器
    'selector-type-no-unknown': [true, { ignoreTypes: [] }],
    
    /**
     * ------------------------------------------
     * 属性顺序
     * ------------------------------------------
     */
    // 属性书写顺序规则（布局→盒模型→排版→视觉→动画）
    'order/properties-order': [
      // 布局属性
      'position', 'z-index', 'top', 'right', 'bottom', 'left',
      'display', 'float', 'clear', 'flex', 'grid',
    
      // 盒模型
      'width', 'height', 'margin', 'padding', 'border', 'box-sizing',
    
      // 排版
      'font', 'color', 'text-align', 'line-height',
    
      // 视觉
      'background', 'box-shadow', 'opacity',
    
      // 动画
      'transition', 'animation',
    ],

    /**
     * ------------------------------------------
     * 嵌套规则
     * ------------------------------------------
     */
    // 完全禁用ID选择器
    'selector-max-id': 0,
  
    // 最大嵌套深度为3层  
    'max-nesting-depth': 3,
  
    // 禁止类型限定(如div.my-class)
    'selector-no-qualifying-type': true,
    
    /**
     * ------------------------------------------
     * 注释规范
     * ------------------------------------------
     */

    // 禁止行内 // 注释（只允许在代码上方）
    'scss/double-slash-comment-inline': 'never',  

    // 只允许  /** ... */ 区块注释
    'scss/comment-no-loud': [true, { 
      'allow': [ '/**' ],
    }],

    /**
     * ------------------------------------------
     * 浏览器兼容
     * ------------------------------------------
     */
    // 浏览器特性兼容性检查（不兼容时显示警告）
    'plugin/no-unsupported-browser-features': [
      true, 
      {
        // 警告级别
        severity: 'warning',  

        // 忽略 flexbox 和 CSS 嵌套、css-grid 特性
        ignore: ['flexbox', 'css-nesting', 'css-grid'], 
      },
    ],
  },
};