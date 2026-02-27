<template>
  <BaseModal v-model="isOpen" :title="props.title">
    <BaseForm :id="formId" :schema="ticketValidationSchema" :action="action" :initial-values="props.ticket"
      :on-success="() => emit(successEvent)">
      <template #fields>
        <BaseField name="title" type="text">Title:</BaseField>
        <BaseField name="description" as="textarea" type="text">description:</BaseField>
        <BaseField v-if="ticket" name="status" as="select">
          <template #field-content>
            <option v-for="(label, value) in ticketStatusList" :key="value" :value="value">
              {{ label }}
            </option>
          </template>
        </BaseField>
      </template>
      <template #actions>
        <Teleport defer to=".modal__footer">
          <button class="btn" type="submit" :form="formId">Submit</button>
        </Teleport>
      </template>
    </BaseForm>
  </BaseModal>
</template>

<script setup>
import { toRef, computed } from 'vue'
import { object, string } from 'yup'
import BaseForm from '../Base/BaseForm.vue'
import BaseModal from '../Base/BaseModal.vue'
import BaseField from '../Base/BaseField.vue'
import { useEntityForm } from '@/composables/useEntityForm'
import { useTicketStore } from '@/stores/ticket'
import { useRoute } from 'vue-router'
import { useTicketStatusList } from '@/composables/useTicketStatusList'

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

const emit = defineEmits(['created', 'updated'])
const isOpen = defineModel('modelValue')

const { ticketStatusList } = useTicketStatusList()
const ticketValidationSchema = object({
  title: string().required(),
  description: string().required(),
  status: string()
})
const { createTicket, updateTicket } = useTicketStore()
const route = useRoute()
const currentBoardId = route.params.id
const { isInUpdateMode, action, successEvent } = useEntityForm({
  entity: toRef(props, 'ticket'),
  createAction: (values) => { createTicket(currentBoardId, values) },
  updateAction: updateTicket
})
const formId = computed(() => isInUpdateMode.value ? 'ticketUpdate' : 'ticketCreate')

</script>
