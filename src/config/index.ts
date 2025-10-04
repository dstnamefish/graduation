/**
 * 系统配置
 * 包含：系统信息、系统主题、菜单主题、菜单布局、系统主色、系统主色列表、系统主色、系统其他项默认配置、快速入口配置
 */
import { MenuThemeEnum, MenuTypeEnum, SystemThemeEnum } from '@/enums/appEnum';
import { SystemConfig } from '@/types/config';

import { configImages } from './assets/images';
import fastEnterConfig from './fastEnter';
import { headerBarConfig } from './headerBar';

const appConfig: SystemConfig = {
  darkMenuStyles: [
    {
      background: '#161618',
      iconActiveColor: '#FFFFFF',
      iconColor: '#BABBBD',
      leftLineColor: '#3F4257',
      rightLineColor: '#EDEEF0',
      systemBackground: '#F8F8F8',
      systemNameColor: '#DDDDDD',
      tabBarBackground: '#FFFFFF',
      textActiveColor: '',
      textColor: 'rgba(#FFFFFF, 0.7)',
      theme: MenuThemeEnum.DARK,
    },
  ],

  // Element Plus 主题
  elementPlusTheme: {
    primary: '#5D87FF',
  },

  // 快速入口配置
  fastEnter: fastEnterConfig,

  // 顶部栏功能配置
  headerBar: headerBarConfig,

  // 菜单布局列表
  menuLayoutList: [
    { img: configImages.menuLayouts.vertical, name: 'Left', value: MenuTypeEnum.LEFT },
    { img: configImages.menuLayouts.horizontal, name: 'Top', value: MenuTypeEnum.TOP },
    { img: configImages.menuLayouts.mixed, name: 'Mixed', value: MenuTypeEnum.TOP_LEFT },
    { img: configImages.menuLayouts.dualColumn, name: 'Dual Column', value: MenuTypeEnum.DUAL_MENU },
  ],

  // 系统主题列表
  settingThemeList: [
    {
      color: ['#fff', '#fff'],
      img: configImages.themeStyles.light,
      leftLineColor: '#EDEEF0',
      name: 'Light',
      rightLineColor: '#EDEEF0',
      theme: SystemThemeEnum.LIGHT,
    },
    {
      color: ['#22252A'],
      img: configImages.themeStyles.dark,
      leftLineColor: '#3F4257',
      name: 'Dark',
      rightLineColor: '#3F4257',
      theme: SystemThemeEnum.DARK,
    },
    {
      color: ['#fff', '#22252A'],
      img: configImages.themeStyles.system,
      leftLineColor: '#EDEEF0',
      name: 'System',
      rightLineColor: '#3F4257',
      theme: SystemThemeEnum.AUTO,
    },
  ],

  // 系统信息
  systemInfo: {
    name: 'WellNest', // 系统名称
  },

  // 系统主色
  systemMainColor: [
    '#5D87FF',
    '#B48DF3',
    '#1D84FF',
    '#60C041',
    '#38C0FC',
    '#F9901F',
    '#FF80C8',
  ] as const,

  // 系统其他项默认配置
  systemSetting: {
    defaultCustomRadius: '0.75', // 自定义圆角
    defaultMenuWidth: 240, // 菜单宽度
    defaultTabStyle: 'tab-default', // 标签样式
  },

  // 系统主题
  systemThemeStyles: {
    [SystemThemeEnum.DARK]: { className: SystemThemeEnum.DARK },
    [SystemThemeEnum.LIGHT]: { className: '' },
  },

  // 菜单主题列表
  themeList: [
    {
      background: '#FFFFFF',
      iconActiveColor: '#333333',
      iconColor: '#6B6B6B',
      img: configImages.menuStyles.design,
      leftLineColor: '#EDEEF0',
      rightLineColor: '#EDEEF0',
      systemBackground: '#FAFBFC',
      systemNameColor: 'var(--art-text-gray-800)',
      tabBarBackground: '#FAFBFC',
      textActiveColor: '#3F8CFF',
      textColor: '#29343D',
      theme: MenuThemeEnum.DESIGN,
    },
    {
      background: '#191A23',
      iconActiveColor: '#FFFFFF',
      iconColor: '#BABBBD',
      img: configImages.menuStyles.dark,
      leftLineColor: '#3F4257',
      rightLineColor: '#EDEEF0',
      systemBackground: '#F8F8F8',
      systemNameColor: '#BABBBD',
      tabBarBackground: '#FFFFFF',
      textActiveColor: '#FFFFFF',
      textColor: '#BABBBD',
      theme: MenuThemeEnum.DARK,
    },
    {
      background: '#ffffff',
      iconActiveColor: '#333333',
      iconColor: '#6B6B6B',
      img: configImages.menuStyles.light,
      leftLineColor: '#EDEEF0',
      rightLineColor: '#EDEEF0',
      systemBackground: '#F8F8F8',
      systemNameColor: '#68758E',
      tabBarBackground: '#FFFFFF',
      textActiveColor: '#3F8CFF',
      textColor: '#29343D',
      theme: MenuThemeEnum.LIGHT,
    },
  ],
};

export default Object.freeze(appConfig);