# 编码规范文档
本编码规范文档适用于基于 **Vue 3 + Composition API + Vite + Element Plus + Pinia + TypeScript + Scss** 技术栈的前端项目，旨在统一团队开发标准、提升代码可读性和可维护性。文档涵盖**代码结构、命名规则、组件开发、状态管理、样式规范**等核心内容，并提供具体示例和最佳实践。

## 一、通用约定
### 1.1 文档目录结构
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
>
>
>
>
>

### 1.2 项目命名 
全部采用小写方式，采用中线分隔。<br/>
**适用范围**：项目根目录,Git仓库名称,部署包文件名<br/>
**正例:** mail-management-system <br/>
**反例:** mail_management-system/mailManagementSystem

### 1.3 目录命名
全部采用小写方式，以中划线分隔，有复数结构时，要采用复数命名法，缩写不用复数。<br/>
**正例:** scripts/styles/components/images/utils/layouts/demo-styles/demo-scripts/img/doc<br/>
**反例:** script/style/demo-scripts/demoStyles/imgs/docs

[<font color=Orange>特殊</font>]Vue的项目中的components中的组件目录，使用kebab-case命名。<br/>
**正例:** head-search/page-loading/authorized/notice-icon<br/>
**反例:** HeadSearch/PageLoading

[<font color=Orange>特殊</font>]Vue的项目中除components组件目录外的所有目录也使用kebab-case命名<br/>
**正例:** page-one/shopping-car/user-management<br/>
**反例:** ShoppingCar/UserManagement

### 1.4 文件命名
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

### 1.5 命名严谨性
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

### 1.6 缩进
使用tab（2个空格宽度）来进行缩进，可以在setting > editor.tabSize里进行设置

### 1.7 编码
- 以 UTF-8 无 BOM 编码作为文件格式；
- 在HTML中文档中用 `<meta charset="utf-8" />` 来指定编码；
- 为每个CSS文档显示的定义编码，在文档首行定义 `@charset "utf-8"`;
> 在 Sass 中，如果文档中出现中文，却未显示定义编码，将会编译出错，为了统一各种写法，且提前规避错误几率，统一要求每个CSS文档都需要定义编码

### 1.8 注释
尽可能的为你的代码写上注释。解释为什么要这样写，它是新鲜的方案还是解决了什么问题。

### 1.9 代办事项
用 TODO 标示待办事项和正在开发的条目
```bash
<!-- TODO: 图文混排 -->
<div class="img-text">
<img src="1.png" alt="" />
...
/* TODO: 图文混排 comm: img-text */
.img-text { sRules; }
```
用 FIXME 标示需要修复问题和已知的问题。
```javascript
class Calculator extends Abacus {
  constructor () {
    super ()
      // FIXME: shouldn’t use a global here
      total = 0
      this.total = 0
  }
}
```

### 1.10 行尾空格
删除行尾空格，这些空格没有必要存在

### 1.11 代码有效性
- 在`eslint.config.js`中检验javascript/typescript、vue文件,不符合规则会波浪线提示
- 在`stylelint.config.js`中检验css/scss文件,不符合规则会波浪线提示
- 在`prettier.config.js`中格式化代码，无需纠结风格细节,保存时自动修复格式
> 代码验证不是最终目的，真的目的在于让开发者在经过多次的这种验证过程后，能够深刻理解到怎样的语法或写法是非标准和不推荐的，即使在某些场景下被迫要使用非标准写法，也可以做到心中有数。

## 二、HTML规范
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



### 2.2 注释
模板注释
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


### 2.3 语义化标签
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

