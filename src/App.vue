<template>
  <header class="app__header">
    <template v-if="isAuthenticated">
      <span class="app__user">{{ user.email }}</span>
      <LogoutButton class="app__logout" />
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

<style lang="css">
#app {
  display: flex;
  flex-direction: column;
}

.app__header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
}

.app__user {
  margin-right: 1rem;
}
</style>
