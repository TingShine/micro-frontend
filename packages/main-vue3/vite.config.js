import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { TDesignResolver } from "unplugin-vue-components/resolvers";
import legacy from "@vitejs/plugin-legacy";
import { viteExternalsPlugin } from "vite-plugin-externals";
import { createHtmlPlugin } from 'vite-plugin-html';

import { externalsObj, externalsScript } from '../../scripts';

console.log(externalsScript);

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
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
          title: 'Shine',
          injectScripts: externalsScript
        }
      }
    })
  ],
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
});
