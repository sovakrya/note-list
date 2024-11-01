<script setup lang="ts">
import SettingsContent from '@/components/SettingsContent.vue'
import SettingsHeader from '@/components/SettingsHeader.vue'
import { getNote, type Note } from '@/service/noteApi'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.noteId as string
const note = ref<Note>()

onMounted(() => {
  getNote(id).then(res => {
    note.value = res.data
  })
})
</script>

<template>
  <div class="settings-main-box">
    <SettingsHeader />

    <SettingsContent class="settings-content" :note="note!" />

    <footer>
      <button>Отменить</button>
      <button>Сохранить</button>
    </footer>
  </div>
</template>

<style scoped>
.settings-main-box {
  display: flex;
  flex-direction: column;
  padding: 40px;
  height: 100%;
  gap: 24px;
}

.settings-content {
  flex-grow: 1;
}
</style>
