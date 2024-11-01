<script setup lang="ts">
import type { Note } from '@/views/HomePage.vue'
import NoteItem from './NoteItem.vue'

const props = defineProps<{
  notes: Note[]
}>()

const emits = defineEmits<{
  remove: [number]
}>()
</script>

<template>
  <div class="note-list-wrapper">
    <NoteItem
      v-for="(note, idx) of props.notes"
      :key="note.id"
      :note
      class="note-list-box"
      @delete-note="emits('remove', idx)"
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
  background-color: rgb(169 185 255 / 33%);
  color: #132ea8;
  border-radius: 5px;
  padding: 12px;
  justify-items: center;
  cursor: pointer;
  gap: 6px;
}
</style>
