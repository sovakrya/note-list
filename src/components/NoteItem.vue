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

    <button @click="dialogRemoveWarning = true" class="note-remove-btn">
      Удалить
    </button>

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
  background: none;
  color: #132ea8;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  height: 30px;
  width: 80px;
  border-radius: 5px;
  transition: all 0.3s;
}

.note-remove-btn:hover {
  background-color: rgba(166, 174, 209, 0.425);
}
</style>
