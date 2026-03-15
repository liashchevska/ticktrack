<template>
  <Outage v-if="isServerDown" />
  <RouterView />
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { RouterView } from 'vue-router';
import { useGlobalErrorStore } from './stores/error';
import Outage from './components/Base/Outage.vue';
const { isServerDown } = storeToRefs(useGlobalErrorStore())

</script>

<style lang="css">
#app {
  min-height: 100vh;
}
</style>
