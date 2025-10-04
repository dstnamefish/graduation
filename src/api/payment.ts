import api from '@/utils/http';

import type { InvoiceDTO, InvoiceStatsDTO, TrendDataDTO, GetInvoiceListRequest, PageResult } from '@/types/api/payment';

/**
 * 获取发票列表（带搜索/过滤/分页）
 * @param params 查询参数
 * @returns 分页后的发票列表
 */
export function fetchInvoiceList(params?: GetInvoiceListRequest) {
  return api.get<PageResult<InvoiceDTO>>({
    params,
    url: '/payment/invoices',
  });
}

/**
 * 获取发票统计卡数据
 * @param startDate 开始日期
 * @param endDate 结束日期
 * @returns 统计卡数据列表
 */
export function fetchInvoiceStats(startDate: string, endDate: string) {
  return api.get<InvoiceStatsDTO[]>({
    params: {
      endDate,
      startDate,
    },
    url: '/payment/invoices/stats',
  });
}

/**
 * 获取发票趋势数据
 * @param startDate 开始日期
 * @param endDate 结束日期
 * @returns 趋势数据列表
 */
export function fetchInvoiceTrendData(startDate: string, endDate: string) {
  return api.get<TrendDataDTO[]>({
    params: {
      endDate,
      startDate,
    },
    url: '/payment/invoices/trend',
  });
}

/**
 * 获取发票详情
 * @param invoiceId 发票ID
 * @returns 发票详情
 */
export function fetchInvoiceById(invoiceId: number) {
  return api.get<InvoiceDTO>({
    url: `/payment/invoices/${invoiceId}`,
  });
}

/**
 * 更新发票状态
 * @param invoiceId 发票ID
 * @param status 新状态
 * @returns 更新结果
 */
export function fetchUpdateInvoiceStatus(invoiceId: number, status: string) {
  return api.put<boolean>({
    params: {
      status,
    },
    url: `/payment/invoices/${invoiceId}/status`,
  });
}

/**
 * 批量获取发票详情
 * @param invoiceIds 发票ID列表
 * @returns 发票详情列表
 */
export function fetchInvoicesByIds(invoiceIds: number[]) {
  return api.post<InvoiceDTO[]>({
    data: invoiceIds,
    url: '/payment/invoices/batch',
  });
}