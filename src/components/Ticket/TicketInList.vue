<template>
  <BaseDetail @delete="isConfirmOpen = true">
    <div>Ticket {{ ticket.id }} {{ ticket.name }}{{ ticket.status.value }}</div>
  </BaseDetail>
  <ConfirmDialog v-model="isConfirmOpen" @confirm="onTicketDelete(ticket.id)" />
  <button @click="isUpdateOpen = true">Edit ticket</button>
  <TicketFormModal v-model="isUpdateOpen" :ticket="props.ticket" />
</template>

<script setup>
import BaseDetail from '../Base/BaseDetail.vue';
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
