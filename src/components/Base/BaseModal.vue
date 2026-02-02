<template>
  <Transition>
    <div v-if="isOpen" @click.self="isOpen = false">
      <div class="modal">
        <header class="modal__header">
          <h2 class="modal__title"> {{ title }} </h2>
          <button class="modal__close" @click="isOpen = false">✕</button>
        </header>
        <main class="modal__body">
          <slot></slot>
        </main>
        <footer class="modal__footer" v-if="$slots.actions">
          <slot name="actions"></slot>
        </footer>
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
