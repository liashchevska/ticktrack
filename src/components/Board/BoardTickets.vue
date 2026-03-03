<template>
  <template v-if="isInitialized">
    <div class="board__main">
      <section class="ticket-group" v-for="(ticketGroup, ticketStatus) in ticketsByStatus" :key="ticketStatus">
        <!-- <h2 class="ticket-group__title"> {{ ticketStatus }} </h2> -->
        <BaseList :item-list="ticketGroup">
          <template #default="{ item }">
            <TicketInList :class="`ticket-${ticketStatus.toLocaleLowerCase()}`" :ticket="item"
              :onTicketDelete="props.onTicketDelete" />
          </template>
        </BaseList>
      </section>
    </div>
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

<style lang="css">
.board__main {
  display: flex;
  flex-direction: column;
  gap: var(--tickets-grid-gap);
}

.ticket-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (min-width: 1024px) {
  .board__main {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
