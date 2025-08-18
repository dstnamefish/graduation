declare module '*.svg' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<object, string, any>;
  export default component;
}