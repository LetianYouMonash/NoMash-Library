<template>
  <div class="page-container">
    <div class="add-book-container">
      <h1>Add Book</h1>

      <form @submit.prevent="addBook">
        <div>
          <label for="isbn">ISBN:</label>
          <input
            type="text"
            id="isbn"
            v-model="isbn"
            required
          />
        </div>

        <div>
          <label for="name">Name:</label>
          <input
            type="text"
            id="name"
            v-model="name"
            required
          />
        </div>

        <button type="submit">Add Book</button>
      </form>
    </div>

    <BookList />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import db from '../firebase/init.js'
import { collection, addDoc } from 'firebase/firestore'
import BookList from '../components/BookList.vue'

const isbn = ref('')
const name = ref('')

const addBook = async () => {
  try {
    const isbnNumber = Number(isbn.value)

    if (isNaN(isbnNumber)) {
      alert('Please enter a valid ISBN number.')
      return
    }

    await addDoc(collection(db, 'books'), {
      isbn: isbnNumber,
      name: name.value
    })

    isbn.value = ''
    name.value = ''

    alert('Book added successfully!')
  } catch (error) {
    console.error('Error adding book: ', error)
  }
}
</script>

<style scoped>
.page-container {
  width: 500px;
  margin: 80px auto;
  text-align: center;
}

.add-book-container {
  width: 400px;
  margin: 0 auto 50px;
}

.add-book-container div {
  margin-bottom: 15px;
  text-align: left;
}

.add-book-container label {
  display: block;
  margin-bottom: 5px;
}

.add-book-container input {
  width: 100%;
  padding: 8px;
}

.add-book-container button {
  padding: 8px 16px;
}
</style>