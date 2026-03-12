<template>
  <template v-if="activeBoard">
    <div class="board__header">
      <h2 class="board__title"> {{ activeBoard.title }} </h2>
      <div class="board__actions">

        <template v-if="isDesktop">
          <button class="btn btn--primary fixed-width-menu" @click="isCreateTicketOpen = true">+ New ticket</button>
          <div class="board__menu">
            <IconButton class="btn--primary board__icon" @click.stop="toggleMenu(boardMenuId)">
              <ThreeDotsIcon />
            </IconButton>
            <div v-if="isMenuOpen(boardMenuId)" class="board__dropdown dropdown fixed-width-menu">
              <button class="btn btn--primary" @click="isUpdateBoardOpen = true">Edit board</button>
              <button class="btn btn--primary" @click="isConfirmOpen = true">Delete board</button>
            </div>
          </div>
        </template>

        <template v-else>
          <button class="btn btn--accent" @click="isCreateTicketOpen = true">New ticket</button>
          <button class="btn btn--primary" @click="isUpdateBoardOpen = true">Edit board</button>
          <button class="btn btn--primary" @click="isConfirmOpen = true">Delete board</button>
        </template>
      </div>
    </div>

    <BoardTickets :board="activeBoard" :tickets="tickets" :onTicketDelete="onTicketDelete" />

    <ConfirmDialog v-model="isConfirmOpen" @confirm="deleteBoard" />
    <BoardFormModal v-model="isUpdateBoardOpen" :board="activeBoard" @updated="isUpdateBoardOpen = false"
      title="Edit board" />
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
import IconButton from '../Base/IconButton.vue'
import ThreeDotsIcon from '@/assets/icons/three-dots-horizontal-svgrepo-com.svg'
import { useMenu } from '@/composables/useMenu'
import { useBreakpoint } from '@/composables/useBreakpoint'

const isUpdateBoardOpen = ref(false)
const isConfirmOpen = ref(false)
const isCreateTicketOpen = ref(false)

const boardMenuId = ref('boardActionsMenu')
const { isMenuOpen, toggleMenu } = useMenu()

const { isDesktop } = useBreakpoint()

const route = useRoute()
const router = useRouter()
const boardStore = useBoardStore()
const ticketStore = useTicketStore()

const { activeBoard } = useActiveBoard()
const tickets = computed(() => ticketStore.getTickets(route.params.id))

async function deleteBoard() {
  await boardStore.deleteBoard(activeBoard.value.id)
  router.push({ name: 'home' })
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
  padding: var(--space-md) 0;
}

.board__actions {
  display: flex;
  justify-content: center;
  gap: var(--actions-gap);
}

.board__icon path {
  fill: white;
}

.board__icon {
  height: 100%;
}

@media (min-width: 1024px) {
  .board__header {
    flex-direction: row;
    justify-content: space-between;
  }

  .board__menu {
    position: relative;
  }

  .board__dropdown {
    right: calc(var(--actions-gap) + var(--icon-size));
    top: calc(100% + 6px);
  }
}
</style>
