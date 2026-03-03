<template>
  <aside>
    <BoardListView />
  </aside>
  <section class="board" aria-label="Board detail">
    <RouterView /> <!-- renders BoardDetailView based on route -->
  </section>
</template>

<script setup>
import BoardListView from './BoardListView.vue';
import { RouterView } from 'vue-router'

</script>

<style lang="css">
.board {
  padding: 0 var(--space-md);
}

@media (min-width: 1024px) {
  .board {
    padding: 0 var(--space-lg) var(--space-lg) var(--space-lg);
    display: grid;
    grid-template-rows: auto 1fr;
  }
}
</style>
