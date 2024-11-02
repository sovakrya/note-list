<script setup lang="ts">
import type { Todo } from '@/service/noteApi'
import TodoItem from './TodoItem.vue'

const emits = defineEmits<{
  checkTodo: [{ documentId: string; from: boolean }]
  deleteTodo: [Todo]
  updateTodo: [{ title: string; documentId: string; from: string }]
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
    @execute-todo="modifiedTodo => emits('checkTodo', modifiedTodo)"
    @remove-todo="emits('deleteTodo', todo)"
    @update-todo="updatedTodo => emits('updateTodo', updatedTodo)"
  />
</template>
