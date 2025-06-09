# 编码规范文档
本编码规范文档适用于基于 **Vue 3 + Composition API + Vite + Element Plus + Pinia + TypeScript + TailWindCss** 技术栈的前端项目，旨在统一团队开发标准、提升代码可读性和可维护性。文档涵盖**代码结构、命名规则、组件开发、状态管理、样式规范**等核心内容，并提供具体示例和最佳实践。

## 一、编码规约
### 1.1 项目命名 
全部采用小写方式，采用中线分隔。<br/>
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

### 1.3 JS、CSS、SCSS、HTML、PNG 文件命名
全部采用小写方式， 以中划线分隔。<br/>
**正例:** render-dom-js/signup/css/index.html/company-logo.png<br/>
**反例:** renderDom.js/UserManagement.html<br/>
[<font color=Orange>特殊</font>] 

### 1.4 命名严谨性
代码中的命名严禁使用拼音与英文混合的方式，更不允许直接使用中文的方式。说明:正确的 英文拼写和语法可以让阅读者易于理解，避免歧义。注意，即使纯拼音命名方式也要避免采用<br/>
**正例:** learn/luoyangr/rmb 等国际通用的名称，可视同英文<br/>
**反例:** DaZhePromotion[<font color=Orange>打折</font>]/getPingfenByName[<font color=Orange>打折</font>]/int 某变量 = 3<br/>
杜绝完全不规范的缩写，避免望文不知义:
**反例:**将 AbstractClass “缩写” 命名成 AbsClass；将 condition “缩写” 命名成 condi ，此类随意缩写严重降低了代码的可阅读性。


## 二、HTML 规范 （Vue Template 同样适用）
### 2.1 HTML 类型
推荐使用 HTML5 的文档类型申明:
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

### 2.2 缩进
缩进使用 2 个空格（一个 tab）；
嵌套的节点应该缩进。

### 2.3 分块注释
在每一个块状元素，列表元素和表格元素后，加上一对 HTML 注释。

