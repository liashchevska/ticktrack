<template>
  <div class="home-page">
    <aside class="home-page__aside">
      <nav class="home-page__board-list" aria-label="Board list navigation">
        <BoardListView />
      </nav>
    </aside>
    <section class="home-page__board-detail" aria-label="Board detail">
      <RouterView /> <!-- renders BoardDetailView based on route -->
    </section>
  </div>
</template>

<script setup>
import BoardListView from './BoardListView.vue';
import { RouterView } from 'vue-router'

</script>

<style lang="css">
.home-page {
  display: grid;
  grid-template-columns: 1fr 5fr;
}

/* .home-page__board_list {} */
</style>
