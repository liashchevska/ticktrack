<template>
  <BaseForm :schema="validationSchema" :action="auth.verifyEmail" :onSuccess="onSuccess">
    <template #fields>
      <BaseField name="key" type="text" />
    </template>
    <template #actions>
      <button class="btn btn--primary" type="submit">Verify</button>
    </template>
  </BaseForm>
  <button class="btn btn--primary" @click="auth.resendVerificationCode">Resend verification code</button>
</template>

<script setup>
import BaseField from '@/components/Base/BaseField.vue';
import { useAuthStore } from '@/stores/auth';
import { object } from 'yup';
import BaseForm from '@/components/Base/BaseForm.vue';
import { useRouter } from 'vue-router';
import { codeRule } from '@/utils/validationRules';

const validationSchema = object({
  key: codeRule
})
const auth = useAuthStore()
const router = useRouter()

const onSuccess = () => {
  router.push({ name: 'home' })
}
</script>
