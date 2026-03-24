<template>
  <BaseModal v-model="isOpen" :title="props.title">
    <slot name="message">Are you sure?</slot>

    <template #actions>
      <button class="btn btn--primary" @click="confirm">Confirm</button>
    </template>
  </BaseModal>

</template>

<script setup>
import BaseModal from './BaseModal.vue';
const isOpen = defineModel()
const props = defineProps({
  title: {
    type: String,
    default: 'Confirm action'
  },
})
const emit = defineEmits(['confirm'])
function confirm() {
  emit('confirm')
  isOpen.value = false
}
</script>
