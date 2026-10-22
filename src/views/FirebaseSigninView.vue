<template>
  <div class="signin-container">
    <h1>Sign in</h1>

    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>

    <p>
      <select v-model="role">
        <option disabled value="">Select Role</option>
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>
    </p>

    <p><button @click="signin">Sign in via Firebase</button></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const role = ref('')
const router = useRouter()
const auth = getAuth()

const signin = () => {
  if (role.value === '') {
    alert('Please select a role')
    return
  }

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log('Firebase Sign in Successful!')
      console.log('Current User:', auth.currentUser)
      console.log('Role:', role.value)
      localStorage.setItem('role', role.value)
      router.push('/')
    })
    .catch((error) => {
      console.log(error.code)
    })
}
</script>

<style scoped>
.signin-container {
  width: 400px;
  margin: 80px auto;
  text-align: center;
}

.signin-container input,
.signin-container select {
  width: 100%;
  padding: 8px;
}

.signin-container button {
  padding: 8px 16px;
}
</style>