<template>
  <header class="app__header">
    <h1 class="app__title">AppTitle</h1>
    <template v-if="isAuthenticated">
      <span class="app__user">{{ user.email }}</span>
      <LogoutButton />
    </template>
  </header>
  <main class="app__main">
    <RouterView />
  </main>
  <footer class="app__footer"></footer>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import LogoutButton from './components/LogoutButton.vue'
import { useAuthStore } from './stores/auth'

const { isAuthenticated, user } = storeToRefs(useAuthStore())
</script>

<style lang="css">
#app {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.app__header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-xs) var(--space-sm);
  background-color: aliceblue;
}

.app__title {
  margin-top: 0;
  margin-bottom: 0;
  margin-right: auto;
  font-size: var(--text-app-title);
}

.app__main {
  display: flex;
  flex-direction: column;
}

.app__user {
  display: none;
}

@media (min-width: 1024px) {
  .app__main {
    display: grid;
    grid-template-columns: 1fr 5fr;
  }
}
</style>
