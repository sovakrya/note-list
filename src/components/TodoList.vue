<script setup lang="ts">
import type { Todo } from '@/service/noteApi'
import TodoItem from './TodoItem.vue'
import type { CopyTodo } from '@/views/SettingsPage.vue'

const emits = defineEmits<{
  checkTodo: [{ documentId: string; from: boolean }]
  deleteTodo: [Todo]
  updateTodo: [{ title: string; documentId: string; from: string }]
}>()

const props = defineProps<{
  todos: CopyTodo[]
}>()
</script>

<template>
  <TodoItem
    v-for="todo of props.todos"
    v-show="!todo.action?.includes('delete')"
    :key="todo.documentId"
    :todo
    @execute-todo="modifiedTodo => emits('checkTodo', modifiedTodo)"
    @remove-todo="emits('deleteTodo', todo)"
    @update-todo="updatedTodo => emits('updateTodo', updatedTodo)"
  />
</template>
