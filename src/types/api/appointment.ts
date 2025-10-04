/**
 * 预约管理相关类型定义
 * 用于前后端数据交互的数据结构规范
 */

/**
 * @description 预约信息接口
 * 定义预约的基本信息数据结构
 *
 * @interface AppointmentDTO
 * @property {number} id - 预约ID
 * @property {number} patientId - 患者ID
 * @property {string} patientName - 患者姓名
 * @property {number} doctorId - 医生ID
 * @property {string} doctorName - 医生姓名
 * @property {number} departmentId - 科室ID
 * @property {string} departmentName - 科室名称
 * @property {string} appointmentDate - 预约日期
 * @property {string} appointmentTime - 预约时间
 * @property {string} status - 预约状态
 * @property {string} symptomsDescription - 症状描述
 * @property {string} createTime - 创建时间
 * @property {string} updateTime - 更新时间
 */
export interface AppointmentDTO {
  id: number;
  patientId: number;
  patientName: string;
  doctorId: number;
  doctorName: string;
  departmentId: number;
  departmentName: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  symptomsDescription: string;
  createTime: string;
  updateTime: string;
}

/**
 * @description 预约实体接口
 * 定义创建和更新预约时的数据结构
 *
 * @interface AppointmentEntity
 * @property {number} [id] - 预约ID(更新时使用)
 * @property {number} patientId - 患者ID
 * @property {number} doctorId - 医生ID
 * @property {string} appointmentDate - 预约日期
 * @property {string} appointmentTime - 预约时间
 * @property {string} symptomsDescription - 症状描述
 * @property {string} [status] - 预约状态(可选)
 */
export interface AppointmentEntity {
  id?: number;
  patientId: number;
  doctorId: number;
  appointmentDate: string;
  appointmentTime: string;
  symptomsDescription: string;
  status?: string;
}

/**
 * @description 获取预约列表请求参数接口
 * 定义获取预约列表时的查询条件
 *
 * @interface GetAppointmentListRequest
 * @property {number} [patientId] - 患者ID
 * @property {number} [doctorId] - 医生ID
 * @property {number} [departmentId] - 科室ID
 * @property {string} [appointmentDate] - 预约日期
 * @property {string} [status] - 预约状态
 * @property {string} [startDate] - 开始日期
 * @property {string} [endDate] - 结束日期
 */
export interface GetAppointmentListRequest {
  patientId?: number;
  doctorId?: number;
  departmentId?: number;
  appointmentDate?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}