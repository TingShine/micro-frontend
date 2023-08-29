<script setup>
import { ref } from 'vue'
import throttle from 'lodash/throttle';

defineProps({
  msg: String,
})

const iframe = ref(null)

const url = ref(window.STATIC_ENV_CONFIG?.MONITOR_ADDRESS)
console.log(url.value);
</script>

<template>
  <div class="p-4 h-screen">
    <iframe ref="iframe" width="100%" height="100%" name="react" :src="url" frameborder="0"></iframe>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
