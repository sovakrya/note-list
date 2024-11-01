<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

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

const emits = defineEmits<{
  removeNote: []
}>()

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
      <span class="warning-title">Вы точно хотите удалить заметку?</span>

      <div class="warning-actions-box">
        <button
          @click="emits('removeNote')"
          class="warning-btn warning-btn-ok"
          @click.stop
        >
          Да
        </button>
        <button
          @click="closeDialog"
          class="warning-btn warning-btn-cancel"
          @click.stop
        >
          Отмена
        </button>
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

.remove-warning-box::backdrop {
  background-color: rgba(0, 0, 0, 0.39);
}

.remove-warning-content-box {
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  width: 500px;
  height: 200px;
}

.warning-title {
  font-weight: 600;
  font-size: 22px;
}

.warning-actions-box {
  display: flex;
  gap: 18px;
}

.warning-btn {
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

.warning-btn-ok {
  background-color: rgb(63, 88, 201);
  color: azure;
  font-weight: 600;
}

.warning-btn-ok:hover {
  background-color: rgb(86, 112, 226);
}

.warning-btn-cancel {
  background-color: rgb(227 227 227);
}

.warning-btn-cancel:hover {
  background-color: rgb(209, 209, 209);
}
</style>
