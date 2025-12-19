<template>
  <form @submit.prevent="onSubmit">
    <CustomField name="email" type="email" />
    <CustomField name="password" type="password" />
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { useForm } from 'vee-validate';
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { groupErrorsByParam } from '@/utils/request';
import router from '@/router';
import { object, string } from 'yup';
import CustomField from '@/components/CustomField.vue';

const auth = useAuthStore()
const { handleSubmit, setFieldError } = useForm({
  validationSchema: object({
    email: string().required().email(),
    password: string().required()
  })
})
const backendErrors = ref([])

const onSubmit = handleSubmit(async values => {
  try {
    await auth.login(values)
    if (auth.isVerificationPending) {
      router.push('email/verify')
      return
    }
    router.push('/')
  } catch (errors) {
    backendErrors.value = groupErrorsByParam(errors)
    for (var field of Object.keys(values)) {
      setFieldError(field, backendErrors.value[field])
    }
  }
})

</script>
