import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { TDesignResolver } from "unplugin-vue-components/resolvers";
import legacy from "@vitejs/plugin-legacy";
import { viteExternalsPlugin } from "vite-plugin-externals";
import { createHtmlPlugin } from 'vite-plugin-html';
import { fileURLToPath, URL } from 'url'

import { externalsObj, externalsScript } from '../../scripts';

// eslint-disable-next-line no-undef
const isProduction = process.env?.NODE_ENV === "production"

// https://vitejs.dev/config/
export default defineConfig({
  base: isProduction ? "https://cdn.superting.cn/micro-frontend/main-app/" : '/micro-frontend',
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ]
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [TDesignResolver({ library: "vue-next" })],
    }),
    Components({
      resolvers: [TDesignResolver({ library: "vue-next" })],
    }),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
    viteExternalsPlugin(
      { ...externalsObj },
      { disableInServe: true }
    ),
    createHtmlPlugin({
      template: 'index.html',
      inject: {
        data: {
          title: 'Micro-Frontend',
          injectScripts: externalsScript
        }
      }
    })
  ],
  optimizeDeps: {
    exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util']
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  },
  build: {
    rollupOptions: {
      plugins: [
        // visualizer({
        //   open: true,
        //   template: "treemap",
        //   gzipSize: true,
        //   brotliSize: true,
        // }),
      ],
    },
  },
  experimental: {
    renderBuiltUrl(fileName, { hostId, hostType, type }) {
      if (fileName.includes('worker') && type === 'asset' && hostType ==='js') {
        return `https://superting.cn/micro-frontend/` + fileName;
      }
    }
  }
});
