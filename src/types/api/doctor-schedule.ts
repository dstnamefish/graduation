/**
 * @description 查询月份排班请求参数接口
 * 定义查询指定月份医生排班时需要的参数
 * 用于医生排班管理页面的月份视图查询
 *
 * @interface MonthlyScheduleRequest
 * @property {string} startDate - 开始日期，格式为YYYY-MM-DD
 * @property {string} endDate - 结束日期，格式为YYYY-MM-DD
 * @property {number} [departmentId] - 科室ID，可选，用于筛选特定科室的医生排班
 * @property {number} [doctorId] - 医生ID，可选，用于筛选特定医生的排班
 * @property {string} [clinicType] - 出诊类型，可选，用于筛选特定出诊类型的排班
 * @property {number} [status] - 排班状态，可选，用于筛选特定状态的排班
 */
export interface MonthlyScheduleRequest {
  startDate?: string
  endDate?: string
  departmentId?: number
  doctorId?: number
  clinicType?: string
  status?: number
}

/**
 * @description 月份视图排班项目接口
 * 定义月份视图中每条医生排班信息的数据结构
 * 用于医生排班月份视图的展示
 *
 * @interface MonthlyScheduleDTO
 * @property {number} scheduleId - 排班ID
 * @property {number} doctorId - 医生ID
 * @property {string} doctorName - 医生姓名
 * @property {string} date - 排班日期，格式为YYYY-MM-DD
 * @property {string} startTime - 开始时间，格式为HH:mm:ss
 * @property {string} endTime - 结束时间，格式为HH:mm:ss
 * @property {number} scheduleStatus - 排班状态
 * @property {number} doctorStatus - 医生状态
 * @property {string} clinicType - 出诊类型
 * @property {number} maxPatients - 最大预约人数
 * @property {number} currentAppointmentsCount - 当前预约人数
 * @property {string} activityDescription - 活动描述
 * @property {string} scheduleStatusText - 排班状态文本
 * @property {string} doctorStatusText - 医生状态文本
 * @property {string} clinicTypeText - 出诊类型文本
 * @property {string} appointmentsDetails - 预约详情JSON字符串
 */
export interface MonthlyScheduleDTO {
  scheduleId: number
  doctorId: number
  doctorName: string
  date: string
  startTime: string
  endTime: string
  scheduleStatus: number
  doctorStatus: number
  clinicType: string
  maxPatients: number
  currentAppointmentsCount: number
  activityDescription: string
  scheduleStatusText: string
  doctorStatusText: string
  clinicTypeText: string
  appointmentsDetails: string
}

/**
 * @description 查询周排班请求参数接口
 * 定义查询指定周医生排班时需要的参数
 * 用于医生排班管理页面的周视图查询
 *
 * @interface WeeklyScheduleRequest
 * @property {string} weekStart - 周开始日期，格式为YYYY-MM-DD
 * @property {string} weekEnd - 周结束日期，格式为YYYY-MM-DD
 * @property {number} [departmentId] - 科室ID，可选，用于筛选特定科室的医生排班
 * @property {number} [doctorId] - 医生ID，可选，用于筛选特定医生的排班
 * @property {string} [clinicType] - 出诊类型，可选，用于筛选特定出诊类型的排班
 * @property {number} [status] - 排班状态，可选，用于筛选特定状态的排班
 */
export interface WeeklyScheduleRequest {
  weekStart: string
  weekEnd: string
  departmentId?: number
  doctorId?: number
  clinicType?: string
  status?: number
}

/**
 * @description 周视图排班项目接口
 * 定义周视图中每条排班信息的数据结构
 * 用于医生排班周视图的展示
 *
 * @interface WeeklyScheduleItemDTO
 * @property {number} scheduleId - 排班ID
 * @property {number} doctorId - 医生ID
 * @property {string} doctorName - 医生姓名
 * @property {string} startTime - 开始时间，格式为HH:mm:ss
 * @property {string} endTime - 结束时间，格式为HH:mm:ss
 * @property {number} scheduleStatus - 排班状态
 * @property {string} clinicType - 出诊类型
 * @property {number} appointmentCount - 预约人数
 */
export interface WeeklyScheduleItemDTO {
  scheduleId: number
  doctorId: number
  doctorName: string
  startTime: string
  endTime: string
  scheduleStatus: number
  clinicType: string
  appointmentCount: number
}

/**
 * @description 周视图排班接口
 * 定义周视图中每天排班信息的数据结构
 * 用于医生排班周视图的展示
 *
 * @interface WeeklyScheduleDTO
 * @property {string} date - 日期，格式为YYYY-MM-DD
 * @property {string} dayName - 星期名称
 * @property {WeeklyScheduleItemDTO[]} schedules - 该日期的排班列表
 */
export interface WeeklyScheduleDTO {
  date: string
  dayName: string
  schedules: WeeklyScheduleItemDTO[]
}

