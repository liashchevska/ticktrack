<template>
  <div>
    <aside>
      <nav aria-label="Board list navigation">
        <BoardListView />
      </nav>
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

<style lang="css"></style>
