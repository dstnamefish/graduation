# 医疗管理系统 RESTful API 接口文档

## 文档概述

本文档描述了医疗管理系统的 RESTful API 接口，包含所有可用的端点、请求参数、响应参数和状态码。系统采用统一的响应格式和错误处理机制。

## 通用规范

### 基础URL
```
开发环境: http://localhost:8080/api
生产环境: https://your-domain.com/api
```

### 统一响应格式
所有 API 接口都使用 `Result<T>` 作为统一的响应格式：

```json
{
    "code": 200,
    "msg": "操作成功",
    "data": { ... },
    "timestamp": 1640995200000
}
```

### 状态码说明
- `200`: 成功
- `400`: 请求参数错误
- `401`: 未授权
- `403`: 禁止访问
- `404`: 资源不存在
- `500`: 服务器内部错误

---

## 1. 认证相关接口 (AuthController)

### 1.1 用户登录
- **接口地址**: `POST /auth/login`
- **功能描述**: 用户登录验证

**请求参数**:
```json
{
    "username": "string",     // 用户名
    "password": "string",     // 密码
    "captcha": "string"       // 验证码（可选）
}
```

**响应参数**:
```json
{
    "code": 200,
    "msg": "登录成功",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "userInfo": {
            "id": 1,
            "username": "admin",
            "role": "ADMIN"
        },
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
}
```

### 1.2 用户注册
- **接口地址**: `POST /auth/register`
- **功能描述**: 新用户注册

**请求参数**:
```json
{
    "username": "string",     // 用户名
    "email": "string",        // 邮箱
    "password": "string",     // 密码
    "phone": "string",        // 手机号
    "confirmPassword": "string" // 确认密码
}
```

**响应参数**:
```json
{
    "code": 200,
    "msg": "注册成功",
    "data": {
        "id": 1,
        "username": "user001",
        "email": "user@example.com"
    }
}
```

### 1.3 刷新令牌
- **接口地址**: `POST /auth/refresh`
- **功能描述**: 使用刷新令牌获取新的访问令牌

**请求参数**:
```json
{
    "refreshToken": "string"  // 刷新令牌
}
```

**响应参数**:
```json
{
    "code": 200,
    "msg": "令牌刷新成功",
    "data": {
        "token": "new-jwt-token",
        "refreshToken": "new-refresh-token"
    }
}
```

---

## 2. 用户管理接口 (UserController)

### 2.1 获取当前用户信息
- **接口地址**: `GET /user/info`
- **功能描述**: 获取当前登录用户的详细信息
- **认证**: 需要

**响应参数**:
```json
{
    "code": 200,
    "msg": "获取用户信息成功",
    "data": {
        "id": 1,
        "username": "admin",
        "role": "ADMIN"
    }
}
```

---

## 3. 患者管理接口 (PatientController)

### 3.1 分页获取患者列表
- **接口地址**: `GET /patient/list`
- **功能描述**: 分页查询患者信息列表

**查询参数**:
- `pageNum`: 页码（默认1）
- `pageSize`: 每页数量（默认10）
- `keyword`: 搜索关键词（患者姓名、手机号）

**响应参数**:
```json
{
    "code": 200,
    "msg": "获取患者列表成功",
    "data": {
        "data": [
            {
                "id": 1,
                "name": "张三",
                "gender": "男",
                "age": 35,
                "phone": "13800138001",
                "idCard": "123456789012345678",
                "address": "北京市朝阳区xxx街道",
                "emergencyContact": "李四",
                "emergencyPhone": "13900139001"
            }
        ],
        "total": 100,
        "pageNum": 1,
        "pageSize": 10,
        "pages": 10
    }
}
```

### 3.2 获取患者详细信息
- **接口地址**: `GET /patient/detail/{id}`
- **功能描述**: 根据患者ID获取患者详细信息

**路径参数**:
- `id`: 患者ID

