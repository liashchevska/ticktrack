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

<style lang="css"></style>
