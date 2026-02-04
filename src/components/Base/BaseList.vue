<template>
  <ul class="base-list">
    <li v-for="item in itemList" :key="item.id" @click="emit('itemClicked', item.id)">
      <slot :item="item"></slot>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  itemList: { type: Array, required: true }
})
const emit = defineEmits(["itemClicked"])
</script>

<style lang="css">
.base-list {
  display: flex;
  flex-direction: column;

  list-style: none;
  padding: 0;
  margin: 0;
  gap: 0.5rem;
}
</style>
