import { ref, computed } from 'vue'
import { API } from "@/api"
import { request } from "@/utils/request"
import { defineStore } from "pinia"
import { useStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', () => {
  const user = useStorage('user', {})
  const isAuthenticated = computed(() => (Object.keys(user.value).length > 0))

  async function login(payload) {
    const temp = await request(API.AUTH.LOGIN, 'POST', payload)
    user.value = temp.data.user
  }
  async function signup(payload) {
    const temp = await request(API.AUTH.SIGNUP, 'POST', payload)
  }
  async function logout() {
    await request(API.AUTH.SESSION, 'DELETE')
    user.value = null
  }
  return { user, isAuthenticated, login, signup, logout }
})

