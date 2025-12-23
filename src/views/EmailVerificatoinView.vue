<template>
  <BaseForm :schema="validationSchema" :action="auth.verifyEmail" :onSuccess="onSuccess">
    <template #fields>
      <BaseField name="key" type="text" />
    </template>
    <template #actions>
      <button type="submit">Verify</button>
    </template>
  </BaseForm>
  <button @click="auth.resendVerificationCode">Resend verification code</button>
</template>

<script setup>
import BaseField from '@/components/BaseField.vue';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { object, string } from 'yup';
import BaseForm from '@/components/BaseForm.vue';

const validationSchema = object({
  key: string().required()
})
const auth = useAuthStore()
const onSuccess = () => {
  router.push('/')
}
</script>
