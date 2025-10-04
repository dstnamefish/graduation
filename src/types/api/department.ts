/**
 * 科室管理相关类型定义
 * 用于前后端数据交互的数据结构规范
 */

/**
 * @description 科室基础信息接口
 * 定义科室的基本信息数据结构
 *
 * @interface DepartmentDTO
 * @property {number} id - 科室ID
 * @property {string} name - 科室名称
 * @property {string} code - 科室编码
 * @property {string} description - 科室描述
 * @property {string} location - 科室位置
 * @property {string} contactPhone - 联系电话
 * @property {number} orderNum - 排序号
 * @property {number} status - 科室状态(0-禁用, 1-启用)
 * @property {string} createTime - 创建时间
 * @property {string} updateTime - 更新时间
 */
export interface DepartmentDTO {
  id: number;
  name: string;
  code: string;
  description: string;
  location: string;
  contactPhone: string;
  orderNum: number;
  status: number;
  createTime: string;
  updateTime: string;
}

/**
 * @description 科室详情接口
 * 定义科室的详细信息数据结构，包含医生信息
 *
 * @interface DepartmentDetailsDTO
 * @property {DepartmentDTO} department - 科室基本信息
 * @property {number} doctorCount - 医生总数
 * @property {DepartmentDoctorDTO[]} doctorList - 科室医生列表
 */
export interface DepartmentDetailsDTO {
  department: DepartmentDTO;
  doctorCount: number;
  doctorList: DepartmentDoctorDTO[];
}

/**
 * @description 科室医生信息接口
 * 定义科室中的医生信息数据结构
 *
 * @interface DepartmentDoctorDTO
 * @property {number} id - 医生ID
 * @property {string} name - 医生姓名
 * @property {string} avatar - 医生头像URL
 * @property {string} title - 医生职称
 * @property {string} specialization - 专业方向
 * @property {number} priority - 优先级
 * @property {string} lastActiveTime - 最近活跃时间
 */
export interface DepartmentDoctorDTO {
  id: number;
  name: string;
  avatar: string;
  title: string;
  specialization: string;
  priority: number;
  lastActiveTime: string;
}

/**
 * @description 分页获取科室列表请求参数接口
 *
 * @interface GetDepartmentPageRequest
 * @property {number} pageNum - 当前页码
 * @property {number} pageSize - 每页条数
 * @property {string} [keyword] - 搜索关键词
 */
export interface GetDepartmentPageRequest {
  pageNum: number;
  pageSize: number;
  keyword?: string;
}

/**
 * @description 分页结果接口
 * 定义分页数据的通用结构
 *
 * @interface PageResult
 * @template T - 数据类型
 * @property {T[]} list - 数据列表
 * @property {number} total - 总记录数
 * @property {number} pageNum - 当前页码
 * @property {number} pageSize - 每页条数
 * @property {number} pages - 总页数
 */
export interface PageResult<T> {
  list: T[];
  total: number;
  pageNum: number;
  pageSize: number;
  pages: number;
}