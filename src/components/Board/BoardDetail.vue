<template>
  Board no. {{ props.board.id }}
  <BaseList :item-list="tickets" @item-clicked="openTicketModal">
    <template #default="{ item }">
      <span>{{ item.id }} {{ item.status }}</span>
    </template>
  </BaseList>
</template>

<script setup>
import BaseList from '../Base/BaseList.vue';
// import { computed } from 'vue'

const props = defineProps({
  board: Object,
  tickets: Array,
})

function openTicketModal() {
  console.log('here')
}
</script>
