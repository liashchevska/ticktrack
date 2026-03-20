<template>
  <AuthLayout>
    <template #header>
      <p>Forgot password?</p>
      <small v-if="step === 'reset'">
        Recovery code was sent to {{ recoveryEmail }}.
        Enter it below
      </small>
    </template>

    <BaseForm :schema="validationSchema" :action="submit">
      <template #fields>
        <BaseField v-if="step === 'request'" name="email" type="email">
          Send recovery code to:
        </BaseField>

        <template v-else>
          <BaseField name="key" type="text">Recovery code:</BaseField>
          <BaseField name="password" type="password">New password:</BaseField>
        </template>
      </template>

      <template #actions>
        <button class="btn btn--primary" type="submit">
          {{ step === 'request' ? 'Send code' : 'Reset password' }}
        </button>
      </template>
    </BaseForm>

    <template #footer>
      <RouterLink :to="{ name: 'login' }">Return to log in</RouterLink>
    </template>
  </AuthLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { object } from 'yup'
import BaseForm from '@/components/Base/BaseForm.vue'
import BaseField from '@/components/Base/BaseField.vue'
import { useRouter } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { codeRule, emailRule, passwordRule } from '@/utils/validationRules'

const router = useRouter()
const auth = useAuthStore()
const step = computed(() => auth.isPasswordResetPending ? 'reset' : 'request')

const recoveryEmail = ref('')
const requestSchema = object({
  email: emailRule,
})

const resetSchema = object({
  key: codeRule,
  password: passwordRule
})

const validationSchema = computed(() => {
  return step.value === 'request' ? requestSchema : resetSchema
})

async function submit(values) {
  if (step.value === 'request') {
    recoveryEmail.value = values.email
    await auth.requestPasswordReset(values)
  } else {
    await auth.resetPassword(values)
    router.push({ name: 'login' })
  }
}
</script>
