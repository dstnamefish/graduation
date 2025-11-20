<!-- 表格搜索组件 -->
<!-- 支持常用表单组件、自定组件、插槽、校验、隐藏表单项 -->
<template>
  <section class="zen-search-bar">
    <ElForm
      ref="formRef"
      :model="modelValue"
      :labelPosition="labelPosition"
      v-bind="{ ...$attrs }"
    >
      <ElRow
        class="search-form-row"
        :gutter="gutter"
      >
        <ElCol
          v-for="item in visibleformitems"
          :key="item.key"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="item.span || span"
          :xl="item.span || span"
        >
          <ElFormItem
            :label="item.label"
            :prop="item.key"
            :labelWidth="item.label ? item.labelWidth || labelWidth : undefined"
          >
            <slot
              :name="item.key"
              :item="item"
              :modelValue="modelValue"
            >
              <component
                :is="getComponent(item)"
                v-model="modelValue[item.key]"
                v-bind="getProps(item)"
              >
                <!-- 下拉选择 -->
                <template v-if="item.type === 'select' && getProps(item)?.options">
                  <ElOption v-for="option in getProps(item).options" v-bind="option" :key="option.value"/>
                </template>

                <!-- 复选框组 -->
                <template v-if="item.type === 'checkboxgroup' && getProps(item)?.options">
                  <ElOption v-for="option in getProps(item).options" v-bind="option" :key="option.value"/>
                </template>

                <!-- 单选框组 -->
                <template v-if="item.type === 'radiogroup' && getProps(item)?.options">
                  <ElOption v-for="option in getProps(item).options" v-bind="option" :key="option.value"/>
                </template>

                <!-- 动态插槽支持 -->
                <template v-for="(shotFn, slotName) in getSlots(item)" :key="slotName" #[slotName]>
                  <component is:slotFn />
                </template>
              </component>
            </slot>
          </ElFormItem>
        </ElCol>

        <ElCol
          :xs="24" :sm="24" :md="span"
          :lg="span" :xl="span" class="action-cloumn"
        >
          <div class="action-buttons-wrapper" :style="actionButtonsStyle">
            <div class="form-buttons">
              <ElButton
                v-if="showSearch"
                type="primary"
                class="search-button"
                @click="handleSearch"
                v-ripple
                :disabled="disabledSearch"
              >
                {{ t('table.searchBar.search') }}
              </ElButton>
            </div>
          </div>
        </ElCol>
      </ElRow>
    </ElForm>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElSwitch,
  ElCheckbox,
  ElCheckboxGroup,
  ElRadioGroup,
  ElButton,
  ElIcon,
  FormInstance,
  ElRate,
  ElSlider,
  ElRow,
  ElCol,
  ElCascader,
  ElTimePicker,
  ElTimeSelect,
  ElTreeSelect,
} from 'element-plus';

defineOptions({ name: 'ZenSearchBar' });

const componentMap = {
  cascader: ElCascader,
  checkbox: ElCheckbox,
  checkboxgroup: ElCheckboxGroup,
  date: ElDatePicker,
  daterange: ElDatePicker,
  datetime: ElDatePicker,
  datetimerange: ElDatePicker,
  input: ElInput,
  number: ElInputNumber,
  radiogroup: ElRadioGroup,
  rate: ElRate,
  select: ElSelect,
  slider: ElSlider,
  switch: ElSwitch,
  timepicker: ElTimePicker,
  timeselect: ElTimeSelect,
  treeselect: ElTreeSelect,
};
const { t } = useI18n();

const formInstance = useTemplateRef<FormInstance>('formRef');

