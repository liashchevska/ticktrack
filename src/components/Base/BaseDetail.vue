<template>
  <!-- <slot name="header"></slot> -->
  <slot></slot>
  <slot name="actions">
    <button @click="emit('delete')">Delete</button>
  </slot>

</template>

<script setup>
const emit = defineEmits(['delete'])
</script>
