<template>
  <template v-if="activeBoard">
    <div class="board__header">
      <h1 class="board__title"> {{ activeBoard.title }} </h1>
      <div class="board__actions">
        <button class="btn" @click="isCreateTicketOpen = true">New ticket</button>
        <button class="btn" @click="isUpdateBoardOpen = true">Edit board</button>
        <button class="btn" @click="isConfirmOpen = true">Delete board</button>
      </div>
    </div>

    <BoardTickets :board="activeBoard" :tickets="tickets" :onTicketDelete="onTicketDelete" />

    <ConfirmDialog v-model="isConfirmOpen" @confirm="deleteBoard" />
    <BoardFormModal v-model="isUpdateBoardOpen" :board="activeBoard" @updated="isUpdateBoardOpen = false" />
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
import { useActiveBoard } from '@/composables/useActiveBoard'
import ConfirmDialog from '@/components/Base/ConfirmDialog.vue'
import TicketFormModal from '@/components/Ticket/TicketFormModal.vue'

const isUpdateBoardOpen = ref(false)
const isConfirmOpen = ref(false)
const isCreateTicketOpen = ref(false)

const route = useRoute()
const router = useRouter()
const boardStore = useBoardStore()
const ticketStore = useTicketStore()

const { activeBoard } = useActiveBoard()
const tickets = computed(() => ticketStore.getTickets(route.params.id))

async function deleteBoard() {
  await boardStore.deleteBoard(activeBoard.value.id)
  router.push({ name: 'boards' })
}
async function onTicketDelete(ticketId) {
  await ticketStore.deleteTicket(activeBoard.value.id, ticketId)
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

<style lang="css">
.board__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}

.board__actions {
  display: flex;
  justify-content: center;
  gap: var(--space-sm);
}

@media (min-width: 1024px) {
  .board__header {
    flex-direction: row;
    justify-content: space-between;
  }

}
</style>
