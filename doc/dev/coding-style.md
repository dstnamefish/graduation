# 编码规范文档
本编码规范文档适用于基于 **Vue 3 + Composition API + Vite + Element Plus + Pinia + TypeScript + TailWindCss** 技术栈的前端项目，旨在统一团队开发标准、提升代码可读性和可维护性。文档涵盖**代码结构、命名规则、组件开发、状态管理、样式规范**等核心内容，并提供具体示例和最佳实践。

## 一、编码规约
### 1.1 项目命名 
全部采用小写方式，采用中线分隔。<br/>
**适用范围**：项目根目录,Git仓库名称,部署包文件名<br/>
**正例:** mail-management-system <br/>
**反例:** mail_management-system/mailManagementSystem

### 1.2 目录命名
全部采用小写方式， 以中划线分隔，有复数结构时，要采用复数命名法，缩写不用复数。<br/>
**正例:** scripts/styles/components/images/utils/layouts/demo-styles/demo-scripts/img/doc<br/>
**反例:** script/style/demo-scripts/demoStyles/imgs/docs

[<font color=Orange>特殊</font>]VUE的项目中的components中的组件目录，使用kebab-case命名。<br/>
**正例:** head-search/page-loading/authorized/notice-icon<br/>
**反例:** HeadSearch/PageLoading

[<font color=Orange>特殊</font>]VUE的项目中除components组件目录外的所有目录也使用kebab-case命名<br/>
**正例:** page-one/shopping-car/user-management<br/>
**反例:** ShoppingCar/UserManagement

### 1.3 文件命名
根据具体情况进行来分析。<br/>
| 文件类型       | 规范                | 正例                          | 反例                  |
|----------------|---------------------|-------------------------------|-----------------------|
| Vue组件        | PascalCase.vue      | `UserProfile.vue`             | `userProfile.vue`     |
| JS/TS工具      | kebab-case.[jt]s    | `format-date.ts`              | `formatDate.js`       |
| SCSS模块       | `_kebab-case.scss`  | `_color-variables.scss`       | `_colorVariables.scss`|
| HTML入口       | kebab-case.html     | `error-page.html`             | `errorPage.html`      |
| 图片资源       | [功能]-[描述].[ext] | `icon-close.svg`/`bg-login.webp` | `closeIcon.png`     |

[<font color=Orange>特殊</font>]<br/>
1. 组件入口文件可命名为`index.vue`（需配合PascalCase目录名）
2. 测试文件追加`.spec`/`.test`后缀：`user-store.spec.ts`

### 1.4 命名严谨性
代码中的命名严禁使用拼音与英文混合的方式，更不允许直接使用中文的方式。说明:正确的 英文拼写和语法可以让阅读者易于理解，避免歧义。注意，即使纯拼音命名方式也要避免采用<br/>
**正例:** learn/luoyangr/rmb 等国际通用的名称，可视同英文<br/>
**反例:** DaZhePromotion[<font color=Orange>打折</font>]/getPingfenByName[<font color=Orange>评分</font>]/int 某变量 = 3<br/>
杜绝完全不规范的缩写，避免望文不知义:
**反例:** 将 AbstractClass “缩写” 命名成 AbsClass;将 condition “缩写” 命名成 condi ，此类随意缩写严重降低了代码的可阅读性。<br/>
在**TS/JS**中布尔变量需带判断前缀和事件处理函数语义化。<br/>
**正例：**
```
// 布尔变量需带判断前缀
const isActive = ref(true)
const hasPermission = computed(() => ...)
// 事件处理函数语义化
function submitSearchForm() {}
```
**反例：**
```
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
嵌套层级不超过 4 层。
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
**注释目的**：
1. 解释代码为什么这样做（而非是什么）。
2. 说明复杂逻辑、设计决策、潜在风险或替代方案。
3. 避免注释显而易见的代码（如// 增加计数）。
**保持更新：**
1. 代码更新时同步更新注释，过时注释比没有更糟。
**语言一致性：**
1. 团队统一使用中文或英文（建议中文为主，国际化项目使用英文）。
JavaScript/TypeScript注释规范
1.函数/方法注释（TsDoc风格）
使用/** ... */块注释，包含参数、返回值和描述：
```typescript
/**
 * 获取用户信息
 * @param userId - 用户ID
 * @param options - 请求配置（可选）
 * @returns 包含用户详情的 Promise
 * @throws {Error} 当用户不存在时抛出异常
 */
  async function getUserInfo(userId: string, options?:RequestOptions):Promise<UserInfo>{
    //...
  }
```
2. 类注释
```typescript
/**
 * 用户管理类，提供用户信息获取、更新等功能
 * @example
 * const userManager = new UserManager();
 * userManager.getUser(123);
 */
  class UserManager{
    // ...
  }
