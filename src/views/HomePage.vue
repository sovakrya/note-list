<script setup lang="ts">
import NoteHeader from '@/components/NoteHeader.vue'
import NotesList from '@/components/NotesList.vue'
import { addNote, getNotes, type Note } from '@/service/noteApi'
import { onMounted, ref } from 'vue'

onMounted(() => {
  getNotesFromFetch()
})

const notes = ref<Note[]>([])

function getNotesFromFetch() {
  getNotes().then(res => {
    notes.value = res.data
  })
}

async function addNewNote(noteText: string) {
  debugger
  await addNote(noteText)
  console.log(notes)
  getNotesFromFetch()
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
