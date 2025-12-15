<template>
  <form @submit.prevent="onSubmit">
    Email verification code:
    <input v-model="value" />
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <button type="submit">Verify</button>
  </form>
</template>

<script setup>
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { useForm } from 'vee-validate';
import { useField } from 'vee-validate';
import { string } from 'yup';

const auth = useAuthStore()
const { handleSubmit, setFieldError } = useForm()
const { value, errorMessage } = useField('key', string().required())

const onSubmit = handleSubmit(async values => {
  try {
    await auth.verifyEmail(values)
    router.push('/')
  } catch (errors) {
    setFieldError('key', errors[0]?.message)
  }
})
</script>
