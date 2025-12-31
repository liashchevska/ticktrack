<template>
  <div>Home Page</div>
  <LogoutButton v-if="auth.isAuthenticated" />

  <BaseList :item-list="boards.boardList" @itemClicked="openBoardView" />
  <BoardForm />
  <RouterView />
</template>

<script setup>

import BaseList from '@/components/BaseList.vue';
import BoardForm from '@/components/Board/BoardForm.vue';
import LogoutButton from '@/components/LogoutButton.vue';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { useBoardsStore } from '@/stores/board';
import { RouterView } from 'vue-router';

const auth = useAuthStore()
const boards = useBoardsStore()

function openBoardView(id) {
  router.push(`/${id}`)
}
</script>
