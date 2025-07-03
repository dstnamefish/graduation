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
    '@stylistic/stylelint-plugin',
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
  
    // 文件末尾必须有空行  
    'rule-empty-line-before': ['always', {
      'except': ['first-nested'],
      'ignore': ['after-comment'],
    }],

    // 禁止行尾空格
    '@stylistic/no-eol-whitespace': true,


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
     * 书写格式
     * ------------------------------------------
     */
    /*     // 块开括号前必须有空格
    'block-opening-brace-space-before': 'always',
  
    // 属性冒号后必须有空格
    'stylistic/declaration-colon-space-after': 'always',
  
    // 属性冒号前不能有空格  
    'stylistic/declaration-colon-space-before': 'never',
  
    // 分号前不能有空格
    'stylistic/declaration-block-semicolon-space-before': 'never',
  
    // 分号后必须换行
    'stylistic/declaration-block-semicolon-newline-after': 'always',
  
    // 选择器列表逗号后换行
    'stylistic/selector-list-comma-newline-after': 'always',
  
    // 组合器后必须有空格
    'stylistic/selector-combinator-space-after': 'always',
  
    // 组合器前必须有空格  
    'stylistic/selector-combinator-space-before': 'always', */

    /**
     * ------------------------------------------
     * 属性相关
     * ------------------------------------------
     */
    // 长度为0时不要单位
    'length-zero-no-unit': true,
  
    // 小数必须有前导0  
    /* 'number-leading-zero': 'always', */
  
    // 颜色值使用大写字母
    /* 'color-hex-case': 'upper', */
  
    // url()必须加引号  
    'function-url-quotes': 'always',
  
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
    // 强制注释内容与星号间有空格: /* 正确 */
    'comment-whitespace-inside': 'always', 

    // 禁止行内 // 注释（只允许在代码上方）
    'scss/double-slash-comment-inline': 'never',  

    // 只允许  /** ... */ 区块注释
    'scss/comment-no-loud': [true, { 
      'allow': [ '/**' ],
    }], 

    // 强制文档注释用 /** ... */
    /* 'scss/comment-no-redundant': [true, {
      'style': 'docblock', 
      'tags': ['@description', '@param', '@return'],
    }], */

    // 强制注释内容必须包含特定关键词（如 hack、fixme、magic）
    /* 'scss/comment-required': [true, {
      'terms': ['hack', 'fixme', 'magic'], 
      'severity': 'error',
    }],  */
  

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