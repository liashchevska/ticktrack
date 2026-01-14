<template>
  <template v-if="currentBoard">
    <BaseDetail @delete="deleteBoard">
      <BoardDetail :board="currentBoard" />
    </BaseDetail>
    <BoardFormModal v-model="isUpdateOpen" :board="currentBoard" @updated="boardStore.fetchBoardList" />
  </template>
</template>

<script setup>
import BaseDetail from '@/components/Base/BaseDetail.vue'
import BoardDetail from '@/components/Board/BoardDetail.vue'
import BoardFormModal from '@/components/Board/BoardFormModal.vue'
import { useBoardStore } from '@/stores/board'
import { storeToRefs } from 'pinia'
import { watch, onBeforeUnmount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const isUpdateOpen = ref(false)

const route = useRoute()
const router = useRouter()
const boardStore = useBoardStore()
const { currentBoard } = storeToRefs(boardStore)

async function deleteBoard() {
  await boardStore.deleteBoard(currentBoard.value.id)
  router.push('/boards')
}

watch(() => route.params.id, boardStore.fetchBoard, { immediate: true })
onBeforeUnmount(() => { boardStore.resetCurrentBoard() })
</script>
