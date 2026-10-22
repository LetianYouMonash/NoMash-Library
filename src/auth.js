import { ref } from 'vue'

export const isAuthenticated = ref(false)

export const login = (username, password) => {
  if (username === 'admin' && password === 'password') {
    isAuthenticated.value = true
    return true
  }

  return false
}

export const logout = () => {
  isAuthenticated.value = false
}