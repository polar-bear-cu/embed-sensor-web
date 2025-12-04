<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { getSensorConnection, getSensorInformation } from './api/netpie'
import type { SensorData } from './interface/sensor'

const loading = ref(true)
const error = ref('')
const hasConnection = ref(0)
const isFirstLoading = ref(true)

const sensorData = ref<SensorData>({
  temperature: 0,
  humid: 0,
  light: 0,
})

async function fetchData() {
  try {
    if (isFirstLoading.value) {
      loading.value = true
    }
    error.value = ''

    const fetchSensorConnection = await getSensorConnection()
    const fetchedSensorData = await getSensorInformation()

    if (!fetchSensorConnection) {
      throw new Error('No connection...')
    }

    hasConnection.value = fetchSensorConnection.status

    if (!fetchedSensorData || !fetchedSensorData.data) {
      throw new Error('No data received from server')
    }

    sensorData.value = {
      temperature: Math.floor(fetchedSensorData.data.temperature ?? 0),
      humid: Math.floor(fetchedSensorData.data.humid ?? 0),
      light: Math.floor(fetchedSensorData.data.light ?? 0),
    }
  } catch (e: any) {
    console.error(e)
    error.value = e.message || 'Something went wrong while fetching data'
  } finally {
    if (isFirstLoading.value) {
      loading.value = false
      isFirstLoading.value = false
    }
  }
}

let intervalId: number

onMounted(() => {
  fetchData()
  intervalId = setInterval(fetchData, 1000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <div
    class="min-h-screen bg-linear-to-br from-gray-100 to-gray-300 flex flex-col items-center p-6"
  >
    <h1 class="text-4xl font-bold mb-8 text-gray-900">Embed888 Dashboard</h1>

    <div
      v-if="loading"
      class="mb-6 p-4 bg-blue-100 text-blue-700 rounded-2xl max-w-5xl w-full text-center font-medium shadow-md"
    >
      Loading sensor data...
    </div>

    <div
      v-if="!loading && !hasConnection"
      class="mb-6 p-4 bg-yellow-100 text-yellow-700 rounded-2xl max-w-5xl w-full text-center font-medium shadow-md"
    >
      No connection to sensors...
    </div>

    <div
      v-if="!loading && hasConnection"
      class="mb-6 p-4 bg-green-100 text-green-700 rounded-2xl max-w-5xl w-full text-center font-medium shadow-md"
    >
      Connection successful
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
      <div
        class="bg-white p-6 rounded-3xl shadow-xl transform transition hover:scale-105 hover:shadow-2xl"
      >
        <p class="text-gray-500 text-sm mb-2 uppercase tracking-wide font-semibold">Temperature</p>
        <p v-if="hasConnection" class="text-5xl font-bold text-blue-600">
          {{ sensorData.temperature }}°C
        </p>
        <p v-else class="text-5xl font-bold text-gray-400">-</p>
      </div>

      <div
        class="bg-white p-6 rounded-3xl shadow-xl transform transition hover:scale-105 hover:shadow-2xl"
      >
        <p class="text-gray-500 text-sm mb-2 uppercase tracking-wide font-semibold">Humidity</p>
        <p v-if="hasConnection" class="text-5xl font-bold text-green-600">
          {{ sensorData.humid }}%
        </p>
        <p v-else class="text-5xl font-bold text-gray-400">-</p>
      </div>

      <div
        class="bg-white p-6 rounded-3xl shadow-xl transform transition hover:scale-105 hover:shadow-2xl"
      >
        <p class="text-gray-500 text-sm mb-2 uppercase tracking-wide font-semibold">Light</p>
        <p v-if="hasConnection" class="text-5xl font-bold text-yellow-500">
          {{ sensorData.light }}
        </p>
        <p v-else class="text-5xl font-bold text-gray-400">-</p>
      </div>
    </div>

    <div
      v-if="error"
      class="mt-6 p-4 bg-red-100 text-red-600 rounded-2xl max-w-5xl w-full text-center font-medium shadow-md animate-pulse"
    >
      {{ error }}
    </div>
  </div>
</template>
