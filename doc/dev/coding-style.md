# 编码规范文档
本编码规范文档适用于基于 **Vue 3 + Composition API + Vite + Element Plus + Pinia + TypeScript + TailWindCss** 技术栈的前端项目，旨在统一团队开发标准、提升代码可读性和可维护性。文档涵盖**代码结构、命名规则、组件开发、状态管理、样式规范**等核心内容，并提供具体示例和最佳实践。

## 一、编码规约
### 1.1 项目命名 
全部采用小写方式，采用中线分隔。<br/>
**适用范围**：项目根目录,Git仓库名称,部署包文件名<br/>
**正例:** mail-management-system <br/>
**反例:** mail_management-system/mailManagementSystem

### 1.2 目录命名
全部采用小写方式，以中划线分隔，有复数结构时，要采用复数命名法，缩写不用复数。<br/>
**正例:** scripts/styles/components/images/utils/layouts/demo-styles/demo-scripts/img/doc<br/>
**反例:** script/style/demo-scripts/demoStyles/imgs/docs

[<font color=Orange>特殊</font>]Vue的项目中的components中的组件目录，使用kebab-case命名。<br/>
**正例:** head-search/page-loading/authorized/notice-icon<br/>
**反例:** HeadSearch/PageLoading

[<font color=Orange>特殊</font>]Vue的项目中除components组件目录外的所有目录也使用kebab-case命名<br/>
**正例:** page-one/shopping-car/user-management<br/>
**反例:** ShoppingCar/UserManagement

### 1.3 文件命名
根据具体情况进行来分析。<br/>
| 文件类型       | 规范                | 正例                          | 反例                  |
|----------------|---------------------|-------------------------------|-----------------------|
| Vue组件        | PascalCase.vue      | `UserProfile.vue`             | `userProfile.vue`     |
| JS/TS工具      | kebabCase.[jt]s    | `formatDate.ts`              | `format-date.js`       |
| SCSS模块       | `[_]kebab-case.scss`  | `_color-variables.scss`       | `_colorVariables.scss`|
| HTML入口       | kebab-case.html     | `error-page.html`             | `errorPage.html`      |
| 图片资源       | [功能]-[描述].[ext] | `icon-close.svg`/`bg-login.webp` | `closeIcon.png`     |

[<font color=Orange>特殊</font>]<br/>
1. 组件入口文件可命名为`index.vue`（需配合PascalCase目录名）
2. 测试文件追加`.spec`/`.test`后缀：`user-store.spec.ts`

### 1.4 命名严谨性
代码中的命名严禁使用拼音与英文混合的方式，更不允许直接使用中文的方式。说明:正确的 英文拼写和语法可以让阅读者易于理解，避免歧义。注意，即使纯拼音命名方式也要避免采用<br/>
**正例:** learn/luoyangr/rmb 等国际通用的名称，可视同英文<br/>
**反例:** DaZhePromotion[<font color=Orange>打折</font>]/getPingfenByName[<font color=Orange>评分</font>]/int 某变量 = 3<br/>
杜绝完全不规范的缩写，避免望文不知义:<br/>
**反例:** <br/>将 AbstractClass “缩写” 命名成 AbsClass;将 condition “缩写” 命名成 condi ，此类随意缩写严重降低了代码的可阅读性。<br/>
在**TS/JS**中布尔变量需带判断前缀和事件处理函数语义化。<br/>
**正例：**
```javascript
// 布尔变量需带判断前缀
const isActive = ref(true)
const hasPermission = computed(() => ...)
// 事件处理函数语义化
function submitSearchForm() {}
```
**反例：**
```javascript
function handleSearchInput() {}
```


## 二、HTML/Vue Template 编码规范
### 2.1 HTML 类型
推荐使用 HTML5 的文档类型申明:<br/>
**正例:**
```html
<!DOCTYPE html>
<html>
  <head> 
      <meta http-equiv="X-UA-Compatible" content="IE=Edge" /> 
      <meta charset="UTF-8" /> 
      <title>Page title</title> 
  </head>
  <body> 
     <img src="images/company-logo.png" alt="Company">
  </body> 
</html>
```

**Vue单文件组件补充：**
```html
<!-- 模块根元素需唯一 -->
<template>
  <div class = "page-contianer">
    <!-- ... -->
  </div>
</template>
```


### 2.2 缩进
缩进使用 2 个空格（一个 tab）;<br/>
嵌套的节点应该缩进。
嵌套层级不超过 4 层。<br/>
**工具配置（替代手动检查）：**
```json
// .prettierrc
{
  "htmlWhitespaceSensitivity": "ignore",
  "tab": 2,
  "signleAttributePerLine": true //属性超长时换行
}
```

### 2.3 注释
#### 2.3.1 通用原则
**注释目的：**
1. 解释代码为什么这样做（而非是什么）。
2. 说明复杂逻辑、设计决策、潜在风险或替代方案。
3. 避免注释显而易见的代码（如// 增加计数）。<br/>

**保持更新：**
1. 代码更新时同步更新注释，过时注释比没有更糟。<br/>

**语言一致性：**
1. 团队统一使用中文或英文（建议中文为主，国际化项目使用英文）。

