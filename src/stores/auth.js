import { ref, computed } from 'vue'
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { handleAuthResponse, request, } from '@/utils/request';
import { API } from '@/endpoints';
import router from '@/router';

export const useAuthStore = defineStore('auth', () => {
  const user = useStorage('user', null)
  const isAuthenticated = computed(() => (Object.keys(user.value).length > 0))
  const isVerificationPending = ref(false)

  async function login(payload) {
    const response = await request(API.AUTH.LOGIN, 'POST', payload)
    const { ok, errors, user } = handleAuthResponse(response)

    if (!ok && errors.length) throw errors
    user.value = user
  }

  async function signup(payload) {
    const response = await request(API.AUTH.SIGNUP, 'POST', payload)
    const { ok, errors, flows } = handleAuthResponse(response)
    if (!ok && errors.length) throw errors
    if (flows.some(flow => flow.id === 'verify_email' && flow.is_pending)) {
      isVerificationPending.value = true
    }
  }

  async function logout() {
    await request(API.AUTH.SESSION, 'DELETE')
    user.value = null
  }

  return { user, isAuthenticated, login, signup, logout }
})
