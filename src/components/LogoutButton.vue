<template>
  <button class="btn btn--primary" @click="logout">Logout</button>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth';

const router = useRouter()
const auth = useAuthStore()

async function logout() {
  await auth.logout()
  router.push({ name: 'login' })
}
</script>
