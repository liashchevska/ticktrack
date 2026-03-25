<template>
  <div class="app__layout">
    <header class="app__header">
      <div class="app__header-left">
        <h1 class="app__title">TickTrack </h1>
      </div>
      <div class="app__header-right">
        <button class="btn delete-account" @click="isConfirmOpen = true">Delete account</button>
        <LogoutButton />
      </div>
    </header>
    <main class="app__main">
      <RouterView />
    </main>
    <footer class="app__footer"></footer>
  </div>
  <ConfirmDialog :title="`Delete account ${authStore.user.email}`" v-model="isConfirmOpen" @confirm="deleteAccount">
    <template #message>
      <p> Are you sure you want to delete your account? This action cannot be undone. </p>
      <p> All your boards and tickets will be permanently removed. </p>
    </template>
  </ConfirmDialog>

</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import LogoutButton from '@/components/LogoutButton.vue';
import ConfirmDialog from '@/components/Base/ConfirmDialog.vue';
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const isConfirmOpen = ref(false)
const router = useRouter()

async function deleteAccount(){
  await authStore.deleteAccount()
  router.replace({ name: 'login' })
}
</script>

<style lang="css">
.app__layout {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.app__header,
.app__main,
.app__footer {
  width: 100%;
  max-width: 100%;
}

.app__header {
  display: flex;
  align-items: center;
  background: var(--sidebar);
}

.app__header-left,
.app__header-right {
  display: flex;
  align-items: center;
  padding: var(--space-sm) var(--space-md);
}

.app__header-right {
  flex-grow: 1;
  justify-content: flex-end;
  gap: var(--space-md);
}

.app__main {
  display: flex;
  flex-direction: column;
}

.app__user {
  display: none;
}

.app__title {
  font-size: var(--text-xl);
}

.delete-account {
  background: none;
  text-decoration: underline;
}
.delete-account:hover{
  text-decoration: underline red;
}


@media (min-width: 1024px) {
  .app__user {
    display: initial;
    font-style: italic;
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
    height: 100%;
    padding: var(--space-md) var(--tickets-grid-gap);
  }

}
</style>
