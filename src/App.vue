<template>
  <header>
    <LogoutButton v-if="isAuthenticated" />
  </header>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import LogoutButton from './components/LogoutButton.vue'
import { useAuthStore } from './stores/auth'

const { isAuthenticated } = storeToRefs(useAuthStore())
</script>

<style scoped></style>
