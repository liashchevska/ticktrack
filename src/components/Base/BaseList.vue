<template>
  <ul class="list">
    <li class="list__item" :class="{ 'list__item--active': item.id === activeId }" v-for="item in itemList"
      :key="item.id" @click="emit('itemClicked', item.id)">
      <slot :item="item" :isActive="item.id === activeId"></slot>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  itemList: { type: Array, required: true },
  activeId: { type: Number, default: null }
})
const emit = defineEmits(["itemClicked"])
</script>

<style lang="css">
.list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

/* .list__item {} */

.list__item--active {
  font-weight: 700;
}
</style>
