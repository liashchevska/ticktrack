<template>
  <div>Update mode: {{ isInUpdateMode }}</div>
  <BaseForm ref="baseForm" :schema="boardValidationSchema" :action="action" :initial-values="props.board"
    :on-success="onSuccess">
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
import { useEntityForm } from '@/composables/useEntityForm'
import { toRef, useTemplateRef } from 'vue'

const { createBoard, updateBoard } = useBoardStore()

const props = defineProps({
  board: {
    type: Object,
    default: null
  }
})

const { isInUpdateMode, action } = useEntityForm({
  entity: toRef(props, 'board'),
  createAction: createBoard,
  updateAction: updateBoard
})

const boardValidationSchema = object({
  name: string().required()
})

const baseFormRef = useTemplateRef('baseForm')
const emit = defineEmits(['success'])
function onSuccess() {
  baseFormRef.value.resetForm()
  emit('success')
}

</script>
