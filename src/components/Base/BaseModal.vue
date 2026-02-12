<template>
  <Transition>
    <div v-if="isOpen" @click.self="isOpen = false" class="modal__backdrop">
      <div class="modal">
        <header class="modal__header">
          <h2 class="modal__title"> {{ title }} </h2>
          <button class="icon-button modal__close-btn" @click="isOpen = false">
            <CloseIcon class="icon-button__icon modal__close-icon" />
          </button>
        </header>
        <div class="modal__body">
          <slot></slot>
        </div>
        <footer class="modal__footer">
          <slot name="actions"></slot>
        </footer>
      </div>
    </div>
  </Transition>
</template>
<script setup>
import { onMounted, onUnmounted } from 'vue'
import CloseIcon from '@/assets/icons/close-x-svgrepo-com.svg?component'
defineProps({
  title: { type: String, required: false }
})
const isOpen = defineModel()

function closeOnEscape(event) {
  if (event.key !== 'Escape') return
  isOpen.value && (isOpen.value = false)
}
onMounted(() => window.addEventListener('keyup', closeOnEscape))
onUnmounted(() => window.removeEventListener('keyup', closeOnEscape))
</script>

<style lang="css">
.modal__backdrop {
  backdrop-filter: blur(3px);
  background-color: rgba(55, 55, 55, 0.5);
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

  max-width: 30rem;
  max-height: 90vh;
  width: 100%;

  transform: translateY(-10vh);
  background-color: var(--modal-background);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.modal__title {
  line-height: 1;
}

.modal__header {
  display: flex;
  align-items: center;
  padding: var(--space-sm);
}

.modal__body {
  padding: var(--space-sm);
  padding-bottom: 0;
  background-color: inherit;
}

.modal__footer {
  display: flex;
  justify-content: flex-end;
  padding: var(--space-sm);
  gap: var(--space-xs);
}

.modal__close-btn {
  margin-left: auto;
}

.modal__close-icon {
  transform: translateY(0.1em);
}
</style>
