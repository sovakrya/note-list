<script setup lang="ts">
import NoteHeader from '@/components/NoteHeader.vue'
</script>

<template>
  <div class="main-box">
    <NoteHeader />
  </div>
</template>

<style scoped>
.main-box {
  display: flex;
  flex-direction: column;
  padding: 40px;
  align-items: center;
}
</style>
