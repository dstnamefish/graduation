/**
 * @description 获取患者列表请求参数接口
 * 定义获取患者列表时需要的分页和筛选参数
 * 用于患者管理页面的数据查询
 *
 * @interface PatientListRequest
 * @property {number} pageNum - 当前页码，用于分页查询
 * @property {number} pageSize - 每页显示数量，用于分页查询
 * @property {string} [status] - 患者状态筛选条件，可选
 */
export interface PatientListRequest {
  pageNum: number
  pageSize: number
  status?: string
}

/**
 * @description 患者列表项接口
 * 定义患者列表页面中每条患者信息的数据结构
 * 用于患者列表的展示
 *
 * @interface PatientTableItem
 * @property {number} id - 患者ID，唯一标识
 * @property {string} status - 患者当前状态
 * @property {string} checkInTime - 患者入院时间
 * @property {string} realName - 患者真实姓名
 * @property {number} age - 患者年龄
 * @property {string} avatar - 患者头像URL
 * @property {string} latestTreatment - 最新治疗情况
 * @property {string} doctorName - 负责医生姓名
 */
export interface PatientTableItem {
  id: number
  status: string
  checkInTime: string
  realName: string
  age: number
  avatar: string
  latestTreatment: string
  doctorName: string
}

/**
 * @description 患者基本信息接口
 * 定义患者的基础个人信息数据结构
 * 包含身份标识、人口统计学信息等
 *
 * @interface PatientBaseInfo
 * @property {number} id - 患者ID，唯一标识
 * @property {number} userId - 用户ID，关联系统用户
 * @property {string} status - 患者当前状态
 * @property {number} assignedDoctorId - 负责医生ID
 * @property {string} realName - 患者真实姓名
 * @property {number} gender - 患者性别（0-女，1-男）
 * @property {number} age - 患者年龄
 * @property {string} birthDate - 患者出生日期
 * @property {string} occupation - 患者职业
 * @property {string} insurance - 患者医保信息
 * @property {string} avatar - 患者头像URL
 */
export interface PatientBaseInfo {
  id: number
  userId: number
  status: string
  assignedDoctorId: number
  realName: string
  gender: number
  age: number
  birthDate: string
  occupation: string
  insurance: string
  avatar: string
}

/**
 * @description 患者联系方式接口
 * 定义患者的联系信息数据结构
 * 包含患者本人和紧急联系人的联系方式
 *
 * @interface PatientContactInfo
 * @property {number} patientId - 患者ID，关联患者信息
 * @property {string} emergencyContactName - 紧急联系人姓名
 * @property {string} emergencyContactPhone - 紧急联系人电话
 * @property {number} userId - 用户ID，关联系统用户
 * @property {string} phone - 患者本人电话
 * @property {string} email - 患者电子邮箱
 * @property {string} address - 患者居住地址
 */
export interface PatientContactInfo {
  patientId: number
  emergencyContactName: string
  emergencyContactPhone: string
  userId: number
  phone: string
  email: string
  address: string
}

/**
 * @description 患者健康报告接口
 * 定义患者健康报告的数据结构
 * 包含报告的基本信息
 *
 * @interface PatientHealthReport
 * @property {number} patientId - 患者ID，关联患者信息
 * @property {string} reportName - 报告名称
 * @property {string} reportType - 报告类型
 * @property {number} fileSize - 文件大小（字节）
 * @property {string} createdAt - 报告创建时间
 */
export interface PatientHealthReport {
  patientId: number
  reportName: string
  reportType: string
  fileSize: number
  createdAt: string
}

/**
 * @description 患者病程记录接口
 * 定义患者的病程记录数据结构
 * 包含医生对患者病情的记录和观察
 *
 * @interface PatientNote
 * @property {number} patientId - 患者ID，关联患者信息
 * @property {number} createdBy - 创建人ID，通常为医生ID
 * @property {string} noteType - 记录类型
 * @property {string} title - 记录标题
 * @property {string} content - 记录内容
 * @property {string} createdAt - 创建时间
 * @property {string} updatedAt - 更新时间
 */
export interface PatientNote {
  patientId: number
  createdBy: number
  noteType: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

/**
 * @description 患者病历记录接口
 * 定义患者的详细病历数据结构
 * 包含各项生理指标和健康信息
 *
 * @interface PatientMedicalRecord
 * @property {number} id - 病历记录ID，唯一标识
 * @property {number} patientId - 患者ID，关联患者信息
 * @property {number} height - 身高（厘米）
 * @property {number} weight - 体重（公斤）
 * @property {number} bmi - BMI指数（体重指数）
 * @property {number} heartRate - 心率（次/分钟）
 * @property {string} bloodPressure - 血压（收缩压/舒张压）
 * @property {number} bloodGlucose - 血糖（mmol/L）
 * @property {number} cholesterol - 胆固醇（mmol/L）
 * @property {number} respiratoryRate - 呼吸频率（次/分钟）
 * @property {number} hemoglobin - 血红蛋白（g/L）
 * @property {string} allergies - 过敏史
 * @property {string} medicalHistory - 既往病史
 * @property {string} medications - 当前用药情况
 * @property {string} recordTime - 记录时间
 * @property {string} createdAt - 创建时间
 * @property {string} updatedAt - 更新时间
 */
export interface PatientMedicalRecord {
  id: number
  patientId: number
  height: number
  weight: number
  bmi: number
  heartRate: number
  bloodPressure: string
  bloodGlucose: number
  cholesterol: number
  respiratoryRate: number
  hemoglobin: number
  allergies: string
  medicalHistory: string
  medications: string
  recordTime: string
  createdAt: string
  updatedAt: string
}

/**
 * @description 患者详细信息接口
 * 定义患者完整信息的数据结构
 * 包含基本信息、联系方式、健康报告、病程记录和病历记录等所有相关信息
 *
 * @interface PatientDetail
 * @property {number} patient_id - 患者ID，唯一标识
 * @property {number} user_id - 用户ID，关联系统用户
 * @property {PatientBaseInfo} baseInfo - 患者基本信息
 * @property {PatientContactInfo} contactInfo - 患者联系方式
 * @property {PatientHealthReport[]} healthReportInfo - 健康报告列表
 * @property {PatientNote[]} notes - 病程记录列表
 * @property {PatientMedicalRecord[]} medicalRecords - 病历记录列表
 */
export interface PatientDetail {
  patient_id: number
  user_id: number
  baseInfo: PatientBaseInfo
  contactInfo: PatientContactInfo
  healthReportInfo: PatientHealthReport[]
  notes: PatientNote[]
  medicalRecords: PatientMedicalRecord[]
}