<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const emits = defineEmits<{
  undoEditing: []
}>()

onMounted(() => {
  if (!cancelEditingDialog) {
    return
  }

  cancelEditingDialog.value?.addEventListener('click', closeOnBackDropClick)
})

function closeOnBackDropClick({ currentTarget, target }: MouseEvent) {
  const dialog = currentTarget as HTMLDialogElement
  const isClickedOnBackDrop = target === dialog

  if (isClickedOnBackDrop) {
    dialog.close()

    show.value = false
  }
}

const cancelEditingDialog = ref<HTMLDialogElement>()

const show = defineModel<boolean>('show', { default: false })

watch(show, show => {
  if (show) {
    openDialog()
  } else {
    closeDialog()
  }
})

function openDialog() {
  if (!cancelEditingDialog.value) {
    return
  }

  cancelEditingDialog.value.showModal()

  show.value = true
}

function closeDialog() {
  if (!cancelEditingDialog.value) {
    return
  }

  cancelEditingDialog.value.close()

  show.value = false
}
</script>

<template>
  <dialog ref="cancelEditingDialog" class="remove-warning-box">
    <div class="remove-warning-content-box">
      <span class="warning-title"
        >Вы точно хотите отменить редактирование?</span
      >

      <div class="warning-actions-box">
        <button
          class="warning-btn warning-btn-ok"
          @click="emits('undoEditing')"
        >
          Да
        </button>
        <button class="warning-btn warning-btn-cancel" @click="closeDialog">
          Отмена
        </button>
      </div>
    </div>
  </dialog>
</template>