**响应参数**:
```json
{
    "code": 200,
    "msg": "获取患者详情成功",
    "data": {
        "id": 1,
        "name": "张三",
        "gender": "男",
        "age": 35,
        "phone": "13800138001",
        "email": "zhangsan@example.com",
        "idCard": "123456789012345678",
        "address": "北京市朝阳区xxx街道",
        "birthDate": "1988-01-01",
        "maritalStatus": "已婚",
        "bloodType": "A型",
        "allergyHistory": "青霉素过敏",
        "medicalHistory": "高血压病史",
        "emergencyContact": "李四",
        "emergencyPhone": "13900139001",
        "emergencyRelation": "配偶",
        "createdAt": "2024-01-01T00:00:00",
        "updatedAt": "2024-01-15T10:30:00"
    }
}
```

---

## 4. 科室管理接口 (DepartmentController)

### 4.1 获取科室详细信息
- **接口地址**: `GET /department/detail/{id}`
- **功能描述**: 根据科室ID获取科室详细信息

**路径参数**:
- `id`: 科室ID

**响应参数**:
```json
{
    "code": 200,
    "msg": "获取科室详情成功",
    "data": {
        "id": 1,
        "name": "内科",
        "description": "内科科室，负责常见内科疾病诊疗",
        "floor": "2楼",
        "phone": "010-12345678",
        "headOfDepartment": "王主任",
        "numberOfBeds": 50,
        "establishedDate": "2020-01-01",
        "isActive": true
    }
}
```

### 4.2 获取科室列表
- **接口地址**: `GET /department/list`
- **功能描述**: 获取所有科室列表

**响应参数**:
```json
{
    "code": 200,
    "msg": "获取科室列表成功",
    "data": [
        {
            "id": 1,
            "name": "内科",
            "description": "内科科室，负责常见内科疾病诊疗",
            "floor": "2楼",
            "phone": "010-12345678",
            "isActive": true
        },
        {
            "id": 2,
            "name": "外科",
            "description": "外科科室，负责外科手术和疾病治疗",
            "floor": "3楼",
            "phone": "010-12345679",
            "isActive": true
        }
    ]
}
```

### 4.3 获取科室医生列表
- **接口地址**: `GET /department/{id}/doctors`
- **功能描述**: 根据科室ID获取该科室下的医生列表

**路径参数**:
- `id`: 科室ID

**响应参数**:
```json
{
    "code": 200,
    "msg": "获取科室医生列表成功",
    "data": {
        "department": {
            "id": 1,
            "name": "内科"
        },
        "doctors": [
            {
                "id": 1,
                "name": "李医生",
                "title": "主任医师",
                "specialty": "心血管内科",
                "phone": "13800138002",
                "email": "doctor1@hospital.com",
                "isActive": true
            }
        ]
    }
}
```

---

## 5. 医生管理接口 (DoctorController)

### 5.1 获取医生列表
- **接口地址**: `GET /doctor/list`
- **功能描述**: 分页查询医生列表

**查询参数**:
- `pageNum`: 页码（默认1）
- `pageSize`: 每页数量（默认10）
- `departmentId`: 科室ID（可选）
- `keyword`: 搜索关键词（医生姓名、职称）

**响应参数**:
```json
{
    "code": 200,
    "msg": "获取医生列表成功",
    "data": {
        "data": [
            {
                "id": 1,
                "name": "李医生",
                "gender": "男",
                "title": "主任医师",
                "department": "内科",
                "specialty": "心血管内科",
                "phone": "13800138002",
                "email": "doctor1@hospital.com",
                "education": "博士学位",
                "experience": 15,
                "isActive": true,
                "avatar": "https://example.com/avatar1.jpg"
            }
        ],
        "total": 50,
        "pageNum": 1,
        "pageSize": 10,
        "pages": 5
    }
}
```

### 5.2 获取医生详细信息
- **接口地址**: `GET /doctor/detail/{id}`
- **功能描述**: 根据医生ID获取医生详细信息

**路径参数**:
- `id`: 医生ID

