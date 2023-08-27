import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';
import router from './router';
import WujieVue from "wujie-vue3"; 

const { bus, setupApp, preloadApp, destroyApp } = WujieVue;

const app = createApp(App).use(WujieVue).use(router)
app.mount('#app')

window.addEventListener('message', function (event) {
  console.log('main receive', event);
})

// preloadApp({
//   name: 'wujie',
//   url: window.STATIC_ENV_CONFIG?.SUB_REACT || '',
//   exec: true
// })

bus.$on('message', (e) => {
  console.log('main app receive ==> ', e);
})

export default app