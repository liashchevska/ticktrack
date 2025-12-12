<template>
  <div>Home Page</div>
  <LogoutButton v-if="isAuthenticated" />
</template>

<script setup>
import LogoutButton from '@/components/LogoutButton.vue';
import { useAuthStore } from '@/stores/auth';
const { isAuthenticated } = useAuthStore()
</script>
