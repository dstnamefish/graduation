# 架构设计文档
本文档是 [系统/项目名称] 的技术中枢蓝图，旨在清晰定义系统的顶层架构设计，包括核心组件划分、技术选型依据、关键流程与交互逻辑。通过约束技术边界、规范设计原则，为开发团队提供一致性指导，同时帮助产品、测试、运维等角色理解系统技术实现与协作依赖。文档内容覆盖从基础设施到应用层的完整设计，确保系统在扩展性、性能、安全等维度满足当前需求，并为未来演进预留合理空间。

## 一、文档概述
### 1.文档目的
- 本文档的宗旨在定义医疗后台管理平台的系统架构设计，为开发团队提供技术实施指南，同时为项目若干成员提供理解技术方案的参考依据。
预期读者包括：
  - 开发团队成员
  - 系统架构师
  - 项目经理
  - 运维工程师

### 2.适用范围
- 适用范围
  - 医疗后台管理后端服务
  - 对接医疗第三方接口
  - 移动端App/小程序/h5医疗系统

- 不适用范围
  - 前端页面具体实现
  - 第三方其他系统对接

### 3.术语定义
[列出文档中使用的专业术语及其解释]

## 二、架构设计原则
### 1.设计目标
- 性能目标
- 可维护性目标
- 可扩展性目标
- 安全性目标
- 可访问性目标

### 2.核心原则
#### 模块化（Modularity）
  **定义**：将系统拆分成高内聚、低耦合的功能单元，每个模块具有明确的接口和独立职责
  **实现方式**：
  - 技术实现
      ```javascript
      // ES Modules 规范
      // user.module.js
      export const getUser = (id) => fetch(`/api/users/${id}`);
      export const updateUser = (user) => fetch(`/api/users`, { method: 'PUT', body: user });

      //api.js
      import { getUser } from './user.modules.js'
      ```
  - 设计规范：
      模块大小控制在300-500行代码
      禁止跨模块直接状态访问（需通过接口）
      模块接口文档化（JSDoc）

#### 组件化（Componentization）
  **定义**：将UI分解成独立，可组合的组件单元，遵循"原子设计"理念。
  **层级规范**：
  |层级|示例                          |开发日期| 
  |--- |------------------------------|-------|   
  |原子|Button, Input                 |1人日   |
  |分子|SearchBar（组合Button+Input）  |2人日  |
  |组织|ProductCard（含图片+标题+价格）|3人日   |
  |模板|商品列表页布局                 |5人日   |
  **代码示例**：
  ```jsx
  // 原子组件
  const PrimaryButton = ({ children, onClick }) => (
    <button 
      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
      onClick={onClick}
    >
      {children}
    </button>
  );

  // 组合组件
  const ProductCard = ({ product }) => (
    <div className="border p-4">
      <Image src={product.image} />
      <h3>{product.name}</h3>
      <PrimaryButton onClick={() => addToCart(product)}>
        加入购物车
      </PrimaryButton>
    </div>
  );
  ```
  **质量要求**：
  - 组件props不能超过10个
  - 必须包含Storybook用例
  - 组件命名规范
      - 原子组件：首字母大写，如PrimaryButton
      - 组合组件：首字母小写，如ProductCard
      - 模板组件：首字母大写，如ProductListPage
  - 可视化测试（如Chromatic）

#### 单一职责原则（SRP）
  **定义**：每个组件、模块或函数都应该有且只有一个明确的责任
  **实施检测表**：
  - 组件文件名明确反应职责（如ProductPrice.tsx）
  - 不存在and命名的组件（如ProductCardAndImage）
  - 函数代码行数限制（***如<30行，可修改***）
  **反例修正**
  ```javascript
  // 错误：混合渲染和数据处理
  function UserList() {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
      fetch('/api/users')  // 数据获取职责
        .then(res => res.json())
        .then(setUsers);
    }, []);

    return (  // 渲染职责
      <ul>
        {users.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
    );
  }

  // 正确：分离关注点
  function useUsers() {  // 数据Hook
    const [users, setUsers] = useState([]);
    useEffect(() => { /* 获取数据 */ }, []);
    return users;
  }

  function UserList({ users }) {  // 纯UI组件
    return (
      <ul>{users.map(user => <UserItem key={user.id} user={user} />)}</ul>
    );
  }
  ```

