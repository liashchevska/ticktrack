<template>
  <div :class="['ticket', $attrs.class]">
    <div class="ticket__header">
      <h2>{{ ticket.title }}</h2>
      <div class="ticket__actions">
        <button class="btn btn--primary" @click="isUpdateOpen = true">Edit</button>
        <button class="btn btn--primary" @click="isConfirmOpen = true">Delete</button>
      </div>
    </div>
    <div class="ticket__main">
      {{ ticket.description }}
    </div>
  </div>
  <ConfirmDialog v-model="isConfirmOpen" @confirm="onTicketDelete(ticket.id)" />
  <TicketFormModal v-model="isUpdateOpen" :ticket="props.ticket" @updated="isUpdateOpen = false" title="Edit ticket" />
</template>

<script setup>
import ConfirmDialog from '../Base/ConfirmDialog.vue';
import TicketFormModal from './TicketFormModal.vue'
import { ref } from 'vue'

const props = defineProps({
  ticket: Object,
  onTicketDelete: Function
})
const isUpdateOpen = ref(false)
const isConfirmOpen = ref(false)
</script>


<style lang="css">
.ticket {
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-sm);
  height: auto;
  min-width: var(--ticket-width);
}

.ticket__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-sm);
  /* font-weight: var(--weight-bold); */

  border-top-right-radius: var(--radius-sm);
  border-top-left-radius: var(--radius-sm);
  padding: var(--space-sm) 0;
}

.ticket__actions {
  display: flex;
  gap: var(--actions-gap);
}

.ticket__header,
.ticket__main {
  padding: var(--space-md) var(--space-lg);
}

.ticket-new {
  border-left: 4px solid var(--color-new);
}

.ticket-inprogress {
  border-left: 4px solid var(--color-active);
}

.ticket-done {
  border-left: 4px solid var(--color-done);
}

/* .ticket-new .ticket__header {
  border-left: 4px solid var(--color-new);
}

.ticket-inprogress .ticket__header {
  border-left: 4px solid var(--color-active);
}

.ticket-done .ticket__header {
  border-left: 4px solid var(--color-done);
} */
</style>
