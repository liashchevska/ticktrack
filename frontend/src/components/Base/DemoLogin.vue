<template>
    <button class="btn btn--accent" @click="demoLogin">TRY DEMO</button>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore()
const router = useRouter()

async function demoLogin() {
  await auth.demoLogin()
  router.push({ name: 'home', params: { id: '' } })
}
</script>
