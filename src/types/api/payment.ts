/**
 * 财务管理相关类型定义
 * 用于前后端数据交互的数据结构规范
 */

/**
 * @description 发票信息接口
 * 定义发票的详细信息数据结构
 *
 * @interface InvoiceDTO
 * @property {number} id - 发票ID
 * @property {string} invoiceNumber - 发票编号
 * @property {number} patientId - 患者ID
 * @property {string} patientName - 患者姓名
 * @property {number} appointmentId - 预约ID
 * @property {string} appointmentDate - 预约日期
 * @property {number} doctorId - 医生ID
 * @property {string} doctorName - 医生姓名
 * @property {string} treatmentName - 治疗项目名称
 * @property {number} totalAmount - 总金额
 * @property {string} status - 发票状态
 * @property {string} paymentMethod - 支付方式
 * @property {string} paymentTime - 支付时间
 * @property {string} description - 发票描述
 * @property {string} createTime - 创建时间
 * @property {string} updateTime - 更新时间
 */
export interface InvoiceDTO {
  id: number;
  invoiceNumber: string;
  patientId: number;
  patientName: string;
  appointmentId: number;
  appointmentDate: string;
  doctorId: number;
  doctorName: string;
  treatmentName: string;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  paymentTime: string;
  description: string;
  createTime: string;
  updateTime: string;
}

/**
 * @description 发票统计卡数据接口
 * 定义发票统计卡片的数据结构
 *
 * @interface InvoiceStatsDTO
 * @property {string} type - 统计类型
 * @property {number} value - 统计值
 * @property {string} label - 统计标签
 * @property {string} color - 统计卡片颜色
 */
export interface InvoiceStatsDTO {
  type: string;
  value: number;
  label: string;
  color: string;
}

/**
 * @description 发票趋势数据接口
 * 定义发票趋势图表的数据结构
 *
 * @interface TrendDataDTO
 * @property {string} date - 日期
 * @property {number} amount - 金额
 * @property {number} count - 数量
 */
export interface TrendDataDTO {
  date: string;
  amount: number;
  count: number;
}

/**
 * @description 获取发票列表请求参数接口
 * 定义获取发票列表时的查询条件
 *
 * @interface GetInvoiceListRequest
 * @property {string} [q] - 模糊搜索关键词(患者名或发票号)
 * @property {string} [treatment] - 按治疗名称模糊搜索
 * @property {string} [status] - 状态过滤
 * @property {string} [startDate] - 开始日期
 * @property {string} [endDate] - 结束日期
 * @property {number} [page] - 页码
 * @property {number} [size] - 每页记录数
 */
export interface GetInvoiceListRequest {
  q?: string;
  treatment?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
}

/**
 * @description 分页结果接口
 * 定义分页数据的通用结构
 *
 * @interface PageResult
 * @template T - 数据类型
 * @property {T[]} list - 数据列表
 * @property {number} total - 总记录数
 * @property {number} page - 当前页码
 * @property {number} size - 每页记录数
 * @property {number} pages - 总页数
 */
export interface PageResult<T> {
  list: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}