```
3. 复杂逻辑注释
```javascript
// 使用二分法查找目标值，时间复杂度 O(log n)
function binarySearch(arr,target){
  let left = 0;
  let right = arr.length - 1;
  // ...
}
```
4. TODO/FIXME标记
```javascript
// TODO: 后续优化性能
function processLargeData(){
  // ...
}

// FIXME: 临时处理，后续需要支持国际化
const message = "操作成功"；
```
5. 类型定义注释
```typescript
/**
 * 用户角色枚举
 * - admin: 管理员
 * - editor: 编辑
 * - viewer: 查看者
 */
emum UserRole{
  Admin = "admin",
  Editor = "editor",
  Viewer = "viewer",
}

/**
 * API响应结构
 */
interface ApiResponse<T>{
  code：number; // 状态码
  message: string; // 提示信息
  data: T; //响应数据
}
```
#### 2.3.2 Vue 组件注释规范
1. 组件文档注释
```vue
/**
 * 用户头像组件
 * @prop {string} src - 头像图片地址
 * @prop {number} size - 头像尺寸（默认 40px）
 * @prop {boolean} rounded - 是否圆形（默认 true）
 * @event click - 点击头像时触发
 */
export default defineComponent({
  props:{
    src:{
      type: String,
      required: true
    },
    size:{
      type: Number,
      default: 40
    },
    rounded:{
      type: Boolean,
      default: true
    },
  }
  emits: ["click"],
  //...
})
```
2. 模板注释
```vue
<template>
<!-- 用户信息卡片-->
<div class="user-card">
  <!-- 头像 -->
  <Avatar :src = "user.avatar" @click="handleAvatarClick"/>

  <!-- 折叠内容（仅管理员可见） -->
  <div v-if="user.role === "admin"" class="admin-panel">
    <!-- ... -->
  </div>
</div>
</template>
```
3. 逻辑注释
```javascript
// 监听路由变化，刷新用户信息
watch(
  () => route.params.id,
  async (newId) => {
    if (newId){
      await fetchUserInfo(newId); //获取用户详情
    }
  },
  { immediate: true } 
)
```
#### 2.3.3 CSS/SCSS注释规范
1. 区块注释
```scss
/**
 * 导航栏样式
 * ==================================
 */
.header {
  // ...
}

/**
 * 按钮组件
 * ------------------------------
 */
