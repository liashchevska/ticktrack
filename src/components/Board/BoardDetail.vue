<template>
  <h1> Current board: {{ props.board.title }} </h1>
  <template v-if="isInitialized">
    <section v-for="(ticketGroup, ticketStatus) in ticketsByStatus" :key="ticketStatus">
      <h2 class="status-{{ ticketStatus }}"> {{ ticketStatus }} </h2>
      <BaseList :item-list="ticketGroup">
        <template #default="{ item }">
          <TicketInList :ticket="item" :onTicketDelete="props.onTicketDelete" />
        </template>
      </BaseList>
    </section>
  </template>
</template>

<script setup>
import { useTicketStatusList } from '@/composables/useTicketStatusList';
import BaseList from '../Base/BaseList.vue';
import TicketInList from '../Ticket/TicketInList.vue';
import { computed } from 'vue'

const props = defineProps({
  board: Object,
  tickets: Array,
  onTicketDelete: Function
})
const { ticketStatusList, isInitialized } = useTicketStatusList()
const ticketsByStatus = computed(() => {
  const buckets = Object.fromEntries(
    Object.keys(ticketStatusList.value).map(status => [status, []])
  )
  props.tickets.forEach(ticket => {
    if (buckets[ticket.status]) {
      buckets[ticket.status].push(ticket)
    }
  })
  return buckets
})
</script>
