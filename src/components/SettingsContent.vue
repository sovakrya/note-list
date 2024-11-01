<script setup lang="ts">
import { addTodo, getNote, type Note, type Todo } from '@/service/noteApi'
import { onMounted, ref } from 'vue'
import TodoList from './TodoList.vue'

const props = defineProps<{
  note: Note
}>()

onMounted(() => {
  getTodos()
})

const todoTitle = ref('')
const todos = ref<Todo[]>([])

function getTodos() {
  getNote(props.note?.documentId!).then(res => {
    todos.value = res.data.todos
  })
}

async function addNewTodo() {
  await addTodo(todoTitle.value, props.note?.documentId!)
  getTodos()
  todoTitle.value = ''
}
</script>

<template>
  <div>
    <span>Название заметки: {{ props.note?.title }}</span>

    <div>
      <span>Список задач:</span>

      <TodoList :todos="todos" />

      <div>
        <input type="text" v-model="todoTitle" />
        <button @click="addNewTodo">+</button>
      </div>
    </div>
  </div>
</template>
