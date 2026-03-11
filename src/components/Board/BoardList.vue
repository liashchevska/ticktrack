<template>
  <nav class="board-list" aria-label="Board list navigation">
    <div class="board-list__header">
      <h1 class="board-list__title">Boards</h1>
      <div class="board-list__actions">
        <template v-if="isDesktop">
          <button class="btn board-list__add" @click="isCreateOpen = true">+ New</button>
        </template>
        <template v-else>
          <IconButton @click="isOpen = !isOpen">
            <ChevronDownIcon class="icon-button__chevron " :class="{ 'icon-button__chevron--open': isOpen }" />
          </IconButton>
          <IconButton @click="isCreateOpen = true">
            <PlusIcon />
          </IconButton>
        </template>
      </div>
    </div>
    <BaseList class="board-list__main" :item-list="boardList" :active-id="activeBoard?.id" @itemClicked="openBoard"
      v-show="isOpen">
      <template #default="{ item, isActive }">
        {{ item.title }}
      </template>
    </BaseList>
    <BoardFormModal v-model="isCreateOpen" @created="isCreateOpen = false" title="Create new board" />
  </nav>
</template>


<script setup>
import ChevronDownIcon from '@/assets/icons/down-chevron-svgrepo-com.svg?component'
import PlusIcon from '@/assets/icons/plus-svgrepo-com.svg?component'

import { useRouter } from 'vue-router'
import { useBoardStore } from '@/stores/board'
import { useActiveBoard } from '@/composables/useActiveBoard'
import BaseList from '@/components/Base/BaseList.vue'
import BoardFormModal from '@/components/Board/BoardFormModal.vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import IconButton from '@/components/Base/IconButton.vue'
import { useBreakpoint } from '@/composables/useBreakpoint'

const { isDesktop } = useBreakpoint()
const isOpen = ref(true)
const isCreateOpen = ref(false)

const router = useRouter()
const boardStore = useBoardStore()

const { boardList } = storeToRefs(boardStore)
const { activeBoard } = useActiveBoard()

function openBoard(id) {
  router.push({ name: 'home', params: { id } })
}
</script>

<style lang="css">
.icon-button__chevron {
  transform-origin: center;
  transition: transform 0.3s ease-in-out;
}

.icon-button__chevron--open {
  transform: rotate(180deg);
}

.board-list {
  display: flex;
  flex-direction: column;
  background: var(--sidebar);
}

.board-list li,
.board-list__header {
  padding: var(--space-sm) var(--space-md);
}

.board-list__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.board-list__actions {
  display: flex;
  gap: var(--space-xs);
}

.board-list__add {
  background: none;
  font-size: var(--text-xl);
}

/* Change color */
.board-list__add:hover {
  box-shadow: none;
  background: rgba(0, 0, 0, 0.05);
}

.board-list .list {
  list-style-type: circle;
  list-style-position: inside;
}

.board-list .list__item:hover {
  background: var(--sidebar-element-hover);
}

.board-list .list__item--active {
  background: var(--sidebar-element-active);
  list-style-type: disc;
  font-weight: 700;
}

.board-list__main {
  padding: var(--space-sm) 0;
  border-top: 1px solid var(--color-border-dark);
}

@media (min-width: 1024px) {
  .board-list {
    height: 100%;
    min-width: var(--sidebar-width);
    background: var(--sidebar);
  }

  .board-list li,
  .board-list__header {
    padding: var(--space-sm) var(--space-xl);
  }

  .board-list__main {
    overflow-y: auto;
  }
}
</style>
