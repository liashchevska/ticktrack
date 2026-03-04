<template>
  <template v-if="isAuthenticated">
    <AppLayout />
  </template>
  <template v-else>
    <RouterView />
  </template>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from './stores/auth'
import AppLayout from './layouts/AppLayout.vue';
import { RouterView } from 'vue-router';

const { isAuthenticated } = storeToRefs(useAuthStore())
</script>

<style lang="css">
#app {
  min-height: 100vh;
}
</style>
