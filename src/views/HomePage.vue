<script setup lang="ts">
import NoteHeader from '@/components/NoteHeader.vue'
import NotesList from '@/components/NotesList.vue'
import { addNote, deleteNote, getNotes, type Note } from '@/service/noteApi'
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
  await addNote(noteText)

  getNotesFromFetch()
}

async function deleteNoteFromFetch(documentId: string) {
  await deleteNote(documentId)

  getNotesFromFetch()
}
</script>

<template>
  <div class="main-box">
    <NoteHeader @add-note="addNewNote" />
    <NotesList :notes @remove="deleteNoteFromFetch" />
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
