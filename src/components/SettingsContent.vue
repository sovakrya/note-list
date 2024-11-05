<script setup lang="ts">
import { type Note, type Todo } from '@/service/noteApi'
import { ref } from 'vue'
import TodoList from './TodoList.vue'

const emits = defineEmits<{
  checkTodo: [{ documentId: string; from: boolean }]
  deleteTodo: [Todo]
  addTodo: [string]
  updateTodo: [{ title: string; documentId: string; from: string }]
  updateNoteTitle: [{ title: string; from: string }]
}>()

const props = defineProps<{
  editableNote: Note
}>()

const todoTitle = ref('')
const todos = ref(props.editableNote.todos)
const noteTitle = ref(props.editableNote.title)

function addTodo() {
  emits('addTodo', todoTitle.value)

  todoTitle.value = ''
}

function updateNoteTitle(e: Event) {
  const temp = noteTitle.value

  if (!(e.target instanceof HTMLElement)) {
    return
  }

  noteTitle.value = e.target.textContent!

  emits('updateNoteTitle', { title: noteTitle.value, from: temp })
}
</script>

<template>
  <div class="settings-content-box">
    <div class="settings-title-box">
      <h2>Название заметки:</h2>
      <h2 contenteditable @blur="e => updateNoteTitle(e)">
        {{ props.editableNote.title }}
      </h2>
    </div>

    <div class="todo-box">
      <span class="todo-actions-title">Список задач:</span>

      <div class="todo-actions-box">
        <input
          type="text"
          v-model="todoTitle"
          class="todo-add-input"
          placeholder="Например, погладить кота..."
          @keydown.enter="addTodo"
        />
        <button @click="addTodo" class="todo-add-btn">+</button>
      </div>

      <div v-if="!props.editableNote.todos?.length">
        <span>Пока у вас нет не одной задачи! </span>
      </div>
      <TodoList
        :todos="props.editableNote.todos"
        v-else
        @check-todo="modifiedTodo => emits('checkTodo', modifiedTodo)"
        @delete-todo="todo => emits('deleteTodo', todo)"
        @update-todo="updatedTodo => emits('updateTodo', updatedTodo)"
      />
    </div>
  </div>
</template>

<style scoped>
.settings-content-box {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  align-items: center;
}

.settings-title-box {
  display: flex;
  gap: 10px;
}

.todo-box {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.todo-actions-box {
  display: flex;
  gap: 10px;
}

.todo-add-input {
  width: 600px;
  height: 34px;
  padding: 4px;
  border: solid 1px rgb(146, 146, 146);
  border-radius: 5px;
}

.todo-actions-title {
  font-size: 18px;
}

.todo-add-btn {
  height: 34px;
  width: 34px;
  font-size: 26px;
  cursor: pointer;
  background: none;
  border: solid 2px rgb(63, 88, 201);
  color: rgb(63, 88, 201);
  border-radius: 5px;
  transition: all 0.3s;
}

.todo-add-btn:hover {
  background-color: rgb(227, 232, 253);
}
</style>
