<script setup lang="ts">
import type { Todo } from '@/service/noteApi'
import TodoItem from './TodoItem.vue'

const emits = defineEmits<{
  checkTodo: [string]
  deleteTodo: [string]
}>()

const props = defineProps<{
  todos: Todo[]
}>()
</script>

<template>
  <TodoItem
    v-for="todo of props.todos"
    :key="todo.documentId"
    :todo
    @execute-todo="emits('checkTodo', todo.documentId)"
    @remove-todo="emits('deleteTodo', todo.documentId)"
  />
</template>
