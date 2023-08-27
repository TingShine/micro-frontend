import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {  path: '/', component: () => import('../components/iframe.vue') },
  { path: '/sub-react/:subPath', component: () => import('../components/wujie.vue' ) },
  { path: '/sub-react', component: () => import('../components/wujie.vue' ) },
  { path: '/wasm', component: () => import('../components/webassembly.vue' ) },
]

const router = createRouter({
  history: createWebHistory('/micro-frontend'),
  routes
})

export default router;