<template>
  <BaseForm :schema="validationSchema" :action="auth.verifyEmail" :onSuccess="onSuccess">
    <template #fields>
      <BaseField name="key" type="text" />
    </template>
    <template #actions>
      <button class="btn" type="submit">Verify</button>
    </template>
  </BaseForm>
  <button class="btn" @click="auth.resendVerificationCode">Resend verification code</button>
</template>

<script setup>
import BaseField from '@/components/Base/BaseField.vue';
import { useAuthStore } from '@/stores/auth';
import { object, string } from 'yup';
import BaseForm from '@/components/Base/BaseForm.vue';
import { useRouter } from 'vue-router';

const validationSchema = object({
  key: string().required()
})
const auth = useAuthStore()
const router = useRouter()

const onSuccess = () => {
  router.push({ name: 'home' })
}
</script>
