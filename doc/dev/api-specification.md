# API 接口文档

## 目录

- [API 接口文档](#api-接口文档)
  - [目录](#目录)
  - [一、全局约定](#一全局约定)
    - [1. 基础规范](#1-基础规范)
    - [2. 安全认证](#2-安全认证)
    - [3. 错误处理](#3-错误处理)
  - [二、模块接口](#二模块接口)
    - [1. 用户认证模块](#1-用户认证模块)
      - [1.1 登录接口](#11-登录接口)
      - [1.2 登出接口](#12-登出接口)
      - [1.3 刷新token接口](#13-刷新token接口)
    - [2. 患者管理模块](#2-患者管理模块)
      - [2.1 获取患者列表](#21-获取患者列表)
      - [2.2 获取患者详情](#22-获取患者详情)
      - [2.3 添加患者](#23-添加患者)
      - [2.4 更新患者](#24-更新患者)
      - [2.5 删除患者](#25-删除患者)
    - [3. 医生管理模块](#3-医生管理模块)
      - [3.1 获取医生列表](#31-获取医生列表)
      - [3.2 获取医生详情](#32-获取医生详情)
    - [4. 科室管理模块](#4-科室管理模块)
      - [4.1 获取科室列表](#41-获取科室列表)
      - [4.2 获取科室详情](#42-获取科室详情)
    - [5. 药品管理模块](#5-药品管理模块)
      - [5.1 获取药品列表](#51-获取药品列表)
    - [6. 预约管理模块](#6-预约管理模块)
      - [6.1 创建预约](#61-创建预约)
      - [6.2 获取预约列表](#62-获取预约列表)
    - [7. 费用管理模块](#7-费用管理模块)
      - [7.1 创建收费记录](#71-创建收费记录)
    - [8. 医保管理模块](#8-医保管理模块)
      - [8.1 获取医保信息](#81-获取医保信息)
      - [8.2 医保结算](#82-医保结算)
  - [三、示例请求](#三示例请求)
    - [1. 登录请求示例](#1-登录请求示例)
    - [2. 获取患者列表请求示例](#2-获取患者列表请求示例)
  - [四、附录](#四附录)
    - [1. 数据字典](#1-数据字典)
    - [2. 接口变更记录](#2-接口变更记录)
- [API 接口文档](#api-接口文档-1)
  - [目录](#目录-1)

## 一、全局约定

### 1. 基础规范

- **接口协议**：HTTP/HTTPS
- **请求方式**：GET、POST、PUT、DELETE
- **数据格式**：JSON
- **字符编码**：UTF-8
- **响应时间**：≤500ms
- **接口版本**：v1

### 2. 安全认证

- **认证方式**：JWT (JSON Web Token)
- **token有效期**：2小时
- **请求头**：Authorization: Bearer {token}
- **刷新机制**：使用refresh_token获取新token
- **访问控制**：基于角色的权限控制(RBAC)

### 3. 错误处理

- **错误码格式**：统一为数字，分级别管理
- **错误响应格式**：

```json
{
  "code": 错误码,
  "message": "错误描述",
  "data": null
}
```

- **常见错误码**：
  - 200: 请求成功
  - 400: 参数错误
  - 401: 未授权
  - 403: 权限不足
  - 404: 资源不存在
  - 500: 服务器内部错误

## 二、模块接口

### 1. 用户认证模块

#### 1.1 登录接口

- **接口路径**：/api/v1/auth/login
- **请求方式**：POST
- **请求参数**：

```json
{
  "username": "string", // 用户名
  "password": "string" // 密码
}
```

- **响应参数**：

```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "string",
    "refresh_token": "string",
    "userInfo": {
      "id": "number",
      "username": "string",
      "role": "string",
      "departmentId": "number" // 可选
    }
  }
}
```

#### 1.2 登出接口

- **接口路径**：/api/v1/auth/logout
- **请求方式**：POST
- **请求参数**：无
- **响应参数**：

```json
{
  "code": 200,
  "message": "登出成功",
  "data": null
}
```

#### 1.3 刷新token接口

- **接口路径**：/api/v1/auth/refresh-token
- **请求方式**：POST
- **请求参数**：

```json
{
  "refresh_token": "string"
}
```

- **响应参数**：

```json
{
  "code": 200,
  "message": "刷新成功",
  "data": {
    "token": "string",
    "refresh_token": "string"
  }
}
```

### 2. 患者管理模块

#### 2.1 获取患者列表

- **接口路径**：/api/v1/patients
- **请求方式**：GET
- **请求参数**：
  - page: 页码
  - pageSize: 每页数量
  - keyword: 搜索关键词(姓名/手机号/身份证号)
- **响应参数**：

```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "total": "number",
    "list": [
      {
        "id": "number",
        "name": "string",
        "gender": "number",
        "birthDate": "string",
        "idCard": "string",
        "phone": "string",
        "address": "string",
        "medicalHistory": "string"
      }
    ]
  }
}
```

#### 2.2 获取患者详情

- **接口路径**：/api/v1/patients/{id}
- **请求方式**：GET
- **请求参数**：
  - id: 患者ID
- **响应参数**：

```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "id": "number",
    "name": "string",
    "gender": "number",
    "birthDate": "string",
    "idCard": "string",
    "phone": "string",
    "address": "string",
    "medicalHistory": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

#### 2.3 添加患者

- **接口路径**：/api/v1/patients
- **请求方式**：POST
- **请求参数**：

```json
{
  "name": "string",
  "gender": "number",
  "birthDate": "string",
  "idCard": "string",
  "phone": "string",
  "address": "string",
  "medicalHistory": "string"
}
```

- **响应参数**：

```json
{
  "code": 200,
  "message": "添加成功",
  "data": {
    "id": "number"
  }
}
```

#### 2.4 更新患者

- **接口路径**：/api/v1/patients/{id}
- **请求方式**：PUT
- **请求参数**：

```json
{
  "name": "string",
  "gender": "number",
  "birthDate": "string",
  "idCard": "string",
  "phone": "string",
  "address": "string",
  "medicalHistory": "string"
}
```

- **响应参数**：

```json
{
  "code": 200,
  "message": "更新成功",
  "data": null
}
```

#### 2.5 删除患者

- **接口路径**：/api/v1/patients/{id}
- **请求方式**：DELETE
- **请求参数**：
  - id: 患者ID
- **响应参数**：

```json
{
  "code": 200,
  "message": "删除成功",
  "data": null
}
```

### 3. 医生管理模块

#### 3.1 获取医生列表

- **接口路径**：/api/v1/doctors
- **请求方式**：GET
- **请求参数**：
  - page: 页码
  - pageSize: 每页数量
  - keyword: 搜索关键词(姓名/科室)
  - departmentId: 科室ID
- **响应参数**：

```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "total": "number",
    "list": [
      {
        "id": "number",
        "name": "string",
        "gender": "number",
        "title": "string",
        "departmentId": "number",
        "departmentName": "string",
        "specialty": "string",
        "phone": "string"
      }
    ]
  }
}
```

#### 3.2 获取医生详情

- **接口路径**：/api/v1/doctors/{id}
- **请求方式**：GET
- **请求参数**：
  - id: 医生ID
- **响应参数**：

```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "id": "number",
    "name": "string",
    "gender": "number",
    "title": "string",
    "departmentId": "number",
    "departmentName": "string",
    "specialty": "string",
    "phone": "string",
    "email": "string",
    "qualification": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

### 4. 科室管理模块

#### 4.1 获取科室列表

- **接口路径**：/api/v1/departments
- **请求方式**：GET
- **请求参数**：无
- **响应参数**：

```json
{
  "code": 200,
  "message": "获取成功",
  "data": [
    {
      "id": "number",
      "name": "string",
      "parentId": "number",
      "description": "string",
      "location": "string"
    }
  ]
}
```

#### 4.2 获取科室详情

- **接口路径**：/api/v1/departments/{id}
- **请求方式**：GET
- **请求参数**：
  - id: 科室ID
- **响应参数**：

```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "id": "number",
    "name": "string",
    "parentId": "number",
    "description": "string",
    "location": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

### 5. 药品管理模块

#### 5.1 获取药品列表

- **接口路径**：/api/v1/medicines
- **请求方式**：GET
- **请求参数**：
  - page: 页码
  - pageSize: 每页数量
  - keyword: 搜索关键词
  - categoryId: 分类ID
- **响应参数**：

```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "total": "number",
    "list": [
      {
        "id": "number",
        "name": "string",
        "categoryId": "number",
        "categoryName": "string",
        "specification": "string",
        "unit": "string",
        "price": "number",
        "stockQuantity": "number"
      }
    ]
  }
}
```

### 6. 预约管理模块

#### 6.1 创建预约

- **接口路径**：/api/v1/appointments
- **请求方式**：POST
- **请求参数**：

```json
{
  "patientId": "number",
  "doctorId": "number",
  "appointmentDate": "string",
  "appointmentTime": "string"
}
```

- **响应参数**：

```json
{
  "code": 200,
  "message": "创建成功",
  "data": {
    "id": "number"
  }
}
```

#### 6.2 获取预约列表

- **接口路径**：/api/v1/appointments
- **请求方式**：GET
- **请求参数**：
  - page: 页码
  - pageSize: 每页数量
  - patientId: 患者ID
  - doctorId: 医生ID
  - status: 状态(0:待确认, 1:已确认, 2:已取消, 3:已完成)
  - date: 日期
- **响应参数**：

```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "total": "number",
    "list": [
      {
        "id": "number",
        "patientId": "number",
        "patientName": "string",
        "doctorId": "number",
        "doctorName": "string",
        "departmentName": "string",
        "appointmentDate": "string",
        "appointmentTime": "string",
        "status": "number",
        "statusText": "string"
      }
    ]
  }
}
```

### 7. 费用管理模块

#### 7.1 创建收费记录

- **接口路径**：/api/v1/charges
- **请求方式**：POST
- **请求参数**：

```json
{
  "patientId": "number",
  "appointmentId": "number",
  "chargeItems": [
    {
      "itemType": "string", // 项目类型(挂号费/检查费/药费)
      "itemId": "number", // 项目ID
      "quantity": "number", // 数量
      "price": "number" // 单价
    }
  ],
  "paymentMethod": "string" // 支付方式
}
```

- **响应参数**：

```json
{
  "code": 200,
  "message": "创建成功",
  "data": {
    "id": "number",
    "totalAmount": "number",
    "status": "number"
  }
}
```

### 8. 医保管理模块

#### 8.1 获取医保信息

- **接口路径**：/api/v1/medical-insurance/{patientId}
- **请求方式**：GET
- **请求参数**：
  - patientId: 患者ID
- **响应参数**：

```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "id": "number",
    "patientId": "number",
    "insuranceNumber": "string",
    "insuranceType": "string",
    "effectiveDate": "string",
    "expiryDate": "string"
  }
}
```

#### 8.2 医保结算

- **接口路径**：/api/v1/medical-settlements
- **请求方式**：POST
- **请求参数**：

```json
{
  "patientId": "number",
  "chargeRecordId": "number"
}
```

- **响应参数**：

```json
{
  "code": 200,
  "message": "结算成功",
  "data": {
    "id": "number",
    "totalAmount": "number",
    "coveredAmount": "number",
    "selfPayAmount": "number"
  }
}
```

## 三、示例请求

### 1. 登录请求示例

```bash
curl -X POST \
  http://localhost:8080/api/v1/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"123456"}'
```

### 2. 获取患者列表请求示例

```bash
curl -X GET \
  'http://localhost:8080/api/v1/patients?page=1&pageSize=10&keyword=张三' \
  -H 'Authorization: Bearer {token}'
```

## 四、附录

### 1. 数据字典

[此处填写数据字典，包括接口中涉及的代码、状态等的详细说明]

### 2. 接口变更记录

| 版本 | 日期       | 变更内容 | 变更人     |
| ---- | ---------- | -------- | ---------- |
| v1.0 | 2023-XX-XX | 初始版本 | 系统设计组 |


# API 接口文档

## 目录
- [一、全局约定](#一全局约定)
  - [1. 基础规范](#1-基础规范)
  - [2. 安全认证](#2-安全认证)
  - [3. 错误处理](#3-错误处理)
- [二、模块接口](#二模块接口)
  - [1. 用户认证](#1-用户认证)
  - [2. 商品管理](#2-商品管理)
  - [3. 订单服务](#3-订单服务)
- [三、示例请求](#三示例请求)
- [四、附录](#四附录)