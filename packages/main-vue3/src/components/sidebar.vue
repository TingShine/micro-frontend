
<template>
  <t-menu v-model:value="value" theme="light" style="height: 100%;">
    <t-menu-item v-for="item in list" :key="item.path" :value="item.path" @click="handleJump(item.path)">
      <template v-if="item.icon" #icon>
        <component :is="item.icon" />
      </template>
      {{ item.title || '' }}
    </t-menu-item>
  </t-menu>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { DashboardIcon, LogoCodesandboxIcon, Film1Icon, SystemSettingIcon, MathematicsIcon, BookOpenIcon } from 'tdesign-icons-vue-next';

const route = useRoute()
const value = ref('/')

watchEffect(() => {
  value.value = route.path
})

const list = [
  {
    title: 'iframe',
    path: '/',
    icon: DashboardIcon
  },
  {
    title: 'sub-react',
    path: '/sub-react',
    icon: LogoCodesandboxIcon
  },
  {
    title: 'Monitor',
    path: '/monitor',
    icon: SystemSettingIcon
  },
  {
    title: 'FFmpeg',
    path: '/ffmpeg',
    icon: Film1Icon
  },
  {
    title: 'Rust-Wasm',
    path: '/rust-wasm',
    icon: MathematicsIcon
  },
  {
    title: 'Vue-SourceCode',
    path: '/mini-vue3',
    icon: BookOpenIcon
  }
]

const router = useRouter()
const handleJump = (pathName) => {
  router.push(pathName)
}


</script>
