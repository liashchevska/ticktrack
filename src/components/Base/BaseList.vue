<template>
  <div v-for="item in itemList" :key="item.id" @click="emit('itemClicked', item.id)">
    <slot :item="item"></slot>
  </div>
</template>

<script setup>
defineProps({
  itemList: { type: Array, required: true }
})
const emit = defineEmits(["itemClicked"])
</script>
