<script setup lang="ts">
import { addTodo, getNote, type Note, type Todo } from '@/service/noteApi'
import { ref } from 'vue'
import TodoList from './TodoList.vue'

const props = defineProps<{
  editableNote: Note
}>()

getTodos()

const todoTitle = ref('')
const todos = ref<Todo[]>()
const editableTodos = ref<Todo[]>([])
let noteTitle = props.editableNote.title
function getTodos() {
  console.log(props.editableNote)
  getNote(props.editableNote.documentId).then(res => {
    todos.value = res.data.todos
    editableTodos.value = JSON.parse(JSON.stringify(todos.value))
  })
}

async function addNewTodo() {
  await addTodo(todoTitle.value, props.editableNote.documentId!)
  getTodos()
  todoTitle.value = ''
}
</script>

<template>
  <div class="settings-content-box">
    <div class="settings-title-box">
      <h2>Название заметки:</h2>
      <h2 contenteditable>{{ noteTitle }}</h2>
    </div>

    <div class="todo-box">
      <span class="todo-actions-title">Список задач:</span>

      <div class="todo-actions-box">
        <input
          type="text"
          v-model="todoTitle"
          class="todo-add-input"
          placeholder="Например, погладить кота..."
        />
        <button @click="addNewTodo" class="todo-add-btn">+</button>
      </div>

      <div v-if="!todos?.length">
        <span>Пока у вас нет не одной задачи! </span>
      </div>
      <TodoList :todos="editableTodos" v-else @check-todo="" @delete-todo="" />
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
