<template>
  <BaseForm :schema="validationSchema" :action="auth.resetPassword" :onSuccess="onSuccess">
    <template #fields>
      <BaseField name="key" type="text">Code:</BaseField>
      <BaseField name="password" type="password">New password:</BaseField>
    </template>
    <template #actions>
      <button type="submit">Reset password</button>
    </template>
  </BaseForm>
</template>
<script setup>
import { useAuthStore } from '@/stores/auth';
import BaseField from './BaseField.vue';
import BaseForm from './BaseForm.vue';
import router from '@/router';
import { object, string } from 'yup';

const validationSchema = object({
  key: string().required(),
  password: string().required()
})
const auth = useAuthStore()
const onSuccess = () => {
  router.push('/login')
}
</script>
