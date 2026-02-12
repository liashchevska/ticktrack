<template>
<div class="ticket">
    <div class="ticket__header">
  <h2>{{ ticket.title }}</h2>
<div class="actions">
  <button @click="isUpdateOpen = true">Edit ticket</button>
  <button @click="isConfirmOpen = true">Delete ticket</button>
</div>
    </div>
    <div class="ticket__description">
      {{ ticket.description }}
    </div>
  </div>
  <ConfirmDialog v-model="isConfirmOpen" @confirm="onTicketDelete(ticket.id)" />
  <TicketFormModal v-model="isUpdateOpen" :ticket="props.ticket" @updated="isUpdateOpen = false" />
</template>

<script setup>
import ConfirmDialog from '../Base/ConfirmDialog.vue';
import TicketFormModal from './TicketFormModal.vue'
import { ref } from 'vue'
// const emit = defineEmits(['deleteTicket'])
const props = defineProps({
  ticket: Object,
  onTicketDelete: Function
})
const isUpdateOpen = ref(false)
const isConfirmOpen = ref(false)
</script>
