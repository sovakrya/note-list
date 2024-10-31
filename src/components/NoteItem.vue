<script setup lang="ts">
import type { Note } from '@/views/HomePage.vue'

const props = defineProps<{
  note: Note
}>()
</script>

<template>
  <div>
    <span>{{ props.note.title }}</span>
  </div>
</template>