#### 开放封闭原则（OCP）
  **定义**：软件实体（类、模块、函数等）应该对扩展开放，对修改封闭,通过抽象应对变化
  **前端实现模式**：
  - **高阶组件（HOC）扩展**：
    ```javascript
    const withLogging = (WrappedComponent) => {
      return (props) => {
        console.log('Rendered:', WrappedComponent.name);
        return <WrappedComponent {...props} />;
      }
    }
    ```
  - **组合式扩展**：
    ```jsx
    <Dropdown>
      <Dropdown.Trigger as={CustomButton}/>
      <Dropdown.Menu>
        <Dropdown.Item icon={<StarIcon />}>收藏</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    ```

#### 依赖倒置原则（DIP）
  **定义**：高层模块不应该依赖低层模块，两者都应该依赖抽象。抽象不应该依赖细节，细节应该依赖抽象。
  **前端实现方式**：
  - 接口定义（Interface）：
    ```typescript
      interface DataFetcher{
        get<T>(url: string): Promise<T>;
      }
      class HttpDataFetcher implements DataFetcher {
        get<T>(url: string): Promise<T> { /* 实现 */ }
      }
      class MockDataFetcher implements DataFetcher {
        get<T>(url: string): Promise<T> { /* 实现 */ }
      }
    ```
  - 依赖注入（DI）：
    ```javascript
      const ApiContext = createContext<DataFetcher>(new HttpDataFetcher());
      function UserProfile(){
        const api = useContext(ApiContext); // 依赖抽象
        const [user, setUser] = useState();

        useEffect(() => {
            api.get('user').then(setUser); 
        },[api]);
      }
    ```

#### 最小知识原则（LoD）
  **定义**：组件只应与直接关联的组件交互，避免过多的依赖。
  **实施方法**：
  |通信场景|正确方式        |错误方式                  |    
  |--------|---------------|--------------------------|
  |父子组件|Props传递       |子组件直接修改父组件状态   |
  |兄弟组件|状态提升        |组件A -> 组件B -> 组件C传递|
  |跨层级  |Context/状态管理|逐层传递props             |    
  **案例**：
  - 使用Pub/Sub模式解耦：
    ```javascript
      // event-bus.js 
      const bus = new EventEmitter();
      export const PRODUCT_ADDED = 'product_added';

      // ProductComponent.js
      bus.emit(PRODUCT_ADDED, product);

      // CartComponent.js
      bus.on(PRODUCT_ADDED, updateCart);
    ```

#### 逐渐增强（Progress Enhancement）
  **分层实现策略**：
    - 基础层：语义化HTML + 核心功能
    ```html
      <form>
        <input type="text" name="query">
        <button type="submit">搜索</button>
      </form>
    ```

    - 增强层：样式CSS + 交互JS
    ```javascript
      document.getElementById('search').addEventListener('submit',handleSearch);
    ```

    - 体验层：高级交互（如动画、WebSocket）
  
  **性能收益**
    - 核心功能JS包体积可减少40-60%
    - 交互响应速度提升20-30%
    - 加载速度提升30-40%



## 三、技术栈选型
### 1.基础框架
- Vue3(Composition API)
  - 版本：3.5.13
- 选择理由：
  - 响应式性能：比Vue2.7提升10%
  - 组合式API
  - 更好的TypeScript支持
- 替代方案比较
|框架	      |基准性能	                |体积(gzip)	 |学习曲线|
|-----------|------------------------|----------- |-------|
|Vue 2	    |较快	                   |18KB	      |平缓    |
|Vue 3	    |较快(无Composition API) |20KB	      |平缓    |
|React 18	  |较慢(并发模式需优化)     |42KB	       |中等    |
|Svelte	    |最快(无VDOM)	           |2KB	        |平缓    |
|SolidJS	  |接近原生JS	             |7KB	        |陡峭    |

### 2.编程语言
- TypeScript 5.8.3
- 版本要求: >= 5.0.0
- 代码规范标准
  ```json
  // tsconfig.json
  {
    "compilerOptions": {
      "strict": true,
      "noImplicitAny": true,
      "strictNullChecks": true
    }
  }
  ```

