<template>
  <Transition>
    <div v-if="isOpen" @click.self="close">
      <div> <!-- modal content -->
        <header>{{ title }}</header>
        <main>
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
function close() {
  isOpen.value = false
}
</script>
