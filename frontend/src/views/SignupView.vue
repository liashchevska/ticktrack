<template>
  <AuthLayout>
    <template #header>Sign up</template>
    <BaseForm :schema="validationSchema" :action="auth.signup" :onSuccess="onSuccess">
      <template #fields>
        <BaseField name="email" type="email" />
        <BaseField name="password" type="password" />
        <BaseField name="passwordConfirmation" type="password">Confirm password</BaseField>
      </template>
      <template #actions>
        <button class="btn btn--primary" type="submit">Signup</button>
        <DemoLogin />
      </template>
    </BaseForm>
    <template #footer>
      <RouterLink @click="auth.resetFlows" :to="{ name: 'login' }">Log in</RouterLink>
    </template>
  </AuthLayout>
</template>


<script setup>
import { useAuthStore } from '@/stores/auth';
import { object } from 'yup';
import BaseForm from '@/components/Base/BaseForm.vue';
import BaseField from '@/components/Base/BaseField.vue';
import { useRouter } from 'vue-router';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { RouterLink } from 'vue-router';
import { emailRule, passwordRule, passwordConfirmationRule } from '@/utils/validationRules';
import DemoLogin from '@/components/Base/DemoLogin.vue';

const validationSchema = object({
  email: emailRule,
  password: passwordRule,
  passwordConfirmation: passwordConfirmationRule,
})

const auth = useAuthStore()
const router = useRouter()

const onSuccess = () => {
  router.push({ name: 'email-verify' })
}
</script>
