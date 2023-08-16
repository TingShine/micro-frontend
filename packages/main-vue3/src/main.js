import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Tdesign from 'tdesign-vue-next';
// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';

import WujieVue from "wujie-vue3";

const { bus, setupApp, preloadApp, destroyApp } = WujieVue;

createApp(App).use(WujieVue).use(Tdesign).mount('#app')

window.addEventListener('message', function (event) {
  console.log('main receive', event);
})