/**
 * @description 表单项配置
 * @property {string} key - 表单项的唯一键值，用于绑定表单数据和组件。
 * @property {string} [label] - 表单项的标签文本，用于显示在表单中。
 * @property {string} [labelWidth] - 表单项标签的宽度，用于调整标签的显示宽度。
 * @property {keyof typeof componentMap | string | (() => VNode)} type - 表单项的组件类型，用于渲染对应的表单组件。
 * @property {boolean} [hidden] - 表单项是否隐藏，默认值为 false。
 * @property {number} [span] - 表单项的宽度span值，用于调整表单项在网格布局中的宽度。
 * @property {Record<string, any>} [options] - 表单项的选项配置，用于下拉选择、复选框组和单选框组等组件。
 * @property {Record<string, any>} props - 表单项的自定义属性配置，用于传递给组件的额外属性。
 * @property {Record<string, (() => any) | undefined>} [slots] - 表单项的插槽配置，用于自定义组件的内容渲染。
 */
export interface SearchFormItem {
  key: string;
  label?:string;
  labelWidth?: string;
  type: keyof typeof componentMap | string | (() => VNode);
  hidden?: boolean;
  span?: number;
  options?: Record<string, any>;
  props: Record<string, any>;
  slots?: Record<string, (() => any) | undefined>;
  placeholder?: string;
}

/**
 * @description 表单配置
 * @property {SearchFormItem[]} items - 表单的表单项配置数组，用于定义表单的结构和行为。
 * @property {number} [span] - 表单项的宽度span值，用于调整表单项在网格布局中的宽度。默认值为 8。
 * @property {number} [gutter] - 表单项之间的间距值，用于调整表单项在网格布局中的间距。默认值为 12。
 * @property {'left' | 'right'| 'top'} [labelPosition] - 表单项标签的位置，用于调整标签的显示位置。默认值为 'left'。
 * @property {string | number} [labelWidth] - 表单项标签的宽度，用于调整标签的显示宽度。默认值为 '80px'。
 * @property {boolean} [showSearch] - 是否显示搜索按钮，默认值为 true。
 * @property {boolean} [disabledSearch] - 是否禁用搜索按钮，默认值为 false。
 */
interface SearchBarProps {
  items: SearchFormItem[];
  span?: number;
  gutter?: number;
  labelPosition?: 'left' | 'right'| 'top';
  labelWidth?: string | number;
  buttonLeftLimit?: number;
  showSearch?: boolean;
  disabledSearch?: boolean;
}

const props = withDefaults(defineProps<SearchBarProps>(), {
  disabledSearch: false,
  gutter: 12,
  items: () => [],
  labelPosition: 'left',
  labelWidth: '80px',
  showSearch: true,
  span: 8,
});

interface SearchBarEmits {
  search: []
}

const emit = defineEmits<SearchBarEmits>();

const modelValue = defineModel<Record<string, any>>({ default: {} });

const rootProps = ['label', 'labelWidth', 'key', 'type', 'hidden', 'span', 'slots'];

// 过滤出组件需要的属性
const getProps = (item: SearchFormItem) => {
  if (item.props) { return item.props; }
  const props = { ...item };
  rootProps.forEach((key)=> delete (props as Record<string, any>)[key]);
  return props;
};

// 过滤出组件需要的插槽
const getSlots = (item: SearchFormItem) => {
  if (!item.slots) {return {};}
  const validSlots: Record<string, ()=> any> = {};
  Object.entries(item.slots).forEach(([key, slotFn]) => {
    if (slotFn) {
      validSlots[key] = slotFn;
    }
  });
  return validSlots;
};

// 获取组件类型
const getComponent = (item: SearchFormItem) => {
  const { type } = item;
  if (type && typeof item.type !== 'string') {return type;}
  return componentMap[type as keyof typeof componentMap] || componentMap['input'];
};

const visibleformitems = computed(() => props.items.filter((item) => !item.hidden));

const actionButtonsStyle = computed(() => ({
  'flex-end'
  : props.items.filter((item) => !item.hidden).length <= props.buttonLeftLimit
    ? 'flex-start'
    : 'flex-end',
}));

const handleSearch = () => {
  emit('search');
};

defineExpose({
  ref: formInstance,
  validate: (...args: any[]) => formInstance.value?.validate(...args),
});
</script>

<style scoped lang="scss">
@forward './style.scss';
</style>