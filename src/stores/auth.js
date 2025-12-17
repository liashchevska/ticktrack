import { ref, computed } from 'vue'
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { handleAuthResponse, request, } from '@/utils/request';
import { API } from '@/endpoints';

export const useAuthStore = defineStore('auth', () => {
  const user = useStorage('user', {})
  const isAuthenticated = computed(() => (Object.keys(user.value).length > 0))
  const isVerificationPending = ref(false)

  async function login(payload) {
    const response = await request(API.AUTH.LOGIN, 'POST', payload)
    const { ok, errors, verificationPendingStatus, user: userData } = handleAuthResponse(response)

    if (!ok && errors.length) throw errors
    isVerificationPending.value = verificationPendingStatus
    user.value = userData
  }

  async function signup(payload) {
    const response = await request(API.AUTH.SIGNUP, 'POST', payload)
    const { ok, errors, verificationPendingStatus } = handleAuthResponse(response)
    if (!ok && errors.length) throw errors
    isVerificationPending.value = verificationPendingStatus
  }

  async function verifyEmail(payload) {
    const response = await request(API.AUTH.VERIFY_EMAIL, 'POST', payload)
    const { ok, errors, user: userData } = handleAuthResponse(response)
    if (!ok && errors.length) throw errors
    user.value = userData
    isVerificationPending.value = false
  }

  async function resendVerificationCode() {
    const response = await request(API.AUTH.VERYFY_EMAIL_RESEND, 'POST')
    const { ok, status } = handleAuthResponse(response)
    // if (!ok && status === 429) { throw {} }
  }

  async function logout() {
    await request(API.AUTH.SESSION, 'DELETE')
    user.value = {}
  }

  return { user, isAuthenticated, isVerificationPending, login, signup, logout, verifyEmail, resendVerificationCode }
})
