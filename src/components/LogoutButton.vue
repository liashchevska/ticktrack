<template>
  <button @click="logout">Logout</button>
</template>

<script setup>
import router from '@/router';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore()
async function logout() {
  await auth.logout()
  router.push('/login')
}
</script>
