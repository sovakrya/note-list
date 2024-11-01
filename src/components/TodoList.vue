<script setup lang="ts">
import type { Todo } from '@/service/noteApi'
import TodoItem from './TodoItem.vue'

const props = defineProps<{
  todos: Todo[]
}>()
</script>

<template>
  <TodoItem v-for="todo of props.todos" :key="todo.documentId" :todo />
</template>
