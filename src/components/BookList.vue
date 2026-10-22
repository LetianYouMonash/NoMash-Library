<template>
  <div>
    <h1>Books with ISBN > 1000</h1>

    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} (ISBN: {{ book.isbn }})
        <button @click="updateBook(book)">Update</button>
        <button @click="deleteBook(book.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'

const books = ref([])

const fetchBooks = async () => {
  try {
    const q = query(
      collection(db, 'books'),
      where('isbn', '>', 1000),
      orderBy('isbn', 'asc')
    )

    const querySnapshot = await getDocs(q)
    const booksArray = []

    querySnapshot.forEach((document) => {
      booksArray.push({
        id: document.id,
        ...document.data()
      })
    })

    books.value = booksArray
  } catch (error) {
    console.error('Error fetching books: ', error)
  }
}

const updateBook = async (book) => {
  const newName = prompt('Enter the new book name:', book.name)

  if (newName === null || newName.trim() === '') {
    return
  }

  try {
    const bookRef = doc(db, 'books', book.id)

    await updateDoc(bookRef, {
      name: newName
    })

    await fetchBooks()
    alert('Book updated successfully!')
  } catch (error) {
    console.error('Error updating book: ', error)
  }
}

const deleteBook = async (id) => {
  const confirmed = confirm('Are you sure you want to delete this book?')

  if (!confirmed) {
    return
  }

  try {
    await deleteDoc(doc(db, 'books', id))

    await fetchBooks()
    alert('Book deleted successfully!')
  } catch (error) {
    console.error('Error deleting book: ', error)
  }
}

onMounted(() => {
  fetchBooks()
})
</script>
