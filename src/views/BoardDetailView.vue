<template>
  <template v-if="currentBoard">
    <h1> {{ currentBoard.title }} </h1>

    <button @click="isCreateTicketOpen = true">Create ticket</button>
    <button @click="isUpdateBoardOpen = true">Edit board</button>
    <button @click="isConfirmOpen = true">Delete board</button>

    <BoardTickets :board="currentBoard" :tickets="tickets" :onTicketDelete="onTicketDelete" />

    <ConfirmDialog v-model="isConfirmOpen" @confirm="deleteBoard" />
    <BoardFormModal v-model="isUpdateBoardOpen" :board="currentBoard" @updated="isUpdateBoardOpen = false" />
    <TicketFormModal v-model="isCreateTicketOpen" @created="isCreateTicketOpen = false" title="Create new ticket" />
  </template>
</template>

<script setup>
import BoardTickets from '@/components/Board/BoardTickets.vue'
import BoardFormModal from '@/components/Board/BoardFormModal.vue'
import { useBoardStore } from '@/stores/board'
import { watch, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTicketStore } from '@/stores/ticket'
import { useTicketStatusList } from '@/composables/useTicketStatusList'
import ConfirmDialog from '@/components/Base/ConfirmDialog.vue'
import TicketFormModal from '@/components/Ticket/TicketFormModal.vue'

const isUpdateBoardOpen = ref(false)
const isConfirmOpen = ref(false)
const isCreateTicketOpen = ref(false)

const route = useRoute()
const router = useRouter()
const boardStore = useBoardStore()
const ticketStore = useTicketStore()

const currentBoard = computed(() => boardStore.boardList.find(b => b.id == route.params.id) || null)
const tickets = computed(() => ticketStore.getTickets(route.params.id))

async function deleteBoard() {
  await boardStore.deleteBoard(currentBoard.value.id)
  router.push({ name: 'boards' })
}
async function onTicketDelete(ticketId) {
  await ticketStore.deleteTicket(currentBoard.value.id, ticketId)
}
watch(() => route.params.id, (id) => {
  if (!id) return
  ticketStore.fetchTickets(id)
}, { immediate: true })

const { fetchTicketStatusList } = useTicketStatusList()
onMounted(async () => {
  await fetchTicketStatusList()
})
</script>
