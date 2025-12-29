<template>
  <div>Home Page</div>
  <LogoutButton v-if="auth.isAuthenticated" />
  <button @click="boards.fetchBoardList">Get!</button>

  <BaseList :item-list="boards.boardList" @itemClicked="openBoardView" />
  <BaseForm :schema="boardValidationSchema" :action="boards.createBoard" :on-success="onBoardCreated">
    <template #fields>
      <BaseField name="name" type="text">Name:</BaseField>
    </template>
    <template #actions>
      <button type="submit">Create board</button>
    </template>
  </BaseForm>

  <RouterView />
</template>

<script setup>
import BaseField from '@/components/Base/BaseField.vue';
import BaseForm from '@/components/Base/BaseForm.vue';
import BaseList from '@/components/BaseList.vue';
import LogoutButton from '@/components/LogoutButton.vue';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { useBoardsStore } from '@/stores/board';
import { RouterView } from 'vue-router';
import { object, string } from 'yup';


const boardValidationSchema = object({
  name: string().required()
})

const auth = useAuthStore()
const boards = useBoardsStore()

function openBoardView(id) {
  router.push(`/${id}`)
}

function onBoardCreated() {
  openBoardView(boards.currentBoard.id)
}
</script>
