<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NoteHeader from './components/NoteHeader.vue'
</script>

<template>
  <main class="main-box">
    <NoteHeader />
  </main>
</template>

<style scoped>
.main-box {
  display: flex;
  flex-direction: column;
  padding: 40px;
}
</style>
