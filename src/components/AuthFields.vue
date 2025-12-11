<template>
  Email:
  <input v-model="email" />
  <div v-if="emailErrors">{{ emailErrors }}</div>
  Password:
  <input type="password" v-model="password" />
  <div v-if="passwordErrors">{{ passwordErrors }}</div>
</template>

<script setup>
import { useField } from 'vee-validate';
import { string } from 'yup';

const { value: email, errors: emailErrors } = useField('email', string().required().email())
const { value: password, errors: passwordErrors } = useField('password', string().required())

</script>

<style>
input {
  display: block;
}
</style>
