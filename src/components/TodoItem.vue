<script setup lang="ts">
import type { Todo } from '@/service/noteApi'

const props = defineProps<{
  todo: Todo
}>()
</script>

<template>
  <span>{{ console.log(props.todo.title) }}</span>
</template>
