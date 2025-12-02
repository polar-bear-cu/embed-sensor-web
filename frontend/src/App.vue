<script setup lang="ts">
import { ref } from 'vue'
import { getSensorInformation } from './api/netpie'
import type { SensorData } from './interface/sensor'

const loading = ref(false)

const sensorData = ref<SensorData>({
  temperature: 0,
  humid: 0,
  light: 0,
})

async function fetchData() {
  try {
    loading.value = true

    const fetchedSensorData = await getSensorInformation()

    sensorData.value = {
      temperature: Math.floor(fetchedSensorData?.data.temperature ?? 0),
      humid: Math.floor(fetchedSensorData?.data.humid ?? 0),
      light: Math.floor(fetchedSensorData?.data.light ?? 0),
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

fetchData()
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center p-6">
    <h1 class="text-3xl font-bold mb-6 text-">Embed888 Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
      <div class="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
        <p class="text-gray-500 text-sm mb-1">Temperature</p>
        <p class="text-4xl font-bold text-blue-600">{{ sensorData.temperature }}°C</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
        <p class="text-gray-500 text-sm mb-1">Humidity</p>
        <p class="text-4xl font-bold text-green-600">{{ sensorData.humid }}%</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
        <p class="text-gray-500 text-sm mb-1">Light</p>
        <p class="text-4xl font-bold text-yellow-500">{{ sensorData.light }}</p>
      </div>
    </div>

    <button
      @click="fetchData"
      class="mt-8 px-6 py-3 bg-black text-white font-medium rounded-xl shadow cursor-pointer disabled:cursor-default"
      :disabled="loading"
    >
      {{ loading ? 'Refreshing...' : 'Refresh Data' }}
    </button>
  </div>
</template>
