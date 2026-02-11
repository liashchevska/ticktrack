<template>
  <h2>{{ ticket.title }} {{ ticket.status }}</h2>

  <button @click="isUpdateOpen = true">Edit ticket</button>
  <button @click="isConfirmOpen = true">Delete ticket</button>

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
