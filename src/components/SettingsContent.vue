<script setup lang="ts">
import type { Note } from '@/service/noteApi'
import { ref } from 'vue'

const props = defineProps<{
  note: Note | undefined
}>()

const todoTitle = ref('')
</script>

<template>
  <div>
    <span>Название заметки: {{ props.note?.title }}</span>

    <div>
      <span>Список задач:</span>

      <div>
        <input type="text" v-model="todoTitle" />
        <button>+</button>
      </div>
    </div>
  </div>
</template>
