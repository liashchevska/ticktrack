<template>
  <button class="btn btn--primary" @click="isConfirmOpen = true">Logout</button>
  <ConfirmDialog v-model="isConfirmOpen" @confirm="logout" />
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
