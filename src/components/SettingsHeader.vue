<script setup lang="ts">
import { ref } from 'vue'
import NoteRemoveWarning from './NoteRemoveWarning.vue'

const props = defineProps<{
  isBlockedUndoChage: number
  isBlockedRedoUndoChage: number
}>()

const emits = defineEmits<{
  deleteNote: []
  undoChange: []
  redoUndoneChange: []
}>()

const dialogRemove = ref(false)
</script>

<template>
  <header class="header-box">
    <button class="header-btn" @click="dialogRemove = true">
      Удалить заметку
    </button>
    <NoteRemoveWarning
      v-model:show="dialogRemove"
      @remove-note="emits('deleteNote')"
    />
    <button
      class="header-btn"
      @click="emits('undoChange')"
      :disabled="!props.isBlockedUndoChage"
    >
      Отменить изменения
    </button>
    <button
      class="header-btn"
      @click="emits('redoUndoneChange')"
      :disabled="!props.isBlockedRedoUndoChage"
    >
      Повторить отмененое изменение
    </button>
  </header>
</template>

<style scoped>
.header-box {
  display: flex;
  gap: 16px;
  height: 70px;
}

.header-btn {
  cursor: pointer;
  height: 40px;
  font-size: 16px;
  padding: 6px;
  background-color: rgb(63, 88, 201);
  border: none;
  color: aliceblue;
  border-radius: 5px;
  transition: all 0.4s;
}

.header-btn:hover {
  background-color: rgb(110, 131, 223);
}

.header-btn:disabled {
  background-color: rgb(117, 128, 179);
  cursor: default;
}
</style>
