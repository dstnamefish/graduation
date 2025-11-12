import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import viteCompression from 'vite-plugin-compression'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader' // 添加vite-svg-loader导入
// 可视化插件（按需启用）
// import visualizer from 'rollup-plugin-visualizer'

// ========================= 基础工具函数 =========================
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const resolve = (dir: string) => path.resolve(__dirname, dir)

// 环境变量类型接口
interface EnvConfig {
  VITE_VERSION: string
  VITE_PORT: number
  VITE_BASE_URL: string
  VITE_API_URL: string
  VITE_API_PROXY_URL: string
}

// 第三方依赖列表：统一管理需预构建的非 Element Plus 依赖
const THIRD_PARTY_DEPS = [
  'vue', 'vue-router', 'pinia', 'axios', '@vueuse/core', 'echarts',
  '@wangeditor/editor', '@wangeditor/editor-for-vue', 'vue-i18n',
  'xlsx', 'file-saver', 'vue-img-cutter'
]

// ========================= 核心修改：自动获取所有 Element Plus 组件样式路径 =========================
/**
 * 自动读取 node_modules 中 Element Plus 的所有组件目录，生成样式路径
 * @returns 所有 Element Plus 组件的样式路径数组（如 ['element-plus/es/components/button/style/css']）
 */
const getALLelStylePaths = () => {
  try {
    // 1. 定位 Element Plus 组件目录（node_modules/element-plus/es/components）
    const elComponentsDir = path.resolve(
      __dirname,
      'node_modules/element-plus/es/components'
    )

    // 2. 读取目录下的所有文件夹（每个文件夹对应一个组件，如 button、form）
    const componentFolders = fs.readdirSync(elComponentsDir, {
      withFileTypes: true // 读取文件类型，仅保留文件夹
    }).filter(dirent => dirent.isDirectory()) // 过滤非文件夹（如单个文件）

    // 3. 生成每个组件的样式路径（固定格式：组件目录/style/css）
    return componentFolders.map(folder =>
      `element-plus/es/components/${folder.name}/style/css`
    )
  } catch (error) {
    // 异常处理：若目录不存在（如依赖未安装），返回空数组避免构建报错
    console.warn('⚠️  自动读取 Element Plus 组件目录失败，可能是依赖未安装：', error)
    return []
  }
}

// 自动生成所有 Element Plus 组件样式路径（无需手动维护）
const ALL_EL_STYLE_PATHS = getALLelStylePaths()

// ========================= 插件配置抽离 =========================
const getComponentsConfig = (mode: string) => ({
  deep: true,
  extensions: ['vue'],
  dirs: ['src/components'],
  resolvers: [ElementPlusResolver()],
  dts: resolve('src/types/components.d.ts'),
  include: [/\.vue$/, /\.vue\?vue/],
  allowOverrides: mode === 'development'
})

const getAutoImportConfig = () => ({
  imports: ['vue', 'vue-router', '@vueuse/core', 'pinia'],
  resolvers: [ElementPlusResolver()],
  dts: resolve('src/types/auto-imports.d.ts'),
  eslintrc: {
    enabled: true,
    filepath: './.auto-import.json',
    globalsPropValue: true
  }
})

const getCompressionConfig = (mode: string) => ({
  verbose: mode === 'production',
  disable: mode === 'development',
  algorithm: 'gzip',
  ext: '.gz',
  threshold: 10240,
  deleteOriginFile: false
})

