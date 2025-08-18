/**
 * 预约信息类型定义
 */
export interface Reservation {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  departmentId: string;
  departmentName: string;
  appointmentDate: string; // 预约日期 YYYY-MM-DD
  appointmentTime: string; // 预约时间 HH:mm
  status: 'pending' | 'confirmed' | 'completed' | 'canceled'; // 状态
  reason: string; // 就诊原因
  createTime: string; // 创建时间
  updateTime: string; // 更新时间
}

/**
 * 预约请求参数
 */
export interface ReservationRequest {
  patientId: string;
  doctorId: string;
  appointmentDate: string;
  appointmentTimeSlotId: string;
  reason: string;
}

/**
 * 预约列表查询参数
 */
export interface ReservationQueryParams {
  patientId?: string;
  doctorId?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  pageSize?: number;
}