<template>
  <nav class="board-list" aria-label="Board list navigation">
    <div class="board-list__header">
      <h1> {{ activeBoard.title }}</h1>
<!-- <button @click="isCreateOpen = true">Create board</button> -->
    </div>
    <BaseList :item-list="boardList" @itemClicked="openBoardView" v-show="isOpen">
      <template #default="{ item }">
        <div :class="{ 'board-list__active-board': item.id === activeBoard.id }"> {{ item.title }}
</div>
      </template>
    </BaseList>
        <BoardFormModal v-model="isCreateOpen" @created="isCreateOpen = false" title="Create" />
  </nav>
</template>


<script setup>
import { useRouter } from 'vue-router'
import { useBoardStore } from '@/stores/board'
import { useActiveBoard } from '@/composables/useActiveBoard'
import BaseList from '@/components/Base/BaseList.vue'
import BoardFormModal from '@/components/Board/BoardFormModal.vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const isOpen = ref(true)
const isCreateOpen = ref(false)
const router = useRouter()
const boardStore = useBoardStore()
const { boardList } = storeToRefs(boardStore)
const { activeBoard } = useActiveBoard()

function openBoardView(id) {
  router.push({ name: 'board-detail', params: { id } })
}
// function onBoardCreated()
</script>
