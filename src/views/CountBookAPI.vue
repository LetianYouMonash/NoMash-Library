<template>
  <div>
    <pre>{{ JSON.stringify(bookData, null, 2) }}</pre>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const bookData = ref(null)

const getBookCount = async () => {
  try {
    const response = await axios.get(
      'https://us-central1-fit5032-67582.cloudfunctions.net/countBooks'
    )

    bookData.value = response.data
  } catch (error) {
    console.error('Error fetching book count:', error)
  }
}

onMounted(() => {
  getBookCount()
})
</script>