#### 2.3.2 JavaScript/TypeScript注释规范
**1. 单行注释**
单行注释使用 //，<br/>注释应单独一行写在被注释对象的上方，不要追加在某条语句的后面。<br/>
**推荐:**
```javascript
// is current tab
const active = true
```
**不推荐:**
```javascript
const active = true // is current tab
```
注释行的上方需要有一个空行 **（除非注释行上方是一个块的顶部）**，以增加可读性。<br/>
**推荐:**
```javascript
function getType () {  
  console.log('fetching type...')
  
  // set the default type to 'no type'
  const type = this.type || 'no type'
  return type
}

// 注释行上面是一个块的顶部时不需要空行
function getType () {  
  // set the default type to 'no type'
  const type = this.type || 'no type'            
  return type
}
```
**不推荐:**
```javascript
function getType () {  
  console.log('fetching type...')
  // set the default type to 'no type'
  const type = this.type || 'no type'
  return type
}
```
**2. 多行注释**
多行注释使用 /** ... */，而不是多行的 //。<br/>
**推荐:**
```javascript
/**
 * make() returns a new element
 * based on the passed-in tag name
 */
function make (tag) {
  // ...
  return element
}
```
**不推荐:**
```javascript
// make() returns a new element
// based on the passed in tag name
function make (tag) {
  // ...
  return element
}
```
**3. 注释空格**
注释内容和注释符之间需要有一个空格，以增加可读性。eslint: ```spaced-comment```。<br/>
**推荐:**
```javascript
// is current tab
const active = true
/**
 * make() returns a new element
 * based on the passed-in tag name
 */
function make(tag) {  
  // ...
  return element
}
```
**不推荐:**
```javascript
//is current tab
const active = true
/**
 *make() returns a new element
 *based on the passed-in tag name
 */
function make(tag) {  
  // ...
  return element
}
```
**4. 特殊标记**
有时我们发现某个可能的 bug，但因为一些原因还没法修复；或者某个地方还有一些待完成的功能，这时我们需要使用相应的特殊标记注释来告知未来的自己或合作者。常用的特殊标记有两种：<br/>
- // FIXME : 说明问题是什么
- // TODO : 说明还要做什么或者问题的解决方案
```javascript
class Calculator extends Abacus {
  constructor () {
    super ()
      // FIXME: shouldn’t use a global here
      total = 0
      // TODO: total should be configurable by an options param
      this.total = 0
  }
}
```
**5. 文档类注释**
文档类注释，如函数、类、文件、事件等；都使用 jsdoc/tsdoc 规范。<br/>
**推荐:**
```javascript
/**
 * Book类，代表一个书本.
 * @constructor
 * @param {string} title - 书本的标题.
 * @param {string} author - 书本的作者.
 */
function Book (title, author) {
  this.title = title
  this.author = author
}
Book.prototype = {
  /**
   * 获取书本的标题
   * @returns {string|*}
   */
  getTitle: function () {
    return this.title
  },
  /**
   * 设置书本的页数
   * @param pageNum {number} 页数
   */
  setPageNum: function (pageNum) {
    this.pageNum=pageNum
  }
}
```

#### 2.3.3 Vue 注释规范
1. 模板注释
```vue
<template>
<!-- 用户信息卡片-->
<div class="user-card">
  <!-- 头像 -->
  <Avatar :src = "user.avatar" @click="handleAvatarClick"/>

  <!-- 折叠内容（仅管理员可见） -->
  <div v-if="user.role === 'admin' " class="admin-panel">
    <!-- ... -->
  </div>
</div>
</template>
```

#### 2.3.4 CSS/SCSS注释规范
1. 单行注释
```scss
/* Comment Text */ 
.jdc {} 
/* Comment Text */ 
.jdc {}
```
2. 文件注释
```scss
@charset "UTF-8";
/**
 * @desc File Info
 * @author Author Name
 * @date 2015-10-10
 */
```
3. 模块注释
```scss
/* Module A
---------------------------------------------------------------- */
.mod_a {}
/* Module B
---------------------------------------------------------------- */
.mod_b {}
```
4. 特殊说明
```scss
.btn-primary {
  // 修复 iOS 上的圆角问题
  -webkit-border-radius: 4px;
  border-radius: 4px;
  
  // 渐变背景在 IE 10+ 有效
  background: linear-gradient(to bottom, #fff 0%, #eee 100%);
}
```
5. SCSS 变量 / 混合器注释
```scss
/**
 * 颜色变量
 * @type {Object}
 */
$colors: (
  primary: #165DFF, // 主色调
  success: #00B42A, // 成功色
  danger: #F53F3F,  // 错误色
);

/**
 * 水平居中
 * @mixin
 */
@mixin center-block {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
```

### 2.4 语义化标签
HTML5 中新增很多语义化标签，所以优先使用语义化标签，避免一个页面都是 div 或者 p 标 签。<br/>
**正例:**
```html
<header></header> 
<footer></footer>
```
**反例:**
```html
<div> 
  <p></p>
</div>
```

