<template>
  <BaseList :item-list="props.boardList" @itemClicked="openBoardView">
    <template #default="{ item }">
      <span>{{ item.name }}</span>
    </template>
  </BaseList>
  <BoardForm />
</template>


<script setup>
import { useRouter } from 'vue-router'
import BaseList from '../Base/BaseList.vue'
import BoardForm from './BoardForm.vue'

const router = useRouter()
const props = defineProps({
  boardList: { type: Array, required: true }
})

function openBoardView(id) {
  router.push(`/boards/${id}`)
}
</script>
