<template>
  <form @submit.prevent="onSubmit">
    <slot name="fields"></slot>
    <slot name="actions">
      <button type="submit">Submit</button>
    </slot>
  </form>
</template>

<script setup>
import { useBackendErrors } from '@/composables/useBackendErrors'
import { useFormSubmit } from '@/composables/useFormSubmit'
import { useForm } from 'vee-validate'
import { object } from 'yup'
import { watch } from 'vue'

const props = defineProps({
  schema: { type: object, required: true },
  action: { type: Function, required: true },
  onSuccess: { type: Function, required: false },
  initialValues: { type: Object, required: false }
})

const { setErrors } = useBackendErrors()
const { handleSubmit, setFieldError, resetForm } = useForm({
  validationSchema: props.schema,
  initialValues: props.initialValues
})

defineExpose({ resetForm })

const { submit } = useFormSubmit({
  onSuccess: props.onSuccess,
  onError: (errors) => { setErrors(errors, setFieldError) }
})

const onSubmit = handleSubmit(values => {
  submit({
    action: () => props.action(values)
  })
})

watch(() => props.initialValues, (values) => {
  resetForm({ values: values })
})
</script>