### 3.UI组件库
- 选用的UI库: Element Plus 2.9.10
- 自定义组件策略
  - 组件封装规范
  ```typescript
  // src/components/ProTable.vue - 基于ElTable的高级封装
  <script setup lang="ts">
  import { ElTable, ElTableColumn } from 'element-plus'

  defineProps<{
    data: any[]
    columns: {
      prop: string
      label: string
      formatter?: (row: any) => string
    }[]
  }>()
  </script>

  <template>
    <ElTable :data="data">
      <template v-for="col in columns" :key="col.prop">
        <ElTableColumn :prop="col.prop" :label="col.label">
          <template #default="{ row }">
            {{ col.formatter ? col.formatter(row) : row[col.prop] }}
          </template>
        </ElTableColumn>
      </template>
    </ElTable>
  </template>
  ```
  - 按需引入优化
  ```javascript
  // plugins/element.js
  import { createApp } from 'vue'
  import { 
    ElButton,
    ElDialog,
    ElLoading
  } from 'element-plus'

  const components = [ElButton, ElDialog]

  export function setupElement(app) {
    components.forEach(comp => {
      app.component(comp.name, comp)
    })
    
    // 插件方式引入的组件
    app.use(ElLoading)
  }
  ```
  - 全局组件覆盖
  ```scss
  // src/styles/element/button.scss
  .el-button {
    border-radius: 6px;
    font-weight: 500;
    
    &--primary {
      &:hover {
        box-shadow: 0 2px 8px var(--el-color-primary-light-5);
      }
    }
  }
  ```
- 主题方案
  - 动态切换实现
  ```typescript
  // src/composables/useTheme.ts
  import { useDark, useToggle } from '@vueuse/core'

  export function useTheme() {
    const isDark = useDark({
      storageKey: 'app_theme',
      valueDark: 'dark',
      valueLight: 'light'
    })
    const toggleTheme = useToggle(isDark)

    watch(isDark, (val) => {
      document.documentElement.className = val ? 'dark' : ''
    }, { immediate: true })

    return { isDark, toggleTheme }
  }
  ```

### 4.状态管理
- 状态管理方案
- 数据流设计
- 状态持久化策略

### 5.构建工具
- 打包工具(Webpack/Vite等)
- 配置方案
- 优化策略

### 6.测试方案
- 单元测试框架
- E2E测试方案
- 测试覆盖率要求

### 7.其他工具库
- 常用工具库列表
- 选择标准
- 版本管理策略

## 四、项目结构
### 1.目录结构
```
[展示项目目录结构树]
```

### 2.模块划分
- 核心模块说明
  1. UI组件模块 (components/)
    [详细]
  2. 状态管理模块 (store/)
    [详细]
  3. 路由模块 (router/)
    [详细]
  4. API服务模块 (api/)
    [详细]
- 模块依赖关系
  graph TD
    A[App.vue] --> B[Router]
    A --> C[Layout]
    B --> D[Views]
    D --> E[Components]
    D --> F[Stores]
    F --> G[API]
    E --> H[ElementPlus]
    [插入图片]
- 模块接口定义
  1. store模块接口
    [详细]
  2. API模块接口
    [详细]

### 3.代码组织规范
- 文件命名规则
  1. Vue组件：帕斯卡命名法 如BaseButton.vue
  2. Ts/Js: 驼峰命名法 如userStore.ts
  3. Scss/Sass: 短横线命名法 如table-column.scss/table-column.sass
  4. 测试文件： 测试文件的特殊命名 如[name].spec.ts/button.spec.ts

- 目录命名规则
  1. 主目录：
  2. 组件目录：
  3. 业务模块：
  ....

- 代码分割策略
  1. 路由级分割：
    [详细]
  2. 组件级分割：
    [详细]
  3. API服务分割：
    [详细]
  4. store模块分割：
    [详细]
  5. 样式分割：
    [详细]
  .....

## 五、组件设计
### 1.组件分类
- **基础组件**（components/common/）
  - **定位**：与业务解耦的纯UI组件
  - **特点**：
    - 基于ElementPlus进行二次封装
    - 提供最基础的交互功能
    - 通过Props/Slots暴露定制能力
  - **示例**：
    - BaseTable：增强型表格组件
    - BaseForm：动态表单生成器
    - BaseUpload：文件上传封装