/**
 * @description 查询日排班请求参数接口
 * 定义查询指定日医生排班时需要的参数
 * 用于医生排班管理页面的日视图查询
 *
 * @interface DailyScheduleRequest
 * @property {string} date - 日期，格式为YYYY-MM-DD
 * @property {number} [departmentId] - 科室ID，可选，用于筛选特定科室的医生排班
 * @property {number} [doctorId] - 医生ID，可选，用于筛选特定医生的排班
 * @property {string} [clinicType] - 出诊类型，可选，用于筛选特定出诊类型的排班
 * @property {number} [status] - 排班状态，可选，用于筛选特定状态的排班
 */
export interface DailyScheduleRequest {
  date: string
  departmentId?: number
  doctorId?: number
  clinicType?: string
  status?: number
}

/**
 * @description 日视图排班接口
 * 定义日视图中每天排班信息的数据结构
 * 用于医生排班日视图的展示
 *
 * @interface DailyScheduleDTO
 * @property {string} date - 日期，格式为YYYY-MM-DD
 * @property {string} dayName - 星期名称
 * @property {any[]} timeSlots - 时间段列表
 */
export interface DailyScheduleDTO {
  date: string
  dayName: string
  timeSlots: any[]
}

/**
 * @description 医生排班详情请求参数接口
 * 定义查询单个医生详细排班信息时需要的参数
 * 用于查看特定医生的排班详情
 *
 * @interface DoctorScheduleDetailRequest
 * @property {number} doctorId - 医生ID
 * @property {string} [startDate] - 开始日期，格式为YYYY-MM-DD
 * @property {string} [endDate] - 结束日期，格式为YYYY-MM-DD
 * @property {string} [clinicType] - 出诊类型，可选，用于筛选特定出诊类型的排班
 * @property {number} [status] - 排班状态，可选，用于筛选特定状态的排班
 */
export interface DoctorScheduleDetailRequest {
  doctorId: number
  startDate?: string
  endDate?: string
  clinicType?: string
  status?: number
}

/**
 * @description 医生排班详情接口
 * 定义医生排班详情的数据结构
 * 用于展示医生排班的详细信息
 *
 * @interface DoctorScheduleDetailDTO
 * @property {number} id - 排班ID
 * @property {number} doctorId - 医生ID
 * @property {string} doctorName - 医生姓名
 * @property {string} departmentName - 科室名称
 * @property {string} specialization - 专业方向
 * @property {string} date - 排班日期，格式为YYYY-MM-DD
 * @property {string} startTime - 开始时间，格式为HH:mm:ss
 * @property {string} endTime - 结束时间，格式为HH:mm:ss
 * @property {number} status - 排班状态
 * @property {number} currentAppointmentsCount - 当前预约人数
 * @property {string} scheduleStatusText - 排班状态文本
 * @property {string} doctorStatusText - 医生状态文本
 * @property {string} clinicTypeText - 出诊类型文本
 */
export interface DoctorScheduleDetailDTO {
  id: number
  doctorId: number
  doctorName: string
  departmentName: string
  specialization: string
  date: string
  startTime: string
  endTime: string
  status: number
  currentAppointmentsCount: number
  scheduleStatusText: string
  doctorStatusText: string
  clinicTypeText: string
}

/**
 * @description 新增/更新医生排班请求参数接口
 * 定义新增或更新医生排班时需要的参数
 * 用于创建或更新医生的排班信息
 *
 * @interface CreateDoctorScheduleRequest
 * @property {number} [id] - 排班ID，更新时需要
 * @property {number} doctorId - 医生ID
 * @property {string} date - 排班日期，格式为YYYY-MM-DD
 * @property {string} startTime - 开始时间，格式为HH:mm:ss
 * @property {string} endTime - 结束时间，格式为HH:mm:ss
 * @property {number} status - 排班状态
 * @property {number} maxPatients - 最大预约人数
 * @property {number} appointmentDuration - 预约时长(分钟)
 * @property {string} clinicType - 出诊类型
 * @property {string} [activityDescription] - 活动描述，可选
 */
export interface CreateDoctorScheduleRequest {
  id?: number
  doctorId: number
  date: string
  startTime: string
  endTime: string
  status: number
  maxPatients: number
  appointmentDuration: number
  clinicType: string
  activityDescription?: string
}

/**
 * @description 可用排班请求参数接口
 * 定义查询可用排班时需要的参数
 * 用于患者预约时选择可用的排班
 *
 * @interface AvailableSchedulesRequest
 * @property {string} date - 日期，格式为YYYY-MM-DD
 * @property {number} [departmentId] - 科室ID，可选，用于筛选特定科室的医生排班
 * @property {number} [doctorId] - 医生ID，可选，用于筛选特定医生的排班
 * @property {string} [clinicType] - 出诊类型，可选，用于筛选特定出诊类型的排班
 */
export interface AvailableSchedulesRequest {
  date: string
  departmentId?: number
  doctorId?: number
  clinicType?: string
}