**响应参数**:
```json
{
    "code": 200,
    "msg": "获取医生详情成功",
    "data": {
        "id": 1,
        "name": "李医生",
        "gender": "男",
        "age": 42,
        "title": "主任医师",
        "department": "内科",
        "departmentId": 1,
        "specialty": "心血管内科",
        "phone": "13800138002",
        "email": "doctor1@hospital.com",
        "education": "博士学位",
        "experience": 15,
        "certifications": ["医师资格证", "心血管专科证书"],
        "research": ["高血压研究", "冠心病治疗"],
        "schedule": {
            "monday": ["08:00-12:00", "14:00-18:00"],
            "tuesday": ["08:00-12:00", "14:00-18:00"],
            "wednesday": ["08:00-12:00"],
            "thursday": ["14:00-18:00"],
            "friday": ["08:00-12:00", "14:00-18:00"]
        },
        "isActive": true,
        "avatar": "https://example.com/avatar1.jpg",
        "createdAt": "2020-01-01T00:00:00"
    }
}
```

### 5.3 根据科室ID获取医生列表
- **接口地址**: `GET /doctor/department/{departmentId}`
- **功能描述**: 根据科室ID获取该科室下的医生列表

**路径参数**:
- `departmentId`: 科室ID

**响应参数**:
```json
{
    "code": 200,
    "msg": "获取科室医生列表成功",
    "data": [
        {
            "id": 1,
            "name": "李医生",
            "title": "主任医师",
            "specialty": "心血管内科",
            "isActive": true
        },
        {
            "id": 2,
            "name": "王医生",
            "title": "副主任医师",
            "specialty": "内分泌科",
            "isActive": true
        }
    ]
}
```

---

## 6. 预约管理接口 (AppointmentController)

### 6.1 分页获取预约列表
- **接口地址**: `GET /appointment/list`
- **功能描述**: 分页查询预约列表

**查询参数**:
- `pageNum`: 页码（默认1）
- `pageSize`: 每页数量（默认10）
- `status`: 预约状态（可选：PENDING、CONFIRMED、CANCELLED、COMPLETED）
- `date`: 预约日期（可选，格式：YYYY-MM-DD）

**响应参数**:
```json
{
    "code": 200,
    "msg": "获取预约列表成功",
    "data": {
        "data": [
            {
                "id": 1,
                "patientName": "张三",
                "patientPhone": "13800138001",
                "patientAge": 35,
                "patientGender": "男",
                "doctorName": "李医生",
                "doctorTitle": "主任医师",
                "departmentName": "内科",
                "appointmentTime": "2024-02-20T09:00:00",
                "status": "CONFIRMED",
                "symptoms": "胸闷气短",
                "description": "患者自述近期出现胸闷气短症状",
                "createdAt": "2024-02-19T10:30:00"
            }
        ],
        "total": 100,
        "pageNum": 1,
        "pageSize": 10,
        "pages": 10
    }
}
```

### 6.2 获取预约详细信息
- **接口地址**: `GET /appointment/detail/{id}`
- **功能描述**: 根据预约ID获取预约详细信息

**路径参数**:
- `id`: 预约ID

**响应参数**:
```json
{
    "code": 200,
    "msg": "获取预约详情成功",
    "data": {
        "id": 1,
        "patientId": 1,
        "patientName": "张三",
        "patientPhone": "13800138001",
        "patientAge": 35,
        "patientGender": "男",
        "patientIdCard": "123456789012345678",
        "doctorId": 1,
        "doctorName": "李医生",
        "doctorTitle": "主任医师",
        "departmentId": 1,
        "departmentName": "内科",
        "appointmentTime": "2024-02-20T09:00:00",
        "duration": 30,
        "status": "CONFIRMED",
        "symptoms": "胸闷气短",
        "description": "患者自述近期出现胸闷气短症状",
        "notes": "建议空腹就诊",
        "reminderSent": false,
        "createdAt": "2024-02-19T10:30:00",
        "updatedAt": "2024-02-19T15:20:00"
    }
}
```

### 6.3 根据患者ID获取预约列表
- **接口地址**: `GET /appointment/patient/{patientId}`
- **功能描述**: 根据患者ID获取该患者的所有预约

**路径参数**:
- `patientId`: 患者ID

**响应参数**:
```json
{
    "code": 200,
    "msg": "获取患者预约列表成功",
    "data": [
        {
            "id": 1,
            "doctorName": "李医生",
            "departmentName": "内科",
            "appointmentTime": "2024-02-20T09:00:00",
            "status": "CONFIRMED",
            "symptoms": "胸闷气短"
        }
    ]
}
```

