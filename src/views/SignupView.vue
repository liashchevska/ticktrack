<template>
  <form @submit.prevent="onSubmit">
    <CustomField name="name" type="text" />
    <CustomField name="email" type="email" />
    <CustomField name="password" type="password" />
    <button type="submit">Submit</button>
  </form>
</template>


<script setup>
import { useForm } from 'vee-validate';
import { useAuthStore } from '@/stores/auth';
import { object, string } from 'yup';
import router from '@/router';
import CustomField from '@/components/CustomField.vue';
import { useBackendErrors } from '@/composables/useBackendErrors';

const auth = useAuthStore()
const { setErrors } = useBackendErrors()
const { handleSubmit, setFieldError } = useForm({
  validationSchema: object({
    name: string().required(),
    email: string().required().email(),
    password: string().required()
  })
})

const onSubmit = handleSubmit(async values => {
  try {
    await auth.signup(values)
    router.push('/email/verify')
  } catch (errors) {
    setErrors(errors, setFieldError)
  }
})
</script>
