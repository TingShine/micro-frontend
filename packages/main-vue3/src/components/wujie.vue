<script setup lang="ts">
import { ref, PropType } from 'vue';
import { useRouter } from 'vue-router';

defineProps({
  url: {
    type: String as PropType<string>,
    default: ''
  },
  name: {
    type: String as PropType<string>,
    default: ''
  }
})

const router = useRouter()
const jump = (location) => {
  router.push(location)
}

</script>

<template>
  <wujie-vue
    width="100%"
    height="800px"
    :name="name"
    :props="{jump}"
    :url="url"
  />
</template>