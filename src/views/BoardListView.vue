<template>
  <BaseList :item-list="boardList" @itemClicked="openBoardView">
    <template #default="{ item }">
      <span>{{ item.name }}</span>
    </template>
  </BaseList>
  <BoardFormModal v-model="isCreateOpen" @created="boardStore.fetchBoardList" title="Create" />
</template>


<script setup>
import { useRouter } from 'vue-router'
import { useBoardStore } from '@/stores/board'
import BaseList from '@/components/Base/BaseList.vue'
import BoardFormModal from '@/components/Board/BoardFormModal.vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const isCreateOpen = ref(false)
const router = useRouter()
const boardStore = useBoardStore()
const { boardList } = storeToRefs(boardStore)

function openBoardView(id) {
  router.push(`/boards/${id}`)
}
</script>
