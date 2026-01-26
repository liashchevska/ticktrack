<template>
  <Transition>
    <div v-if="isOpen" @click.self="close">
      <div class="modal"> <!-- modal content -->
        <header class="modal-header">
          <h2 class="modal-title"> {{ title }} </h2>
          <button class="modal-close" @click="isOpen = false">✕</button>
        </header>
        <main class="modal-body">
          <slot></slot>
        </main>
      </div>
    </div>
  </Transition>
</template>
<script setup>

defineProps({
  title: { type: String, required: false }
})
const isOpen = defineModel()
</script>
