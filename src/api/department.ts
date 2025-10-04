import api from '@/utils/http';

import type { DepartmentDTO, DepartmentDetailsDTO, DepartmentDoctorDTO, GetDepartmentPageRequest, PageResult } from '@/types/api/department';

/**
 * 获取科室详情及医生信息
 * @param departmentId 科室ID
 * @returns 科室详情及医生信息
 */
export function fetchDepartmentDetails(departmentId: number) {
  return api.get<DepartmentDetailsDTO>({
    url: `/department/${departmentId}`,
  });
}

/**
 * 获取科室列表
 * @returns 科室列表
 */
export function fetchDepartmentList() {
  return api.get<DepartmentDTO[]>({
    url: '/department/list',
  });
}

/**
 * 获取科室医生列表（按优先级/时间排序）
 * @param departmentId 科室ID
 * @returns 科室医生列表
 */
export function fetchDepartmentDoctors(departmentId: number) {
  return api.get<{
    list: DepartmentDoctorDTO[];
    totalCount: number;
  }>({
    url: `/department/${departmentId}/doctors`,
  });
}

/**
 * 分页获取科室列表
 * @param params 分页查询参数
 * @returns 分页科室列表
 */
export function fetchDepartmentPageList(params: GetDepartmentPageRequest) {
  return api.get<PageResult<DepartmentDTO>>({
    params,
    url: '/department/page',
  });
}