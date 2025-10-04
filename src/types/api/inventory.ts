/**
 * @description 库存状态枚举
 * 定义物品在库存中的不同状态
 *
 * @enum InventoryStatus
 * @property {string} Out of Stock - 缺货
 * @property {string} Out of Recorder - 记录缺货
 * @property {string} Low - 库存低
 * @property {string} Available - 可用
 */
export type InventoryStatus = 'Out of Stock' | 'Out of Recorder' | 'Low' | 'Available';

/**
 * @description 库存表格数据接口
 * 定义库存列表中每个物品的详细信息
 *
 * @interface InventoryTableDTO
 * @property {number} id - 库存ID
 * @property {string} itemCode - 物品编码
 * @property {string} itemName - 物品名称
 * @property {string} specification - 物品规格
 * @property {string} unit - 物品单位
 * @property {number} qtyInRecorder - 记录库存数量
 * @property {number} qtyInStock - 物理库存数量
 * @property {number} inTransitQuantity - 在途库存数量
 * @property {number} lockedQuantity - 已锁定库存数量
 * @property {string} category - 物品分类
 * @property {InventoryStatus} availability - 物品状态
 * @property {string} [imageUrl] - 物品图片URL
 */
export interface InventoryTableDTO {
  id: number;
  itemCode: string;
  itemName: string;
  specification: string;
  unit: string;
  qtyInRecorder: number;
  qtyInStock: number;
  inTransitQuantity: number;
  lockedQuantity: number;
  category: string;
  availability: InventoryStatus;
  imageUrl?: string;
}

/**
 * @description 获取库存列表查询参数接口
 * 定义查询库存列表时的参数结构
 *
 * @interface GetInventoryListRequest
 * @property {number} [pageNum] - 当前页码，默认值为1
 * @property {number} [pageSize] - 每页数据量，默认值为10
 * @property {string} [itemCode] - 物品编码
 * @property {string} [itemName] - 物品名称
 * @property {number} [categoryId] - 物品分类ID
 * @property {InventoryStatus} [availability] - 物品状态
 * @property {number} [minPhysicalStock] - 最小物理库存数量
 * @property {number} [minCommittedStock] - 最小已提交库存数量
 */
export interface GetInventoryListRequest {
  pageNum?: number;
  pageSize?: number;
  itemCode?: string;
  itemName?: string;
  categoryId?: number;
  availability?: InventoryStatus;
  minPhysicalStock?: number;
  minCommittedStock?: number;
}

/**
 * @description 库存列表结果接口
 * 定义库存列表数据的通用结构
 *
 * @interface InventoryListResult
 * @property {InventoryTableDTO[]} list - 库存列表
 * @property {number} total - 总记录数
 * @property {number} pageNum - 当前页码
 * @property {number} pageSize - 每页数据量
 */
export interface InventoryListResult {
  list: InventoryTableDTO[];
  total: number;
  pageNum: number;
  pageSize: number;
}