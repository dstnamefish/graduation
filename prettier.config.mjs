/**
 * @file prettier.config.mjs
 * @description Prettier 代码格式化配置
 * @author Frontend Team
 * @version 1.0.0
 */

/**
 * Prettier配置说明：
 * - 用于统一团队的代码格式化风格
 * - 避免因代码风格差异导致的Git冲突
 * - 配合编辑器插件实现代码自动格式化
 */
export default {
  // 箭头函数参数是否添加括号：always表示始终添加
  arrowParens: 'always',

  // JSX标签的右括号是否放在同一行
  bracketSameLine: false,

  // 对象字面量括号之间是否添加空格
  bracketSpacing: true,

  // 换行符风格：lf表示Unix风格换行符
  endOfLine: 'lf',

  // JSX中是否使用单引号
  jsxSingleQuote: false,

  // 覆盖特定文件类型的配置
  overrides: [
    {
      files: '*.vue',
      options: {
        htmlWhitespaceSensitivity: 'ignore',
        parser: 'vue',
        singleAttributePerLine: true,
        trailingComma: 'all',
      },
    },
    {
      files: '*.scss',
      options: {
        parser: 'scss',

        // SCSS中使用双引号
        singleQuote: false,
      },
    },
    {
      files: '*.json',
      options: {
        parser: 'json-stringify',
      },
    },
    {
      files: '*.md',
      options: {
        proseWrap: 'preserve',
        singleQuote: true,
      },
    },
  ],

  // 每行最大字符数
  printWidth: 500,

  // 对象属性引号使用方式：consistent表示保持一致
  quoteProps: 'consistent',

  // 语句末尾是否添加分号
  semi: true,

  // 是否使用单引号
  singleQuote: true,

  // 缩进宽度
  tabWidth: 2,

  // 尾随逗号配置：all表示所有情况下都使用尾随逗号
  trailingComma: 'all',

  // 是否使用制表符进行缩进
  useTabs: false,
};