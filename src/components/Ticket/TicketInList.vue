<template>
  <div :class="['ticket', $attrs.class]">
    <div class="ticket__header">
      <h2>{{ ticket.title }}</h2>
      <div class="ticket__header-menu">

        <IconButton class="trigger" @click="toggleDropdown(ticket.id)">
          <ThreeDotsIcon class="icon-button__icon" />
        </IconButton>

        <template v-if="isDropdownOpen(ticket.id)">
          <div class="backdrop" @click.self="closeDropdown"></div>
          <div class="ticket__dropdown">
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
  <ConfirmDialog v-model="isConfirmOpen" @confirm="onTicketDelete(ticket.id)" />
  <TicketFormModal v-model="isUpdateOpen" :ticket="props.ticket" @updated="isUpdateOpen = false" title="Edit ticket" />
</template>

<script setup>
import ConfirmDialog from '../Base/ConfirmDialog.vue';
import TicketFormModal from './TicketFormModal.vue'
import IconButton from '../Base/IconButton.vue';
import ThreeDotsIcon from '@/assets/icons/three-dots-horizontal-svgrepo-com.svg'
import { ref } from 'vue'
import { useDropdown } from '@/composables/useDropdown';

const props = defineProps({
  ticket: Object,
  onTicketDelete: Function
})
const isUpdateOpen = ref(false)
const isConfirmOpen = ref(false)

const { isOpen: isDropdownOpen, toggle: toggleDropdown, close: closeDropdown } = useDropdown()

function openEdit() {
  closeDropdown()
  isUpdateOpen.value = true
}
function openDelete() {
  closeDropdown()
  isConfirmOpen.value = true
}
</script>


<style lang="css">
.ticket {
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-sm);
  height: auto;
  min-width: var(--ticket-width);
}

.ticket__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-right-radius: var(--radius-sm);
  border-top-left-radius: var(--radius-sm);
  padding: var(--space-sm) 0;
}

.ticket__header h2 {
  overflow-wrap: anywhere;
}

.ticket__header-menu {
  position: relative;
  align-self: flex-start;
}

.ticket__dropdown {
  position: absolute;
  z-index: 20;
  right: 0;

  background: var(--dropdown);
  border: 1px solid #ddd;

  border-radius: var(--radius-sm);
  box-shadow: 0 6px 20px var(--shadow);

  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  padding: var(--space-sm);
}

.ticket__header,
.ticket__main {
  padding: var(--space-md) var(--space-lg);
}

.ticket-new {
  border-left: 4px solid var(--color-new);
}

.ticket-inprogress {
  border-left: 4px solid var(--color-active);
}

.ticket-done {
  border-left: 4px solid var(--color-done);
}

.backdrop {
  position: fixed;
  z-index: 10;
  inset: 0;
  background: transparent;
}

.trigger {
  position: relative;
  z-index: 21;
}

/* .ticket-new .ticket__header {
  border-left: 4px solid var(--color-new);
}

.ticket-inprogress .ticket__header {
  border-left: 4px solid var(--color-active);
}

.ticket-done .ticket__header {
  border-left: 4px solid var(--color-done);
} */
</style>
