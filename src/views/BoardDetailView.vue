<template>
  <template v-if="boardStore.currentBoard">
    <BoardDetail :board="boardStore.currentBoard" />
    <BoardForm :board="boardStore.currentBoard" />
  </template>
</template>

<script setup>
import BoardDetail from '@/components/Board/BoardDetail.vue'
import BoardForm from '@/components/Board/BoardForm.vue'
import { useBoardsStore } from '@/stores/board'
import { watch, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const boardStore = useBoardsStore()

watch(() => route.params.id, boardStore.fetchBoard, { immediate: true })
onBeforeUnmount(() => { boardStore.resetCurrentBoard() })
</script>
