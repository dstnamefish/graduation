import { defineStore } from 'pinia';
import { ref } from 'vue';

import { TableSizeEnum } from '@/enums/formEnum';

/**
 * @description 表格模块
 * 用于管理表格的全局配置，如大小、斑马纹、边框、表头背景等。
 * 这些配置可以在应用的多个组件中使用，以保持一致的表格样式。
 * @constant tableSize 表格大小
 * @constant isZebra 是否显示斑马纹
 * @constant isBorder 是否显示边框
 * @constant isHeaderBackground 是否显示表头背景
 * @constant setTableSize 设置表格大小 @param size 表格大小枚举值
 * @constant setIsZebra 设置斑马纹显示状态 @param value 是否显示斑马纹
 * @constant setIsBorder 设置表格边框显示状态 @param value 是否显示边框
 * @constant setIsHeaderBackground 设置表头背景显示状态 @param value 是否显示表头背景
 */
export const useTableStore = defineStore(
  'tableStore',
  () => {
    const tableSize = ref(TableSizeEnum.DEFAULT);
    const isZebra = ref(false);
    const isBorder = ref(false);
    const isHeaderBackground = ref(false);

    const setTableSize = (size: TableSizeEnum) => (tableSize.value = size);
    const setIsZebra = (value: boolean) => (isZebra.value = value);
    const setIsBorder = (value: boolean) => (isBorder.value = value);
    const setIsHeaderBackground = (value: boolean) => (isHeaderBackground.value = value);

    return {
      isBorder,
      isHeaderBackground,
      isZebra,
      setIsBorder,
      setIsHeaderBackground,
      setIsZebra,
      setTableSize,
      tableSize,
    };
  },
  {
    persist: {
      key: 'table',
      storage: localStorage,
    },
  },
);