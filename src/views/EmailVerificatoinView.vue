<template>
  <form @submit.prevent="onSubmit">
    <CustomField name="key" type="text" />
    <button type="submit">Verify</button>
  </form>
  <button @click="auth.resendVerificationCode">Resend verification code</button>
</template>

<script setup>
import CustomField from '@/components/CustomField.vue';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { useBackendErrors } from '@/composables/useBackendErrors';
import { useForm } from 'vee-validate';
import { string } from 'yup';

const auth = useAuthStore()
const { setErrors } = useBackendErrors()
const { handleSubmit, setFieldError } = useForm({
  validationSchema: {
    key: string().required()
  }
})

const onSubmit = handleSubmit(async values => {
  try {
    await auth.verifyEmail(values)
    router.push('/')
  } catch (errors) {
    setErrors(errors, setFieldError)
  }
})
</script>
