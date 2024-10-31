<script setup lang="ts">
import type { Note } from '@/views/HomePage.vue'

const props = defineProps<{
  note: Note
}>()
</script>

<template>
  <div>
    <span class="note-title">{{ props.note.title }}</span>

    <div v-if="props.note.todoList">
      <ul v-for="todo in props.note.todoList">
        <li>{{ todo.title }}</li>
      </ul>
    </div>

    <button>X</button>
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