### 2.4 引号
使用双引号(" ") 而不是单引号(’ ') 。<br/>
**正例:**```<div class = "box"></div>```<br/>
**反例:**```<div class = 'box'><div>```<br/>
[特殊]属性值内包含引号时：外层用双引号，内层用单引号

## 三、CSS规范
### 3.1 文件引用
- 一律使用link的方式调用外部样式
- 不允许在页面中使用 块；`<style>`
- 不允许在 块中使用 ；`<style>@import`
- 不允许使用 `style` 属性写行内样式。
> 一般情况下，在页面中只允许使用 标签来引用CSS文件，`<link />`

### 3.2 组成元素
- 命名必须由单词、中划线①或数字组成；
- 不允许使用拼音（约定俗成的除外，如：youku, baidu），尤其是缩写的拼音、拼音与英文的混合。

**不推荐:**
```css
.xiangqing { sRules; }
.news_list { sRules; }
.zhuti { sRules; }
```
**推荐:**
```css
.detail { sRules; }
.news-list { sRules; }
.topic { sRules; }
```

>①我们使用中划线 “-” 作为连接字符，而不是下划线 "_"。
>
>我们知道2种方式都有不少支持者，但 "-" 能让你少按一次shift键，并且更符合CSS原生语法，所以我们只选一种目前业内普遍使用的方式
<a name="word"></a>

### 3.3 词汇规范
- 不依据表现形式来命名；
- 可根据内容来命名；
- 可根据功能来命名。
<a name="word"></a>

**不推荐：**
```css
left, right, center, red, black
```

```css
nav, aside, news, type, search
```

### 3.4 缩写规范
- 使用业界熟知的或者约定俗成的。
- 保证缩写后还能较为清晰保持原单词所能表述的意思；
<a name="word"></a>

**不推荐：**
```css
navigation   =>  navi
header       =>  head
description  =>  des
```
**推荐：**
```css
navigation   =>  nav
header       =>  hd
description  =>  desc
```


### 3.5 前缀规范
核心前缀 / 结构：`block-element-modifier`
- block：模块 / 块级元素（如card）
- element：块内元素（如card-header）
- modifier：修饰符 / 状态（如card-featured）
<a name="word"></a>

**不推荐：**
```css
.info { sRules; }
.current { sRules; }
.news { sRules; }
```
>因为这样将给我们带来不可预知的管理麻烦以及沉重的历史包袱。你永远也不会知道哪些样式名已经被用掉了，如果你是一个新人，你可能会遭遇，你每定义个样式名，都有同名的样式已存在，然后你只能是换样式名或者覆盖规则。

**推荐：**
```css
.detail .info { sRules; }
.detail .current { sRules; }
.detail .news { sRules; }
```
所有的选择器必须是以 block- 等有前缀的选择符开头的，意思就是说所有的规则都必须在某个相对的作用域下才生效，尽可能减少全局污染。

### 3.6 id与class
重构工程师只允许使用class（因历史原因及大家的习惯做出妥协）。

### 3.7 书写规范
- 选择器与大括号之间保留一个空格；
- 分号之后保留一个空格；
- 逗号之后保留一个空格；
- 所有规则需换行；
- 多组选择器之间需换行。
<a name="word"></a>

**不推荐：**
```css
main{
	display:inline-block;
}
h1,h2,h3{
	margin:0;
	background-color:rgba(0,0,0,.5);
}
```

**推荐：**
```css
main {
	display: inline-block;
}
h1,
h2,
h3 {
	margin: 0;
	background-color: rgba(0, 0, 0, .5);
}
```

### 3.8 规则与分号
每条规则结束后都必须加上分号

**不推荐：**
```css
body {
	margin: 0;
	padding: 0;
	font-size: 14px
}
```
**推荐：**
```css
body {
	margin: 0;
	padding: 0;
	font-size: 14px;
}
```

### 3.9 省略和保留
- 如果属性值为0，则不需要为0加单位
- 如果是0开始的小数，前面的0必须写
- 必须在url()里对引用资源加引号
- 将所有的颜色值小写；
- 可以缩写的不要缩写，保持代码的可读性。<br/>
**不推荐：**
```css
body {
	margin: 0px;
	padding: 0px;
  opacity: .6;
	text-shadow: 1px 1px 5px rgba(0, 0, 0, .5);
  background-image: url(sprites.png);
  background-color: #f00;
}
@import url(global.css);
```
**推荐：**
```css
body {
	margin: 0;
	padding: 0;
  opacity: 0.6;
	text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  background-image: url("sprites.png");
  background-color: #FF0000;
}
@import url("global.css");
```

### 3.10 属性书写顺序
- 遵循先布局后内容的顺序:
  - 布局属性（display,position...）
  - 盒模型（width,padding...）
  - 文本相关（font,color...）
  - 视觉效果（background,border...）
  - 其他（animation,transition...）
```css
.box {
　　　display: block;
　　　float: left;
　　　width: 500px;
　　　height: 200px;
　　　margin: 10px;
　　　padding: 10px;
　　　border: 10px solid;
　　　background: #aaa;
　　　color: #000;
　　　font: 14px/1.5 sans-serif;
}
```
> 这个应该好理解，比如优先布局，我们知道布局属性有 display, float, overflow 等等；内容次之，比如 color, font, text-align 之类。
- 组概念。
拿上例的代码来说，如果我们还需要进行定位及堆叠，规则我们可以改成如下：
```css
.box {
　　　display: block;
　　　position: relative;
　　　z-index: 2;
　　　top: 10px;
　　　left: 100px;
　　　float: left;
　　　width: 500px;
　　　height: 200px;
　　　margin: 10px;
　　　padding: 10px;
　　　border: 10px solid;
　　　background: #aaa;
　　　color: #000;
　　　font: 14px/1.5 sans-serif;
}
```
> 从代码中可以看到，我们直接将z-index, top, left 紧跟在 position 之后，因为这几个属性其实是一组的，如果去掉position，则后3条属性规则都将失效。
- 私有属性在前标准属性在后
```css
.g-box {
　　　-webkit-box-shadow: 1px 1px 5px rgba(0, 0, 0, .5);
　　　-moz-box-shadow: 1px 1px 5px rgba(0, 0, 0, .5);
　　　-o-box-shadow: 1px 1px 5px rgba(0, 0, 0, .5);
　　　box-shadow: 1px 1px 5px rgba(0, 0, 0, .5);
}
```
> 当有一天你的浏览器升级后，可能不再支持私有写法，那么这时写在后面的标准写法将生效，避免无法向后兼容的情况发生。

### 3.11 注释规范
保持注释内容与星号之间有一个空格的距离<br/>
**普通注释（单行）**<br/>
```// 普通注释 （在代码上方）```<br/>
**区块注释**<br/>
```css
/*
 * ---------
 * 模块名称
 * ---------
 */
```
**文档注释**
```css
/**
 * [名称]
 * @description [描述]
 * ...
 */
```
> 有特殊作用的规则一定要有注释说明 应用了高级技巧的地方一定要注释说明

### 3.12 避免低效率选择器
- 避免类型选择器
<a name="word"></a>

**不允许：**
```css
div#doc { sRules; }
li.first { sRules; }
```
**应该：**
```css
#doc { sRules; }
.first { sRules; }
```
> CSS选择器是由右到左进行解析的，所以 div#doc 本身并不会比 #doc 更快

- 避免多id选择器
<a name="word"></a>

**不允许：**
```css
#xxx #yyy { sRules; }
```
**应该：**
```css
#yyy { sRules; }
```

### 3.13 属性缩写与分拆
- 无继承关系时，使用缩写
<a name="word"></a>

**不推荐：**
```css
body {
　　　margin-top: 10px;
　　　margin-right: 10px;
　　　margin-bottom: 10px;
　　　margin-left: 10px;
}
```

**推荐：**
```css
body {
　　　margin: 10px;
}
```
- 存在继承关系时，使用分拆方式<br/>
<a name="word"></a>

**不推荐：**
```css
.detail {
　　　font: bold 12px/1.5 arial, sans-serif;
}
.detail .info {
　　　font: normal 14px/1.5 arial, sans-serif;
}
```
要避免错误的覆盖：
```css
.detail .info {
　　　font: 14px sans;
}
```
> 如果你只是想改字号和字体，然后写成了上面这样，这是错误的写法，因为 font 复合属性里的其他属性将会被重置为 user agent 的默认值，比如 font-weight 就会被重置为 normal。

**推荐：**
```css
.detail {
　　　font: bold 12px/1.5 arial, sans-serif;
}
.detail .info {
　　　font-weight: normal;
　　　font-size: 14px;
}
```
> 在存在继承关系的情况下，只将需要变更的属性重定义，不进行缩写，避免不需要的重写的属性被覆盖定义

- 根据规则条数选择缩写和拆分
<a name="word"></a>

**不推荐：**
```css
.detail {
　　　border-width: 1px;
　　　border-style: solid;
　　　border-color: #000 #000 #f00;
}
```
**推荐：**
```
.detail {
　　　border: 1px solid #000;
　　　border-bottom-color: #f00;
}
```

### 3.14 模块化
- 每个模块必须是一个独立的样式文件，文件名与模块名一致；
- 模块样式的选择器必须以模块名开头以作范围约定；
<a name="word"></a>

假定有一个模块如前文 HTML模块化，那么 `detail.scss` 的写法大致如下：
```css
.detail {
	background: #fff;
	color: #333;
	&-hd {
		padding: 5px 10px;
		background: #eee;
		.title {
			background: #eee;
		}
	}
	&-bd {
		padding: 10px;
		.info {
			font-size: 14px;
			text-indent: 2em;
		}
	}
	&-ft {
		text-align: center;
		.more {
			color: blue;
		}
	}
}
```
编译之后代码如下：
```css
.detail {
	background: #fff;
	color: #333;
}
.detail-hd {
	padding: 5px 10px;
	background: #eee;
}
.detail-hd .title {
	background: #eee;
}
.detail-bd {
	padding: 10px;
}
.detail-bd .info {
	font-size: 14px;
	text-indent: 2em;
}
.detail-ft {
	text-align: center;
}
.detail-ft .more {
	color: blue;
}
```
> 任何超过3级的选择器，需要思考是否必要，是否有无歧义的，能唯一命中的更简短的写法

### 3.15 scss代码组织
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

## 四、Javascript 规范
### 4.1 命名
**1. 采用小写驼峰命名 lowerCamelCase，代码中的命名均不能以下划线或美元符号结束**<br/>
**正例:** ```name```<br/>
**反例:** ```name_ / name$```

**2. 方法名、参数名、成员变量、局部变量都统一使用 lowerCamelCase 风 格，必须遵从小驼峰形式**<br/>
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

**3. 基本类型常量命名全部大写，单词间用下划线隔开，力求语义表达完整清楚， 不要嫌名字长**<br/>
**正例:** ```MAX_STOCK_COUNT```<br/>
**反例:** ```MAX_COUNT```

**4. 类与接口统一采用PascalCase风格，必须遵守帕斯卡形式**<br/>
**正例:** ```PascalCase```<br/>
**反例:** ```camelCase/```<br/>

**5. 私有成员前缀下划线**<br/>
**正例:** ```_privateProperty / _privateMethod()```<br/>
**反例:** ```privateProperty / privateMethod()```<br/>

**6. 布尔值命名 (is/has/can 开头)**<br/>
**正例:** ```isLoading / hasError / canSubmit```<br/>
**反例:** ```loading / error / submit```<br/>


### 4.2 代码格式
**1. 使用 2 个空格进行缩进**<br/>
**正例:**
```javascript
if (x < y) {
 x += 10;
  } else {
   x += 1; 
}
```
**2. 不同逻辑、不同语义、不同业务的代码之间插入一个空行分隔开来以 提升可读性**<br/>
说明:任何情形，没有必要插入多个空行进行隔开。

### 4.3 字符串
1.统一使用单引号(‘)，不使用双引号(“)。这在创建 HTML 字符串非常有好处:<br/>
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

2.ES6+引用的模板字符串使得动态字符串和多行字符串采用反引号(``)来表示，并且可以在字符串中使用 ${} 来表示变量。<br/>
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

### 4.4 对象声明
**1. 使用字面值创建对象**<br/>
**正例:** <br/>```let user = {};```<br/>
**反例:** <br/>```let user = new Object();```<br/>
**2. 使用字面量来代替对象构造器**<br/>
**正例:** <br/>```var user = { age: 0, name: 1, city: 3 };```<br/>
**反例:**<br/>
```javascript
    var user = new Object(); 
    user.age = 0; 
    user.name = 0; 
    user.city = 0; 
```

### 4.5 使用 ES6+
必须优先使用 ES6+ 中新增的语法糖和函数。这将简化你的程序，并让你的代码更加灵活和可复用。比如箭头函数、await/async，解构，let，for...of 等等。

### 4.6 括号
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

### 4.7 undefined 判断
永远不要直接使用 undefined 进行变量判断;使用 typeof 和字符串’undefined’对变量进行判断。<br/>
**正例:**```if (typeof person === 'undefined') { ... }```<br/>
**反例:**```if (person === undefined) { ... }```

### 4.8 条件判断和循环最多三层
条件判断能使用三目运算符和逻辑运算符解决的，就不要使用条件判断，但是谨记不要写太长的三目运算符。如果超过 3 层请抽成函数，并写清楚注释。

### 4.9 慎用 console.log
因 console.log 大量使用会有性能问题，所以在非 webpack 项目中谨慎使用 log 功能。

### 4.10 注释规范
**1. 单行注释**<br/>
单行注释使用 //，注释应单独一行写在被注释对象的上方，不要追加在某条语句的后面。<br/>
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
**2. 多行注释**<br/>
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
**3. 注释空格**<br/>
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

**4. 文档类注释**<br/>
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
**6. 模块注释:**
模块注释:用于将一系列相关功能的函数、枚举、结构等归入一个模块并进行描述。<br/>
**正例:**
```javascript
/* -------------------- 
  认证服务 
-------------------- */
function login() { /* ... */ }
function logout() { /* ... */ }

```

## 五、Vue 项目规范
### 5.1 组件规范
**1. 组件文件结构**<br/>
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

**2. 组件名为多个单词。**<br/>
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

**3. 组件文件名为 PascalCase 格式**<br/>
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

**4. 基础组件文件名为 base 开头，使用完整单词而不是缩写。**<br/>
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

**5. 在 Template 模版中使用组件，应使用 PascalCase 模式，并且使用自闭合组件。**<br/>
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

**6. Prop 定义应该尽量详细**<br/>
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

**7. 为组件样式设置作用域**<br/>
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

**8. 组件事件在Vue2 Options API和Vue3 Composition API的区别:**<br/>
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

**9. 如果特性元素较多，应该主动换行。**<br/>
**正例:**
```bash
  <MyComponent foo="a" bar="b" baz="c"
    foo="a" bar="b" baz="c"
    foo="a" bar="b" baz="c"
  />
```

**反例:**<br/>
```<MyComponent foo="a" bar="b" baz="c" foo="a" bar="b" baz="c" foo="a" bar="b" baz="c" foo="a" bar="b" baz="c"/>```

**10. 组件通信原则:**
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

**11. 组件设计原则:**
- 单一职责原则
每个组件只做一件事<br/>
保持组件精简（建议不超过300行）<br/>
- 可复用性
通过props控制行为<br/>
提供适当的插槽<br/>
- 无副作用
避免直接修改props<br/>
副作用操作应在方法中明确声明<br/>

### 5.2 模板中使用简单的表达式
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

### 5.3 指令都使用缩写形式
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

### 5.4 标签顺序保持一致
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

### 5.5 必须为 v-for 设置键值 key
在 Vue 的 v-for 列表中，key 是一个特殊的属性，它帮助 Vue 识别每个节点的身份，从而：
1. 高效更新：精确追踪元素变化，减少不必要的 DOM 操作
2. 状态保持：确保组件状态在重新渲染时正确保留
3. 动画过渡：使过渡动画能正确工作<br/><br/>
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

### 5.6 v-show 与 v-if 选择
如果运行时，需要非常频繁地切换，使用 v-show ;如果在运行时，条件很少改变，使用 v-if。
|特性	    |v-if	               |v-show                   |
|---------|--------------------|-------------------------|
|DOM操作  |条件为假时移除DOM	  |始终保留DOM，仅切换display |
|初始渲染	|惰性渲染	            |无论条件如何都会渲染       |
|切换开销	|高（重建/销毁组件）	 |低（仅CSS切换）           |
|生命周期	|触发创建/销毁钩子	   |不触发生命周期钩子         |
|适用场景	|运行时条件很少改变	   |需要频繁切换显示状态        | 

### 5.7 script 标签内部结构顺序
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

### 5.8 Vue Router 规范
**1. 页面跳转数据传递使用路由参数**<br/>
页面跳转，例如 A 页面跳转到 B 页面，需要将 A 页面的数据传递到 B 页面，推荐使用 路由参数进行传参，而不是将需要传递的数据保存 vuex，然后在 B 页面取出 vuex 的数据，因为如果在 B 页面刷新会导致 vuex 数据丢失，导致 B 页面无法正常显示数据。<br/>
**正例:**
```javascript
let id = ' 123';
this.$router.push({ name: 'userCenter', query: { id: id } });
```

**2. 使用路由懒加载（延迟加载）机制**
```javascript
{
    path: '/upload-attachment',
    name: 'UploadAttachment',
    meta: {
      title: '上传附件'
    },
    component: () => import('@/view/components/UploadAttachment.vue')
  }
```

**3. router 中的命名规范**<br/>
path、childrenPoints 命名规范采用kebab-case命名规范<br/>
name 命名规范采用KebabCase命名规范且和component组件名保持一致！<br/>

```typescript
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard', // PascalCase 命名
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      title: '控制台',
      requiresAuth: true,  // 需要登录
      roles: ['admin'],    // 权限角色
      keepAlive: true      // 缓存页面
    },
    props: route => ({ query: route.query.id }), // 推荐函数形式
    children: [] // 嵌套路由
  }
]

export default routes
```

**4. router 中的 path 命名规范**
path除了采用kebab-case命名规范以外，必须以 / 开头，即使是children里的path也要以 / 开头。如下示例<br/>
**目的:**<br/>
经常有这样的场景:某个页面有问题，要立刻找到这个vue文件，如果不用以/开头，path为parent和children组成的，可能经常需要在router文件里搜索多次才能找到，而如果以/开头，则能立刻搜索到对应的组件<br/>
```javascript
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
        component: () => import('@/views/file/FileList.vue')
      },
    ]
  }
```

### 5.9 状态管理 
**1. 状态管理选型与架构:**<br/>
**技术选型**<br/>
- Vue 3 项目：推荐使用 Pinia (官方推荐的状态管理库)
- Vue 2 项目：可使用 Vuex 4 (兼容版本)

**命名规范**
|对象	          |   命名规范 |示例	          |强制要求          |
|---------------|-----------|----------------|-----------------|
|Store ID	      |kebab-case	|use-user-store	 |必须全局唯一      |
|Store 文件	    |camelCase	|userStore.ts	   |以 Store 结尾     |
|Action 方法	  |camelCase	|fetchUserData	 |必须为动词前缀    |
|Getter 属性	  |camelCase	|userList	       |必须为名词/形容词 |
|Mutation 方法	|camelCase	|setUserList	   |必须为动词前缀    |

**2. Pinia 核心规范:**<br/>
**Store 定义规范:**
```javascript
// src/stores/userStore.ts
export const useUserStore = defineStore('use-user-store', {
  state: () => ({
    userList: [] as User[],  // State 用名词
  }),
  actions: {
    // Action 用动词前缀
    async fetchUserList() {
      this.userList = await api.getUsers()
    }
  },
  getters: {
    // Getter 用形容词/名词
    activeUsers(): User[] {
      return this.userList.filter(u => u.isActive)
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

**3. 状态使用规范:**
**在组件中使用:**
```vue
<script setup>
import { useUserStore } from '@/stores/modules/userStore'

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

### 5.10 导入规范
**1. 导入分组与排序规则**
每组之间用空行分隔<br/>
按字母顺序排序<br/>
类型导入置于最后<br/>
```vue
<script setup>
// 1. 内置模块 (builtin)
import path from 'path'

// 2. 外部依赖 (external)
import { ref } from 'vue'
import axios from 'axios'

// 3. 内部路径 (internal)
import { useUserStore } from '@/stores/user'
import AppButton from '@/components/Button.vue'

// 4. 父级目录引用 (parent)
import helper from '../utils/helper'

// 5. 同级目录引用 (sibling)
import logger from './logger'

// 6. 样式文件 (object)
import styles from './styles.module.scss'

// 7. 类型导入 (type)
import type { User } from '@/types'
</script>
```
**2. 导入语法规范**
|场景	    |正确示例	                                |错误示例                          |
|---------|--------------------------------------- |--------------------------------|
|默认导入	|`import App from './App.vue'`	          |`import { App } from './App.vue`  |
|按需导入	|`import { ref } from 'vue'`              |`import ref from 'vue'         `  |
|动态导入	|`const module = await import('./module')`|`	-                           `  |
|别名路径	|`import utils from '@/utils'`            |`import utils from '../../utils`  |
**注意:**
- 禁止混用默认导入和按需导入（如 `import App, { ref } from 'vue'`）
- `.vue` 文件必须显式写扩展名 


## 六、编码流程和协作规范
### 6.1 代码提交规范
```plaintext
<类型>(<范围>): <描述>
// 示例
feat(store): 添加用户登录状态管理
fix(router): 修复登录页重定向循环问题
```
**常用 type 类型**:
| 文件后缀 / 目录                              | 推荐 type      | 推荐 scope 示例                | 说明                                          |
| --------------------------------------      | ------------ | -------------------------- | ------------------------------------------- |
| `.vue` 单文件组件                            | `feat`/`fix` | `component/`、`ui/`、`page/` | UI 组件或页面的增删改；`feat(component/NavBar): …`    |
| `.js` / `.ts` （业务逻辑）                   | `feat`/`fix` | `service/`、`logic/`        | 核心业务、API 调用、状态管理等；`fix(service/auth): …`    |
| `.scss` / `.css`                            | `style`      | `style/`、`theme/`          | 纯样式改动；`style(style/main): …`                |
| `.md` / 文档文件                             | `docs`       | `docs/`                    | README、设计文档、注释；`docs(README): …`            |
| `.spec.ts` / 测试                            | `test`       | `test/`                    | 单元/集成测试；`test(service/user): …`             |
| 构建/配置文件 (`.config.js`, CI、Vite、ESLint) | `chore`      | `build/`、`config/`         | 构建脚本、依赖升级、工具链；`chore(config): …`            |
| 性能优化                                      | `perf`       | `perf/`                    | 接口/渲染性能调优；`perf(service/search): …`         |
| 回退提交                                      | `revert`     | 无 scope 或原 scope           | `revert: feat(ui/LoginForm) …`              |
| 开发中临时提交                                | `wip`        | 任意 scope                   | `wip(service/user): partial implementation` |

### 6.2 静态检查与格式化
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
### 工具清单
代码审查 `eslint --fix yourfile.js`
### 参考文献
### 版本号规范
- 主版本号（Major）：当你做了不兼容的 API 修改
- 次版本号（Minor）：当你做了向下兼容的功能性新增
- 修订号（Patch）：当你做了向下兼容的问题修正 
### 版本历史
- **v2.1.0** 2025-06-29
  - 删除scss规范、vue目录规范
  - 更新编码规范为通用约定
  - 新增大量规范和优化目录逻辑
- **v2.0.5** 2025-06-27
  - js/ts变量规范
- **v2.0.4** 2025-06-24
  - 代码提交规范更新
  - 路由规范更新
  - 状态规范更新
  - 文档样式优化
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