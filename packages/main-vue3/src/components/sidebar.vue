
<template>
  <t-menu v-model:value="value" theme="light" style="height: 100%;">
    <t-menu-item v-for="item in list" :key="item.path" :value="item.path" @click="handleJump(item.path)">
      <template v-if="item.icon" #icon>
        <t-icon :name="item.icon"></t-icon>
      </template>
      {{ item.title || '' }}
    </t-menu-item>
  </t-menu>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const value = ref('/')

watchEffect(() => {
  value.value = route.path
})

const list = ref([
  {
    title: 'iframe',
    path: '/',
    icon: 'dashboard'
  },
  {
    title: 'sub-react',
    path: '/sub-react',
    icon: 'logo-codesandbox'
  },
  {
    title: 'WebAssembly',
    path: '/wasm',
    icon: 'film-1'
  }
])

const router = useRouter()
const handleJump = (pathName) => {
  router.push(pathName)
}


</script>
