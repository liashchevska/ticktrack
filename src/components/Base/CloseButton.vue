<template>
  <button class="icon-button" @click="model = false">
    <CloseIcon class="icon-button__icon" />
  </button>
</template>

<script setup>
import CloseIcon from '@/assets/icons/close-x-svgrepo-com.svg?component'

const model = defineModel()
</script>

<style lang="css">
.icon-button {
  font-size: var(--font-size-xl);
  width: var(--font-size-xl);
  height: var(--font-size-xl);
  background: none;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.icon-button__icon {
  width: 1em;
  height: 1em;
  display: block;
}
</style>