### 2.4 语义化标签
HTML5 中新增很多语义化标签，所以优先使用语义化标签，避免一个页面都是 div 或者 p 标 签。
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
使用双引号(" ") 而不是单引号(’ ') 。
**正例:**<div class = "box"></div>
**反例:**<div class = 'box'><div>

## 三、CSS 规范
### 3.1 命名
- 类名使用小写字母，以中划线分隔
- id 采用驼峰式命名
- scss 中的变量、函数、混合、placeholder 采用驼峰式命名
ID 和 class 的名称总是使用可以反应元素目的和用途的名称，或其他通用的名称，代替表象和晦涩难懂的名称。
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
1. **css 选择器中避免使用标签名**
从结构、表现、行为分离的原则来看，应该尽量避免 css 中出现 HTML 标签，并且在 css 选择器中出现标签名会存在潜在的问题。
2. **使用直接子选择器**
很多前端开发人员写选择器链的时候不使用直接子选择器（注:直接子选择器和后代选择器的区别 ）。有时，这可能会导致疼痛的设计问题并且有时候可能会很耗性能。然而，在任何情况下，这是一个非常不好的做法。如果你不写很通用的，需要匹配到 DOM 末端的选择器，你应该总是考虑直接子选择器。
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
1. **采用小写驼峰命名 lowerCamelCase，代码中的命名均不能以下划线， 也不能以下划线或美元符号结束**
**反例:** name / name / name$
2. **方法名、参数名、成员变量、局部变量都统一使用 lowerCamelCase 风 格，必须遵从驼峰形式**
**正例:** localValue / getHttpMessage() / inputUserId
其中 method 方法命名必须是 动词 或者 动词+名词 形式
**正例:** saveShopCarData /openShopCarInfoDialog
**反例:** save / open / show / go
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
3. **常量命名全部大写，单词间用下划线隔开，力求语义表达完整清楚， 不要嫌名字长**
**正例:** MAX_STOCK_COUNT
**反例:** MAX_COUNT

### 5.2 代码格式
1. **使用 2 个空格进行缩进**
**正例:**
```javascript
if (x < y) {
 x += 10;
  } else {
   x += 1; 
}
```
2. **不同逻辑、不同语义、不同业务的代码之间插入一个空行分隔开来以 提升可读性**
说明:任何情形，没有必要插入多个空行进行隔开。

### 5.3 字符串
统一使用单引号(‘)，不使用双引号(“)。这在创建 HTML 字符串非常有好处:
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
**正例:** ```let user = {};```
**反例:** ```let user = new Object();```
2. **使用字面量来代替对象构造器**
**正例:** ```var user = { age: 0, name: 1, city: 3 };```
**反例:**
```javascript
    var user = new Object(); 
    user.age = 0; 
    user.name = 0; 
    user.city = 0; 
```

### 5.5 使用 ES6+
必须优先使用 ES6+ 中新增的语法糖和函数。这将简化你的程序，并让你的代码更加灵活和可复用。比如箭头函数、await/async，解构，let，for...of 等等。

### 5.6 括号
下列关键字后必须有大括号（即使代码块的内容只有一行）:if, else, for, while, do, switch, try, catch, finally, with。
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
永远不要直接使用 undefined 进行变量判断；使用 typeof 和字符串’undefined’对变量进行判断。
**正例:**
```if (typeof person === 'undefined') { ... }```
**反例:**
```if (person === undefined) { ... }```

### 5.8 条件判断和循环最多三层
条件判断能使用三目运算符和逻辑运算符解决的，就不要使用条件判断，但是谨记不要写太长的三目运算符。如果超过 3 层请抽成函数，并写清楚注释。

### 5.9 this 的转换命名
对上下文 this 的引用只能使用 “self” 来命名。

### 5.10 慎用 console.log
因 console.log 大量使用会有性能问题，所以在非 webpack 项目中谨慎使用 log 功能。

## 六、Vue 项目规范
### 6.1 组件规范
1. **组件名为多个单词。**
组件名应该始终是多个单词组成（大于等于 2），且命名规范为KebabCase格式。
这样做可以避免跟现有的以及未来的 HTML 元素相冲突，因为所有的 HTML 元素名称都是单个单词的。
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

2. **组件文件名为 pascal-case 格式**
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

3. **基础组件文件名为 base 开头，使用完整单词而不是缩写。**
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
4. 和父组件紧密耦合的子组件应该以父组件名作为前缀命名
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
5. 在 Template 模版中使用组件，应使用 PascalCase 模式，并且使用自闭合组件。
**正例:**
```Vue
<!-- 在单文件组件、字符串模板和 JSX 中 -->
<MyComponent />
<Row><table :column="data"/></Row>
```
**反例:**
```Vue
<my-component /> <row><table :column="data"/></row>
```
6. 组件的 data 必须是一个函数
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

7. Prop 定义应该尽量详细
必须使用 camelCase 驼峰命名
必须指定类型
必须加上注释，表明其含义
必须加上 required 或者 default，两者二选其一
如果有业务需要，必须加上 validator 验证
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

8. 为组件样式设置作用域
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
9. 如果特性元素较多，应该主动换行。
**正例:**
```bash
  <MyComponent foo="a" bar="b" baz="c"
    foo="a" bar="b" baz="c"
    foo="a" bar="b" baz="c"
  />
```

**反例:**
```<MyComponent foo="a" bar="b" baz="c" foo="a" bar="b" baz="c" foo="a" bar="b" baz="c" foo="a" bar="b" baz="c"/>```

### 6.2 模板中使用简单的表达式
组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法。复杂表达式会让你的模板变得不那么声明式。我们应该尽量描述应该出现的是什么，而非如何计算那个值。而且计算属性和方法使得代码可以重用。
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
指令推荐都使用缩写形式，(用 : 表示 v-bind: 、用 @ 表示 v-on: 和用 # 表示 v-slot:)
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
单文件组件应该总是让标签顺序保持为 `
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
如果运行时，需要非常频繁地切换，使用 v-show ；如果在运行时，条件很少改变，使用 v-if。
### 6.7 script 标签内部结构顺序
components > props > data > computed > watch > filter > 钩子函数（钩子函数按其执行顺序） > methods
### 6.8 Vue Router 规范
1. 页面跳转数据传递使用路由参数
页面跳转，例如 A 页面跳转到 B 页面，需要将 A 页面的数据传递到 B 页面，推荐使用 路由参数进行传参，而不是将需要传递的数据保存 vuex，然后在 B 页面取出 vuex 的数据，因为如果在 B 页面刷新会导致 vuex 数据丢失，导致 B 页面无法正常显示数据。
**正例:**
```
let id = ' 123';
this.$router.push({ name: 'userCenter', query: { id: id } });
```
2. 使用路由懒加载（延迟加载）机制
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
3. router 中的命名规范
path、childrenPoints 命名规范采用kebab-case命名规范（尽量vue文件的目录结构保持一致，因为目录、文件名都是kebab-case，这样很方便找到对应的文件）
name 命名规范采用KebabCase命名规范且和component组件名保持一致！（因为要保持keep-alive特性，keep-alive按照component的name进行缓存，所以两者必须高度保持一致）
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
4. router 中的 path 命名规范
path除了采用kebab-case命名规范以外，必须以 / 开头，即使是children里的path也要以 / 开头。如下示例
目的:
经常有这样的场景:某个页面有问题，要立刻找到这个vue文件，如果不用以/开头，path为parent和children组成的，可能经常需要在router文件里搜索多次才能找到，而如果以/开头，则能立刻搜索到对应的组件
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
vue 项目中的所有命名一定要与后端命名统一。
比如权限:后端 privilege, 前端无论 router , store, api 等都必须使用 privielege 单词！
### 7.2 使用 Vue-cli 脚手架
使用 vue-cli3 来初始化项目，项目名按照上面的命名规范。
### 7.3 目录说明
目录名按照上面的命名规范，其中 components 组件用大写驼峰，其余除 components 组件目录外的所有目录均使用 kebab-case 命名。
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
1) api 目录
文件、变量命名要与后端保持一致。
此目录对应后端 API 接口，按照后端一个 controller 一个 api js 文件。若项目较大时，可以按照业务划分子目录，并与后端保持一致。
api 中的方法名字要与后端 api url 尽量保持语义高度一致性。
对于 api 中的每个方法要添加注释，注释与后端 swagger 文档保持一致。
**正例:**
后端 url: EmployeeController.java
/employee/add
/employee/delete/{id}
/employee/update
前端: employee.js
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
1) assets 目录
assets 为静态资源，里面存放 images, styles, icons 等静态资源，静态资源命名格式为 kebab-case
|assets
|-- icons
|-- images
|   |-- background-color.png
|   |-- upload-header.png
|-- styles
1) components 目录
此目录应按照组件进行目录划分，目录命名为 KebabCase，组件命名规则也为 KebabCase
|components
|-- error-log
|   |-- index.vue
|   |-- index.less
|-- markdown-editor
|   |-- index.vue
|   |-- index.js
|-- kebab-case
1) constants 目录
此目录存放项目所有常量，如果常量在 vue 中使用，请使用 vue-enum 插件(https://www.npmjs.com/package/vue-enum)
目录结构:
|constants
|-- index.js
|-- role.js
|-- employee.js
例子: employee.js
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
1) router 与 store 目录
这两个目录一定要将业务进行拆分，不能放到一个 js 文件里。
router 尽量按照 views 中的结构保持一致
store 按照业务进行拆分不同的 js 文件
1) views 目录
命名要与后端、router、api 等保持一致
components 中组件要使用 PascalCase 规则
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
### 7.4 注释说明
整理必须加注释的地方
公共组件使用说明
api 目录的接口 js 文件必须加注释
store 中的 state, mutation, action 等必须加注释
vue 文件中的 template 必须加注释，若文件较大添加 start end 注释
vue 文件的 methods，每个 method 必须添加注释
vue 文件的 data, 非常见单词要加注释
2.2.5 其他
1) 尽量不要手动操作 DOM
因使用 vue 框架，所以在项目开发中尽量使用 vue 的数据驱动更新 DOM，尽量（不到万不得已）不要手动操作 DOM，包括:增删改 dom 元素、以及更改样式、添加事件等。
1) 删除无用代码
因使用了 git/svn 等代码版本工具，对于无用代码必须及时删除，例如:一些调试的 console 语句、无用的弃用功能代码。












































































































## 一、项目结构规范
### 文件组织架构
```
├─.vscode/
│  └─extensions.json           # VS Code 扩展配置
├─docs/                        #          
│  ├─cmd-docs/                 # 命令文档
│  ├─design-docs/              # 设计文档
│  ├─dev-docs/                 # 开发文档
│  ├─user-docs/                # 用户文档
│  └─Vite-docs/                # Vite文档
├─public/
│  └─favicon.ico               # 网站图标
├─src/
│  ├─assets/
│  │  ├─styles/                # 样式文件                     
│  │  │  ├─base/               # 基础样式（变量、混合器）
│  │  │  │  ├─_variables.scss  # 变量
│  │  │  │  └─_mixins.scss     # 混合器
│  │  │  ├─components/         # 通用组件样式
│  │  │  ├─pages/              # 页面样式
│  │  │  │  └─Home.scss        # 首页样式
│  │  │  └─global.scss         # 全局样式
│  │  ├─icons/                 # 图标资源
│  │  └─images/                # 图片资源
│  ├─components/               # 通用组件
│  ├─hooks/                    # 自定义钩子
│  ├─router/                   # 路由配置
│  │  └─index.ts               # 路由主文件
│  ├─store/                    # Pinia 状态管理
│  ├─types/                    # 类型定义
│  ├─utils/                    # 工具函数目录
│  ├─views/                    # 页面组件（业务逻辑）
│  │  └─Home.vue               # 首页组件
│  ├─vite-env.d.ts             # Vite 环境变量类型
│  ├─main.ts                   # 应用入口文件
│  └─App.vue                   # 根组件
├─package.json                 # 依赖配置文件
├─package-lock.json            # 依赖锁文件
├─tsconfig.json                # TypeScript 全局配置
├─tsconfig.app.json            # 应用专属 TypeScript 配置
├─tsconfig.node.json           # Node.js 专属 TypeScript 配置
├─vite.config.ts               # Vite 构建配置
├─README.md                    # 项目说明文档
├─coding-style.md              # 编码规范主文档
├─.gitignore                   # Git 忽略规则
├─index.html                   # 入口 HTML 文件
├─.env.production              # 生产环境变量
└─.env.development             # 开发环境变量
```


### 模块拆分原则

## 二、TypeScript规范
### 类型系统
#### 1. 类型定义优先
- 所有接口、组件 Props、Store 状态必须定义类型
- 使用 interface 定义对象类型，type 定义基础类型或联合类型
```typescript
// 接口示例:用户信息
interface UserInfo {
  id: number;
  name: string;
  email?: string;
}

// Props 类型
const props = defineProps<{
  user: UserInfo;
  isLoading: boolean;
}>();
```
#### 2. 避免 any 类型
- 严格模式下禁止使用 any，使用 unknown 替代不确定类型
```typescript
// 错误:使用 any
let data: any = {};

// 正确:使用 unknown + 类型断言
let data: unknown = {};
if (typeof data === 'object') data = data as Record<string, any>;
```
#### 3. 泛型使用
- 封装工具函数或组件时使用泛型提高复用性
```typescript
// 通用响应类型
interface ResponseData<T> {
  code: number;
  data: T;
  message: string;
}

// 接口函数示例
const getUser = async <T>(): Promise<ResponseData<T>> => {
  return await http.get('/user');
};
```

## 三、Vue组件规范
### 1. 单文件组件结构
```vue
<template>
  <!-- 模板:保持简洁，避免复杂逻辑，使用注释划分区域 -->
  <div class="container">
    <!-- 头部 -->
    <Header />
    <!-- 主体 -->
    <main v-if="data" :class="theme">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
// 导入:按顺序（Vue 内置、自定义、第三方）
import { ref, computed } from 'vue';
import Header from '@/components/Header.vue';
import { useUserStore } from '@/store/userStore';

// 状态:使用 ref/reactive/computed
const userStore = useUserStore();
const theme = computed(() => userStore.theme);
const data = ref<UserInfo | null>(null);

// 生命周期:onMounted/onUnmounted 等
onMounted(() => {
  fetchData();
});

// 方法:使用箭头函数或普通函数（根据是否需要 `this`）
const fetchData = async () => {
  data.value = await userStore.getUser();
};
</script>

<style scoped lang="scss">
// 样式:scoped 避免全局污染，使用 BEM 命名规范
.container {
  .header {
    // BEM 示例:块-元素-修饰符
    &-title {
      font-size: 1.5rem;
    }
    &--fixed {
      position: sticky;
    }
  }
}
</style>
```
### 2. 组件命名
- 单文件组件使用 帕斯卡命名法（MyComponent.vue）
- 基础组件以 Base 开头（如 BaseButton.vue）
- 业务组件放在 views 目录，页面级组件以 Page 结尾（如 UserPage.vue）
### 3. Props & Emits
- Props 定义使用 defineProps 结合类型断言
- Emits 定义事件类型，避免魔法字符串

```typescript
// Props 定义
const props = defineProps<{
  modelValue: string;
  disabled: boolean;
}>();

// Emits 定义
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'click'): void;
}>();
```

## 四、UI框架规范
### 1. 按需引入
- 使用 unplugin-vue-components 自动按需引入组件
- 避免全量引入（提升打包速度）

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    Vue(),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
});
```
### 2. 样式自定义
- 在 assets/styles/element/index.scss 中覆盖 Element Plus 样式
- 使用官方提供的 CSS 变量（避免直接修改 DOM 选择器）

