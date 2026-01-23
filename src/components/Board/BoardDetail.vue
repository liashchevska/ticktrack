<template>
  Board no. {{ props.board.id }}

  <BaseList :item-list="tickets">
    <template #default="{ item }">
      <TicketInList :ticket="item" :onTicketDelete="props.onTicketDelete" />
    </template>
  </BaseList>
  <TicketFormModal v-model="isCreateOpen" title="Create new ticket" />
</template>

<script setup>
import BaseList from '../Base/BaseList.vue';
import TicketFormModal from '../Ticket/TicketFormModal.vue';
import TicketInList from '../Ticket/TicketInList.vue';
import { ref } from 'vue'

const props = defineProps({
  board: Object,
  tickets: Array,
  onTicketDelete: Function
})

function openTicketModal() {
  console.log('here')
}
const isCreateOpen = ref(false)
// function onTicketCreated
</script>
