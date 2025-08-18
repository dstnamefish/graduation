/**
 * 医生信息类型定义
 */
export interface Doctor {
  id: string;
  name: string;
  gender: 'male' | 'female';
  age: number;
  departmentId: string;
  departmentName: string;
  title: string; // 职称
  specialty: string; // 专长
  experience: number; // 工作经验(年)
  avatar: string; // 头像URL
  introduction: string; // 简介
  consultationFee: number; // 诊疗费
  rating: number; // 评分
  availableTimeSlots: TimeSlot[]; // 可用时间段
}

/**
 * 时间段类型定义
 */
export interface TimeSlot {
  id: string;
  doctorId: string;
  date: string; // 日期 YYYY-MM-DD
  startTime: string; // 开始时间 HH:mm
  endTime: string; // 结束时间 HH:mm
  status: 'available' | 'booked' | 'canceled'; // 状态
}

/**
 * 医生列表查询参数
 */
export interface DoctorQueryParams {
  departmentId?: string;
  keyword?: string;
  page?: number;
  pageSize?: number;
}