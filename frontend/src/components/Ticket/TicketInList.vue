<template>
  <div :draggable="!isMobile" @dragstart="onDragStart($event, ticket.id)" :class="['ticket', $attrs.class]">
    <div class="ticket__header">
      <h3>{{ ticket.title }}</h3>
      <div class="ticket__header-menu">

        <IconButton @click.stop="toggleMenu(ticketId)">
          <ThreeDotsIcon />
        </IconButton>

        <template v-if="isMenuOpen(ticketId)">
          <div class="ticket__dropdown dropdown">
            <button class="btn btn--primary" @click="openEdit">Edit</button>
            <button class="btn btn--primary" @click="openDelete">Delete</button>
          </div>
        </template>
      </div>
    </div>
    <div class="ticket__main">
      {{ ticket.description }}
    </div>
  </div>
  <ConfirmDialog title="Delete ticket" v-model="isConfirmOpen" @confirm="onTicketDelete(ticket.id)">
    <template #message>
      <p> Are you sure you want to delete this ticket? </p>
    </template>
  </ConfirmDialog>
  <TicketFormModal v-model="isUpdateOpen" :ticket="props.ticket" @updated="isUpdateOpen = false" title="Edit ticket" />
</template>

<script setup>
import ConfirmDialog from '../Base/ConfirmDialog.vue'
import TicketFormModal from './TicketFormModal.vue'
import IconButton from '../Base/IconButton.vue'
import ThreeDotsIcon from '@/assets/icons/three-dots-horizontal-svgrepo-com.svg'
import { ref } from 'vue'
import { useMenu } from '@/composables/useMenu'
import { useDragDrop } from '@/composables/useDragDrop'
import MobileDetect from 'mobile-detect'

const props = defineProps({
  ticket: Object,
  onTicketDelete: Function
})
const isUpdateOpen = ref(false)
const isConfirmOpen = ref(false)
const ticketId = `ticket-${props.ticket.id}`

const { isMenuOpen, toggleMenu, closeMenu } = useMenu()

function openEdit() {
  closeMenu()
  isUpdateOpen.value = true
}

function openDelete() {
  closeMenu()
  isConfirmOpen.value = true
}

const isMobile = new MobileDetect(window.navigator.userAgent).mobile()
const { onDragStart } = useDragDrop()
</script>


<style lang="css">
.ticket {
  border-radius: var(--radius-sm);
  height: auto;
  background: var(--color-surface);
  box-shadow: 0 1px 2px var(--shadow);
}

.ticket:hover {
  background: var(--color-surface-darker);
}

.ticket__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md);
  padding-bottom: var(--space-xs);
}

.ticket__header h3 {
  overflow-wrap: anywhere;
}

.ticket__header-menu {
  position: relative;
  align-self: flex-start;
}

.ticket__dropdown {
  right: 0;
  padding: var(--space-sm);
  min-width: var(--actions-menu-width);
  background: var(--color-surface);
  border: 1px solid #ddd;
  border-radius: var(--radius-sm);
  box-shadow: 0 6px 20px var(--shadow);
}

.ticket__main {
  padding: var(--space-md);
  padding-top: var(--space-xs);
}

.ticket-new .ticket {
  border-left: var(--ticket-border) solid var(--color-new);
}

.ticket-active .ticket {
  border-left: var(--ticket-border) solid var(--color-active);
}

.ticket-done .ticket {
  border-left: var(--ticket-border) solid var(--color-done);
}
</style>
