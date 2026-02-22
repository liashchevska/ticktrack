<template>
  <nav class="board-list" aria-label="Board list navigation">
    <div class="board-list__header">
      <h1>Your boards</h1>
      <div v-if="!isDesktop" class="board-list__actions">
        <IconButton @click="isOpen = !isOpen">
          <ChevronDownIcon class="icon-button__chevron" :class="{ 'icon-button__chevron--open': isOpen }" />
        </IconButton>
        <IconButton @click="isCreateOpen = true">
          <PlusIcon />
        </IconButton>
      </div>
    </div>
    <BaseList class="board-list__main" :item-list="boardList" :active-id="activeBoard?.id" @itemClicked="openBoardView"
      v-show="isOpen">
      <template #default="{ item, isActive }">
        {{ item.title }} <small v-if="isActive">(active)</small>
      </template>
    </BaseList>
    <div v-if="isDesktop" class="board-list__footer">
      <button @click="isCreateOpen = true">Create board</button>
    </div>
    <BoardFormModal v-model="isCreateOpen" @created="isCreateOpen = false" title="Create" />
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

function openBoardView(id) {
  router.push({ name: 'board-detail', params: { id } })
}
</script>

<style lang="css">
.icon-button__chevron {
  display: inline-block;
  transform-origin: center;
  transition: transform 0.3s ease-in-out;
}

.icon-button__chevron--open {
  transform: rotate(180deg);
}

.board-list {
  display: flex;
  flex-direction: column;
}

.board-list__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--common-padding-vertical) var(--common-padding-horizontal);
}

.board-list__actions {
  display: flex;
  gap: var(--space-xs);
}

.board-list__main {
  padding: 0 var(--space-xl);
}


@media (min-width: 1024px) {
  .board-list {
    height: 100%;
  }

  .board-list__main {
    overflow-y: auto;
  }

  .board-list__footer {
    margin-top: auto;
    padding: var(--space-md);
    display: flex;
    justify-content: center;
  }
}
</style>
