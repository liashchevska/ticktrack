<template>
  <AuthLayout>
    <template #header>Login</template>
    <BaseForm :schema="validationSchema" :action="auth.login" :onSuccess="onSuccess">
      <template #fields>
        <BaseField name="email" type="email" />
        <BaseField name="password" type="password" />
      </template>
      <template #actions>
        <button class="btn btn--primary" type="submit">Login</button>
      </template>
    </BaseForm>
    <template #footer>
      <RouterLink :to="{ name: 'password-reset' }">Reset password</RouterLink>
      <RouterLink :to="{ name: 'signup' }">Sign up</RouterLink>
    </template>
  </AuthLayout>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import router from '@/router';
import { object, string } from 'yup';
import BaseField from '@/components/Base/BaseField.vue';
import BaseForm from '@/components/Base/BaseForm.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

const auth = useAuthStore()

const validationSchema = object({
  email: string().required().email(),
  password: string().required()
})

const onSuccess = () => {
  if (auth.isVerificationPending) {
    router.push({ name: 'email-verify' })
    return
  }
  router.push({ name: 'home' })
}
</script>