### 2.5 引号
使用双引号(" ") 而不是单引号(’ ') 。<br/>
**正例:**```<div class = "box"></div>```<br/>
**反例:**```<div class = 'box'><div>```<br/>
[特殊]属性值内包含引号时：外层用双引号，内层用单引号

## 三、CSS 规范
### 3.1 命名
- 类名使用小写字母，以中划线分隔
- id 采用驼峰式命名
- scss 中的变量、函数、混合、placeholder 采用驼峰式命名
ID 和 class 的名称总是使用可以反应元素目的和用途的名称，或其他通用的名称，代替表象和晦涩难懂的名称。<br/>

**不推荐:**
```css
.fw-800 {
    font-weight: 800;
  }
.red {
    color: red; 
  }
```
**推荐:**
```css
.heavy {
   font-weight: 800;
  }
.important { 
    color: red; 
  }
```

### 3.2 选择器
1. **css 选择器中避免使用标签名**<br/>
从结构、表现、行为分离的原则来看，应该尽量避免 css 中出现 HTML 标签，并且在 css 选择器中出现标签名会存在潜在的问题。

2. **使用直接子选择器**<br/>
很多前端开发人员写选择器链的时候不使用直接子选择器（注:直接子选择器和后代选择器的区别 ）。有时，这可能会导致疼痛的设计问题并且有时候可能会很耗性能。然而，在任何情况下，这是一个非常不好的做法。如果你不写很通用的，需要匹配到 DOM 末端的选择器，你应该总是考虑直接子选择器。<br/>

**不推荐:**
```css
.content .title {
    font-size: 2rem;
  }
```
**推荐:**
```css
.content > .title {
    font-size: 2rem;
  }
```

### 3.3 尽量使用缩写属性

**不推荐:**
```css
border-top-style: none; 
font-family: palatino, georgia, serif; 
font-size: 100%; line-height: 1.6; 
padding-bottom: 2em; 
padding-left: 1em;
padding-right: 1em; 
padding-top: 0;
```

**推荐:**
```css
border-top: 0; 
font: 100%/1.6 palatino, georgia, serif; 
padding: 0 1em 2em;

/* 明确指定左右边距 */
.box {
  margin: 0 10px; /* 优于 margin-right: 10px; margin-left: 10px; */
}
```

### 3.4 代码格式
每个选择器及属性独占一行<br/>
**推荐:**
```css
button { 
    width: 100px; 
    height: 50px;
    color: #fff;
    background: #00a0e9;
}
```
**不推荐:**
```css
button {
  width: 100px; height: 50px;
  color: #fff;
  background: #00a0e9; 
}
```
属性排序
1. 布局属性（display,position...）
2. 盒模型（width,padding...）
3. 文本相关（font,color...）
4. 视觉效果（background,border...）
5. 其他（animation,transition...）

### 3.5 省略 0 后面的单位
**不推荐:**
```css
div {
    padding-bottom: 0px; 
    margin: 0em;
}
```
**推荐:**
```css
div {
    padding-bottom: 0; 
    margin: 0; 
}
```

### 3.6 避免使用 ID 选择器及全局标签选择器防止污染全局样式
**不推荐:**
```css
#header {
 padding-bottom: 0px; 
 margin: 0em;
}
```
**推荐:**
```css
.header { 
    padding-bottom: 0px; 
    margin: 0em; 
}
```


## 四、Scss 规范
### 4.1 代码组织
1. 将公共的Scss文件放置在assets中
2. 按以下的顺序组织
变量声明;<br/>
@extend占位符;<br/>
@include引入的混合;<br/>
自身样式规则;<br/>
嵌套的子元素样式;<br/>
媒体查询;
```scss
//变量
$button-padding: 12px 24px;

//占位符
%button-base{
  display: inline-block;
  border-radius: 4px;
}

// Mixin
@mixin button-variant($bg, $color){
  background: $bg;
  color: $color;
}

// 基础样式
.button{
  @extend %button-base;
  padding: $button-padding;
  
  // 变体
  &--primary{
    @include button-variant($color-primary, white);
  }

  // 状态
  &:hover{
    opacity: 0.9;
  }

  // 媒体查询
  @media(max-width: 768px){
    padding: 8px 16px;
  }
}
```

### 4.2 避免嵌套层级过多
要限制样式嵌套深度为 3 级，若嵌套超 4 级，需重新评估，这样能避免产生过于复杂、冗余的 CSS 选择器，减少大量嵌套规则。当嵌套影响到代码可读性时，就应打断嵌套结构，同时建议别让嵌套规则的代码行数超过 20 行。
```scss
// 推荐（不超过3层嵌套）
.menu {
  &__item {
    &:hover {
      color: $color-primary;
    }
  }
}

// 不推荐（嵌套过深）
.page {
  .content {
    .article {
      .title {
        // ...
      }
    }
  }
}
```

## 五、Javascript 规范
### 5.1 命名
1. **采用小写驼峰命名 lowerCamelCase，代码中的命名均不能以下划线或美元符号结束**<br/>
**正例:** ```name```<br/>
**反例:** ```name_ / name$```

2. **方法名、参数名、成员变量、局部变量都统一使用 lowerCamelCase 风 格，必须遵从小驼峰形式**<br/>
**正例:** ```localValue / getHttpMessage() / inputUserId```<br/>
其中 method 方法命名必须是 动词 或者 动词+名词 形式<br/>
**正例:** ```saveShopCarData /openShopCarInfoDialog```<br/>
**反例:** ```save / open / show / go``` <br/>
**特此说明，增删查改，详情统一使用如下 5 个单词，不得使用其他（目的是为了统一各个端）**
```
add / update / delete / detail / get 
附: 函数方法常用的动词: 
get 获取/set 设置, 
add 增加/remove 删除, 
create 创建/destory 销毁, 
start 启动/stop 停止, 
open 打开/close 关闭, 
read 读取/write 写入, 
load 载入/save 保存,
begin 开始/end 结束, 
backup 备份/restore 恢复,
import 导入/export 导出, 
split 分割/merge 合并,
inject 注入/extract 提取,
attach 附着/detach 脱离, 
bind 绑定/separate 分离, 
view 查看/browse 浏览, 
edit 编辑/modify 修改,
select 选取/mark 标记, 
copy 复制/paste 粘贴,
undo 撤销/redo 重做, 
insert 插入/delete 移除,
add 加入/append 添加, 
clean 清理/clear 清除,
index 索引/sort 排序,
find 查找/search 搜索, 
increase 增加/decrease 减少, 
play 播放/pause 暂停, 
launch 启动/run 运行, 
compile 编译/execute 执行, 
debug 调试/trace 跟踪, 
observe 观察/listen 监听,
build 构建/publish 发布,
input 输入/output 输出,
encode 编码/decode 解码, 
encrypt 加密/decrypt 解密, 
compress 压缩/decompress 解压缩, 
pack 打包/unpack 解包,
parse 解析/emit 生成,
connect 连接/disconnect 断开,
send 发送/receive 接收, 
download 下载/upload 上传, 
refresh 刷新/synchronize 同步,
update 更新/revert 复原, 
lock 锁定/unlock 解锁, 
check out 签出/check in 签入, 
submit 提交/commit 交付, 
push 推/pull 拉,
expand 展开/collapse 折叠, 
enter 进入/exit 退出,
abort 放弃/quit 离开, 
obsolete 废弃/depreciate 废旧, 
collect 收集/aggregate 聚集
```

3. **常量命名全部大写，单词间用下划线隔开，力求语义表达完整清楚， 不要嫌名字长**<br/>
**正例:** ```MAX_STOCK_COUNT```<br/>
**反例:** ```MAX_COUNT```

4. **类与构造函数统一采用LowerCamelCase风格，必须遵守大骆峰形式**<br/>
**正例:** ```LowerCamelCase/Lower/LowerCamel```<br/>
**反例:** ```lowercamelcase/lower/lowercamel```<br/>

5. **私有成员前缀下划线**<br/>
**正例:** ```_privateProperty / _privateMethod()```<br/>
**反例:** ```privateProperty / privateMethod()```<br/>

6. **布尔值命名 (is/has/can 开头)**<br/>
**正例:** ```isLoading / hasError / canSubmit```<br/>
**反例:** ```loading / error / submit```<br/>


### 5.2 代码格式
1. **使用 2 个空格进行缩进**<br/>
**正例:**
```javascript
if (x < y) {
 x += 10;
  } else {
   x += 1; 
}
```
2. **不同逻辑、不同语义、不同业务的代码之间插入一个空行分隔开来以 提升可读性**<br/>
说明:任何情形，没有必要插入多个空行进行隔开。

### 5.3 字符串
1. 统一使用单引号(‘)，不使用双引号(“)。这在创建 HTML 字符串非常有好处:<br/>
**正例:**
```javascript
  let str = 'foo';
  let testDiv = '<div id="test"></div>'; 
```
**反例:**
```javascript
  let str = 'foo'; 
  let testDiv = "<div id='test'></div>";
```

2. ES6+引用的模板字符串使得动态字符串和多行字符串采用反引号(``)来表示，并且可以在字符串中使用 ${} 来表示变量。<br/>
**正例:**
```javascript
let name = 'John';
let greeting = `Hello, ${name}!`;
console.log(greeting); // 输出: Hello, John!
```
**反例:**
```javascript
let name = 'John';
let greeting = 'Hello, ' + name + '!';
console.log(greeting); // 输出: Hello, John!
```

### 5.4 对象声明
1. **使用字面值创建对象**
**正例:** <br/>```let user = {};```<br/>
**反例:** <br/>```let user = new Object();```
1. **使用字面量来代替对象构造器**
**正例:** <br/>```var user = { age: 0, name: 1, city: 3 };```
**反例:**<br/>
```javascript
    var user = new Object(); 
    user.age = 0; 
    user.name = 0; 
    user.city = 0; 
```

### 5.5 使用 ES6+
必须优先使用 ES6+ 中新增的语法糖和函数。这将简化你的程序，并让你的代码更加灵活和可复用。比如箭头函数、await/async，解构，let，for...of 等等。

### 5.6 括号
下列关键字后必须有大括号（即使代码块的内容只有一行）:if, else, for, while, do, switch, try, catch, finally, with。<br/>
**正例:**
```javascript
if (condition) { 
doSomething();
 }
```
**反例:**
```javascript
if (condition) {
  doSomething();
}
```
**空格原则:**
```javascript
// 关键字后空格
if (condition) {}

// 运算符两侧空格
const sum = a + b;

// 函数参数无空格
function(a, b) {}
```

### 5.7 undefined 判断
永远不要直接使用 undefined 进行变量判断;使用 typeof 和字符串’undefined’对变量进行判断。<br/>
**正例:**```if (typeof person === 'undefined') { ... }```<br/>
**反例:**```if (person === undefined) { ... }```

### 5.8 条件判断和循环最多三层
条件判断能使用三目运算符和逻辑运算符解决的，就不要使用条件判断，但是谨记不要写太长的三目运算符。如果超过 3 层请抽成函数，并写清楚注释。

### 5.9 慎用 console.log
因 console.log 大量使用会有性能问题，所以在非 webpack 项目中谨慎使用 log 功能。


## 六、Vue 项目规范
### 6.1 组件规范
1. **组件文件结构**<br/>
单文件组件（SFC）的文件结构应该是：
```vue
<template>
  <!-- 组件模板 -->
</template>

<script>
// 组件逻辑
</script>

<style scoped>
/* 组件样式 */
</style>
```
推荐顺序
- template (必须)
- script (必须)
- style (可选)

2. **组件名为多个单词。**<br/>
组件名应该始终是多个单词组成（大于等于 2），且命名规范为KebabCase格式。<br/>
这样做可以避免跟现有的以及未来的 HTML 元素相冲突，因为所有的 HTML 元素名称都是单个单词的。<br/>
**正例:**
```javascript
export default {
  name: 'TodoItem'
  // ...
};
```
**反例:**
```javascript
export default {
  name: 'Todo',
  // ...
}
export default {
  name: 'todo-item',
  // ...
}
```

3. **组件文件名为 PascalCase 格式**<br/>
**正例:**
```bash
components/
|- MyComponent.vue
```
**反例:**
```bash
components/
|- my-component.vue
|- myComponent.vue
```

4. **基础组件文件名为 base 开头，使用完整单词而不是缩写。**<br/>
**正例:**
```bash
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
```
**反例:**
```bash
components/
|- MyButton.vue
|- vue-table.vue
|- Icon.vue
```

5. **在 Template 模版中使用组件，应使用 PascalCase 模式，并且使用自闭合组件。**<br/>
**正例:**
```vue
<!-- 在单文件组件、字符串模板和 JSX 中 -->
<MyComponent />
<Row><table :column="data"/></Row>
```
**反例:**
```vue
<my-component /> <row><table :column="data"/></row>
```

6. **Prop 定义应该尽量详细**
必须使用 camelCase 驼峰命名<br/>
必须指定类型<br/>
必须加上注释，表明其含义<br/>
必须加上 required 或者 default，两者二选其一<br/>
如果有业务需要，必须加上 validator 验证<br/>
**正例:**
```vue
<script setup>
// Composition API
const props = defineProps({
  // 基础类型检查
  title: String,
  
  // 详细配置
  user: {
    type: Object,
    required: true,
    default: () => ({ name: 'Guest' })
  }
})
</script>
```

7. **为组件样式设置作用域**<br/>
**正例:**
```vue
<template>
  <button class="btn btn-close">X</button>
</template>

<!-- 使用 `scoped` 特性 -->
<style scoped>
/* 只影响当前组件 */
  .btn-close {
    background-color: red;
  }

/* 使用 :deep() 穿透作用域 */
  :deep(.child-class) {
    color: blue;
  }
</style>
```
**反例:**
```vue
<template>
  <button class="btn btn-close">X</button>
</template>
<!-- 没有使用 `scoped` 特性 -->
<style>
  .btn-close {
    background-color: red;
  }
</style>
```

8. **组件事件在Vue2 Options API和Vue3 Composition API的区别:**<br/>
- 事情定义：
```vue
<script setup>
// Composition API
const emit = defineEmits(['update:model', 'submit-success'])

// Options API
export default {
  emits: ['update:model', 'submit-success']
}
</script>
```

- 事情命名：
```javascript
this.$emit('submit-success')  // JavaScript中
```
```vue
<MyComponent @submit-success="submitSuccess"/> <!-- 模板中 -->
```

9. **如果特性元素较多，应该主动换行。**<br/>
**正例:**
```bash
  <MyComponent foo="a" bar="b" baz="c"
    foo="a" bar="b" baz="c"
    foo="a" bar="b" baz="c"
  />
```

**反例:**<br/>
```<MyComponent foo="a" bar="b" baz="c" foo="a" bar="b" baz="c" foo="a" bar="b" baz="c" foo="a" bar="b" baz="c"/>```

10. **组件通信原则:**
```vue
<!-- 父组件 -->
<template>
  <child-component 
    :title="pageTitle" 
    @update-title="handleUpdate"
  />
</template>

<!-- 子组件 -->
<script setup>
defineProps(['title'])
const emit = defineEmits(['update-title'])
</script>
```

11. **组件设计原则:**
- 单一职责原则
每个组件只做一件事<br/>
保持组件精简（建议不超过300行）<br/>
- 可复用性
通过props控制行为<br/>
提供适当的插槽<br/>
- 无副作用
避免直接修改props<br/>
副作用操作应在方法中明确声明<br/>

### 6.2 模板中使用简单的表达式
组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法。复杂表达式会让你的模板变得不那么声明式。我们应该尽量描述应该出现的是什么，而非如何计算那个值。而且计算属性和方法使得代码可以重用。<br/>
**正例:**
```vue
<template>
  <p>{{ normalizedFullName }}</p>
</template>
// 复杂表达式已经移入一个计算属性
computed: {
  normalizedFullName: function () {
    return this.fullName.split(' ').map(function (word) {
      return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
  }
}
```
**反例:**
```vue
<template>
  <p>
       {{
          fullName.split(' ').map(function (word) {
             return word[0].toUpperCase() + word.slice(1)
           }).join(' ')
        }}
  </p>
</template>
```

### 6.3 指令都使用缩写形式
指令推荐都使用缩写形式
|完整形式	      | 缩写形式	 |用途说明    |  
|--------------|------------|-----------|    
|v-bind:	     | :	        |属性绑定    |
|v-on:	       | @	        |事件绑定    |
|v-slot:	     | #	        |插槽定义    |
|v-bind:[attr] |	:[attr]	  |动态属性绑定|
|v-on:[event]  | @[event]	  |动态事件绑定|

**正例:**
```javascript
<input
  @input="onInput"
  @focus="onFocus"
>
```

**反例:**
```javascript
<input
  v-on:input="onInput"
  @focus="onFocus"
>
```

### 6.4 标签顺序保持一致
单文件组件应该总是让标签顺序保持为 `<br/>
**正例:**
```
<template>...</template>
<script>...</scrip>
<style>...</style>
```

**反例:**
```
<template>...</template>
<style>...</style>
<script>...</script>
```

### 6.5 必须为 v-for 设置键值 key
在 Vue 的 v-for 列表中，key 是一个特殊的属性，它帮助 Vue 识别每个节点的身份，从而：
1. 高效更新：精确追踪元素变化，减少不必要的 DOM 操作
2. 状态保持：确保组件状态在重新渲染时正确保留
3. 动画过渡：使过渡动画能正确工作<br/>
**正例:**<br/>
```vue
<li v-for="item in items" :key="item.id">
  {{ item.text }}
</li>
```
**反例：**<br/>
```vue
<li v-for="item in items">
  {{ item.text }}
</li>
```
**正确选择key值:**
|数据类型	      |推荐 key	        |示例                 | 
|---------------|----------------|---------------------|
|对象数组	      |唯一ID属性	      |:key="item.id"       |
|基本类型数组	  |值本身 + 索引	   |:key="item + index"  |
|无唯一标识数据	|索引 (最后选择)   |:key="index"         |

### 6.6 v-show 与 v-if 选择
如果运行时，需要非常频繁地切换，使用 v-show ;如果在运行时，条件很少改变，使用 v-if。
|特性	    |v-if	               |v-show                   |
|---------|--------------------|-------------------------|
|DOM操作  |条件为假时移除DOM	  |始终保留DOM，仅切换display |
|初始渲染	|惰性渲染	            |无论条件如何都会渲染       |
|切换开销	|高（重建/销毁组件）	 |低（仅CSS切换）           |
|生命周期	|触发创建/销毁钩子	   |不触发生命周期钩子         |
|适用场景	|运行时条件很少改变	   |需要频繁切换显示状态        | 

### 6.7 script 标签内部结构顺序
- Composition API组织顺序
```vue
<script setup>
// 1. 导入
import { ref } from 'vue'

// 2. Props/Emits定义
const props = defineProps({/*...*/})
const emit = defineEmits(['...'])

// 3. 响应式状态
const count = ref(0)

// 4. 计算属性
const doubleCount = computed(() => count.value * 2)

// 5. 方法
function increment() {
  count.value++
}

// 6. 生命周期
onMounted(() => {
  console.log('mounted')
})

// 7. 暴露给模板
defineExpose({
  increment
})
</script>
```

- Options API组织顺序
```javascript
export default {
  name: 'MyComponent',
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {}
}
```

### 6.8 Vue Router 规范
1. **页面跳转数据传递使用路由参数**
页面跳转，例如 A 页面跳转到 B 页面，需要将 A 页面的数据传递到 B 页面，推荐使用 路由参数进行传参，而不是将需要传递的数据保存 vuex，然后在 B 页面取出 vuex 的数据，因为如果在 B 页面刷新会导致 vuex 数据丢失，导致 B 页面无法正常显示数据。<br/>
**正例:**
```
let id = ' 123';
this.$router.push({ name: 'userCenter', query: { id: id } });
```

2. **使用路由懒加载（延迟加载）机制**
```
{
    path: '/uploadAttachment',
    name: 'uploadAttachment',
    meta: {
      title: '上传附件'
    },
    component: () => import('@/view/components/uploadAttachment/index.vue')
  }
```

3. **router 中的命名规范**
path、childrenPoints 命名规范采用kebab-case命名规范（尽量vue文件的目录结构保持一致，因为目录、文件名都是kebab-case，这样很方便找到对应的文件）<br/>
name 命名规范采用KebabCase命名规范且和component组件名保持一致！（因为要保持keep-alive特性，keep-alive按照component的name进行缓存，所以两者必须高度保持一致）<br/>

```
// 动态加载
export const reload = [
  {
    path: '/reload',
    name: 'reload',
    component: Main,
    meta: {
      title: '动态加载',
      icon: 'icon iconfont'
    },
    children: [
      {
        path: '/reload/smart-reload-list',
        name: 'SmartReloadList',
        meta: {
          title: 'SmartReload',
          childrenPoints: [
            {
              title: '查询',
              name: 'smart-reload-search'
            },
            {
              title: '执行reload',
              name: 'smart-reload-update'
            },
            {
              title: '查看执行结果',
              name: 'smart-reload-result'
            }
          ]
        },
        component: () =>
          import('@/views/reload/smart-reload/smart-reload-list.vue')
      }
    ]
  }
];
```

4. **router 中的 path 命名规范**
path除了采用kebab-case命名规范以外，必须以 / 开头，即使是children里的path也要以 / 开头。如下示例<br/>
**目的:**<br/>
经常有这样的场景:某个页面有问题，要立刻找到这个vue文件，如果不用以/开头，path为parent和children组成的，可能经常需要在router文件里搜索多次才能找到，而如果以/开头，则能立刻搜索到对应的组件<br/>
```
{
    path: '/file',
    name: 'File',
    component: Main,
    meta: {
      title: '文件服务',
      icon: 'ios-cloud-upload'
    },
    children: [
      {
        path: '/file/file-list',
        name: 'FileList',
        component: () => import('@/views/file/file-list.vue')
      },
      {
        path: '/file/file-add',
        name: 'FileAdd',
        component: () => import('@/views/file/file-add.vue')
      },
      {
        path: '/file/file-update',
        name: 'FileUpdate',
        component: () => import('@/views/file/file-update.vue')
      }
    ]
  }
```

### 6.9 状态管理
1. **状态管理选型与架构:**<br/>
**技术选型**<br/>
- Vue 3 项目：推荐使用 Pinia (官方推荐的状态管理库)
- Vue 2 项目：可使用 Vuex 4 (兼容版本)

2. **Pinia 核心规范:**<br/>
**Store 定义规范:**
```javascript
// stores/modules/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  // 状态定义
  state: () => ({
    id: null as number | null,
    name: '',
    token: ''
  }),

  // 计算属性
  getters: {
    isLoggedIn: (state) => !!state.token,
    username: (state) => state.name || 'Guest'
  },

  // 操作方法
  actions: {
    async login(credentials: LoginForm) {
      const { data } = await api.login(credentials)
      this.token = data.token
      this.name = data.username
    },
    
    logout() {
      this.$reset()
    }
  }
})
```

**类型安全(TypeScript):**
```typescript
interface UserState {
  id: number | null
  name: string
  token: string
}

