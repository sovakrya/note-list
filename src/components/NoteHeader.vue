<script setup lang="ts">
import { ref } from 'vue'

const emits = defineEmits<{
  addNote: [string]
}>()

function addNote() {
  emits('addNote', noteText.value)

  noteText.value = ''
}

const noteText = ref('')
</script>

<template>
  <div class="header-box">
    <input
      type="text"
      v-model="noteText"
      class="header-input"
      placeholder="Добавьте новую заметку..."
      @keydown.enter="addNote"
    />
    <button class="header-add-btn" @click="addNote">+</button>
  </div>
</template>

<style scoped>
.header-box {
  display: flex;
  align-items: center;
  width: 600px;
  height: 100px;
  gap: 8px;
}

.header-input {
  flex-grow: 1;
  height: 30px;
  padding: 4px;
  border: solid 1px rgb(146, 146, 146);
  border-radius: 5px;
}

.header-add-btn {
  height: 30px;
  width: 30px;
  font-size: 26px;
  cursor: pointer;
  background-color: rgb(63, 88, 201);
  border: none;
  color: aliceblue;
  border-radius: 5px;
  transition: all 1s;
}

.header-add-btn:hover {
  background-color: rgb(110, 131, 223);
}
</style>
