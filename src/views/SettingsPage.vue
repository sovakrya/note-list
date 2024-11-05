<script setup lang="ts">
import SettingsContent from '@/components/SettingsContent.vue'
import SettingsHeader from '@/components/SettingsHeader.vue'
import { getNote, type Note, type Todo } from '@/service/noteApi'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

type ModifiedNote = {
  titleNote?: string
  todoDocumentId?: string
  action: 'toggle' | 'delete' | 'add' | 'update' | 'updateNoteTitle'
  from: unknown
}

const queueСhanges: ModifiedNote[] = []
const stackСanceledСhanges: ModifiedNote[] = []

const route = useRoute()
const id = route.params.noteId as string
const note = ref<Note>()
const editableNote = ref<Note>()

getNote(id).then(res => {
  note.value = res.data
  editableNote.value = JSON.parse(JSON.stringify(note.value))
})

function toggleTodo(modifiedTodo: { documentId: string; from: boolean }) {
  queueСhanges.push({
    todoDocumentId: modifiedTodo.documentId,
    action: 'toggle',
    from: modifiedTodo.from,
  })

  editableNote.value?.todos?.forEach(todo => {
    if (todo.documentId === modifiedTodo.documentId) {
      todo.isDone = !modifiedTodo.from
    }
  })
}

function removeTodo(todo: Todo) {
  queueСhanges.push({
    todoDocumentId: todo.documentId,
    action: 'delete',
    from: todo,
  })

  const idx = editableNote.value?.todos?.findIndex(val => {
    return val.documentId === todo.documentId
  })
  editableNote.value!.todos!.splice(idx!, 1)
}
let str = 'sdfsdf'
let newId = 1000
function addNewTodo(title: string) {
  queueСhanges.push({
    action: 'add',
    from: 'title',
  })
  str += 'a'
  newId += 1
  editableNote.value?.todos?.push({
    documentId: str,
    id: newId,
    isDone: false,
    title,
  })
}

function updateTodo(updatedTodo: {
  title: string
  documentId: string
  from: string
}) {
  queueСhanges.push({
    todoDocumentId: updatedTodo.documentId,
    action: 'update',
    from: updatedTodo.from,
  })

  editableNote.value?.todos?.forEach(todo => {
    if (todo.documentId === updatedTodo.documentId) {
      todo.title = updatedTodo.title
    }
  })
}

function updateNoteTitle({ title, from }: { title: string; from: string }) {
  queueСhanges.push({
    titleNote: title,
    action: 'updateNoteTitle',
    from,
  })
  console.log({ title, from })
  editableNote.value!.title = title
  console.log(editableNote.value?.title)
}

function undoChange() {
  const changeItem = queueСhanges.pop()

  const idx = editableNote.value?.todos?.findIndex(todo => {
    return todo.documentId === changeItem!.todoDocumentId
  })

  switch (changeItem?.action) {
    case 'add':
      editableNote.value?.todos?.pop()
      stackСanceledСhanges.push(changeItem!)
      break
    case 'toggle':
      const currentTodo = editableNote.value?.todos![idx!]
      editableNote.value!.todos![idx!].isDone = !currentTodo?.isDone
      stackСanceledСhanges.push(changeItem!)
      break
    case 'delete':
      editableNote.value?.todos?.push(changeItem.from as Todo)
      stackСanceledСhanges.push(changeItem!)
      break
    case 'update':
      editableNote.value?.todos?.forEach(todo => {
        if (todo.documentId === changeItem.todoDocumentId) {
          todo.title = changeItem.from as string
          stackСanceledСhanges.push({
            action: changeItem.action,
            from: todo.title,
            todoDocumentId: changeItem.todoDocumentId,
          })
        }
      })
      break
    case 'updateNoteTitle':
      stackСanceledСhanges.push({
        action: changeItem.action,
        from: editableNote.value?.title,
      })
      editableNote.value!.title = changeItem.from as string
      break
  }
}

function redoUndoneChange() {}
</script>

<template>
  <div v-if="!editableNote">Загрузка...</div>

  <div class="settings-main-box" v-else>
    <SettingsHeader
      @undoChange="undoChange"
      @redoUndoneChange="redoUndoneChange"
      @deleteNote=""
    />
    <SettingsContent
      class="settings-content"
      :editableNote="editableNote"
      @checkTodo="toggleTodo"
      @deleteTodo="removeTodo"
      @addTodo="addNewTodo"
      @update-todo="updateTodo"
      @update-note-title="updateNoteTitle"
    />

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
