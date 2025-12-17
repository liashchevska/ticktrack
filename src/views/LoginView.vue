<template>
  <form @submit.prevent="onSubmit">
    <AuthFields />
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import AuthFields from '@/components/AuthFields.vue';
import { useForm } from 'vee-validate';
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { groupErrorsByParam } from '@/utils/request';
import router from '@/router';

const auth = useAuthStore()
const { handleSubmit, setFieldError } = useForm()
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
