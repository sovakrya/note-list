<script setup lang="ts">
import type { Note } from '@/views/HomePage.vue'
import NoteItem from './NoteItem.vue'

const props = defineProps<{
  notes: Note[]
}>()
</script>

<template>
  <div class="note-list-wrapper">
    <NoteItem
      v-for="note in props.notes"
      :key="note.id"
      :note
      class="note-list-box"
    />
  </div>
</template>

<style scoped>
.note-list-wrapper {
  display: flex;
  gap: 16px;
}

.note-list-box {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  border: solid 2px rgb(63, 88, 201);
  border-radius: 5px;
  padding: 20px;
  justify-items: center;
}
</style>
