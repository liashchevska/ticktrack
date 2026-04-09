<template>
  <BaseModal v-model="isOpen" :title="props.title">
    <BaseForm :id="formId" :schema="boardValidationSchema" :action="action" :initial-values="props.board"
      :on-success="(result) => result.ok && emit(successEvent, result.data.id)">
      <template #fields>
        <BaseField name="title" type="text">title:</BaseField>
      </template>
      <template #actions>
        <Teleport defer to=".modal__footer">
          <button class="btn btn--primary" type="submit" :form="formId">Submit</button>
        </Teleport>
      </template>
    </BaseForm>
  </BaseModal>
</template>

<script setup>
import BaseField from '@/components/Base/BaseField.vue'
import BaseForm from '@/components/Base/BaseForm.vue'
import { useBoardStore } from '@/stores/board'
import { object } from 'yup'
import { useEntityForm } from '@/composables/useEntityForm'
import { toRef, computed } from 'vue'
import BaseModal from '../Base/BaseModal.vue'
import { titleRule } from '@/utils/validationRules'

const { createBoard, updateBoard } = useBoardStore()
const emit = defineEmits(['created', 'updated'])
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

const { isInUpdateMode, action, successEvent } = useEntityForm({
  entity: toRef(props, 'board'),
  createAction: createBoard,
  updateAction: updateBoard
})
const formId = computed(() => isInUpdateMode.value ? 'boardUpdate' : 'boardCreate')

const boardValidationSchema = object({
  title: titleRule,
})

</script>
