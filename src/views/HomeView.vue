<template>
  <aside>
    <BoardList />
  </aside>
  <section class="board" aria-label="Board detail">
    <RouterView /> <!-- renders BoardDetailView based on route -->
  </section>
</template>

<script setup>
import BoardList from '../components/Board/BoardList.vue';
import { RouterView } from 'vue-router'

</script>

<style lang="css">
.board {
  padding: 0 var(--space-md);
}

@media (min-width: 1024px) {
  .board {
    padding: var(--tickets-grid-gap);
    padding-top: 0;
    display: grid;
    grid-template-rows: auto 1fr;
  }
}
</style>
