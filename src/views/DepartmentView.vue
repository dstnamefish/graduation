<template>
  <div class="counter-container">
    <button @click="counter++">Increment</button>
    <p>Count: {{ counter }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const counter = ref(0);
</script>