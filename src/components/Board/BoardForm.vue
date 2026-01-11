<template>
  <div>Update mode: {{ isInUpdateMode }}</div>
  <BaseForm :schema="boardValidationSchema" :action="action" :initial-values="props.board" :on-success="onSuccess">
    <template #fields>
      <BaseField name="name" type="text">Name:</BaseField>
    </template>
    <template #actions>
      <button type="submit">Submit</button>
    </template>
  </BaseForm>
</template>

<script setup>
import BaseField from '@/components/Base/BaseField.vue'
import BaseForm from '@/components/Base/BaseForm.vue'
import { useBoardStore } from '@/stores/board'
import { object, string } from 'yup'
import { computed } from 'vue'

const { createBoard, updateBoard, fetchBoardList } = useBoardStore()

const props = defineProps({
  board: {
    type: Object,
    default: null
  }
})

const isInUpdateMode = computed(() => Boolean(props.board))
const action = computed(() => isInUpdateMode.value ? updateBoardWrapper : createBoard)

const boardValidationSchema = object({
  name: string().required()
})

function updateBoardWrapper(values) {
  return updateBoard(props.board.id, values)
}
async function onSuccess() {
  await fetchBoardList()
}

</script>
