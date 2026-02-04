<template>
  <Transition>
    <div v-if="isOpen" @click.self="isOpen = false" class="modal__backdrop">
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

<style lang="css">
.modal__backdrop {
  backdrop-filter: var(--filter-blur);
  position: fixed;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: var(--z-modal);
}

.modal {
  display: flex;
  flex-direction: column;
}

.modal__header {
  display: flex;
}

.modal__close {
  margin-left: auto;
}
</style>
