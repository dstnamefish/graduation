import api from '@/utils/http';

import type { PatientTableItem, PatientDetail, PatientListRequest } from '@/types/api/patient';

/**
 * 获取患者列表
 * @param params 查询参数
 * @returns 患者列表数据
 */
export function fetchPatientTableList(params: PatientListRequest = {
  pageNum: 1,
  pageSize: 10,
}) {
  return api.get<PatientTableItem[]>({
    params,
    url: '/patients',
  });
}

/**
 * 根据患者ID获取患者详情
 * @param patientId 患者ID
 * @returns 患者详情数据
 */
export function fetchPatientDetailById(patientId: number) {
  return api.get<PatientDetail>({
    url: `/patients/${patientId}`,
  });
}