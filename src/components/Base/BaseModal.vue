<template>
  <Transition>
    <div v-if="isOpen" @click.self="isOpen = false" class="modal__backdrop">
      <div class="modal">
        <header class="modal__header">
          <h2 class="modal__title"> {{ title }} </h2>
          <IconButton @click="isOpen = false">
            <CloseIcon class="icon-button__icon" />
          </IconButton>
        </header>
        <div class="modal__body">
          <slot></slot>
        </div>
        <footer class="modal__footer">
          <slot name="actions"></slot>
          <button class="btn modal__cancel" @click="isOpen = false">Cancel</button>
        </footer>
      </div>
    </div>
  </Transition>
</template>
<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import CloseIcon from '@/assets/icons/close-x-svgrepo-com.svg?component'
import IconButton from './IconButton.vue'

defineProps({
  title: { type: String, required: false }
})
const isOpen = defineModel()

function closeOnEscape(event) {
  if (event.key !== 'Escape') return
  isOpen.value && (isOpen.value = false)
}

watch(isOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  window.addEventListener('keydown', closeOnEscape)
})

onUnmounted(() => {
  window.removeEventListener('keydown', closeOnEscape)
  document.body.style.overflow = ''
})

</script>

<style lang="css">
.modal__backdrop {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--modal-backdrop);
  backdrop-filter: blur(3px);
}

.modal {
  display: flex;
  flex-direction: column;
  max-width: 30rem;
  max-height: 90vh;
  width: 100%;
  overflow: hidden;
  border-radius: var(--radius-sm);

  background-color: white;
}


.modal__header,
.modal__footer {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.modal__header {
  justify-content: space-between;
  background: var(--modal-header);
}

.modal__footer {
  justify-content: flex-end;
  gap: var(--actions-gap);
}

.modal__body {
  overflow-y: auto;
  flex: 1;
  min-height: 0;
}

.modal__header,
.modal__body,
.modal__footer {
  padding: var(--space-lg) var(--space-xl);
}

.modal__cancel {
  order: 1
}
</style>
