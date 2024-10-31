<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  noteTitle: string
}>()

onMounted(() => {
  if (!warningDialog) {
    return
  }

  warningDialog.value?.addEventListener('click', closeOnBackDropClick)
})

function closeOnBackDropClick({ currentTarget, target }: MouseEvent) {
  const dialog = currentTarget as HTMLDialogElement
  const isClickedOnBackDrop = target === dialog

  if (isClickedOnBackDrop) {
    dialog.close()

    show.value = false
  }
}
const warningDialog = ref<HTMLDialogElement>()

const show = defineModel<boolean>('show', { default: false })

watch(show, show => {
  if (show) {
    openDialog()
  } else {
    closeDialog()
  }
})

function openDialog() {
  if (!warningDialog.value) {
    return
  }

  warningDialog.value.showModal()

  show.value = true
}

function closeDialog() {
  if (!warningDialog.value) {
    return
  }

  warningDialog.value.close()

  show.value = false
}
</script>

<template>
  <dialog ref="warningDialog" class="remove-warning-box">
    <div class="remove-warning-content-box">
      <span>Вы точно хотите удалить заметку?</span>

      <div>
        <button>Да</button>
        <button @click="closeDialog">Отмена</button>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.remove-warning-box {
  margin: auto;
  padding: 0;
  border: none;
  border-radius: 8px;
}

.remove-warning-content-box {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
