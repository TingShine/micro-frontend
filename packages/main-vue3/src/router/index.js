import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {  path: '/', component: () => import('../components/iframe.vue') },
  { path: '/sub-react/:subPath', component: () => import('../components/wujie.vue' ) },
  { path: '/sub-react', component: () => import('../views/sub-react.vue' ) },
  { path: '/monitor', component: () => import('../views/monitor.vue' ) },
  { path: '/ffmpeg', component: () => import('../components/ffmpeg.vue' ) },
  { path: '/rust-wasm', component: () => import('../views/rust-wasm.vue' ) },
]

const router = createRouter({
  history: createWebHistory('/micro-frontend'),
  routes
})

export default router;