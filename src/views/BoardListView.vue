<template>
  <BaseList :item-list="boardList" @itemClicked="openBoardView">
    <template #default="{ item }">
      <span>{{ item.name }}</span>
    </template>
  </BaseList>
  <BoardForm />
</template>


<script setup>
import { useRouter } from 'vue-router'
import { useBoardStore } from '@/stores/board'
import BaseList from '@/components/Base/BaseList.vue'
import BoardForm from '@/components/Board/BoardForm.vue'
import { storeToRefs } from 'pinia'

const router = useRouter()
const boardStore = useBoardStore()
const { boardList } = storeToRefs(boardStore)

function openBoardView(id) {
  router.push(`/boards/${id}`)
}
</script>
