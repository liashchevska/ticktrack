<template>
  <header>
    <template v-if="isAuthenticated">
      <span>{{ user.email }}</span>
      <LogoutButton />
    </template>
  </header>
  <main>
    <RouterView />
  </main>
  <footer></footer>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import LogoutButton from './components/LogoutButton.vue'
import { useAuthStore } from './stores/auth'

const { isAuthenticated, user } = storeToRefs(useAuthStore())
</script>

<style lang="css"></style>
