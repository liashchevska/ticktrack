<template>
  Board no. {{ props.board.id }}
</template>

<script setup>

const props = defineProps({
  board: {
    type: Object,
    default: null
  }
})

</script>