```scss
// 自定义按钮颜色
:deep(.el-button--primary) {
  background-color: $primary-color; // 使用项目定义的 SCSS 变量
  border-color: $primary-color;
}
```

## 五、状态管理规范
### 1. Store 命名
- Store 文件以 Store 结尾（如 userStore.ts）
- 状态、getters、actions 分开定义，保持单一职责

```typescript
// userStore.ts
import { defineStore } from 'pinia';

interface UserState {
  userInfo: UserInfo | null;
  token: string | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userInfo: null,
    token: null,
  }),
  getters: {
    isLoggedIn(): boolean {
      return !!this.token;
    },
  },
  actions: {
    async login(username: string, password: string) {
      const res = await loginApi(username, password);
      this.token = res.token;
      this.userInfo = res.user;
    },
  },
});
```
### 2. 组合式 API 使用
- 复杂逻辑使用组合式 API（defineStore 第二个参数为函数）

```typescript
export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo | null>(null);
  const token = ref<string | null>(null);

  const isLoggedIn = computed(() => !!token.value);

  const login = async (username: string, password: string) => {
    // 登录逻辑
  };

  return { userInfo, token, isLoggedIn, login };
});
```


## 六、样式规范
### 1. **变量命名**
- 全局变量以 $base-/$primary- 开头（如 $base-font-size）
- 模块私有变量以 $_ 开头（如 $_padding-sm）