### 6.4 根据医生ID获取预约列表
- **接口地址**: `GET /appointment/doctor/{doctorId}`
- **功能描述**: 根据医生ID获取该医生的所有预约

**路径参数**:
- `doctorId`: 医生ID

**查询参数**:
- `date`: 日期（可选，格式：YYYY-MM-DD）

**响应参数**:
```json
{
    "code": 200,
    "msg": "获取医生预约列表成功",
    "data": [
        {
            "id": 1,
            "patientName": "张三",
            "appointmentTime": "2024-02-20T09:00:00",
            "duration": 30,
            "status": "CONFIRMED",
            "symptoms": "胸闷气短"
        }
    ]
}
```

### 6.5 创建预约
- **接口地址**: `POST /appointment/create`
- **功能描述**: 创建新的预约

**请求参数**:
```json
{
    "patientId": 1,
    "doctorId": 1,
    "appointmentTime": "2024-02-20T09:00:00",
    "symptoms": "胸闷气短",
    "description": "患者自述近期出现胸闷气短症状"
}
```

**响应参数**:
```json
{
    "code": 200,
    "msg": "预约创建成功",
    "data": {
        "id": 1,
        "appointmentTime": "2024-02-20T09:00:00",
        "status": "PENDING"
    }
}
```

### 6.6 更新预约
- **接口地址**: `PUT /appointment/update/{id}`
- **功能描述**: 更新预约信息

**路径参数**:
- `id`: 预约ID

**请求参数**:
```json
{
    "appointmentTime": "2024-02-20T10:00:00",
    "symptoms": "胸闷气短加重",
    "description": "症状有所加重",
    "status": "CONFIRMED"
}
```

**响应参数**:
```json
{
    "code": 200,
    "msg": "预约更新成功",
    "data": {
        "id": 1,
        "appointmentTime": "2024-02-20T10:00:00",
        "status": "CONFIRMED"
    }
}
```

### 6.7 取消预约
- **接口地址**: `DELETE /appointment/cancel/{id}`
- **功能描述**: 取消指定预约

**路径参数**:
- `id`: 预约ID

**响应参数**:
```json
{
    "code": 200,
    "msg": "预约取消成功",
    "data": {
        "id": 1,
        "status": "CANCELLED"
    }
}
```

### 6.8 获取今日预约
- **接口地址**: `GET /appointment/today`
- **功能描述**: 获取今日所有预约

**响应参数**:
```json
{
    "code": 200,
    "msg": "获取今日预约成功",
    "data": [
        {
            "id": 1,
            "patientName": "张三",
            "doctorName": "李医生",
            "appointmentTime": "2024-02-20T09:00:00",
            "status": "CONFIRMED",
            "symptoms": "胸闷气短"
        }
    ]
}
```

---

## 7. 库存管理接口 (InventoryController)

### 7.1 分页获取库存列表
- **接口地址**: `GET /inventory/list`
- **功能描述**: 分页查询库存列表

**查询参数**:
- `pageNum`: 页码（默认1）
- `pageSize`: 每页数量（默认10）
- `keyword`: 搜索关键词（药品名称、编码）

**响应参数**:
```json
{
    "code": 200,
    "msg": "获取库存列表成功",
    "data": {
        "data": [
            {
                "itemCode": "MED001",
                "itemName": "阿司匹林",
                "category": "心血管药物",
                "specification": "100mg*30片",
                "manufacturer": "拜耳制药",
                "unitPrice": 25.50,
                "stockQuantity": 500,
                "minStockLevel": 100,
                "expiryDate": "2025-12-31",
                "storageLocation": "A1货架",
                "batchNumber": "B202401001",
                "lastRestocked": "2024-01-15",
                "isActive": true
            }
        ],
        "total": 100,
        "pageNum": 1,
        "pageSize": 10,
        "pages": 10
    }
}
```

### 7.2 按药品名称搜索库存
- **接口地址**: `GET /inventory/search`
- **功能描述**: 根据药品名称搜索库存信息

**查询参数**:
- `name`: 药品名称关键词

