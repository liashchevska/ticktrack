<template>
  <BoardListView />
  <RouterView /> <!-- renders BoardDetailView based on route -->
</template>

<script setup>
import BoardListView from './BoardListView.vue';
import { RouterView } from 'vue-router'

</script>