```scss
// 全局变量（在 base/variables.scss 中定义）
$primary-color: #165DFF;
$base-font-family: 'Inter', sans-serif;

// 私有变量（仅在当前文件使用）
$_header-height: 60px;
```
### 2. **混合器（Mixin）**
- 混合器命名使用动词短语（如 @mixin center-content）
- 带参数混合器添加默认值

```scss
@mixin center-content($display: flex) {
  display: $display;
  justify-content: center;
  align-items: center;
}

// 使用示例
.container {
  @include center-content;
}
```
### 3. **模块化导入**
- 使用 @use 替代 @import（Dart Sass 推荐语法）
- 添加命名空间避免污染

```scss
// 导入变量和混合器
@use 'base/variables' as vars;
@use 'base/mixins' as mixins;

// 使用示例
body {
  font-family: vars.$base-font-family;
  @include mixins.box-shadow(0 2px 4px rgba(0,0,0,0.1));
}
```

## 七、工程化规范
### 1. 缩进与换行
- 使用 2 个空格缩进（禁止制表符）
- 每行代码不超过 120 字符（超出时换行）
### 2. 命名规范
|类型	      |规范	         |示例                            |
|-----------|--------------|-------------------------------|
|变量/函数  |驼峰命名法	    |userInfo, fetchData            |
|接口/类型  |帕斯卡命名法	  |UserInfo, ResponseData         |
|组件/文件  |帕斯卡命名法	  |UserPage.vue, BaseButton.vue   |
|SCSS       |变量	         |小写 + 短横线	$base-font-size   |
|SCSS       |混合器	       |小写 + 下划线	@mixin box_shadow |
### 3. 注释规范
#### Vue注释规范
- **组件头部注释（VueDoc 风格）**
    ```vue
    <!-- 
    * @description 用户信息卡片组件
    * @author 开发者姓名
    * @since 2023-05-10
    * @example <UserCard :user="user" @click="handleClick" />
    -->
    <template>
        <div class="user-card">
            <!-- 组件内容 -->
        </div>
    </template>
    ```

