<template>
  <form @submit.prevent="onSubmit">
    <CustomField name="name" type="text" />
    <CustomField name="email" type="email" />
    <CustomField name="password" type="password" />
    <button type="submit">Submit</button>
  </form>
</template>


<script setup>
import { useForm } from 'vee-validate';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue'
import { object, string } from 'yup';
import { groupErrorsByParam } from '@/utils/request';
import router from '@/router';
import CustomField from '@/components/CustomField.vue';

const auth = useAuthStore()
const { handleSubmit, setFieldError } = useForm({
  validationSchema: object({
    name: string().required(),
    email: string().required().email(),
    password: string().required()
  })
})

const backendErrors = ref({})
const onSubmit = handleSubmit(async values => {
  try {
    await auth.signup(values)
    router.push('/email/verify')
  } catch (errors) {
    backendErrors.value = groupErrorsByParam(errors)
    for (var field of Object.keys(values)) {
      setFieldError(field, backendErrors.value[field])
    }
  }
})
</script>
