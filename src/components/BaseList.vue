<template>
  <div v-for="item in props.itemList" :key="item.id" @click="emit('itemClicked', item.id)">Item no. {{ item.id }}</div>
</template>

<script setup>
const props = defineProps({
  itemList: { type: Array, required: true }
})
const emit = defineEmits(["itemClicked",])
</script>
