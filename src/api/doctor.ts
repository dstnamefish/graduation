import api from '@/utils/http';

import type { DoctorDTO, GetDoctorListRequest, UpdateDoctorStatusRequest } from '@/types/api/doctor';

/**
 * 获取医生列表（包含统计信息）
 * @param params 查询参数
 * @returns 医生列表
 */
export function fetchDoctorList(params?: GetDoctorListRequest) {
  return api.get<DoctorDTO[]>({
    params,
    url: '/doctor/list',
  });
}

/**
 * 获取医生详情
 * @param id 医生ID
 * @returns 医生详情
 */
export function fetchDoctorById(id: number) {
  return api.get<DoctorDTO>({
    url: `/doctor/${id}`,
  });
}

/**
 * 根据科室ID获取医生列表
 * @param departmentId 科室ID
 * @returns 医生列表
 */
export function fetchDoctorsByDepartment(departmentId: number) {
  return api.get<DoctorDTO[]>({
    url: `/doctor/by-department/${departmentId}`,
  });
}

/**
 * 更新医生状态
 * @param id 医生ID
 * @param params 更新参数
 * @returns 更新结果
 */
export function fetchUpdateDoctorStatus(id: number, params: UpdateDoctorStatusRequest) {
  return api.put<boolean>({
    params,
    url: `/doctor/${id}/status`,
  });
}

/**
 * 获取医生总数
 * @param params 查询参数
 * @returns 医生总数
 */
export function fetchDoctorCount(params?: GetDoctorListRequest) {
  return api.get<number>({
    params,
    url: '/doctor/count',
  });
}

/**
 * 获取今天有预约的医生列表
 * @returns 医生列表
 */
export function fetchDoctorsWithTodayAppointments() {
  return api.get<DoctorDTO[]>({
    url: '/doctor/today-appointments',
  });
}