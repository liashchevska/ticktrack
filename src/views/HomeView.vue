<template>
  <BoardList :board-list="boardStore.boardList" />
  <RouterView />
</template>

<script setup>
import BoardList from '@/components/Board/BoardList.vue';
import { useBoardStore } from '@/stores/board';
import { RouterView } from 'vue-router'

const boardStore = useBoardStore()

</script>
