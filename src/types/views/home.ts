/**
 * 仪表盘统计数据类型
 */
export interface DashboardStats {
  totalPatients: number;
  totalAppointments: number;
  totalDoctors: number;
  totalMedicines: number;
  appointmentRate: number;
  averageWaitingTime: number;
}

/**
 * 医院趋势数据类型
 */
export interface HospitalTrend {
  date: string;
  appointments: number;
  patients: number;
  revenue: number;
}

/**
 * 近期预约数据类型
 */
export interface RecentAppointment {
  id: string;
  patientName: string;
  doctorName: string;
  departmentName: string;
  appointmentTime: string;
  status: string;
}