<template>
  <Wujie :url="url" name="mini-vue3" />
</template>

<script lang="ts"  setup>
import { ref } from 'vue';
import Wujie from '../components/wujie.vue';

// @ts-ignore
const url = ref(window.STATIC_ENV_CONFIG?.MINI_VUE3 || '')
</script>