.btn {
  // ...
}
```
2. 特殊说明
```scss
.btn-primary {
  // 修复 iOS 上的圆角问题
  -webkit-border-radius: 4px;
  border-radius: 4px;
  
  // 渐变背景在 IE 10+ 有效
  background: linear-gradient(to bottom, #fff 0%, #eee 100%);
}
```
3. SCSS 变量 / 混合器注释
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
**正例**
```html
<header></header> 
<footer></footer>
```
**反例**
```html
<div> 
  <p></p>
</div>
```

### 2.5 引号
使用双引号(" ") 而不是单引号(’ ') 。<br/>
**正例:**<br/>```<div class = "box"></div>```
**反例:**<br/>```<div class = 'box'><div>```

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
```

### 3.4 每个选择器及属性独占一行
**不推荐:**
```css
button { 
    width: 100px; 
    height: 50px;
    color: #fff;
    background: #00a0e9;
}
```
**推荐:**
```css
button {
  width: 100px; height: 50px;
  color: #fff;
  background: #00a0e9; 
}
```

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

## 四、Sass 规范

## 五、Javascript 规范
### 5.1 命名
1. **采用小写驼峰命名 lowerCamelCase，代码中的命名均不能以下划线， 也不能以下划线或美元符号结束**<br/>
**反例:** name / name / name$
2. **方法名、参数名、成员变量、局部变量都统一使用 lowerCamelCase 风 格，必须遵从驼峰形式**<br/>
**正例:** localValue / getHttpMessage() / inputUserId<br/>
其中 method 方法命名必须是 动词 或者 动词+名词 形式<br/>
**正例:** saveShopCarData /openShopCarInfoDialog<br/>
**反例:** save / open / show / go <br>
**特此说明，增删查改，详情统一使用如下 5 个单词，不得使用其他（目的是为了统一各个端）**
```bash
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
**正例:** <br/>MAX_STOCK_COUNT
**反例:** <br/>MAX_COUNT

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
统一使用单引号(‘)，不使用双引号(“)。这在创建 HTML 字符串非常有好处:<br/>
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

### 5.4 对象声明
1. **使用字面值创建对象**
**正例:** <br/>```let user = {};```
**反例:** <br/>```let user = new Object();```
2. **使用字面量来代替对象构造器**
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

### 5.7 undefined 判断
永远不要直接使用 undefined 进行变量判断;使用 typeof 和字符串’undefined’对变量进行判断。<br/>
**正例:**<br/>
```if (typeof person === 'undefined') { ... }```<br/>
**反例:**<br/>
```if (person === undefined) { ... }```

### 5.8 条件判断和循环最多三层
条件判断能使用三目运算符和逻辑运算符解决的，就不要使用条件判断，但是谨记不要写太长的三目运算符。如果超过 3 层请抽成函数，并写清楚注释。

### 5.9 this 的转换命名
对上下文 this 的引用只能使用 “self” 来命名。

### 5.10 慎用 console.log
因 console.log 大量使用会有性能问题，所以在非 webpack 项目中谨慎使用 log 功能。

## 六、Vue 项目规范
### 6.1 组件规范
1. **组件名为多个单词。**<br/>
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

2. **组件文件名为 pascal-case 格式**<br/>
**正例:**
```bash
components/
|- my-component.vue
```
**反例:**
```bash
components/
|- myComponent.vue
|- MyComponent.vue
```

3. **基础组件文件名为 base 开头，使用完整单词而不是缩写。**<br/>
**正例:**
```bash
components/
|- base-button.vue
|- base-table.vue
|- base-icon.vue
```
**反例:**
```bash
components/
|- MyButton.vue
|- VueTable.vue
|- Icon.vue
```

4. **和父组件紧密耦合的子组件应该以父组件名作为前缀命名**<br/>
**正例:**
```bash
components/
|- todo-list.vue
|- todo-list-item.vue
|- todo-list-item-button.vue
|- user-profile-options.vue （完整单词）
```
**反例:**
```bash
components/
|- TodoList.vue
|- TodoItem.vue
|- TodoButton.vue
|- UProfOpts.vue （使用了缩写）
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

6. **组件的 data 必须是一个函数**<br/>
当在组件中使用data属性的时候（除了 new Vue 外的任何地方），它的值必须是返回一个对象的函数。因为如果直接是一个对象的话，子组件之间的属性值会互相影响。<br/>
**正例:**
```javascript
export default {
  data () {
    return {
      name: 'jack'
    }
  }
}
```
**反例:**
```javascript
export default {
  data: {
    name: 'jack'
  }
}
```

7. **Prop 定义应该尽量详细**
必须使用 camelCase 驼峰命名<br/>
必须指定类型<br/>
必须加上注释，表明其含义<br/>
必须加上 required 或者 default，两者二选其一<br/>
如果有业务需要，必须加上 validator 验证<br/>
**正例:**
```javascript
 props: {
  // 组件状态，用于控制组件的颜色
   status: {
     type: String,
     required: true,
     validator: function (value) {
       return [
         'succ',
         'info',
         'error'
       ].indexOf(value) !== -1
     }
   },
    // 用户级别，用于显示皇冠个数
   userLevel:{
      type: String,
      required: true
   }
}
```

8. **为组件样式设置作用域**<br/>
**正例:**
```vue
<template>
  <button class="btn btn-close">X</button>
</template>

<!-- 使用 `scoped` 特性 -->
<style scoped>
  .btn-close {
    background-color: red;
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

### 6.2 模板中使用简单的表达式
组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法。复杂表达式会让你的模板变得不那么声明式。我们应该尽量描述应该出现的是什么，而非如何计算那个值。而且计算属性和方法使得代码可以重用。<br/>
**正例:**
```
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
指令推荐都使用缩写形式，(用 : 表示 v-bind: 、用 @ 表示 v-on: 和用 # 表示 v-slot:)<br/>
**正例:**
```
<input
  @input="onInput"
  @focus="onFocus"
>
```

**反例:**
```
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
<script>...</script>
<style>...</style>
```

**反例:**
```
<template>...</template>
<style>...</style>
<script>...</script>
```

### 6.5 必须为 v-for 设置键值 key

### 6.6 v-show 与 v-if 选择
如果运行时，需要非常频繁地切换，使用 v-show ;如果在运行时，条件很少改变，使用 v-if。

### 6.7 script 标签内部结构顺序
components > props > data > computed > watch > filter > 钩子函数（钩子函数按其执行顺序） > methods

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

## 七、Vue 项目目录规范
### 7.1 基础
vue 项目中的所有命名一定要与后端命名统一。<br/>
比如权限:后端 privilege, 前端无论 router , store, api 等都必须使用 privielege 单词！<br/>

### 7.2 使用 Vue-cli 脚手架
使用 vue-cli3 来初始化项目，项目名按照上面的命名规范。

### 7.3 目录说明
目录名按照上面的命名规范，其中 components 组件用大写驼峰，其余除 components 组件目录外的所有目录均使用 kebab-case 命名。
```
src                                  源码目录
|-- api                              所有api接口
|-- assets                           静态资源，images, icons, styles等
|-- components                       公用组件
|-- config                           配置信息
|-- constants                        常量信息，项目所有Enum, 全局常量等
|-- directives                       自定义指令
|-- filters                          过滤器，全局工具
|-- datas                            模拟数据，临时存放
|-- lib                              外部引用的插件存放及修改文件
|-- mock                             模拟接口，临时存放
|-- plugins                          插件，全局使用
|-- router                           路由，统一管理
|-- store                            vuex, 统一管理
|-- themes                           自定义样式主题
|-- views                            视图目录
|   |-- role                                 role模块名
|   |-- |-- role-list.vue                    role列表页面
|   |-- |-- role-add.vue                     role新建页面
|   |-- |-- role-update.vue                  role更新页面
|   |-- |-- index.less                       role模块样式
|   |-- |-- components                       role模块通用组件文件夹
|   |-- employee                             employee模块
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
2. **assets 目录**
assets 为静态资源，里面存放 images, styles, icons 等静态资源，静态资源命名格式为 kebab-case<br/>
```
|assets
|-- icons
|-- images
|   |-- background-color.png
|   |-- upload-header.png
|-- styles
```

3. **components 目录**
此目录应按照组件进行目录划分，目录命名为 KebabCase，组件命名规则也为 KebabCase
```
|components
|-- error-log
|   |-- index.vue
|   |-- index.less
|-- markdown-editor
|   |-- index.vue
|   |-- index.js
|-- kebab-case
```

4. **constants 目录**
此目录存放项目所有常量，如果常量在 vue 中使用，请使用 vue-enum 插件(https://www.npmjs.com/package/vue-enum)<br/>
目录结构:<br/>
```
|constants
|-- index.js
|-- role.js
|-- employee.js
```

例子: employee.js
```
export const EMPLOYEE_STATUS = {
  NORMAL: {
    value: 1,
    desc: '正常'
  },
  DISABLED: {
    value: 1,
    desc: '禁用'
  },
  DELETED: {
    value: 2,
    desc: '已删除'
  }
};
export const EMPLOYEE_ACCOUNT_TYPE = {
  QQ: {
    value: 1,
    desc: 'QQ登录'
  },
  WECHAT: {
    value: 2,
    desc: '微信登录'
  },
  DINGDING: {
    value: 3,
    desc: '钉钉登录'
  },
  USERNAME: {
    value: 4,
    desc: '用户名密码登录'
  }
};
export default {
  EMPLOYEE_STATUS,
  EMPLOYEE_ACCOUNT_TYPE
};
```

5. **router 与 store 目录**
这两个目录一定要将业务进行拆分，不能放到一个 js 文件里。<br/>
router 尽量按照 views 中的结构保持一致<br/>
store 按照业务进行拆分不同的 js 文件

6. **views 目录**
命名要与后端、router、api 等保持一致<br/>
components 中组件要使用 PascalCase 规则<br/>

```
|-- views                                    视图目录
|   |-- role                                 role模块名
|   |   |-- role-list.vue                    role列表页面
|   |   |-- role-add.vue                     role新建页面
|   |   |-- role-update.vue                  role更新页面
|   |   |-- index.less                      role模块样式
|   |   |-- components                      role模块通用组件文件夹
|   |   |   |-- role-header.vue             role头部组件
|   |   |   |-- role-modal.vue              role弹出框组件
|   |-- employee                            employee模块
|   |-- behavior-log                        行为日志log模块
|   |-- code-generator                      代码生成器模块
```

### 7.4 注释说明
整理必须加注释的地方<br/><br/>
公共组件使用说明<br/>
api 目录的接口 js 文件必须加注释<br/>
store 中的 state, mutation, action 等必须加注释<br/>
vue 文件中的 template 必须加注释，若文件较大添加 start end 注释<br/>
vue 文件的 methods，每个 method 必须添加注释<br/>
vue 文件的 data, 非常见单词要加注释

### 7.5 其他
1. **尽量不要手动操作 DOM**<br/>
因使用 vue 框架，所以在项目开发中尽量使用 vue 的数据驱动更新 DOM，尽量（不到万不得已）不要手动操作 DOM，包括:增删改 dom 元素、以及更改样式、添加事件等。
2. **删除无用代码**<br/>
因使用了 git/svn 等代码版本工具，对于无用代码必须及时删除，例如:一些调试的 console 语句、无用的弃用功能代码。