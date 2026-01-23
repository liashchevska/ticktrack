<template>
  <BaseDetail @delete="onTicketDelete(ticket.id)">
    <div>Ticket {{ ticket.id }} {{ ticket.name }}{{ ticket.status.value }}</div>
  </BaseDetail>
  <TicketFormModal v-model="isUpdateOpen" :ticket="props.ticket" />
</template>

<script setup>
import BaseDetail from '../Base/BaseDetail.vue';
import TicketFormModal from './TicketFormModal.vue'
import { ref } from 'vue'
// const emit = defineEmits(['deleteTicket'])
const props = defineProps({
  ticket: Object,
  onTicketDelete: Function
})
const isUpdateOpen = ref(false)
</script>