-  **Props 和 Emits 注释**
    ```typescript
    // script setup
    const props = defineProps<{
        /** 用户信息对象 */
        user: {
            id: number;
            name: string;
            avatar: string;
        };
        /** 是否显示操作按钮 */
        showActions?: boolean;
    }>();

    const emits = defineEmits<{
        /** 点击用户卡片触发 */
        (e: 'click', userId: number): void;
        /** 用户信息更新时触发 */
        (e: 'update', user: UserInfo): void;
    }>();
    ```

- **复杂逻辑注释**
    ```typescript
    // 计算用户等级（根据积分计算）
    const userLevel = computed(() => {
      // 等级划分规则:0-100: 青铜，101-500: 白银，501+: 黄金
      if (props.user.points <= 100) return 'bronze';
      if (props.user.points <= 500) return 'silver';
      return 'gold';
    });

    // 处理复杂表单提交逻辑
    const handleSubmit = async () => {
      // 1. 表单验证
      if (!validateForm()) return;
    
      // 2. 显示加载状态
      loading.value = true;
    
      try {
        // 3. 提交数据到 API
        const result = await submitApi(formData.value);

        // 4. 处理成功响应
        showSuccessToast('提交成功');
        emit('success', result);
      } catch (error) {
        // 5. 错误处理
        showErrorToast('提交失败');
        console.error('Form submit error:', error);
      } finally {
        // 6. 重置加载状态
        loading.value = false;
      }
    };
    ```

