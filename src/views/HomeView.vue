<template>
  <div class="board-page">
    <aside aria-label="Board list">
      <BoardListView />
    </aside>
    <section aria-label="Board detail">
      <RouterView /> <!-- renders BoardDetailView based on route -->
    </section>
  </div>
</template>

<script setup>
import BoardListView from './BoardListView.vue';
import { RouterView } from 'vue-router'

</script>