**响应参数**:
```json
{
    "code": 200,
    "msg": "搜索库存成功",
    "data": [
        {
            "itemCode": "MED001",
            "itemName": "阿司匹林",
            "category": "心血管药物",
            "specification": "100mg*30片",
            "stockQuantity": 500,
            "unitPrice": 25.50,
            "isActive": true
        }
    ]
}
```

---

## 8. 医生排班接口 (DoctorScheduleController)

### 8.1 获取月度排班信息
- **接口地址**: `GET /doctor-schedule/monthly`
- **功能描述**: 获取指定医生指定月份的排班信息

**查询参数**:
- `doctorId`: 医生ID
- `year`: 年份（格式：2024）
- `month`: 月份（格式：02）

**响应参数**:
```json
{
    "code": 200,
    "msg": "获取月度排班成功",
    "data": {
        "doctorId": 1,
        "doctorName": "李医生",
        "year": 2024,
        "month": 2,
        "schedules": [
            {
                "date": "2024-02-01",
                "periods": [
                    {
                        "timeSlot": "08:00-12:00",
                        "status": "AVAILABLE",
                        "maxAppointments": 20,
                        "currentAppointments": 15
                    },
                    {
                        "timeSlot": "14:00-18:00",
                        "status": "AVAILABLE",
                        "maxAppointments": 20,
                        "currentAppointments": 12
                    }
                ]
            }
        ]
    }
}
```

### 8.2 获取周度排班信息
- **接口地址**: `GET /doctor-schedule/weekly`
- **功能描述**: 获取指定医生指定周的排班信息

**查询参数**:
- `doctorId`: 医生ID
- `year`: 年份（格式：2024）
- `week`: 周数（格式：08）

**响应参数**:
```json
{
    "code": 200,
    "msg": "获取周度排班成功",
    "data": {
        "doctorId": 1,
        "doctorName": "李医生",
        "year": 2024,
        "week": 8,
        "startDate": "2024-02-19",
        "endDate": "2024-02-25",
        "schedules": [
            {
                "date": "2024-02-19",
                "dayOfWeek": "星期一",
                "periods": [
                    {
                        "timeSlot": "08:00-12:00",
                        "status": "AVAILABLE",
                        "maxAppointments": 20,
                        "currentAppointments": 15
                    }
                ]
            }
        ]
    }
}
```

### 8.3 获取日度排班信息
- **接口地址**: `GET /doctor-schedule/daily`
- **功能描述**: 获取指定医生指定日期的排班信息

**查询参数**:
- `doctorId`: 医生ID
- `date`: 日期（格式：2024-02-20）

**响应参数**:
```json
{
    "code": 200,
    "msg": "获取日度排班成功",
    "data": {
        "doctorId": 1,
        "doctorName": "李医生",
        "date": "2024-02-20",
        "dayOfWeek": "星期二",
        "schedules": [
            {
                "timeSlot": "08:00-12:00",
                "status": "AVAILABLE",
                "maxAppointments": 20,
                "currentAppointments": 15
            }
        ]
    }
}
```

### 8.4 获取医生详细排班
- **接口地址**: `GET /doctor-schedule/detail`
- **功能描述**: 获取指定医生的详细排班信息

**查询参数**:
- `doctorId`: 医生ID
- `startDate`: 开始日期（格式：2024-02-01）
- `endDate`: 结束日期（格式：2024-02-29）

**响应参数**:
```json
{
    "code": 200,
    "msg": "获取医生详细排班成功",
    "data": {
        "doctorId": 1,
        "doctorName": "李医生",
        "department": "内科",
        "periods": [
            {
                "date": "2024-02-20",
                "timeSlot": "08:00-12:00",
                "status": "AVAILABLE",
                "location": "内科门诊1",
                "maxAppointments": 20,
                "currentAppointments": 15,
                "remainingSlots": 5
            }
        ]
    }
}
```

### 8.5 创建排班
- **接口地址**: `POST /doctor-schedule/create`
- **功能描述**: 创建新的排班记录

**请求参数**:
```json
{
    "doctorId": 1,
    "date": "2024-02-21",
    "timeSlot": "14:00-18:00",
    "location": "内科门诊2",
    "maxAppointments": 15,
    "notes": "临时增加排班"
}
```