// ========================= 主配置函数 =========================
export default ({ mode }: { mode: string }) => {
  const rawEnv = loadEnv(mode, __dirname)

  const env: EnvConfig = {
    VITE_VERSION: rawEnv.VITE_VERSION || '1.0.0',
    VITE_PORT: Number(rawEnv.VITE_PORT) || 8080,
    VITE_BASE_URL: rawEnv.VITE_BASE_URL || '/',
    VITE_API_URL: rawEnv.VITE_API_URL || '/api',
    VITE_API_PROXY_URL: rawEnv.VITE_API_PROXY_URL || 'http://localhost:3000'
  }

  // 打印环境变量与 Element Plus 样式路径数量（便于调试）
  console.log(`\n🚀 当前环境：${mode}`)
  Object.entries(env).forEach(([key, value]) => {
    console.log(`🚀 ${key} = ${value}`)
  })
  console.log(`🚀 自动加载的 Element Plus 组件样式数量：${ALL_EL_STYLE_PATHS.length}`)
  console.log('')

  return defineConfig({
    define: {
      __APP_VERSION__: JSON.stringify(env.VITE_VERSION)
    },

    base: env.VITE_BASE_URL,

    server: {
      port: env.VITE_PORT,
      proxy: {
        '/api': {
          target: env.VITE_API_PROXY_URL,
          changeOrigin: true,
          rewrite: (path) => path
        }
      },
      host: true,
      open: mode === 'development',
      cors: true
    },

    resolve: {
      alias: {
        '@': resolve('src'),
        '@views': resolve('src/views'),
        '@imgs': resolve('src/assets/img'),
        '@icons': resolve('src/assets/icons'),
        '@utils': resolve('src/utils'),
        '@stores': resolve('src/store'),
        '@plugins': resolve('src/plugins'),
        '@styles': resolve('src/assets/styles')
      }
    },

    build: {
      target: 'es2022',
      outDir: 'dist',
      chunkSizeWarningLimit: 2000,
      minify: mode === 'production' ? 'terser' : 'esbuild',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
          pure_funcs: ['console.log']
        },
        output: {
          comments: false
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router', 'pinia', 'vue-i18n'],
            'element-plus': ['element-plus', '@element-plus/icons-vue'],
            'data-viz': ['echarts', 'echarts/core', 'echarts/renderers', 'echarts/charts', 'echarts/components'],
            'rich-editor': ['@wangeditor/editor', '@wangeditor/editor-for-vue'],
            'file-utils': ['xlsx', 'file-saver', 'jszip'],
            'utility-libs': ['lodash-es', 'dayjs', 'axios'],
            'drag-drop': ['vue-draggable-plus', 'sortablejs']
          },
          assetFileNames: (assetInfo) => {
            const extType = assetInfo.name?.split('.').pop()?.toLowerCase();
            const baseDir = 'assets';
            const dirMap = {
              css: `${baseDir}/css`,
              js: `${baseDir}/js`,
              png: `${baseDir}/images`,
              jpg: `${baseDir}/images`,
              jpeg: `${baseDir}/images`,
              gif: `${baseDir}/images`,
              webp: `${baseDir}/images`,
              woff: `${baseDir}/fonts`,
              woff2: `${baseDir}/fonts`,
              ttf: `${baseDir}/fonts`,
              eot: `${baseDir}/fonts`,
              svg: `${baseDir}/svg`,
              ico: `${baseDir}/icons`
            };
            const dir = extType ? (dirMap as Record<string, string>)[extType] || `${baseDir}/misc` : `${baseDir}/misc`;
            if (assetInfo.name === 'index.html') {
              return `[name].[hash].html`;
            }
            return `${dir}/[name].[hash].[ext]`;
          },
          chunkFileNames: (chunkInfo) => {
            const isVendor = chunkInfo.facadeModuleId?.includes('node_modules');
            if (isVendor) {
              return `assets/js/vendor/[name].[hash].js`;
            }
            if (chunkInfo.name?.includes('views') || chunkInfo.name?.includes('routes')) {
              return `assets/js/views/[name].[hash].js`;
            }
            if (chunkInfo.name?.includes('components')) {
              return `assets/js/components/[name].[hash].js`;
            }
            return `assets/js/chunks/[name].[hash].js`;
          },
          entryFileNames: 'assets/js/[name].[hash].js',
          compact: mode === 'production',
          exports: 'named',
          experimentalMinChunkSize: 10000
        },
        external: [
          ...(mode === 'production' ? ['vue-devtools'] : [])
        ],
        treeshake: {
          preset: 'recommended',
          moduleSideEffects: false
        }
      },
      dynamicImportVarsOptions: {
        warnOnError: true,
        exclude: [resolve('node_modules/**')],
        include: [resolve('src/views/**/*.vue')]
      },
      cssCodeSplit: true
    },

    plugins: [
      vue(),
      Components(getComponentsConfig(mode)),
      AutoImport(getAutoImportConfig()),
      ElementPlus({
        useSource: mode === 'development',
      }),
      viteCompression({ ...getCompressionConfig(mode), algorithm: 'gzip' as any }),
      svgLoader(),
      ...(mode === 'development' ? [vueDevTools()] : []),
      // ...(mode === 'production' ? [
      //   visualizer({
      //     open: true,
      //     gzipSize: true,
      //     brotliSize: true,
      //     filename: resolve('dist/stats.html')
      //   })
      // ] : [])
    ],

    // ========================= 依赖预构建：使用自动生成的所有 Element Plus 样式路径 =========================
    optimizeDeps: {
      include: [
        ...THIRD_PARTY_DEPS,
        ...ALL_EL_STYLE_PATHS // 替换手动列表，使用自动生成的所有样式路径
      ],
      exclude: [
        ...(mode === 'production' ? ['vue-devtools'] : [])
      ],
      force: mode === 'development'
    },

    css: {
      modules: {
        generateScopedName: mode === 'development'
          ? '[name]-[local]-[hash:base64:5]'
          : '[hash:base64:8]'
      },
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@styles/variables/index.scss" as *;
            @use "@styles/mixins/index.scss" as *;
          `,
        }
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              }
            }
          }
        ]
      }
    }
  })
}