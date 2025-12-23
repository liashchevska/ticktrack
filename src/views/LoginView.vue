<template>
  <BaseForm :schema="validationSchema" :action="auth.login" :onSuccess="onSuccess">
    <template #fields>
      <BaseField name="email" type="email" />
      <BaseField name="password" type="password" />
    </template>
    <template #actions>
      <button type="submit">Login</button>
    </template>
  </BaseForm>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import router from '@/router';
import { object, string } from 'yup';
import BaseField from '@/components/BaseField.vue';
import BaseForm from '@/components/BaseForm.vue';

const auth = useAuthStore()

const validationSchema = object({
  email: string().required().email(),
  password: string().required()
})

const onSuccess = () => {
  if (auth.isVerificationPending) {
    router.push('email/verify')
    return
  }
  router.push('/')
}
// <button @click="requestPasswordReset">Forgot password?</button>
// function requestPasswordReset() {
//   router.push('/password/request')
// }
</script>
