<template>
  {{ props.name }}
  <input v-model="value" :type="props.type" />
  <div v-if="errors.length"> {{ errors }} </div>
</template>

<script setup>
import { useField } from 'vee-validate';

const props = defineProps(['name', 'type'])
const { value, errors } = useField(() => props.name)

</script>

<style lang="css">
input {
  display: block;
}
</style>