interface LoginForm {
  username: string
  password: string
  remember?: boolean
}
```

3. **状态使用规范:**
**在组件中使用:**
```vue
<script setup>
import { useUserStore } from '@/stores/modules/user'

const userStore = useUserStore()

// 访问状态
const username = computed(() => userStore.name)

// 调用action
function handleLogin() {
  userStore.login({
    username: 'admin',
    password: '123456'
  })
}
</script>
```

**状态修改规则:**
- 直接修改：仅限简单赋值
```typescript
userStore.name = "新名字"
```
- 复杂修改：使用 $patch 或 actions
```typescript
// 方式1： $patch
userStore.$patch({
  name: "新名字",
  token: "new-token"
})

// 方式2： action
userStore.updateProfile({ name: "新名字" })
```

## 七、Vue 项目目录规范
### 7.1 基础
vue 项目中的所有命名一定要与后端命名统一。<br/>
比如权限:后端 privilege, 前端无论 router , store, api 等都必须使用 privielege 单词！<br/>

### 7.2 使用 Vite 脚手架
使用 Vite 来初始化项目，项目名按照上面的命名规范，配置文件路径的规范如下：
```plaintext
project-root/
├── vite.config.ts       # Vite 配置文件
├── tsconfig.json        # TypeScript 配置
└── package.json         # 依赖管理
```

### 7.3 目录说明
目录名按照上面的命名规范，其中 components 组件用大写驼峰，其余除 components 组件目录外的所有目录均使用 kebab-case 命名。
```
├─.vscode/
│  ├─extensions.json           # VS Code 扩展推荐
│  └─settings.json             # 统一编辑器配置
│     ├─templates/             # 代码模板片段
│     ├─component.vue          # Vue组件模板
│     └─composable.ts          # 组合式函数模板
│
├─docs/                        # 文档        
│  ├─cmd/                      # 命令文档
│  │  ├─development.md         # 开发相关命令
│  │  ├─build.md               # 构建相关命令
│  │  └─deployment.md          # 部署相关命令
│  ├─design/                   # 设计文档
│  │  ├─architecture.md        # 开发相关命令
│  │  └─database.md            # 数据库设计文档
│  ├─dev/                      # 开发文档
│  │  ├─api-specification.md   # 接口文档
│  │  └─coding-style.md        # 编码规范文档
│  ├─learn/                    # 学习文档
│  │  ├─es6+/                  # es6+文档
│  │  ├─vite/                  # vite文档
│  │  └─...                    # 其他文档
│  ├─question/                 # 问题文档
│  └─user/                     # 用户文档
│     ├─faq.md                 # 常见问题解答
│     └─user-guide.md          # 用户使用指南 
│
├─public/                      # 静态资源
│  ├─favicon.ico               # 网站图标
│  ├─assets/                   # 不参与构建的静态资源
│  │  ├─fonts                  # 静态字体文件
│  │  └─locales                # 多语言静态资源
│  └─robot.txt                 # 爬虫协议
│
├─src/                         # 项目源代码
│  ├─assets/                   # 项目静态资源（会经过构建处理）
│  │  ├─icons/                 # 图标资源
│  │  ├─images/                # 图片资源
│  │  └─styles/                # 样式文件                     
│  │     ├─base/               # 基础样式（变量、混合器）
│  │     │  ├─_variables.scss  # 变量
│  │     │  └─_mixins.scss     # 混合器
│  │     ├─components/         # 通用组件样式
│  │     ├─pages/              # 页面样式
│  │     │  └─Home.scss        # 首页样式
│  │     └─global.scss         # 全局样式
│  ├─components/               # 通用组件
│  ├─composables/              # 组合式函数
│  ├─router/                   # 路由配置
│  │  └─index.ts               # 路由主文件
│  ├─store/                    # Pinia 状态管理
│  ├─types/                    # 类型定义
│  ├─utils/                    # 工具函数目录
│  ├─views/                    # 页面组件（业务逻辑）
│  │  └─Home.vue               # 首页组件
│  ├─App.vue                   # 根组件
│  ├─main.ts                   # 应用入口文件
│  └─vite-env.d.ts             # Vite 环境变量类型
│
├─.env                         # 基础环境变量
├─.env.development             # 开发环境变量
├─.env.production              # 生产环境变量
├─.gitignore                   # Git 忽略规则
├─index.html                   # 入口 HTML 文件
├─package-lock.json            # 依赖锁文件
├─package.json                 # 依赖配置文件
├─README.md                    # 项目说明文档
├─tsconfig.app.json            # 应用专属 TypeScript 配置
├─tsconfig.json                # TypeScript 全局配置        
├─tsconfig.node.json           # Node.js 专属 TypeScript 配置
└─vite.config.ts               # Vite 构建配置
```
1. **api 目录**
文件、变量命名要与后端保持一致。<br/>
此目录对应后端 API 接口，按照后端一个 controller 一个 api js 文件。若项目较大时，可以按照业务划分子目录，并与后端保持一致。<br/>
api 中的方法名字要与后端 api url 尽量保持语义高度一致性。<br/>
对于 api 中的每个方法要添加注释，注释与后端 swagger 文档保持一致。<br/>
**正例:**<br/>
后端 url: EmployeeController.java
```
/employee/add
/employee/delete/{id}
/employee/update
```
前端: employee.js<br/>
```
// 添加员工
addEmployee: (data) => {
  return postAxios('/employee/add', data)
},
// 更新员工信息
updateEmployee: (data) => {
  return postAxios('/employee/update', data)
},
  // 删除员工