**响应参数**:
```json
{
    "code": 200,
    "msg": "排班创建成功",
    "data": {
        "id": 1,
        "doctorId": 1,
        "date": "2024-02-21",
        "timeSlot": "14:00-18:00",
        "status": "AVAILABLE"
    }
}
```

### 8.6 更新排班
- **接口地址**: `PUT /doctor-schedule/update/{id}`
- **功能描述**: 更新排班信息

**路径参数**:
- `id`: 排班ID

**请求参数**:
```json
{
    "timeSlot": "09:00-13:00",
    "location": "内科门诊3",
    "maxAppointments": 18,
    "notes": "时间调整"
}
```

**响应参数**:
```json
{
    "code": 200,
    "msg": "排班更新成功",
    "data": {
        "id": 1,
        "timeSlot": "09:00-13:00",
        "location": "内科门诊3"
    }
}
```

### 8.7 删除排班
- **接口地址**: `DELETE /doctor-schedule/delete/{id}`
- **功能描述**: 删除指定的排班记录

**路径参数**:
- `id`: 排班ID

**响应参数**:
```json
{
    "code": 200,
    "msg": "排班删除成功",
    "data": null
}
```

---

## 9. 财务/支付接口 (PaymentController)

### 9.1 分页获取发票列表
- **接口地址**: `GET /payment/invoices`
- **功能描述**: 分页查询发票列表，支持搜索和过滤

**查询参数**:
- `pageNum`: 页码（默认1）
- `pageSize`: 每页数量（默认10）
- `keyword`: 搜索关键词（患者姓名、医生姓名、科室）
- `status`: 发票状态（可选：PAID、PENDING、CANCELLED）
- `paymentMethod`: 支付方式（可选：CASH、CARD、TRANSFER）
- `startDate`: 开始日期（格式：YYYY-MM-DD）
- `endDate`: 结束日期（格式：YYYY-MM-DD）

**响应参数**:
```json
{
    "code": 200,
    "msg": "获取发票列表成功",
    "data": {
        "data": [
            {
                "id": 1,
                "patientName": "张三",
                "patientPhone": "13800138001",
                "doctorName": "李医生",
                "departmentName": "内科",
                "treatmentName": "心电图检查",
                "amount": 150.00,
                "status": "PAID",
                "paymentMethod": "CARD",
                "paidAt": "2024-02-20T10:30:00",
                "createdAt": "2024-02-20T10:15:00"
            }
        ],
        "total": 100,
        "pageNum": 1,
        "pageSize": 10,
        "pages": 10
    }
}
```

### 9.2 获取发票统计数据
- **接口地址**: `GET /payment/stats`
- **功能描述**: 获取发票统计数据

**查询参数**:
- `startDate`: 开始日期（格式：YYYY-MM-DD）
- `endDate`: 结束日期（格式：YYYY-MM-DD）

**响应参数**:
```json
{
    "code": 200,
    "msg": "获取统计数据成功",
    "data": {
        "totalRevenue": 50000.00,
        "totalInvoices": 500,
        "paidInvoices": 450,
        "pendingInvoices": 45,
        "cancelledInvoices": 5,
        "averageAmount": 100.00,
        "paymentMethodStats": {
            "CASH": 20000.00,
            "CARD": 25000.00,
            "TRANSFER": 5000.00
        },
        "departmentStats": {
            "内科": 15000.00,
            "外科": 20000.00,
            "儿科": 10000.00,
            "妇产科": 5000.00
        }
    }
}
```

### 9.3 获取趋势数据
- **接口地址**: `GET /payment/trends`
- **功能描述**: 获取收入趋势数据

**查询参数**:
- `period`: 统计周期（可选：daily、weekly、monthly）
- `startDate`: 开始日期（格式：YYYY-MM-DD）
- `endDate`: 结束日期（格式：YYYY-MM-DD）

