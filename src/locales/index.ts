/**
 * 国际化配置模块
 *
 * 提供应用程序的多语言支持
 *
 * ## 主要功能
 *
 * - 基于 Vue I18n 实现多语言切换
 * - 支持英语和简体中文
 * - 从系统存储和用户存储中获取语言设置
 * - 提供默认语言和语言选项
 *
 * ## 使用场景
 *
 * - 多语言应用程序
 * - 提升用户体验的本地化支持
 *
 * ## 技术实现
 *
 * - 使用 Vue I18n 库进行国际化管理
 * - 从系统存储和用户存储中获取语言设置
 * - 提供默认语言和语言选项
 */
import { createI18n } from 'vue-i18n';

import { LanguageEnum } from '@/enums/appEnum';
import { getSystemStorage } from '@/utils/storage';
import { StorageKeyManager } from '@/utils/storage/storage-key-manager';

// 同步导入语言文件
import enMessages from './langs/en.json';
import zhMessages from './langs/zh.json';

import type { I18n, I18nOptions } from 'vue-i18n';

// 创建存储键管理器实例
const storageKeyManager = new StorageKeyManager();

const messages = {
  [LanguageEnum.EN]: enMessages,
  [LanguageEnum.ZH]: zhMessages,
};

// 语言选项
export const languageOptions = [
  { label: '简体中文', value: LanguageEnum.ZH },
  { label: 'English', value: LanguageEnum.EN },
];

/**
 * 从存储中获取语言设置
 * @returns 语言设置，如果获取失败则返回默认语言
 */
const getDefaultLanguage = (): LanguageEnum => {
  // 尝试从版本化的存储中获取语言设置
  try {
    const storageKey = storageKeyManager.getStorageKey('user');
    const userStore = localStorage.getItem(storageKey);

    if (userStore) {
      const { language } = JSON.parse(userStore);
      if (language && Object.values(LanguageEnum).includes(language)) {
        return language;
      }
    }
  } catch (error) {
    console.warn('[i18n] 从版本化存储获取语言设置失败:', error);
  }

  // 尝试从系统存储中获取语言设置
  try {
    const sys = getSystemStorage();
    if (sys) {
      const { user } = JSON.parse(sys);
      if (user?.language && Object.values(LanguageEnum).includes(user.language)) {
        return user.language;
      }
    }
  } catch (error) {
    console.warn('[i18n] 从系统存储获取语言设置失败:', error);
  }

  // 返回默认语言
  console.debug('[i18n] 使用默认语言:', LanguageEnum.EN);
  return LanguageEnum.EN;
};

const i18nOptions: I18nOptions = {
  fallbackLocale: LanguageEnum.EN,
  globalInjection: true,
  legacy: false,
  locale: getDefaultLanguage(),
  messages,
};

const i18n: I18n = createI18n(i18nOptions);

interface Translation {
  (key: string): string
}

export const $t = i18n.global.t as Translation;

export default i18n;