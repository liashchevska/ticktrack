<template>
  <template v-if="currentBoard">
    <BaseDetail @delete="isConfirmOpen = true">
      <BoardDetail :board="currentBoard" :tickets="tickets" :onTicketDelete="onTicketDelete" />
    </BaseDetail>
    <ConfirmDialog v-model="isConfirmOpen" @confirm="deleteBoard" />

    <button @click="isUpdateOpen = true">Edit board</button>
    <BoardFormModal v-model="isUpdateOpen" :board="currentBoard" @updated="boardStore.fetchBoardList" />

    <button @click="isCreateTicketOpen = true">Create ticket</button>
    <TicketFormModal v-model="isCreateTicketOpen" title="Create new ticket" />
  </template>
</template>

<script setup>
import BaseDetail from '@/components/Base/BaseDetail.vue'
import BoardDetail from '@/components/Board/BoardDetail.vue'
import BoardFormModal from '@/components/Board/BoardFormModal.vue'
import { useBoardStore } from '@/stores/board'
import { watch, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTicketStore } from '@/stores/ticket'
import { useTicketStatusList } from '@/composables/useTicketStatusList'
import ConfirmDialog from '@/components/Base/ConfirmDialog.vue'
import TicketFormModal from '@/components/Ticket/TicketFormModal.vue'

const isUpdateOpen = ref(false)
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
  router.push('/boards')
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
