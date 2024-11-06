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
  <dialog ref="cancelEditingDialog" class="modal-box">
    <div class="modal-content-box">
      <span class="modal-title">Вы точно хотите отменить редактирование?</span>

      <div class="modal-actions-box">
        <button class="modal-btn modal-btn-ok" @click="emits('undoEditing')">
          Да
        </button>
        <button class="modal-btn modal-btn-cancel" @click="closeDialog">
          Отмена
        </button>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.modal-box {
  margin: auto;
  padding: 0;
  border: none;
  border-radius: 8px;
}

.modal-box::backdrop {
  background-color: rgba(0, 0, 0, 0.39);
}

.modal-content-box {
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  width: 500px;
  height: 200px;
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
}

.modal-actions-box {
  display: flex;
  gap: 18px;
}

.modal-btn {
  width: 70px;
  height: 34px;
  background: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s;
}

.modal-btn-ok {
  background-color: rgb(227 227 227);
}

.modal-btn-ok:hover {
  background-color: rgb(209, 209, 209);
}

.modal-btn-cancel {
  background-color: rgb(63, 88, 201);
  color: azure;
  font-weight: 600;
}

.modal-btn-cancel:hover {
  background-color: rgb(86, 112, 226);
}
</style>
