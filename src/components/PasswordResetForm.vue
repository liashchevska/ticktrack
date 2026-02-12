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
import BaseField from './Base/BaseField.vue';
import BaseForm from './Base/BaseForm.vue';
import { object, string } from 'yup';
import { useRouter } from 'vue-router';

const validationSchema = object({
  key: string().required(),
  password: string().required()
})
const router = useRouter()
const auth = useAuthStore()

const onSuccess = () => {
  router.push({ name: 'login' })
}
</script>
