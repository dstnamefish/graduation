import api from '@/utils/http';

import type { AppointmentDTO, AppointmentEntity, GetAppointmentListRequest } from '@/types/api/appointment';

/**
 * 获取预约列表
 * @param params 查询条件
 * @returns 预约列表
 */
export function fetchAppointmentList(params?: GetAppointmentListRequest) {
  return api.get<AppointmentDTO[]>({
    params,
    url: '/medical/outpatient/appointment/list',
  });
}

/**
 * 获取预约详情
 * @param appointmentId 预约ID
 * @returns 预约详情
 */
export function fetchAppointmentById(appointmentId: number) {
  return api.get<AppointmentDTO>({
    url: `/medical/outpatient/appointment/detail/${appointmentId}`,
  });
}

/**
 * 根据患者ID获取预约列表
 * @param patientId 患者ID
 * @returns 预约列表
 */
export function fetchAppointmentsByPatientId(patientId: number) {
  return api.get<AppointmentDTO[]>({
    url: `/medical/outpatient/appointment/patient/${patientId}`,
  });
}

/**
 * 根据医生ID获取预约列表
 * @param doctorId 医生ID
 * @returns 预约列表
 */
export function fetchAppointmentsByDoctorId(doctorId: number) {
  return api.get<AppointmentDTO[]>({
    url: `/medical/outpatient/appointment/doctor/${doctorId}`,
  });
}

/**
 * 新增预约
 * @param data 预约数据
 * @returns 新增结果
 */
export function fetchCreateAppointment(data: AppointmentEntity) {
  return api.post<boolean>({
    data,
    url: '/medical/outpatient/appointment/create',
  });
}

/**
 * 更新预约
 * @param data 预约数据
 * @returns 更新结果
 */
export function fetchUpdateAppointment(data: AppointmentEntity) {
  return api.put<boolean>({
    data,
    url: '/medical/outpatient/appointment/update',
  });
}

/**
 * 删除预约
 * @param appointmentId 预约ID
 * @returns 删除结果
 */
export function fetchDeleteAppointment(appointmentId: number) {
  return api.del<boolean>({
    url: `/medical/outpatient/appointment/delete/${appointmentId}`,
  });
}

/**
 * 批量删除预约
 * @param appointmentIds 预约ID数组
 * @returns 删除结果
 */
export function fetchBatchDeleteAppointments(appointmentIds: number[]) {
  return api.del<boolean>({
    data: appointmentIds,
    url: '/medical/outpatient/appointment/batch-delete',
  });
}

/**
 * 获取预约数量
 * @param params 查询条件
 * @returns 预约数量
 */
export function fetchAppointmentCount(params?: GetAppointmentListRequest) {
  return api.get<number>({
    params,
    url: '/medical/outpatient/appointment/count',
  });
}

/**
 * 获取今日预约列表
 * @param todayDate 今日日期
 * @returns 今日预约列表
 */
export function fetchTodayAppointments(todayDate: string) {
  return api.get<AppointmentDTO[]>({
    params: {
      todayDate,
    },
    url: '/medical/outpatient/appointment/today',
  });
}