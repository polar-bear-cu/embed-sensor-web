<script setup lang="ts">
import { BASE_URL } from '@/config/env'
import axios from 'axios'
import { ref, onMounted } from 'vue'

const data = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const res = await axios.get(`${BASE_URL}/`)
    console.log(res)
    data.value = res.data
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <h1>Here’s fetched Data</h1>

    <p v-if="loading">Loading...</p>
    <p v-if="error">Error: {{ error }}</p>

    <pre v-if="data">{{ data }}</pre>
  </div>
</template>