deleteEmployee: (employeeId) => {
  return postAxios('/employee/delete/' + employeeId)
},
```

### 7.4 注释说明
**在Vue2项目中:**<br/>
整理必须加注释的地方<br/>
公共组件使用说明<br/>
api 目录的接口 js 文件必须加注释<br/>
store 中的 state, mutation, action 等必须加注释<br/>
vue 文件中的 template 必须加注释，若文件较大添加 start end 注释<br/>
vue 文件的 methods，每个 method 必须添加注释<br/>
vue 文件的 data, 非常见单词要加注释

**在Vue3项目中:**<br/>
**公共组件：** 在<script>标签顶部添加功能说明、参数说明、事件说明。<br/>
**API 接口：** 每个方法添加 JSDoc 注释，说明功能、参数、返回值。<br/>
**Store 状态：** 在 state 中对关键字段添加注释。<br/>
**复杂逻辑：** 超过 10 行的方法或复杂算法添加逻辑说明。<br/>
**TypeScript 类型：** 对非自解释的类型定义添加注释。

### 7.5 其他
1. **尽量不要手动操作 DOM**<br/>
因使用 vue 框架，所以在项目开发中尽量使用 vue 的数据驱动更新 DOM，尽量（不到万不得已）不要手动操作 DOM，包括:增删改 dom 元素、以及更改样式、添加事件等。
2. **删除无用代码**<br/>
因使用了 git/svn 等代码版本工具，对于无用代码必须及时删除，例如:一些调试的 console 语句、无用的弃用功能代码。

## 八、编码流程和协作规范
### 8.1 代码提交规范
```plaintext
<类型>(<范围>): <描述>
// 示例
feat(store): 添加用户登录状态管理
fix(router): 修复登录页重定向循环问题
```
**常用 type 类型**:
|类型	      |用途                       |	示例场景            | 
|-----------|---------------------------|--------------------|
|feat	      |新增功能                   |新增用户登录验证码功能|
|fix	      |修复 bug                   |	修复登录表单校验不触发问题|
|docs	      |文档变更                   |更新 API 接口文档说明|
|style	    |代码格式（空格、分号等）    |	统一代码缩进为 2 空格|
|refactor	  |重构（非功能新增/修复）     |拆分用户模块工具函数|
|test	      |测试相关                   |补充用户登录流程单元测试|
|chore	    |构建/工具链变更            |	更新 pnpm 依赖版本|
|pref       |性能优化                   |	优化用户列表接口响应时间|
|revert     |回退之前的提交             |	revert: 回退 #a1b2c3 提交|
|wip        |开发中临时提交             |部分完成的用户模块开发|

### 8.2 静态检查与格式化
静态检查（ESLint）和格式化（Prettier）是保障代码一致性、规避低级错误的核心手段。通过工具链自动化校验，可强制团队代码风格统一，减少人工 CodeReview 成本。<br/>
**核心目标:**<br/>
**1. 风格统一：** 团队成员代码语法、格式、命名完全对齐<br/>
**2. 错误前置：** 在开发阶段拦截语法错误、类型问题、潜在 Bug<br/>
**3. 规范落地：** 将编码规约转化为可自动化执行的规则<br/>
**4. 提效协作：** 减少代码评审中 “格式不统一” 类的无效沟通<br/>
**工具选型与职责分工:**
|工具	          |职责	                                                      |核心配置文件  |
|---------------|-----------------------------------------------------------|-------------|
|ESLint	        |代码语法检查、代码质量校验（如 unused 变量、不合理类型断言    |.eslintrc.cjs |
|Prettier	      |代码自动格式化（缩进、引号、换行等纯风格问题）	               |.prettierrc.json|
|Husky    	    |Git Hook 工具，提交代码前强制执行检查	                      |.husky/ 目录   |
|lint-staged	  |只检查 “暂存区文件”，避免全量代码校验耗时	                   |package.json   |
|Volar	        |VS Code 插件，实时语法校验、类型提示（需结合 TypeScript）	   |settings.json（IDE）|

## 附录
### 版本号规范
- 主版本号（Major）：当你做了不兼容的 API 修改
- 次版本号（Minor）：当你做了向下兼容的功能性新增
- 修订号（Patch）：当你做了向下兼容的问题修正 
### 1. **版本历史**
- **v2.0.3** 2025-06-14
  - 文档注释规范修改
- **v2.0.2** 2025-06-13
  - 目录大调整
- **v2.0.1** 2025-06-12
  - 文档目录大更新
  - 结合阿里vue2规范
  
- **v1.0.3** 2025-06-04
  - 文档标题修改问题

- **v1.0.2** 2025-05-21
   - 文档大纲优化
  
- **v1.0.1** 2025-05-20
  - 文档删除目录结构
  - 代码提交规范添加类型名称

- **v1.0.0** 2025-05-19
  - 初始发布
  - 编辑文档生成代码规范文档