<template>
  <template v-if="isInitialized">
    <div class="board__main">
      <section @dragover.prevent @dragenter.prevent @drop="onDrop($event, ticketStatus)" class="ticket-group"
        :class="`ticket-${ticketStatus.toLocaleLowerCase()}`" v-for="(ticketGroup, ticketStatus) in ticketsByStatus"
        :key="ticketStatus">
        <h3 class="ticket-group__title"> {{ ticketStatus }} </h3>
        <BaseList :item-list="ticketGroup">
          <template #default="{ item }">
            <TicketInList :ticket="item" :onTicketDelete="props.onTicketDelete" />
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
import { useDragDrop } from '@/composables/useDragDrop';

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

const { onDrop } = useDragDrop()
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
  gap: var(--space-md);
  width: 100%;
}

.ticket-group__title {
  text-align: center;
  width: 100%;
  border-radius: var(--radius-sm);
  padding: var(--space-xs) 0;
  align-self: flex-start;
  color: white;
}

.ticket-new .ticket-group__title {
  background: var(--color-new);
}

.ticket-active .ticket-group__title {
  background: var(--color-active);
}

.ticket-done .ticket-group__title {
  background: var(--color-done);
}

.ticket-group .list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

@media (min-width: 1024px) {
  .board__main {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
