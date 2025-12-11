<template>
  <form @submit.prevent="onSubmit">
    Name:
    <input v-model="name" />
    <div v-if="nameErrors">{{ nameErrors }}</div>
    <AuthFields />
    <button type="submit">Submit</button>
  </form>
</template>


<script setup>
import AuthFields from '@/components/AuthFields.vue';
import { useForm, useField } from 'vee-validate';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue'
import { string } from 'yup';
import { groupErrorsByParam } from '@/utils/request';

const auth = useAuthStore()
const { handleSubmit, setFieldError } = useForm()

const { value: name, errors: nameErrors } = useField('name', string().required())
const backendErrors = ref({})
const onSubmit = handleSubmit(async values => {
  try {
    await auth.signup(values)
  } catch (errors) {
    backendErrors.value = groupErrorsByParam(errors)
    for (var field of Object.keys(values)) {
      setFieldError(field, backendErrors.value[field])
    }
  }
})
</script>
