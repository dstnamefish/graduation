<!-- 国际化组件 -->
<template>
  <div class="language">
    <ElDropdown
      @command="changeLanguage"
      popper="languageDropDownStyle"
    >
      <template #dropdown>
        <ElDropdownMenu>
          <div
            v-for="item in languageOptions"
            :key="item.value"
            class="lang-btn-item"
          >
            <ElDropdownItem
              :command="item.value"
              :class="{ 'is-selected': locale === item.value }"
            >
              <span class="menu-txt">{{ item.label }}</span>
              <i v-if="locale === item.value">0</i>
            </ElDropdownItem>
          </div>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</template>

<script setup lang="ts">
import { useCommon } from '@/hooks/core/useCommon';
import { LanguageEnum } from '@/enums/appEnum';
import { languageOptions } from '@/locales';
import { useUserStore } from '@/store/modules/user';
import { useI18n } from 'vue-i18n';

defineOptions({ name: 'ZenLanguage' });

const { locale } = useI18n();
const userStore = useUserStore();

const { language } = storeToRefs(userStore);
onMounted(() => {
  initLanguage();
});

const initLanguage = (): void => {
  locale.value = language.value;
};

const reload = (time: number = 0): void => {
  setTimeout(() => {
    useCommon().refresh();
  }, time);
};

const changeLanguage = (lang: LanguageEnum): void => {
  if (locale.value === lang) {
    return;
  }
  locale.value = lang;
  userStore.setLanguage(lang);
  reload(50);
};
</script>