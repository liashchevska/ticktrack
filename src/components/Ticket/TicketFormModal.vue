<template>
  <BaseModal v-model="isOpen" :title="props.title">
    <BaseForm ref="baseForm" :schema="ticketValidationSchema" :action="action" :initial-values="props.ticket"
      :on-success="onSuccess">
      <template #fields>
        <BaseField name="title" type="text">Title:</BaseField>
        <BaseField name="description" type="text">description:</BaseField>
      </template>
      <template #actions>
        <button type="submit">Submit</button>
      </template>
    </BaseForm>
  </BaseModal>
</template>

<script setup>
import { toRef, useTemplateRef } from 'vue'
import { object, string } from 'yup'
import BaseForm from '../Base/BaseForm.vue'
import BaseModal from '../Base/BaseModal.vue'
import BaseField from '../Base/BaseField.vue'
import { useEntityForm } from '@/composables/useEntityForm'
import { useTicketStore } from '@/stores/ticket'
import { useRoute } from 'vue-router'

const props = defineProps({
  ticket: {
    type: Object,
    default: null
  },
  title: {
    type: String,
    default: ''
  }
})

const isOpen = defineModel('modelValue')

const ticketValidationSchema = object({
  title: string().required(),
  description: string().required(),
  // board_id:
})
const { createTicket, updateTicket } = useTicketStore()
const route = useRoute()
const currentBoardId = route.params.id
const { action, successEvent } = useEntityForm({
  entity: toRef(props, 'ticket'),
  createAction: (values) => { createTicket(currentBoardId, values) },
  updateAction: updateTicket
})

const baseFormRef = useTemplateRef('baseForm')
const emit = defineEmits(['created', 'updated'])

function onSuccess() {
  baseFormRef.value.resetForm()
  emit(successEvent.value)
}

</script>
