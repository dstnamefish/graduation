export default {
  // 基础配置
  printWidth: 100,            // 每行最大长度
  tabWidth: 2,                // 缩进宽度
  useTabs: false,             // 使用空格缩进
  semi: true,                 // 句末添加分号
  singleQuote: true,          // 使用单引号
  quoteProps: 'consistent',   // 对象属性引号一致性
  jsxSingleQuote: false,      // JSX中使用双引号
  trailingComma: 'all',       // 尾随逗号
  bracketSpacing: true,       // 对象大括号之间留空格
  bracketSameLine: false,     // HTML/JSX标签右括号换行
  arrowParens: 'avoid',       // 箭头函数参数无需括号
  endOfLine: 'lf',            // 换行符使用 LF
  
  // 覆盖特定文件类型的配置
  overrides: [
    {
      files: '*.vue',
      options: {
        parser: 'vue',
        htmlWhitespaceSensitivity: 'ignore',
      }
    },
    {
      files: '*.scss',
      options: {
        parser: 'scss',
        singleQuote: false,  // SCSS中使用双引号
      }
    }
  ]
};