**响应参数**:
```json
{
    "code": 200,
    "msg": "获取趋势数据成功",
    "data": {
        "period": "daily",
        "startDate": "2024-02-01",
        "endDate": "2024-02-29",
        "trends": [
            {
                "date": "2024-02-01",
                "revenue": 2000.00,
                "invoiceCount": 20,
                "averageAmount": 100.00
            },
            {
                "date": "2024-02-02",
                "revenue": 2500.00,
                "invoiceCount": 25,
                "averageAmount": 100.00
            }
        ]
    }
}
```

### 9.4 获取发票详细信息
- **接口地址**: `GET /payment/invoice/{id}`
- **功能描述**: 根据发票ID获取详细信息

**路径参数**:
- `id`: 发票ID

**响应参数**:
```json
{
    "code": 200,
    "msg": "获取发票详情成功",
    "data": {
        "id": 1,
        "invoiceNumber": "INV-2024-001",
        "patientId": 1,
        "patientName": "张三",
        "patientPhone": "13800138001",
        "patientIdCard": "123456789012345678",
        "doctorId": 1,
        "doctorName": "李医生",
        "departmentId": 1,
        "departmentName": "内科",
        "treatmentDetails": [
            {
                "itemName": "心电图检查",
                "quantity": 1,
                "unitPrice": 150.00,
                "totalPrice": 150.00
            }
        ],
        "subtotal": 150.00,
        "tax": 0.00,
        "discount": 0.00,
        "totalAmount": 150.00,
        "status": "PAID",
        "paymentMethod": "CARD",
        "paidAt": "2024-02-20T10:30:00",
        "notes": "患者已完成支付",
        "createdAt": "2024-02-20T10:15:00",
        "updatedAt": "2024-02-20T10:30:00"
    }
}
```

### 9.5 更新发票状态
- **接口地址**: `PUT /payment/invoice/{id}/status`
- **功能描述**: 更新发票状态

**路径参数**:
- `id`: 发票ID

**请求参数**:
```json
{
    "status": "PAID",
    "paymentMethod": "CARD",
    "notes": "患者使用银行卡支付完成"
}
```

**响应参数**:
```json
{
    "code": 200,
    "msg": "发票状态更新成功",
    "data": {
        "id": 1,
        "status": "PAID",
        "paymentMethod": "CARD",
        "paidAt": "2024-02-20T10:30:00"
    }
}
```

---

## 10. 验证接口 (ValidateController)

### 10.1 验证用户名唯一性
- **接口地址**: `GET /validate/username`
- **功能描述**: 检查用户名是否已存在

**查询参数**:
- `username`: 要验证的用户名

**响应参数**:
```json
{
    "code": 200,
    "msg": "验证成功",
    "data": {
        "username": "admin",
        "exists": true
    }
}
```

### 10.2 验证邮箱唯一性
- **接口地址**: `GET /validate/email`
- **功能描述**: 检查邮箱是否已存在

**查询参数**:
- `email`: 要验证的邮箱

**响应参数**:
```json
{
    "code": 200,
    "msg": "验证成功",
    "data": {
        "email": "admin@hospital.com",
        "exists": false
    }
}
```

---

## 错误代码说明

| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权，需要登录 |
| 403 | 禁止访问，权限不足 |
| 404 | 资源不存在 |
| 409 | 资源冲突，如用户名或邮箱已存在 |
| 422 | 请求参数验证失败 |
| 500 | 服务器内部错误 |

## 请求头说明

### 认证请求头
```
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

### 分页请求头
```
pageNum: 1          // 页码
pageSize: 10        // 每页数量
```

## 注意事项

1. **认证**: 大部分接口需要认证，需要在请求头中携带有效的JWT令牌
2. **分页**: 所有列表接口都支持分页查询，通过pageNum和pageSize参数控制
3. **搜索**: 支持关键字搜索，具体搜索字段请参考各接口说明
4. **时间格式**: 所有时间参数使用ISO 8601格式（YYYY-MM-DDTHH:mm:ss）
5. **日期格式**: 所有日期参数使用格式（YYYY-MM-DD）
6. **状态枚举**: 状态字段使用固定枚举值，具体值请参考各接口说明
7. **错误处理**: 所有接口都有统一的错误处理机制，请根据响应码进行相应处理

---

**文档版本**: v1.0  
**最后更新**: 2024年2月20日  
**维护者**: 医疗管理系统开发团队