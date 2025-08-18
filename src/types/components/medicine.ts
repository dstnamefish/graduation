/**
 * 药品信息类型定义
 */
export interface Medicine {
  id: string;
  name: string;
  category: string; // 药品类别
  specification: string; // 规格
  manufacturer: string; // 生产厂家
  unit: string; // 单位
  price: number; // 价格
  stock: number; // 库存
  description: string; // 药品说明
  usage: string; // 用法用量
  contraindications: string; // 禁忌症
  sideEffects: string; // 副作用
}

/**
 * 药品列表查询参数
 */
export interface MedicineQueryParams {
  category?: string;
  keyword?: string;
  page?: number;
  pageSize?: number;
}

/**
 * 处方药品项
 */
export interface PrescriptionItem {
  medicineId: string;
  medicineName: string;
  dosage: string; // 剂量
  usage: string; // 用法
  quantity: number; // 数量
}
