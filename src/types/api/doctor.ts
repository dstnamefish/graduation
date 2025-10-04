/**
 * 医生管理相关类型定义
 * 用于前后端数据交互的数据结构规范
 */

/**
 * @description 医生信息接口
 * 定义医生的基本信息数据结构
 *
 * @interface DoctorDTO
 * @property {number} id - 医生ID
 * @property {string} name - 医生姓名
 * @property {string} avatar - 医生头像URL
 * @property {number} departmentId - 所属科室ID
 * @property {string} departmentName - 所属科室名称
 * @property {string} specialization - 专业方向
 * @property {string} title - 职称
 * @property {string} description - 医生简介
 * @property {string} education - 教育背景
 * @property {string} experience - 工作经历
 * @property {string} contactInfo - 联系方式
 * @property {number} status - 医生状态(0-禁用, 1-启用)
 * @property {string} createTime - 创建时间
 * @property {string} updateTime - 更新时间
 */
export interface DoctorDTO {
  id: number;
  name: string;
  avatar: string;
  departmentId: number;
  departmentName: string;
  specialization: string;
  title: string;
  description: string;
  education: string;
  experience: string;
  contactInfo: string;
  status: number;
  createTime: string;
  updateTime: string;
}

/**
 * @description 获取医生列表请求参数接口
 * 定义获取医生列表时的查询条件
 *
 * @interface GetDoctorListRequest
 * @property {string} [name] - 医生姓名(模糊查询)
 * @property {number} [departmentId] - 科室ID
 * @property {number} [status] - 医生状态
 * @property {string} [specialization] - 专业方向
 * @property {string} [orderBy] - 排序字段
 */
export interface GetDoctorListRequest {
  name?: string;
  departmentId?: number;
  status?: number;
  specialization?: string;
  orderBy?: string;
}

/**
 * @description 更新医生状态请求参数接口
 *
 * @interface UpdateDoctorStatusRequest
 * @property {number} status - 目标状态(0-禁用, 1-启用)
 */
export interface UpdateDoctorStatusRequest {
  status: number;
}

/**
 * @description 医生统计信息接口
 * 定义医生相关的统计数据
 *
 * @interface DoctorStatsDTO
 * @property {number} totalCount - 医生总数
 * @property {number} activeCount - 活跃医生数
 * @property {number} departmentCount - 科室数量
 */
export interface DoctorStatsDTO {
  totalCount: number;
  activeCount: number;
  departmentCount: number;
}