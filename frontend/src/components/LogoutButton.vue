<template>
  <button class="btn btn--primary fixed-width-menu" @click="isConfirmOpen = true">Logout</button>
  <ConfirmDialog title="Log out" v-model="isConfirmOpen" @confirm="logout">
    <template #message>
      <p> Are you sure you want to log out? </p>
    </template>
  </ConfirmDialog>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
import ConfirmDialog from './Base/ConfirmDialog.vue';
import { ref } from 'vue';

const router = useRouter()
const auth = useAuthStore()
const isConfirmOpen = ref(false)

async function logout() {
  await auth.logout()
  router.push({ name: 'login' })
}
</script>
