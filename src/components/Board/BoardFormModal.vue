<template>
  <BaseModal v-model="isOpen" :title="props.title">
    <BaseForm ref="baseForm" :schema="boardValidationSchema" :action="action" :initial-values="props.board"
      :on-success="onSuccess">
      <template #fields>
        <BaseField name="title" type="text">title:</BaseField>
      </template>
      <template #actions>
        <button type="submit">Submit</button>
      </template>
    </BaseForm>
  </BaseModal>
</template>

<script setup>
import BaseField from '@/components/Base/BaseField.vue'
import BaseForm from '@/components/Base/BaseForm.vue'
import { useBoardStore } from '@/stores/board'
import { object, string } from 'yup'
import { useEntityForm } from '@/composables/useEntityForm'
import { toRef, useTemplateRef } from 'vue'
import BaseModal from '../Base/BaseModal.vue'

const { createBoard, updateBoard } = useBoardStore()
const isOpen = defineModel('modelValue')
const props = defineProps({
  board: {
    type: Object,
    default: null
  },
  title: {
    type: String,
    default: ''
  }
})

const { action, successEvent } = useEntityForm({
  entity: toRef(props, 'board'),
  createAction: createBoard,
  updateAction: updateBoard
})

const boardValidationSchema = object({
  title: string().required(),
  description: string().required()
})

const baseFormRef = useTemplateRef('baseForm')
const emit = defineEmits(['created', 'updated'])

function onSuccess() {
  baseFormRef.value.resetForm()
  emit(successEvent.value)
}

</script>
