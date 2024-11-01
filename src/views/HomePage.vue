<script setup lang="ts">
import NoteHeader from '@/components/NoteHeader.vue'
import NotesList from '@/components/NotesList.vue'
import { ref } from 'vue'

export type Todo = {
  id: number
  title: string
  isDone: boolean
}
export type Note = {
  id: number
  title: string
  todoList?: Todo[]
}

const notes = ref<Note[]>([])
let id = 0
function addNewNote(noteText: string) {
  id += 1
  notes.value.push({
    id,
    title: noteText,
  })
}

function deleteNote(idx: number) {
  notes.value.splice(idx, 1)
}
</script>

<template>
  <div class="main-box">
    <NoteHeader @add-note="addNewNote" />
    <NotesList :notes @remove="deleteNote" />
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