- **业务组件**
  **定位**：与业务逻辑耦合的可复用组件
  - **特点**：
    - 组合多个基础组件
    - 包含领域业务逻辑
    - 通过Pinia与状态管理交互
  - **示例**：
    - OrderStatusBadge：订单状态标签
    - UserAvatar：用户头像（带权限控制）
    - ProductCard：商品卡片（含购物车操作）

### 2.组件规范
- **组件设计原则**
  - 单一职责：每个组件只做一件事
  - 明确边界：
  - UI组件：只关注展示逻辑
  - 容器组件：处理数据流
  - 受控组件：优先使用v-model实现双向绑定
  - 组合优于配置：通过插槽而非props传递复杂UI
  - 类型安全：100% TypeScript支持

- **组件API设计**
```vue
  <script setup lang="ts">
  // 类型定义优先
  interface Props {
    /** 是否加载状态 */
    loading?: boolean
    /** 数据项列表 */
    items: TableItem[]
    /** 分页配置 */
    pagination?: Pagination
  }

  const props = defineProps<Props>()

  // 事件定义
  const emit = defineEmits<{
    (e: 'page-change', page: number): void
    (e: 'item-click', item: TableItem): void
  }>()

  // 暴露公共方法
  defineExpose({
    refresh: () => { /*...*/ }
  })
  </script>
```

- **组件文档要求**
......

### 3.组件通信
- **父子组件通信**
  - Props 传递数据（父 → 子） 
    ```vue
    <!-- 父组件 Parent.vue -->
    <template>
      <Child :title="msg" :count="num" />
    </template>

    <script setup lang="ts">
      import Child from './Child.vue';
      const msg = ref('Hello');
      const num = ref(0);
    </script>

    <!-- 子组件 Child.vue -->
    <script setup lang="ts">
      defineProps<{
        title: string;
        count: number;
      }>();
    </script>
    ```
    关键点：
    使用 defineProps + TypeScript 类型注解，无需额外导入。
    复杂对象建议使用 PropType 定义详细类型：
    ```typescript
    import type { PropType } from 'vue';
    defineProps({
      data: Object as PropType<{ id: number; name: string }>
    });
    ```

  - 事件传递（子 → 父）
  ```vue
    <!-- 子组件 Child.vue -->
  <template>
    <button @click="emit('update', value)">提交</button>
  </template>

  <script setup lang="ts">
    const emit = defineEmits<{
      (e: 'update', value: number): void;
    }>();
  </script>

  <!-- 父组件 Parent.vue -->
  <template>
    <Child @update="handleUpdate" />
  </template>
  ```
  最佳实践：
  事件名建议使用 kebab-case（如 update-count）。
  复杂数据通过对象传递，避免多个参数。

- **跨组件通信**
  2.1 Pinia 状态管理（推荐）
ts
// stores/counter.ts
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count++;
    }
  }
});

<!-- 组件A -->
<script setup lang="ts">
const counter = useCounterStore();
</script>

<!-- 组件B -->
<script setup lang="ts">
const counter = useCounterStore();
counter.increment(); // 修改状态后自动同步到所有组件
</script>
优势：

天然支持 TypeScript，类型推断完善。

脱离组件层级限制，任意组件均可访问。

2.2 Provide/Inject（深层嵌套组件）
ts
<!-- 祖先组件 -->
<script setup lang="ts">
import { provide } from 'vue';
provide('theme', 'dark');
</script>

<!-- 后代组件 -->
<script setup lang="ts">
import { inject } from 'vue';
const theme = inject<string>('theme', 'light'); // 默认值 'light'
</script>
适用场景：

主题、国际化等全局配置。

避免滥用，优先考虑 Pinia。
- **全局事件机制**
  3.1 Event Bus（小型项目备用）
ts
// utils/eventBus.ts
import mitt from 'mitt';
export default mitt();

<!-- 组件A：触发事件 -->
<script setup lang="ts">
import eventBus from '@/utils/eventBus';
eventBus.emit('save-data', { id: 1 });
</script>

<!-- 组件B：监听事件 -->
<script setup lang="ts">
import eventBus from '@/utils/eventBus';
eventBus.on('save-data', (data) => {
  console.log(data);
});
onUnmounted(() => eventBus.off('save-data')); // 必须手动解绑！
</script>
注意：

需手动管理事件解绑，否则易导致内存泄漏。

