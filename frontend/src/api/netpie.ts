import { BASE_URL, CLIENT_ID, TOKEN } from '@/config/env'
import type { SensorData } from '@/interface/sensor'
import axios from 'axios'

interface SensorInformationResponse {
  data: SensorData
}

export async function getSensorInformation() {
  try {
    const res = await axios.get<SensorInformationResponse>(`${BASE_URL}/shadow/data`, {
      headers: {
        Authorization: `Device ${CLIENT_ID}:${TOKEN}`,
      },
    })
    return res.data
  } catch (err) {
    console.error(err)
    return null
  }
}
