<template>
  <BaseForm v-if="!auth.isPasswordResetPending" :schema="validationSchema" :action="auth.requestPasswordReset">
    <template #fields>
      <BaseField name="email" type="email">Email: </BaseField>
    </template>
  </BaseForm>
  <PasswordResetForm v-else />

</template>

<script setup>
import BaseField from '@/components/BaseField.vue';
import BaseForm from '@/components/BaseForm.vue';
import PasswordResetForm from '@/components/PasswordResetForm.vue';
import { useAuthStore } from '@/stores/auth';
import { object, string } from 'yup';

const auth = useAuthStore()

const validationSchema = object({
  email: string().required().email(),
})

</script>