中大型项目优先使用 Pinia 替代。

3.2 全局指令（特殊场景）
ts
// 注册全局指令
app.directive('focus', {
  mounted(el) {
    el.focus();
  }
});

<!-- 使用指令 -->
<input v-focus />
适用场景：

DOM 操作相关逻辑复用。

通信方案选型指南
场景	推荐方案	优点
父子组件数据传递	Props + Events	直观、类型安全
跨组件共享状态	Pinia	响应式、DevTools 支持、类型完善
深层嵌套组件传值	Provide/Inject	避免逐层传递
全局事件通知	Pinia Actions	替代 Event Bus，更可控
临时通信（如弹窗交互）	事件总线（谨慎使用）	快速实现，需注意内存管理
Element Plus 集成示例
vue
<!-- 使用 Pinia 管理表格数据 -->
<template>
  <el-table :data="userStore.list">
    <el-table-column prop="name" label="姓名" />
  </el-table>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
userStore.fetchUsers(); // 在 Store 中封装 API 请求
</script>
最佳实践
优先使用 Pinia：避免 Props 层层传递，减少耦合。

TypeScript 强化：所有通信数据定义明确类型。

性能优化：

大数据量 Props 使用 shallowRef。

频繁事件用 mitt 的 once 或防抖。

代码隔离：

状态逻辑集中存储在 Pinia。

UI 交互相关状态可用组件局部状态。

## 六、路由与导航[暂定]
### 1.路由方案
- 路由库选择
- 路由配置规范
- 动态路由策略

### 6.2 权限控制
- 路由守卫实现
- 权限验证流程
- 无权限处理

### 6.3 导航设计
- 面包屑实现
- 导航状态管理
- 历史记录管理

## 七、数据管理
### 7.1 API设计
- REST/GraphQL选择
- 接口规范
- 错误处理机制

### 7.2 数据缓存
- 缓存策略
- 缓存失效机制
- 本地存储方案

### 7.3 数据格式化
- 请求数据转换
- 响应数据处理
- 数据验证方案

## 八、性能优化

### 8.1 加载优化
- 代码分割方案
- 懒加载策略
- 预加载机制

### 8.2 渲染优化
- 虚拟列表实现
- 防抖节流策略
- 内存管理

### 8.3 打包优化
- Tree Shaking配置
- 压缩策略
- 分包方案

## 九、安全策略

### 9.1 常见防护
- XSS防护
- CSRF防护
- CSP配置

### 9.2 敏感数据处理
- 加密方案
- 敏感信息存储
- 日志脱敏

### 9.3 权限控制
- 前端权限验证
- 角色管理
- 功能权限设计

## 十、工程化规范

### 10.1 代码规范
- ESLint配置
- Stylelint配置
- Prettier配置

### 10.2 Git规范
- 分支管理策略
- Commit Message规范
- Code Review流程

### 10.3 CI/CD流程
- 构建流程
- 测试流程
- 部署策略

## 十一、监控与日志

### 11.1 性能监控
- 性能指标收集
- 异常性能上报
- 监控平台集成

### 11.2 错误监控
- 全局错误捕获
- 错误分类处理
- 错误上报机制

### 11.3 用户行为日志
- 关键操作日志
- 日志上报策略
- 日志分析方案

## 十二、多环境配置

### 12.1 环境划分
- 开发环境
- 测试环境
- 预发布环境
- 生产环境

### 12.2 环境变量管理
- 变量命名规范
- 敏感变量处理
- 环境切换机制

## 十三、国际化方案

### 13.1 多语言支持
- i18n库选择
- 语言包管理
- 动态语言切换

### 13.2 本地化适配
- 时区处理
- 货币格式化
- 日期时间显示

## 十四、兼容性策略

### 14.1 浏览器兼容
- 支持浏览器列表
- Polyfill方案
- 降级处理策略

### 14.2 设备适配
- 响应式设计
- 移动端适配
- 高DPI处理

## 十五、附录

### 15.1 架构图
[包含系统架构图、组件关系图、数据流程图等]

### 15.2 参考文档
[列出参考的技术文档、规范标准等]

### 15.3 版本历史
[记录文档版本变更历史]

---

注意：以上模板可根据实际项目需求进行增减和调整，建议配合图表(如架构图、流程图等)使用，使文档更加直观易懂。