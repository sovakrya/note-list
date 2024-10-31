<script setup lang="ts">
import { ref } from 'vue'

const noteText = ref('')
</script>

<template>
  <div class="header-box">
    <input type="text" v-model="noteText" class="header-input" />
    <button>+</button>
  </div>
</template>

<style scoped>
.header-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  border: solid 1px;
}

.header-input {
  flex-grow: 1;
}
</style>
