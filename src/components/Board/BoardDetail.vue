<template>
  Board no. {{ props.board.id }}
  <template v-for="(ticketGroup, ticketStatus) in ticketsByStatus" :key="ticketStatus">
    {{ ticketStatus }}
    <BaseList :item-list="ticketGroup">
      <template #default="{ item }">
        <TicketInList :ticket="item" :onTicketDelete="props.onTicketDelete" />
      </template>
    </BaseList>

  </template>

  <TicketFormModal v-model="isCreateOpen" title="Create new ticket" />
</template>

<script setup>
import { useTicketStatusList } from '@/composables/useTicketStatusList';
import BaseList from '../Base/BaseList.vue';
import TicketFormModal from '../Ticket/TicketFormModal.vue';
import TicketInList from '../Ticket/TicketInList.vue';
import { ref, computed } from 'vue'

const props = defineProps({
  board: Object,
  tickets: Array,
  onTicketDelete: Function
})
const { ticketStatusList } = useTicketStatusList()
const ticketsByStatus = computed(() => {
  const temp = Object.fromEntries(
    Object.keys(ticketStatusList.value).map(status => [status, []])
  )
  props.tickets.forEach(ticket => {
    temp[ticket.status].push(ticket)
  })
  return temp
})
const isCreateOpen = ref(false)
</script>
