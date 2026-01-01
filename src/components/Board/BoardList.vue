<template>
  <BaseList :item-list="props.boardList" @itemClicked="openBoardView" />
  <BoardForm />
</template>


<script setup>
import { useRouter } from 'vue-router'
import BaseList from '../BaseList.vue'
import BoardForm from './BoardForm.vue'

const router = useRouter()
const props = defineProps({
  boardList: { type: Array, required: true }
})

function openBoardView(id) {
  router.push(`/boards/${id}`)
}
</script>
