<template>
  <ul class="list">
    <li class="list__item" v-for="item in itemList" :key="item.id" @click="emit('itemClicked', item.id)">
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
.list {
  display: flex;
  flex-direction: column;
}

.list__item {}
</style>
