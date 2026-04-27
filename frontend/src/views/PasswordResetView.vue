<template>
  <AuthLayout>
    <template #header>
      <p>Forgot password?</p>
      <small v-if="step === 'reset'">
        If an account exists for this email, you'll receive a code shortly.
      </small>
      <small v-if="isCodeExpired">
        Previous code expired, please try again.
      </small>
    </template>

    <BaseForm :key="step" :schema="validationSchema" :action="submit" :onSuccess="onSuccess"
      :initialValues="isCodeExpired ? { email: recoveryEmail } : {}">
      <template #fields>
        <BaseField v-if="step === 'request'" name="email" type="email">
          Send recovery code to:
        </BaseField>

        <template v-else>
          <BaseField name="key" type="text">Recovery code</BaseField>
          <BaseField name="password" type="password">New password</BaseField>
          <BaseField name="passwordConfirmation" type="password">Confirm password</BaseField>
        </template>
      </template>

      <template #actions>
        <button class="btn btn--primary" type="submit">
          {{ step === 'request' ? 'Send code' : 'Reset password' }}
        </button>
      </template>
    </BaseForm>

    <template #footer>
      <RouterLink @click="auth.resetFlows" :to="{ name: 'login' }">Return to log in</RouterLink>
    </template>
  </AuthLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { object } from 'yup'
import BaseForm from '@/components/Base/BaseForm.vue'
import BaseField from '@/components/Base/BaseField.vue'
import { useRouter } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { codeRule, emailRule, passwordConfirmationRule, passwordRule } from '@/utils/validationRules'

const router = useRouter()
const isCodeExpired = ref(false)
const recoveryEmail = ref('')
const auth = useAuthStore()
const step = computed(() => auth.isPasswordResetPending ? 'reset' : 'request')

const requestSchema = object({
  email: emailRule,
})

const resetSchema = object({
  key: codeRule,
  password: passwordRule,
  passwordConfirmation: passwordConfirmationRule,
})

const validationSchema = computed(() => {
  return step.value === 'request' ? requestSchema : resetSchema
})

async function submit(values) {
  let result
  const stepAtSubmit = step.value

  if (stepAtSubmit === 'request') {
    recoveryEmail.value = values.email
    isCodeExpired.value = false
    result = await auth.requestPasswordReset(values)
  } else {
    result = await auth.resetPassword(values)
  }
  return { ...result, ...{ stepAtSubmit } }
}

function onSuccess(result) {
  const { stepAtSubmit, status } = result
  if (stepAtSubmit !== 'reset') return

  if (status == "409") {
    isCodeExpired.value = true
    return
  }

  router.push({ name: 'home', params: { id: '' } })
}
</script>
