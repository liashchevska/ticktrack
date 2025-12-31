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
import { useBoardsStore } from '@/stores/board'
import { object, string } from 'yup'
import { computed } from 'vue'

// import { useAuthStore } from '@/stores/auth'
// const auth = useAuthStore()
const { createBoard, updateBoard } = useBoardsStore()

const props = defineProps({
  board: {
    type: Object,
    default: null
  }
})

const isInUpdateMode = computed(() => Boolean(props.board))
const action = computed(() => isInUpdateMode.value ? updateBoard : createBoard)

const boardValidationSchema = object({
  name: string().required()
})

function onSuccess() { }

</script>
