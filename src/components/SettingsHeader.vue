<script setup lang="ts"></script>

<template>
  <header class="header-box">
    <button class="header-btn">Удалить заметку</button>
    <button class="header-btn">Отменить изменения</button>
    <button class="header-btn">Повторить отмененое изменение</button>
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
</style>
