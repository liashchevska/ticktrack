<template>
  <BaseForm :schema="validationSchema" :action="auth.signup" :onSuccess="onSuccess">
    <template #fields>
      <BaseField name="name" type="text" />
      <BaseField name="email" type="email" />
      <BaseField name="password" type="password" />
    </template>
    <template #actions>
      <button class="btn btn--primary" type="submit">Signup</button>
    </template>
  </BaseForm>
</template>


<script setup>
import { useAuthStore } from '@/stores/auth';
import { object, string } from 'yup';
import BaseForm from '@/components/Base/BaseForm.vue';
import BaseField from '@/components/Base/BaseField.vue';
import { useRouter } from 'vue-router';

const validationSchema = object({
  name: string().required(),
  email: string().required().email(),
  password: string().required()
})

const auth = useAuthStore()
const router = useRouter()

const onSuccess = () => {
  router.push({ name: 'email-verify' })
}
</script>
