<script setup>
import { onMounted, ref } from 'vue'

defineProps({
  msg: String,
})

const iframe = ref(null)

const sendToIframe = () => {
  if (iframe.value) {
    iframe.value.contentWindow.postMessage(666, '*')
  }
}

const getIframeHistory = () => {
  if (iframe.value) {
    console.log(iframe.value.urlurl);
  }
}
</script>

<template>
  <iframe ref="iframe" width="500" height="500" name="react" src="http://localhost:32770/" frameborder="0"></iframe>
  <div>
    <button @click="sendToIframe">发送到子应用</button>
  </div>
  <div>
    <button @click="getIframeHistory">获取子应用信息</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
