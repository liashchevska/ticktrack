<template>
  <div class="ticket">
    <div class="ticket__header">
      <h2>{{ ticket.title }}</h2>
      <div class="ticket__actions">
        <button class="btn" @click="isUpdateOpen = true">Edit</button>
        <button class="btn" @click="isConfirmOpen = true">Delete</button>
      </div>
    </div>
    <div class="ticket__description">
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
.ticket__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-sm);
}

.ticket__actions {
  display: flex;
  gap: var(--space-sm);
}
</style>
