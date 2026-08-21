import { reactive, computed } from 'vue'

export interface User {
  username: string
  phone: string
  email: string
  signature: string
}

interface AuthState {
  isLoggedIn: boolean
  user: User | null
}

const stored = uni.getStorageSync('auth')
const initialState: AuthState = stored
  ? JSON.parse(stored)
  : { isLoggedIn: false, user: null }

const state = reactive<AuthState>(initialState)

function saveState() {
  uni.setStorageSync('auth', JSON.stringify({
    isLoggedIn: state.isLoggedIn,
    user: state.user
  }))
}

export function useAuth() {
  const isLoggedIn = computed(() => state.isLoggedIn)
  const user = computed(() => state.user)

  function login(username: string, password: string): boolean {
    const users: any[] = JSON.parse(uni.getStorageSync('users') || '[]')
    const found = users.find(
      (u: any) => u.username === username && u.password === password
    )
    if (found) {
      state.isLoggedIn = true
      state.user = {
        username: found.username,
        phone: found.phone,
        email: found.email || '',
        signature: found.signature || ''
      }
      saveState()
      return true
    }
    return false
  }

  function register(username: string, password: string, phone: string): boolean {
    const users: any[] = JSON.parse(uni.getStorageSync('users') || '[]')
    if (users.some((u: any) => u.username === username)) {
      return false
    }
    users.push({ username, password, phone, email: '', signature: '' })
    uni.setStorageSync('users', JSON.stringify(users))
    state.isLoggedIn = true
    state.user = { username, phone, email: '', signature: '' }
    saveState()
    return true
  }

  function logout() {
    state.isLoggedIn = false
    state.user = null
    saveState()
  }

  function updateProfile(data: Partial<User>) {
    if (state.user) {
      Object.assign(state.user, data)
      saveState()
      const users: any[] = JSON.parse(uni.getStorageSync('users') || '[]')
      const idx = users.findIndex((u: any) => u.username === state.user!.username)
      if (idx !== -1) {
        if (data.email !== undefined) users[idx].email = data.email
        if (data.signature !== undefined) users[idx].signature = data.signature
        if (data.phone !== undefined) users[idx].phone = data.phone
        if (data.username !== undefined) users[idx].username = data.username
        uni.setStorageSync('users', JSON.stringify(users))
      }
    }
  }

  return { isLoggedIn, user, login, register, logout, updateProfile }
}
