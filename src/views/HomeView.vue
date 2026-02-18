<template>
  <aside>
    <nav class="board-list" aria-label="Board list navigation">
      <BoardListView />
    </nav>
  </aside>
  <section class="board" aria-label="Board detail">
    <RouterView /> <!-- renders BoardDetailView based on route -->
  </section>
</template>

<script setup>
import BoardListView from './BoardListView.vue';
import { RouterView } from 'vue-router'

</script>

<style lang="css"></style>
