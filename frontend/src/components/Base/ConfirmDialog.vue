<template>
  <BaseModal v-model="isOpen" :title="props.title">
    <p>{{ props.message }}</p>
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
  message: {
    type: String,
    default: 'Are you sure?'
  }
})
const emit = defineEmits(['confirm'])
function confirm() {
  emit('confirm')
  isOpen.value = false
}
</script>
