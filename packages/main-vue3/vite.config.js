import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import vue from "@vitejs/plugin-vue";
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), AutoImport({
    resolvers: [TDesignResolver({library: 'vue-next'})]
  }),
Components({
  resolvers: [TDesignResolver({library: 'vue-next'})]
})],
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          open: true,
          template: "treemap",
          gzipSize: true,
          brotliSize: true,
        }),
      ],
    },
  },
});
