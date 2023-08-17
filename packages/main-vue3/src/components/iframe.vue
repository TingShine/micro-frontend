<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const iframe = ref(null)

const url = ref(window.subReactUrl)

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
  <div style="padding: 30px;">
    <iframe ref="iframe" width="100%" height="800px" name="react" :src="url" frameborder="0"></iframe>
    <div style="margin-top: 30px;">
      <button @click="sendToIframe">发送到子应用</button>
    </div>
    <div style="margin-top: 10px;">
      <button @click="getIframeHistory">获取子应用信息</button>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
