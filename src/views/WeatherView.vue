<template>
  <div class="weather-container">
    <h1>WEATHER APP</h1>

    <div class="search-bar">
      <input
        v-model="city"
        type="text"
        placeholder="Enter city name"
        @keyup.enter="searchByCity"
      />
      <button @click="searchByCity">Search</button>
    </div>

    <p v-if="loading">Loading weather...</p>
    <p v-if="error">{{ error }}</p>

    <main v-if="weatherData">
      <h2>
        {{ weatherData.name }},
        {{ weatherData.sys.country }}
      </h2>

      <img
        v-if="weatherData.weather?.[0]"
        :src="iconUrl"
        alt="Weather Icon"
      />

      <p>{{ weatherData.main.temp }} °C</p>
      <p>{{ weatherData.weather[0].description }}</p>
    </main>
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue'
import axios from 'axios'

const apiKey = 'bb93f280f4818a3cddf901a113857d58'

const city = ref('')
const weatherData = ref(null)
const loading = ref(false)
const error = ref('')

const iconUrl = computed(() => {
  const icon = weatherData.value?.weather?.[0]?.icon
  return icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : ''
})

const fetchWeatherData = async (params) => {
  loading.value = true
  error.value = ''
  weatherData.value = null

  try {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          ...params,
          appid: apiKey,
          units: 'metric'
        }
      }
    )

    weatherData.value = response.data
  } catch (err) {
    console.error('Error fetching weather:', err)
    error.value = 'Unable to fetch weather data.'
  } finally {
    loading.value = false
  }
}

const searchByCity = async () => {
  if (!city.value.trim()) return
  await fetchWeatherData({q: city.value.trim()})
}

const fetchCurrentLocationWeather = () => {
  if (!navigator.geolocation) {
    error.value = 'Geolocation is not supported by this browser.'
    return
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      fetchWeatherData({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      })
    },
    () => {
      error.value = 'Unable to access your current location.'
    }
  )
}

onMounted(() => {
  fetchCurrentLocationWeather()
})
</script>

<style scoped>
.weather-container {
  max-width: 600px;
  margin: 80px auto;
  text-align: center;
}

.search-bar {
  margin: 20px 0;
}

.search-bar input {
  padding: 8px;
  width: 220px;
}

.search-bar button {
  padding: 8px 16px;
  margin-left: 8px;
}

main {
  margin-top: 25px;
}

main img {
  width: 100px;
  height: 100px;
}
</style>
