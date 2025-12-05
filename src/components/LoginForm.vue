<template>
  <form @submit.prevent="onSubmit">
    Email:
    <input v-model="email" v-bind="emailAttrs" />
    <div>{{ errors.email }}</div>
    Password:
    <input v-model="password" v-bind="passwordAttrs" />
    <div>{{ errors.password }}</div>
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { object, string } from 'yup'

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    object({
      email: string().required().email(),
      password: string().required().min(4)
    })
  )
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(values => {
  console.log(values)
})
</script>
