import js from "@eslint/js";                // ESLint 官方推荐的 JS 规则
import globals from "globals";              // 提供浏览器/Node 等全局变量
import tseslint from "typescript-eslint";   // TypeScript ESLint 插件
import pluginVue from "eslint-plugin-vue";  // Vue ESLint 插件
import { defineConfig } from "eslint/config"; // 定义 ESLint 配置

/**
 * files：指定规则适用的文件（如 **.vue 匹配所有 Vue 文件）。 
 * plugins：加载插件（如 js、vue）。
 * extends：继承预设规则（如 js/recommended）。
 * languageOptions.globals：定义全局变量（如 browser 包含 window、document）。
 * tseslint.configs.recommended：TypeScript 推荐规则（类似 @typescript-eslint/recommended）。
 * pluginVue.configs["flat/essential"]：Vue 基础规则（如模板语法检查）。
 * parserOptions.parser：Vue 文件使用 typescript-eslint 解析器（支持 <script lang="ts">）。 
 * */ 
export default defineConfig([
  /*------------------ 基础规则 ------------------ */
  { 
    // 适用于所有 JS/TS/Vue 文件
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"], 
    plugins: { js }, 
    extends: ["js/recommended"],
    // 自定义规则（覆盖或扩展）
    rules:{
      // 强制单引号
      "quotes": ["error","double"], 
      // 强制分号
      "semi": ["error","always"], 
      // 缩进2个空格
      "indent": ["error",2], 

    },
    // 语言环境配置
    languageOptions: {
      // 浏览器全局变量 (如 window, document)
      globals: {
        ...globals.browser,
        ...globals.es2025,
      },
      // 默认使用 ES 模块
      sourceType: "module", 
    }
  },

  /*------------------ 设置浏览器全局变量（如 window、document） ------------------ */ 
  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"], 
    languageOptions: { 
      globals: globals.browser 
    } 
  },

  /*------------------ 应用 TypeScript 推荐规则 ------------------ */ 
  tseslint.configs.recommended,

  /*------------------ 应用 Vue 基础规则（essential） ------------------ */ 
  pluginVue.configs["flat/essential"],

   /*------------------ 5. 为 Vue 文件指定 TypeScript 解析器 ------------------ */ 
  { 
    files: ["**/*.vue"], 
    languageOptions: { 
      parserOptions: { 
        parser: tseslint.parser 
      } 
    } 
  },
]);





