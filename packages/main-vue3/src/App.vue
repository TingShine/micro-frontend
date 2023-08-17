<script setup>
import SideBar from './components/sidebar.vue';
</script>

<template>
  <t-layout style="width: 100vw; height: 100vh;">
    <t-aside>
      <side-bar></side-bar>
    </t-aside>
    <t-content>
      <router-view></router-view>
    </t-content>
  </t-layout>
</template>

<style scoped></style>
