<template>
  <AuthLayout>
    <template #header> Verify your email </template>

    <template #default>
      <BaseForm :schema="validationSchema" :action="auth.verifyEmail" :onSuccess="onSuccess">
        <template #fields>
          <BaseField name="key" type="text">Verification code</BaseField>
        </template>
        <template #actions>
          <button class="btn btn--primary" type="submit">Verify</button>
          <button class="btn btn--secondary" @click="auth.resendVerificationCode">Resend verification code</button>
        </template>
      </BaseForm>
    </template>

    <template #footer>
      <RouterLink :to="{ name: 'login' }">Log in</RouterLink>
    </template>
  </AuthLayout>
</template>

<script setup>
import BaseField from '@/components/Base/BaseField.vue';
import { useAuthStore } from '@/stores/auth';
import { object } from 'yup';
import BaseForm from '@/components/Base/BaseForm.vue';
import { useRouter } from 'vue-router';
import { codeRule } from '@/utils/validationRules';
import AuthLayout from '@/layouts/AuthLayout.vue';

const validationSchema = object({
  key: codeRule
})
const auth = useAuthStore()
const router = useRouter()

const onSuccess = () => {
  router.push({ name: 'home' })
}
</script>
