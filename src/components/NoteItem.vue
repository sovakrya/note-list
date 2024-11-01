<script setup lang="ts">
import type { Note } from '@/views/HomePage.vue'
import NoteRemoveWarning from './NoteRemoveWarning.vue'
import { ref } from 'vue'

const props = defineProps<{
  note: Note
}>()

const emits = defineEmits<{
  deleteNote: []
}>()

let a = 0
const dialogRemoveWarning = ref(false)
</script>

<template>
  <div>
    <span class="note-title">{{ props.note.title }}</span>

    <div v-if="props.note.todoList">
      <ul v-for="(todo, idx) of props.note.todoList" :key="todo.id">
        <li>{{ todo.title }}</li>
      </ul>
    </div>

    <button @click="dialogRemoveWarning = true">X</button>

    <NoteRemoveWarning
      v-model:show="dialogRemoveWarning"
      @remove-note="emits('deleteNote')"
    />
  </div>
</template>

<style scoped>
.note-title {
  font-weight: 600;
  font-size: 18px;
}

.note-remove-btn {
}
</style>
