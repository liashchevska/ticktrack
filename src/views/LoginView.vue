<template>
  <form @submit.prevent="onSubmit">
    <CustomField name="email" type="email" />
    <CustomField name="password" type="password" />
    <button type="submit">Submit</button>
  </form>
  <button @click="requestPasswordReset">Forgot password?</button>
</template>

<script setup>
import { useForm } from 'vee-validate';
import { useAuthStore } from '@/stores/auth'
import router from '@/router';
import { object, string } from 'yup';
import CustomField from '@/components/CustomField.vue';
import { useBackendErrors } from '@/composables/useBackendErrors';

const auth = useAuthStore()
const { handleSubmit, setFieldError } = useForm({
  validationSchema: object({
    email: string().required().email(),
    password: string().required()
  })
})
const { setErrors } = useBackendErrors()

const onSubmit = handleSubmit(async values => {
  try {
    await auth.login(values)
    if (auth.isVerificationPending) {
      router.push('email/verify')
      return
    }
    router.push('/')
  } catch (errors) {
    setErrors(errors, setFieldError)
  }
})
function requestPasswordReset() {
  router.push('/password/request')
}
</script>
