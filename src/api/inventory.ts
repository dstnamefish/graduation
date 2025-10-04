import api from '@/utils/http';

import type { InventoryTableDTO, GetInventoryListRequest, InventoryListResult } from '@/types/api/inventory';

/**
 * 分页查询库存表格数据
 * @param params 查询参数
 * @returns 库存表格数据及分页信息
 */
export function fetchInventoryTableList(params?: GetInventoryListRequest) {
  return api.get<InventoryListResult>({
    params: {
      pageNum: 1,
      pageSize: 10,
      ...params,
    },
    url: '/inventory',
  });
}

/**
 * 根据物品名称精确查询库存
 * @param itemName 物品名称
 * @returns 库存信息列表
 */
export function fetchInventoryByItemName(itemName: string) {
  return api.get<InventoryTableDTO[]>({
    params: {
      itemName,
    },
    url: '/inventory/searchByName',
  });
}