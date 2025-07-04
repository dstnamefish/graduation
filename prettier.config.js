export default {
  // 每行最大长度
  printWidth: 100,            

  // 缩进宽度
  tabWidth: 2,                

  // 使用空格缩进
  useTabs: false,             

  // 句末添加分号
  semi: true,                 

  // 使用单引号
  singleQuote: true,          

  // 对象属性引号一致性
  quoteProps: 'consistent',   

  // JSX中使用双引号
  jsxSingleQuote: true,      

  // 尾随逗号
  trailingComma: 'all',       

  // 对象大括号之间留空格
  bracketSpacing: true,       

  // HTML/JSX标签右括号换行
  bracketSameLine: false,     

  // 箭头函数参数无需括号
  arrowParens: 'avoid',       

  // 换行符使用 LF
  endOfLine: 'lf',            
  
  // 覆盖特定文件类型的配置
  overrides: [
    {
      files: '*.vue',
      options: {
        parser: 'vue',
        htmlWhitespaceSensitivity: 'ignore',
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
  ],
};