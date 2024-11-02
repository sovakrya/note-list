<script setup lang="ts">
import SettingsContent from '@/components/SettingsContent.vue'
import SettingsHeader from '@/components/SettingsHeader.vue'
import { getNote, type Note } from '@/service/noteApi'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.noteId as string
const note = ref<Note>()
const editableNote = ref<Note>()
let canceledNote: Note

getNote(id).then(res => {
  console.log(res.data)
  note.value = res.data
  editableNote.value = JSON.parse(JSON.stringify(note.value))
})

function undoChange() {
  canceledNote = JSON.parse(JSON.stringify(editableNote.value))
  editableNote.value = JSON.parse(JSON.stringify(note.value))
}

function redoUndoneChange() {
  editableNote.value = JSON.parse(JSON.stringify(canceledNote))
}
</script>

<template>
  <div v-if="!editableNote">Загрузка...</div>

  <div class="settings-main-box" v-else>
    <SettingsHeader
      @undoChange="undoChange"
      @redoUndoneChange="redoUndoneChange"
      @deleteNote=""
    />
    <SettingsContent class="settings-content" :editableNote="editableNote" />

    <footer class="footer-box">
      <button class="footer-btn">Отменить</button>
      <button class="footer-btn">Сохранить</button>
    </footer>
  </div>
</template>

<style scoped>
.settings-main-box {
  display: flex;
  flex-direction: column;
  padding: 40px;
  height: 100%;
  gap: 40px;
  align-items: center;
}

.settings-content {
  flex-grow: 1;
}

.footer-box {
  display: flex;
  gap: 16px;
  height: 70px;
}

.footer-btn {
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

.footer-btn:hover {
  background-color: rgb(110, 131, 223);
}
</style>
