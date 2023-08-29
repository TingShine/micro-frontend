<template>
  <Wujie :url="url" name="sub-react" />
</template>

<script lang="ts"  setup>
import { ref } from 'vue';
import Wujie from '../components/wujie.vue';

// @ts-ignore
const url = ref(window.STATIC_ENV_CONFIG?.SUB_REACT || '')
</script>