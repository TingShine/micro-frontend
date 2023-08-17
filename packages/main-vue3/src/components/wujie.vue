<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

// @ts-ignore
const url = ref(window.subReactUrl)

const router = useRouter()
const jump = (location) => {
  router.push(location)
}

</script>

<template>
  <wujie-vue
    width="100%"
    height="800px"
    name="wujie"
    :props="{jump}"
    :url="url"
  />
</template>