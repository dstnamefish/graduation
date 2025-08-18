/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<object, object>;
  export default component;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
  readonly VITE_APP_API_BASE_URL: string;
  readonly VITE_APP_API_PROTOCOL: string;
  readonly VITE_APP_API_DOMAIN: string;
  readonly VITE_APP_API_PORT: string;
  readonly VITE_APP_API_STATIC_URL: string;
  readonly VITE_APP_API_DEBUG: string;
  readonly NODE_ENV: string;
}