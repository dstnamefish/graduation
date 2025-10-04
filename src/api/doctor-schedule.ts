import api from '@/utils/http';

import type {
  MonthlyScheduleRequest,
  MonthlyScheduleDTO,
  WeeklyScheduleRequest,
  WeeklyScheduleDTO,
  DailyScheduleRequest,
  DailyScheduleDTO,
  DoctorScheduleDetailRequest,
  DoctorScheduleDetailDTO,
  CreateDoctorScheduleRequest,
  AvailableSchedulesRequest,
} from '@/types/api/doctor-schedule';

/**
 * 查询指定月份的医生排班
 * @param params 查询参数
 * @returns 月份视图排班列表
 */
export function fetchMonthlySchedules(params: MonthlyScheduleRequest) {
  return api.get<MonthlyScheduleDTO[]>({
    params,
    url: '/doctor/schedule/monthly',
  });
}

/**
 * 查询指定周的医生排班
 * @param params 查询参数
 * @returns 周视图排班列表
 */
export function fetchWeeklySchedules(params: WeeklyScheduleRequest) {
  return api.get<WeeklyScheduleDTO[]>({
    params,
    url: '/doctor/schedule/weekly',
  });
}

/**
 * 查询指定日的医生排班
 * @param params 查询参数
 * @returns 日视图排班列表
 */
export function fetchDailySchedules(params: DailyScheduleRequest) {
  return api.get<DailyScheduleDTO[]>({
    params,
    url: '/doctor/schedule/daily',
  });
}

/**
 * 查询单个医生的详细排班信息
 * @param params 查询参数
 * @returns 医生排班详情列表
 */
export function fetchDoctorSchedules(params: DoctorScheduleDetailRequest) {
  return api.get<DoctorScheduleDetailDTO[]>({
    params,
    url: '/doctor/schedule/doctor',
  });
}

/**
 * 新增医生排班
 * @param params 排班信息
 * @returns 新增结果（返回排班ID）
 */
export function createDoctorSchedule(params: CreateDoctorScheduleRequest) {
  return api.post<number>({
    data: params,
    showErrorMessage: true,
    showSuccessMessage: true,
    url: '/doctor/schedule',
  });
}

/**
 * 更新医生排班
 * @param params 更新的排班信息
 * @returns 更新结果
 */
export function updateDoctorSchedule(params: CreateDoctorScheduleRequest) {
  return api.put<boolean>({
    data: params,
    showErrorMessage: true,
    showSuccessMessage: true,
    url: '/doctor/schedule',
  });
}

/**
 * 删除医生排班
 * @param scheduleId 排班ID
 * @returns 删除结果
 */
export function deleteDoctorSchedule(scheduleId: number) {
  return api.del<boolean>({
    showErrorMessage: true,
    showSuccessMessage: true,
    url: `/doctor/schedule/${scheduleId}`,
  });
}

/**
 * 批量删除医生排班
 * @param ids 排班ID列表
 * @returns 删除数量
 */
export function batchDeleteSchedules(ids: number[]) {
  return api.del<number>({
    data: ids,
    showErrorMessage: true,
    showSuccessMessage: true,
    url: '/doctor/schedule/batch',
  });
}

/**
 * 统计排班数量
 * @param doctorId 医生ID
 * @param dateFrom 开始日期
 * @param dateTo 结束日期
 * @returns 排班数量
 */
export function countSchedules(doctorId: number, dateFrom: string, dateTo: string) {
  return api.get<number>({
    params: {
      dateFrom,
      dateTo,
      doctorId,
    },
    url: '/doctor/schedule/count',
  });
}

/**
 * 查询可用的排班
 * @param params 查询参数
 * @returns 可用排班列表
 */
export function fetchAvailableSchedules(params: AvailableSchedulesRequest) {
  return api.get<DoctorScheduleDetailDTO[]>({
    params,
    url: '/doctor/schedule/available',
  });
}