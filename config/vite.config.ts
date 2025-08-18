import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  plugins: [
    vue(),
    svgLoader({ defaultImport: 'component' }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/user': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      }
    }
  }
});