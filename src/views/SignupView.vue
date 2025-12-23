<template>
  <BaseForm :schema="validationSchema" :action="auth.signup" :onSuccess="onSuccess">
    <template #fields>
      <BaseField name="name" type="text" />
      <BaseField name="email" type="email" />
      <BaseField name="password" type="password" />
    </template>
    <template #actions>
      <button type="submit">Signup</button>
    </template>
  </BaseForm>
</template>


<script setup>
import { useAuthStore } from '@/stores/auth';
import { object, string } from 'yup';
import router from '@/router';
import BaseForm from '@/components/BaseForm.vue';
import BaseField from '@/components/BaseField.vue';

const validationSchema = object({
  name: string().required(),
  email: string().required().email(),
  password: string().required()
})

const auth = useAuthStore()

const onSuccess = () => {
  router.push('/email/verify')
}
</script>
