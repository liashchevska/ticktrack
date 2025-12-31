<template>
  <div>Details about board no. {{ $route.params.id }}</div>
  <BoardForm :board="boards.currentBoard" />
</template>

<script setup>
import BoardForm from '@/components/Board/BoardForm.vue'
import { useBoardsStore } from '@/stores/board'
import { watch, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

const boards = useBoardsStore()
const route = useRoute()

watch(() => route.params.id, boards.fetchBoard, { immediate: true })
onBeforeUnmount(() => { boards.resetCurrentBoard() })
</script>
