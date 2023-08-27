import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import { externalsObj, externalsScript } from "../../scripts";
import legacy from "@vitejs/plugin-legacy";
import { viteExternalsPlugin } from "vite-plugin-externals";

// eslint-disable-next-line no-undef
const isProduction = process.env?.NODE_ENV === "production"

// https://vitejs.dev/config/
export default defineConfig({
  base: isProduction ? 'https://cdn.superting.cn/micro-frontend/sub-react/' : '/sub-react',
  plugins: [
    react(),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
    viteExternalsPlugin(
      { ...externalsObj },
      { disableInServe: true }
    ),
    createHtmlPlugin({
      template: "index.html",
      inject: {
        data: {
          title: "Sub-React",
          injectScripts: externalsScript,
        },
      },
    }),
  ],
  build: {
    rollupOptions: {
      
    }
  }
});
