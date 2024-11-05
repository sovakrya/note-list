<script setup lang="ts">
import type { Todo } from '@/service/noteApi'
import { ref } from 'vue'

const emits = defineEmits<{
  removeTodo: []
  executeTodo: [{ documentId: string; from: boolean; to: boolean }]
  updateTodo: [{ title: string; documentId: string; from: string }]
}>()

const props = defineProps<{
  todo: Todo
}>()

function updateTodoEmit(e: Event) {
  if (!(e.target instanceof HTMLElement)) {
    return
  }
  let temp = todoTitle
  todoTitle = e.target.textContent!
  emits('updateTodo', {
    title: todoTitle,
    documentId: props.todo.documentId,
    from: temp,
  })
}

let todoTitle = props.todo.title
</script>

<template>
  <div class="todo-item-wrapper">
    <div class="todo-item-box">
      <input
        type="checkbox"
        style="width: 18px; height: 18px"
        :checked="props.todo.isDone"
        @click="
          emits('executeTodo', {
            documentId: props.todo.documentId,
            from: props.todo.isDone,
            to: !props.todo.isDone,
          })
        "
      />

      <span
        class="todo-item-title"
        contenteditable
        @blur="e => updateTodoEmit(e)"
        >{{ props.todo.title }}</span
      >
    </div>

    <button class="todo-item-remove-btn" @click="emits('removeTodo')">
      Удалить
    </button>
  </div>
</template>

<style scoped>
.todo-item-wrapper {
  display: flex;
  gap: 6px;
  width: 646px;
  height: 60px;
  align-items: center;
  background-color: rgb(169 185 255 / 33%);
  color: #132ea8;
  border-radius: 5px;
  padding: 10px 20px;
}

.todo-item-box {
  display: flex;
  gap: 8px;
  flex-grow: 1;
  align-items: center;
}

.todo-item-title {
  font-size: 16px;
}

.todo-item-remove-btn {
  background: none;
  color: #132ea8;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  height: 30px;
  width: 80px;
  border-radius: 5px;
  transition: all 0.3s;
}

.todo-item-remove-btn:hover {
  background-color: rgba(166, 174, 209, 0.425);
}
</style>