#### TypeScript 注释
-  **接口和类型定义** 
    ```typescript
    /**
     * 用户信息接口
     * @interface
     * @property {number} id - 用户ID
     * @property {string} name - 用户名
     * @property {string} [email] - 用户邮箱（可选）
     * @property {Date} createdAt - 创建时间
     */
    interface UserInfo {
      id: number;
      name: string;
      email?: string;
      createdAt: Date;
    }

    /**
     * 获取用户列表响应类型
     * @typedef {Object} UserListResponse
     * @property {UserInfo[]} data - 用户列表数据
     * @property {number} total - 总记录数
     * @property {number} page - 当前页码
     */
    type UserListResponse = {
      data: UserInfo[];
      total: number;
      page: number;
    };
    ```
    
- **函数和方法注释**
    ```typescript
    /**
     * 根据用户ID获取用户信息
     * @param {number} userId - 用户ID
     * @param {boolean} [withDetail=false] - 是否获取详细信息
     * @returns {Promise<UserInfo>} 返回用户信息对象
     * @throws {Error} 当用户不存在时抛出错误
     */
    const getUserById = async (userId: number, withDetail = false): Promise<UserInfo> => {
      const response = await fetch(`/api/users/${userId}?detail=${withDetail}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      return response.json();
    };
    ```
    
#### SCSS 注释
- **变量和混合器注释**
    ```typescript
    // 颜色系统
    $primary-color: #165DFF; // 主色调（蓝色）
    $secondary-color: #6C757D; // 辅助色（灰色）
    $success-color: #28A745; // 成功状态色（绿色）

    /**
     * 圆角混合器
     * @param {string} $radius - 圆角大小，默认 4px
     */
    @mixin border-radius($radius: 4px) {
      -webkit-border-radius: $radius;
      -moz-border-radius: $radius;
      border-radius: $radius;
    }
    ```
    
- **组件样式注释**
    ```scss
    /**
     * 用户卡片组件样式
     * @section components
     */
    .user-card {
      @include border-radius(8px);
      @include box-shadow(0 2px 10px rgba(0,0,0,0.1));
      padding: 16px;
      transition: all 0.3s ease;
    
      // 悬停状态
      &:hover {
        transform: translateY(-5px);
        @include box-shadow(0 5px 15px rgba(0,0,0,0.15));
      }
    
      // 标题样式
      .title {
        font-size: 1.25rem;
        font-weight: 600;
        color: $primary-color;
      }
    
      // 状态标签样式
      .status-tag {
        display: inline-block;
        padding: 2px 8px;
        @include border-radius(4px);
        font-size: 0.875rem;

        // 不同状态的样式
        &--active {
          background-color: $success-color/10;
          color: $success-color;
        }

        &--inactive {
          background-color: $secondary-color/10;
          color: $secondary-color;
        }
      }
    }
    ```

- **全局样式注释**
    ```scss
    /**
     * 全局重置样式
     * @section global
     */
    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /**
     * 基础文本样式
     * @section typography
     */
    body {
      font-family: $base-font-family;
      font-size: $base-font-size;
      line-height: 1.5;
      color: $text-color;
      background-color: $background-color;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: $heading-font-family;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    ```

#### 注释最佳实践
- **避免冗余注释**:不要为显而易见的代码添加注释（如 // 增加计数）。
- **解释意图而非实现**:注释应说明 “为什么” 而非 “怎么做”。
```javascript
// 错误:描述实现
for (let i = 0; i < 10; i++) { /* ... */ } // 循环10次

// 正确:解释意图
for (let i = 0; i < 10; i++) { /* ... */ } // 加载10条数据，API限制最大批量请求数
```
- **保持注释更新**:代码修改时同步更新注释，避免误导。
- **使用一致的风格**:团队统一使用 JSDoc、单行注释或多行注释的场景。


## 八、最佳实践
### 1. 组件设计
保持组件单一职责（UI 组件和逻辑组件分离）
使用 defineExpose 显式暴露组件方法

```typescript
const handleSubmit = () => { /* ... */ };
defineExpose({ handleSubmit }); // 对外暴露方法
```
### 2. 性能优化
大列表使用 v-for 时添加 key 和 v-slot:item
路由组件使用懒加载（() => import('./views/UserPage.vue')）
### 3. 错误处理
接口请求统一捕获错误（在 utils/request.ts 中封装）
Store 中的异步方法使用 try/catch

```typescript
const login = async () => {
  try {
    const res = await fetch('/api/login');
    // 处理成功逻辑
  } catch (error) {
    showErrorToast('登录失败'); // 自定义错误提示
  }
};
```

## 九、开发流程规范
### 1. 代码提交:使用 Conventional Commits 规范格式
```plaintext
<类型>(<范围>): <描述>
// 示例
feat(store): 添加用户登录状态管理
fix(router): 修复登录页重定向循环问题
```
**常用 type 类型**:
|类型	      |用途                       |
|-----------|---------------------------|
|feat	      |新增功能                   |
|fix	      |修复 bug                   |
|docs	      |文档变更                   |
|style	    |代码格式（空格、分号等）    |
|refactor	  |重构（非功能新增/修复）     |
|test	      |测试相关                   |
|chore	    |构建/工具链变更            |
### 2. 代码检查:配置 ESLint + Prettier
```bash
# 安装依赖
npm install eslint prettier eslint-plugin-vue @typescript-eslint/eslint-plugin --save-dev
```

3. **单元测试**:使用 Vitest 测试组件和 Store
```typescript
// 测试 UserStore
import { describe, it, expect } from 'vitest';
import { useUserStore } from '@/store/userStore';

describe('UserStore', () => {
  it('登录状态正确', () => {
    const store = useUserStore();
    store.login('user', 'pass');
    expect(store.isLoggedIn).toBe(true);
  });
});
```

## 十、参考资源
- Vue 3 官方文档
- Element Plus 样式指南
- Pinia 最佳实践
- SCSS 官方迁移指南

## 十一、附录
### 1. **版本历史**

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


***通过遵循以上规范，可以提高代码的可维护性、可读性和团队协作效率，同时避免常见的技术栈相关问题（如 SCSS 变量作用域、TypeScript 类型错误）。根据项目规模可进一步细化规范（如路由权限、国际化等）***

一、项目结构规范
  - 文件组织方式
  - 目录命名规则
  - 模块化拆分原则

二、TypeScript 规范
  - 类型系统（合并原1/2/3）
    - 禁止`any`的例外场景
    - 泛型应用场景示例
    - 类型推断最佳实践
  - 接口与类型定义
  - 枚举使用准则

三、Vue 组件规范（重点优化）
  - 单文件组件结构
    - `<script setup>`标准模板
    - 区块顺序规范
  - 组合式API
    - 响应式变量命名（`xxxRef` vs `xxx`）
    - 生命周期钩子顺序
  - Props & Emits
    - TS类型定义规范
    - 事件命名（`kebab-case`）

四、UI框架规范（原Element Plus扩展）
  - 组件引入规则
    - 自动按需导入配置
    - 全局组件白名单
  - 主题定制
    - SCSS变量覆盖流程
    - Tailwind兼容方案

五、状态管理规范（原Pinia扩展）
  - Store设计原则
    - 模块拆分粒度
    - 组合式Store模板
  - 命名约定
    - `useXxxStore`格式
    - Getter前缀（`is/can/has`）

六、样式规范（合并原SCSS/代码风格）
  - 方案选择优先级:
    1. Tailwind原子类
    2. SCSS模块化
    3. 全局样式
  - 命名约定:
    - BEM简化版（仅`__`分隔）
    - 变量`$--namespace-modifier`

七、工程化规范（合并原七/九）
  - 代码风格
    - Prettier覆盖范围（含.vue文件）
    - 注释标准（TSDoc格式）
  - Git流程
    - Commit Message模板
    - 分支命名规则

八、附录
  - 版本历史（移至文档头部）
  - 工具版本约束（如`vue-tsc`版本）