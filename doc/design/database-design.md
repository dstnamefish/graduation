# 数据库设计文档

## 目录

- [一、版本记录](#一版本记录)
- [二、设计原则](#二设计原则)
- [三、ER图](#三er图)
- [四、表结构](#四表结构)
  - [1. 用户认证模块](#1-用户认证模块)
  - [2. 患者管理模块](#2-患者管理模块)
  - [3. 医生管理模块](#3-医生管理模块)
  - [4. 科室管理模块](#4-科室管理模块)
  - [5. 药品管理模块](#5-药品管理模块)
  - [6. 预约管理模块](#6-预约管理模块)
  - [7. 费用管理模块](#7-费用管理模块)
  - [8. 医保管理模块](#8-医保管理模块)
- [五、索引设计](#五索引设计)
- [六、关系说明](#六关系说明)
- [七、数据字典](#七数据字典)
- [八、附录](#八附录)

## 一、版本记录

| 版本号 | 作者       | 日期       | 描述     |
| ------ | ---------- | ---------- | -------- |
| V1.0   | 系统设计组 | 2023-XX-XX | 初始设计 |

## 二、设计原则

1. 规范化原则：遵循第三范式(3NF)，确保数据结构清晰、冗余最小。
2. 完整性原则：确保数据的实体完整性、参照完整性和域完整性。
3. 一致性原则：保持数据格式、命名规范的一致性。
4. 可扩展性原则：设计应考虑未来的扩展需求。
5. 安全性原则：设计应考虑数据的安全性和隐私保护。

## 三、ER图

[此处插入ER图]。ER图展示了系统中主要实体及其关系，包括患者、医生、科室、药品等。

## 四、表结构

### 1. 用户认证模块

#### 1.1 用户表(users)

| 字段名     | 数据类型  | 长度 | 约束                                                  | 描述                 |
| ---------- | -------- | ---- | ----------------------------------------------------- | -------------------- |
| id         | INT      | 11   | PRIMARY KEY, AUTO_INCREMENT                           | 用户ID               |
| username   | VARCHAR  | 50   | NOT NULL, UNIQUE                                      | 用户名               |
| password   | VARCHAR  | 100  | NOT NULL                                              | 密码(加密存储)       |
| email      | VARCHAR  | 100  | UNIQUE                                                | 邮箱                 |
| phone      | VARCHAR  | 20   | UNIQUE                                                | 手机号               |
| role_id    | INT      | 11   | NOT NULL, FOREIGN KEY                                 | 角色ID               |
| status     | TINYINT  | 1    | DEFAULT 1                                             | 状态(0:禁用, 1:启用) |
| created_at | DATETIME |      | DEFAULT CURRENT_TIMESTAMP                             | 创建时间             |
| updated_at | DATETIME |      | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间             |

#### 1.2 角色表(roles)

| 字段名      | 数据类型 | 长度 | 约束                                                  | 描述     |
| ----------- | -------- | ---- | ----------------------------------------------------- | -------- |
| id          | INT      | 11   | PRIMARY KEY, AUTO_INCREMENT                           | 角色ID   |
| name        | VARCHAR  | 50   | NOT NULL, UNIQUE                                      | 角色名称 |
| description | TEXT     |      |                                                       | 角色描述 |
| created_at  | DATETIME |      | DEFAULT CURRENT_TIMESTAMP                             | 创建时间 |
| updated_at  | DATETIME |      | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

#### 1.3 权限表(permissions)

| 字段名      | 数据类型 | 长度 | 约束                                                  | 描述     |
| ----------- | -------- | ---- | ----------------------------------------------------- | -------- |
| id          | INT      | 11   | PRIMARY KEY, AUTO_INCREMENT                           | 权限ID   |
| name        | VARCHAR  | 50   | NOT NULL, UNIQUE                                      | 权限名称 |
| description | TEXT     |      |                                                       | 权限描述 |
| created_at  | DATETIME |      | DEFAULT CURRENT_TIMESTAMP                             | 创建时间 |
| updated_at  | DATETIME |      | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

#### 1.4 角色权限关联表(role_permissions)

| 字段名        | 数据类型 | 长度 | 约束                      | 描述     |
| ------------- | -------- | ---- | ------------------------- | -------- |
| role_id       | INT      | 11   | PRIMARY KEY, FOREIGN KEY  | 角色ID   |
| permission_id | INT      | 11   | PRIMARY KEY, FOREIGN KEY  | 权限ID   |
| created_at    | DATETIME |      | DEFAULT CURRENT_TIMESTAMP | 创建时间 |

### 2. 患者管理模块

#### 2.1 患者表(patients)

| 字段名          | 数据类型 | 长度 | 约束                                                  | 描述                     |
| --------------- | -------- | ---- | ----------------------------------------------------- | ------------------------ |
| id              | INT      | 11   | PRIMARY KEY, AUTO_INCREMENT                           | 患者ID                   |
| name            | VARCHAR  | 50   | NOT NULL                                              | 患者姓名                 |
| gender          | TINYINT  | 1    |                                                       | 性别(0:未知, 1:男, 2:女) |
| birth_date      | DATE     |      |                                                       | 出生日期                 |
| id_card         | VARCHAR  | 20   | UNIQUE                                                | 身份证号                 |
| phone           | VARCHAR  | 20   |                                                       | 手机号                   |
| address         | VARCHAR  | 255  |                                                       | 地址                     |
| medical_history | TEXT     |      |                                                       | 病史                     |
| created_at      | DATETIME |      | DEFAULT CURRENT_TIMESTAMP                             | 创建时间                 |
| updated_at      | DATETIME |      | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间                 |

#### 2.2 患者回访表(patient_visits)

| 字段名        | 数据类型 | 长度 | 约束                                                  | 描述     |
| ------------- | -------- | ---- | ----------------------------------------------------- | -------- |
| id            | INT      | 11   | PRIMARY KEY, AUTO_INCREMENT                           | 回访ID   |
| patient_id    | INT      | 11   | NOT NULL, FOREIGN KEY                                 | 患者ID   |
| visit_date    | DATE     |      | NOT NULL                                              | 回访日期 |
| visit_content | TEXT     |      |                                                       | 回访内容 |
| visitor_id    | INT      | 11   | NOT NULL, FOREIGN KEY                                 | 回访人ID |
| created_at    | DATETIME |      | DEFAULT CURRENT_TIMESTAMP                             | 创建时间 |
| updated_at    | DATETIME |      | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

### 3. 医生管理模块

#### 3.1 医生表(doctors)

| 字段名        | 数据类型 | 长度 | 约束                                                  | 描述                     |
| ------------- | -------- | ---- | ----------------------------------------------------- | ------------------------ |
| id            | INT      | 11   | PRIMARY KEY, AUTO_INCREMENT                           | 医生ID                   |
| user_id       | INT      | 11   | UNIQUE, FOREIGN KEY                                   | 用户ID                   |
| name          | VARCHAR  | 50   | NOT NULL                                              | 医生姓名                 |
| gender        | TINYINT  | 1    |                                                       | 性别(0:未知, 1:男, 2:女) |
| title         | VARCHAR  | 50   |                                                       | 职称                     |
| department_id | INT      | 11   | NOT NULL, FOREIGN KEY                                 | 科室ID                   |
| specialty     | VARCHAR  | 100  |                                                       | 专长                     |
| phone         | VARCHAR  | 20   |                                                       | 手机号                   |
| email         | VARCHAR  | 100  |                                                       | 邮箱                     |
| qualification | TEXT     |      |                                                       | 资质信息                 |
| created_at    | DATETIME |      | DEFAULT CURRENT_TIMESTAMP                             | 创建时间                 |
| updated_at    | DATETIME |      | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间                 |

#### 3.2 医生排班表(doctor_schedules)

| 字段名        | 数据类型 | 长度 | 约束                                                  | 描述                 |
| ------------- | -------- | ---- | ----------------------------------------------------- | -------------------- |
| id            | INT      | 11   | PRIMARY KEY, AUTO_INCREMENT                           | 排班ID               |
| doctor_id     | INT      | 11   | NOT NULL, FOREIGN KEY                                 | 医生ID               |
| schedule_date | DATE     |      | NOT NULL                                              | 排班日期             |
| start_time    | TIME     |      | NOT NULL                                              | 开始时间             |
| end_time      | TIME     |      | NOT NULL                                              | 结束时间             |
| status        | TINYINT  | 1    | DEFAULT 1                                             | 状态(0:休息, 1:出诊) |
| max_patients  | INT      | 11   | DEFAULT 20                                            | 最大接诊数           |
| created_at    | DATETIME |      | DEFAULT CURRENT_TIMESTAMP                             | 创建时间             |
| updated_at    | DATETIME |      | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间             |

#### 3.3 医生绩效表(doctor_performances)

| 字段名             | 数据类型 | 长度 | 约束                                                  | 描述                |
| ------------------ | -------- | ---- | ----------------------------------------------------- | ------------------- |
| id                 | INT      | 11   | PRIMARY KEY, AUTO_INCREMENT                           | 绩效ID              |
| doctor_id          | INT      | 11   | NOT NULL, FOREIGN KEY                                 | 医生ID              |
| statistical_period | VARCHAR  | 20   | NOT NULL                                              | 统计周期(如2023-06) |
| patient_count      | INT      | 11   | DEFAULT 0                                             | 接诊量              |
| prescription_count | INT      | 11   | DEFAULT 0                                             | 处方量              |
| revenue            | DECIMAL  | 10,2 | DEFAULT 0.00                                          | 收入                |
| evaluation_score   | DECIMAL  | 3,2  | DEFAULT 0.00                                          | 评价分数            |
| created_at         | DATETIME |      | DEFAULT CURRENT_TIMESTAMP                             | 创建时间            |
| updated_at         | DATETIME |      | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间            |

### 4. 科室管理模块

#### 4.1 科室表(departments)

| 字段名      | 数据类型 | 长度 | 约束                                                  | 描述     |
| ----------- | -------- | ---- | ----------------------------------------------------- | -------- |
| id          | INT      | 11   | PRIMARY KEY, AUTO_INCREMENT                           | 科室ID   |
| name        | VARCHAR  | 50   | NOT NULL, UNIQUE                                      | 科室名称 |
| parent_id   | INT      | 11   | FOREIGN KEY                                           | 父科室ID |
| description | TEXT     |      |                                                       | 科室描述 |
| location    | VARCHAR  | 100  |                                                       | 科室位置 |
| created_at  | DATETIME |      | DEFAULT CURRENT_TIMESTAMP                             | 创建时间 |
| updated_at  | DATETIME |      | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

#### 4.2 科室排班表(department_schedules)

| 字段名        | 数据类型 | 长度 | 约束                                                  | 描述     |
| ------------- | -------- | ---- | ----------------------------------------------------- | -------- |
| id            | INT      | 11   | PRIMARY KEY, AUTO_INCREMENT                           | 排班ID   |
| department_id | INT      | 11   | NOT NULL, FOREIGN KEY                                 | 科室ID   |
| schedule_date | DATE     |      | NOT NULL                                              | 排班日期 |
| start_time    | TIME     |      | NOT NULL                                              | 开始时间 |
| end_time      | TIME     |      | NOT NULL                                              | 结束时间 |
| created_at    | DATETIME |      | DEFAULT CURRENT_TIMESTAMP                             | 创建时间 |
| updated_at    | DATETIME |      | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

#### 4.3 科室资源表(department_resources)

| 字段名             | 数据类型 | 长度 | 约束                                                  | 描述                   |
| ------------------ | -------- | ---- | ----------------------------------------------------- | ---------------------- |
| id                 | INT      | 11   | PRIMARY KEY, AUTO_INCREMENT                           | 资源ID                 |
| department_id      | INT      | 11   | NOT NULL, FOREIGN KEY                                 | 科室ID                 |
| resource_name      | VARCHAR  | 50   | NOT NULL                                              | 资源名称               |
| resource_type      | VARCHAR  | 50   | NOT NULL                                              | 资源类型(如设备、床位) |
| quantity           | INT      | 11   | DEFAULT 0                                             | 数量                   |
| available_quantity | INT      | 11   | DEFAULT 0                                             | 可用数量               |
| created_at         | DATETIME |      | DEFAULT CURRENT_TIMESTAMP                             | 创建时间               |
| updated_at         | DATETIME |      | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间               |

### 5. 药品管理模块

#### 5.1 药品表(medicines)

| 字段名        | 数据类型 | 长度 | 约束                                                  | 描述     |
| ------------- | -------- | ---- | ----------------------------------------------------- | -------- |
| id            | INT      | 11   | PRIMARY KEY, AUTO_INCREMENT                           | 药品ID   |
| name          | VARCHAR  | 100  | NOT NULL                                              | 药品名称 |
| category_id   | INT      | 11   | NOT NULL, FOREIGN KEY                                 | 分类ID   |
| specification | VARCHAR  | 50   |                                                       | 规格     |
| unit          | VARCHAR  | 20   |                                                       | 单位     |
| price         | DECIMAL  | 10,2 | NOT NULL                                              | 价格     |
| description   | TEXT     |      |                                                       | 描述     |
| supplier_id   | INT      | 11   | FOREIGN KEY                                           | 供应商ID |
| expiry_date   | DATE     |      |                                                       | 有效期   |
| created_at    | DATETIME |      | DEFAULT CURRENT_TIMESTAMP                             | 创建时间 |
| updated_at    | DATETIME |      | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

#### 5.2 药品分类表(medicine_categories)

| 字段名     | 数据类型 | 长度 | 约束                                                  | 描述     |
| ---------- | -------- | ---- | ----------------------------------------------------- | -------- |
| id         | INT      | 11   | PRIMARY KEY, AUTO_INCREMENT                           | 分类ID   |
| name       | VARCHAR  | 50   | NOT NULL                                              | 分类名称 |
| parent_id  | INT      | 11   | FOREIGN KEY                                           | 父分类ID |
| created_at | DATETIME |      | DEFAULT CURRENT_TIMESTAMP                             | 创建时间 |
| updated_at | DATETIME |      | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

#### 5.3 药品库存表(medicine_inventory)

| 字段名            | 数据类型 | 长度 | 约束                                                  | 描述     |
| ----------------- | -------- | ---- | ----------------------------------------------------- | -------- |
| id                | INT      | 11   | PRIMARY KEY, AUTO_INCREMENT                           | 库存ID   |
| medicine_id       | INT      | 11   | NOT NULL, FOREIGN KEY                                 | 药品ID   |
| quantity          | INT      | 11   | NOT NULL                                              | 库存数量 |
| warning_threshold | INT      | 11   | DEFAULT 10                                            | 预警阈值 |
| warehouse_id      | INT      | 11   | NOT NULL, FOREIGN KEY                                 | 仓库ID   |
| created_at        | DATETIME |      | DEFAULT CURRENT_TIMESTAMP                             | 创建时间 |
| updated_at        | DATETIME |      | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

#### 5.4 供应商表(suppliers)

| 字段名         | 数据类型 | 长度 | 约束                                                  | 描述       |
| -------------- | -------- | ---- | ----------------------------------------------------- | ---------- |
| id             | INT      | 11   | PRIMARY KEY, AUTO_INCREMENT                           | 供应商ID   |
| name           | VARCHAR  | 100  | NOT NULL                                              | 供应商名称 |
| contact_person | VARCHAR  | 50   |                                                       | 联系人     |
| contact_phone  | VARCHAR  | 20   |                                                       | 联系电话   |
| address        | VARCHAR  | 255  |                                                       | 地址       |
| created_at     | DATETIME |      | DEFAULT CURRENT_TIMESTAMP                             | 创建时间   |
| updated_at     | DATETIME |      | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间   |

### 6. 预约管理模块

#### 6.1 预约表(appointments)

| 字段名           | 数据类型 | 长度 | 约束                                                  | 描述                                         |
| ---------------- | -------- | ---- | ----------------------------------------------------- | -------------------------------------------- |
| id               | INT      | 11   | PRIMARY KEY, AUTO_INCREMENT                           | 预约ID                                       |
| patient_id       | INT      | 11   | NOT NULL, FOREIGN KEY                                 | 患者ID                                       |
| doctor_id        | INT      | 11   | NOT NULL, FOREIGN KEY                                 | 医生ID                                       |
| appointment_date | DATE     |      | NOT NULL                                              | 预约日期                                     |
| appointment_time | TIME     |      | NOT NULL                                              | 预约时间                                     |
| status           | TINYINT  | 1    | DEFAULT 0                                             | 状态(0:待确认, 1:已确认, 2:已取消, 3:已完成) |
| created_at       | DATETIME |      | DEFAULT CURRENT_TIMESTAMP                             | 创建时间                                     |
| updated_at       | DATETIME |      | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间                                     |

### 7. 费用管理模块

#### 7.1 收费记录表(charge_records)

| 字段名         | 数据类型 | 长度 | 约束                                                  | 描述                               |
| -------------- | -------- | ---- | ----------------------------------------------------- | ---------------------------------- |
| id             | INT      | 11   | PRIMARY KEY, AUTO_INCREMENT                           | 收费记录ID                         |
| patient_id     | INT      | 11   | NOT NULL, FOREIGN KEY                                 | 患者ID                             |
| appointment_id | INT      | 11   | FOREIGN KEY                                           | 预约ID                             |
| charge_type    | VARCHAR  | 50   | NOT NULL                                              | 收费类型(如挂号费、检查费、药费)   |
| amount         | DECIMAL  | 10,2 | NOT NULL                                              | 金额                               |
| payment_method | VARCHAR  | 50   |                                                       | 支付方式                           |
| status         | TINYINT  | 1    | DEFAULT 0                                             | 状态(0:未支付, 1:已支付, 2:已退费) |
| created_at     | DATETIME |      | DEFAULT CURRENT_TIMESTAMP                             | 创建时间                           |
| updated_at     | DATETIME |      | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间                           |

#### 7.2 退费记录表(refund_records)

| 字段名           | 数据类型 | 长度 | 约束                                                  | 描述                               |
| ---------------- | -------- | ---- | ----------------------------------------------------- | ---------------------------------- |
| id               | INT      | 11   | PRIMARY KEY, AUTO_INCREMENT                           | 退费记录ID                         |
| charge_record_id | INT      | 11   | NOT NULL, FOREIGN KEY                                 | 收费记录ID                         |
| patient_id       | INT      | 11   | NOT NULL, FOREIGN KEY                                 | 患者ID                             |
| amount           | DECIMAL  | 10,2 | NOT NULL                                              | 退费金额                           |
| reason           | TEXT     |      |                                                       | 退费原因                           |
| status           | TINYINT  | 1    | DEFAULT 0                                             | 状态(0:申请中, 1:已批准, 2:已拒绝) |
| created_at       | DATETIME |      | DEFAULT CURRENT_TIMESTAMP                             | 创建时间                           |
| updated_at       | DATETIME |      | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间                           |

### 8. 医保管理模块

#### 8.1 医保信息表(medical_insurance)

| 字段名           | 数据类型 | 长度 | 约束                                                  | 描述     |
| ---------------- | -------- | ---- | ----------------------------------------------------- | -------- |
| id               | INT      | 11   | PRIMARY KEY, AUTO_INCREMENT                           | 医保ID   |
| patient_id       | INT      | 11   | NOT NULL, FOREIGN KEY                                 | 患者ID   |
| insurance_number | VARCHAR  | 50   | NOT NULL, UNIQUE                                      | 医保卡号 |
| insurance_type   | VARCHAR  | 50   |                                                       | 医保类型 |
| effective_date   | DATE     |      |                                                       | 生效日期 |
| expiry_date      | DATE     |      |                                                       | 失效日期 |
| created_at       | DATETIME |      | DEFAULT CURRENT_TIMESTAMP                             | 创建时间 |
| updated_at       | DATETIME |      | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

#### 8.2 医保结算表(medical_settlements)

| 字段名               | 数据类型 | 长度 | 约束                                                  | 描述         |
| -------------------- | -------- | ---- | ----------------------------------------------------- | ------------ |
| id                   | INT      | 11   | PRIMARY KEY, AUTO_INCREMENT                           | 结算ID       |
| patient_id           | INT      | 11   | NOT NULL, FOREIGN KEY                                 | 患者ID       |
| medical_insurance_id | INT      | 11   | NOT NULL, FOREIGN KEY                                 | 医保ID       |
| charge_record_id     | INT      | 11   | NOT NULL, FOREIGN KEY                                 | 收费记录ID   |
| total_amount         | DECIMAL  | 10,2 | NOT NULL                                              | 总金额       |
| covered_amount       | DECIMAL  | 10,2 | NOT NULL                                              | 医保覆盖金额 |
| self_pay_amount      | DECIMAL  | 10,2 | NOT NULL                                              | 自付金额     |
| settlement_date      | DATE     |      | NOT NULL                                              | 结算日期     |
| created_at           | DATETIME |      | DEFAULT CURRENT_TIMESTAMP                             | 创建时间     |
| updated_at           | DATETIME |      | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间     |

## 五、索引设计

为提高查询效率，设计以下索引：

1. users表：username(UNIQUE), email(UNIQUE), phone(UNIQUE), role_id
2. patients表：name, id_card(UNIQUE), phone
3. doctors表：name, department_id, user_id(UNIQUE)
4. departments表：name, parent_id
5. medicines表：name, category_id, supplier_id
6. appointments表：patient_id, doctor_id, appointment_date, status
7. charge_records表：patient_id, appointment_id, status, created_at

## 六、关系说明

1. 一个用户可以有一个角色，一个角色可以分配给多个用户(1:N)
2. 一个角色可以有多个权限，一个权限可以分配给多个角色(M:N)
3. 一个患者可以有多个回访记录，一个回访记录只属于一个患者(1:N)
4. 一个医生属于一个科室，一个科室可以有多个医生(1:N)
5. 一个医生可以有多个排班记录，一个排班记录只属于一个医生(1:N)
6. 一个药品属于一个分类，一个分类可以有多个药品(1:N)
7. 一个药品可以有多个库存记录，一个库存记录只属于一个药品(1:N)
8. 一个患者可以有多个预约记录，一个预约记录只属于一个患者(1:N)
9. 一个医生可以有多个预约记录，一个预约记录只属于一个医生(1:N)
10. 一个患者可以有多个收费记录，一个收费记录只属于一个患者(1:N)
11. 一个收费记录可以有一个退费记录，一个退费记录只属于一个收费记录(1:1)
12. 一个患者可以有一个医保信息，一个医保信息只属于一个患者(1:1)

## 七、数据字典

[此处填写数据字典，包括数据项的定义、格式、取值范围等]

## 八、附录

[此处填写附录信息，如数据库备份策略、恢复流程等]

## 目录

- [一、版本记录](#一版本记录)
- [二、设计原则](#二设计原则)
- [三、ER图](#三er图)
- [四、表结构](#四表结构)
  - [1. 用户模块](#1-用户模块)
  - [2. 商品模块](#2-商品模块)
  - [3. 订单模块](#3-订单模块)
- [五、索引设计](#五索引设计)
- [六、关系说明](#六关系说明)
- [七、数据字典](#七数据字典)
- [八、附录](#八附录)
