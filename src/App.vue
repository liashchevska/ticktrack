<template>
  <header class="app__header">
    <div class="app__header-left">
      <h1 class="app__title">AppTitle</h1>
    </div>
    <div v-if="isAuthenticated" class="app__header-right">
      <span class="app__user">{{ user.email }}</span>
      <LogoutButton />
    </div>
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
  background: var(--sidebar);
}

.app__title {
  font-size: var(--text-app-title);
  font-style: italic;
}

.app__header-right {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  gap: var(--actions-gap);
}

.app__header-left,
.app__header-right {
  padding: var(--space-sm);
  align-items: center;
}

.app__main {
  display: flex;
  flex-direction: column;
}

.app__user {
  display: none;
}

@media (min-width: 1024px) {
  .app__user {
    display: initial;
  }

  .app__main {
    display: grid;
    grid-template-columns: var(--sidebar-width) 1fr;
  }

  .app__header {
    background: initial;
  }

  .app__header-left {
    min-width: var(--sidebar-width);
    background: var(--sidebar);
  }

  .app__header-left,
  .app__header-right {
    padding: var(--space-md);
  }

}
</style>
