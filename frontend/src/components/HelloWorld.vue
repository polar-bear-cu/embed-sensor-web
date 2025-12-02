<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div>
    <h1 class="text-green-500 font-bold text-2xl">{{ msg }}</h1>
  </div>
</template>
