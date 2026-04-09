import { ref, computed } from 'vue'
import { useStorage, useSessionStorage } from "@vueuse/core"
import { defineStore } from "pinia"
import { handleAuthResponse, request } from '@/utils/request'
import { API } from '@/endpoints'
import { useBoardStore } from './board'
import { useTicketStore } from './ticket'

export const useAuthStore = defineStore('auth', () => {
  const boardStore = useBoardStore()
  const ticketStore = useTicketStore()
  const user = useStorage('user', {})
  const isDemo = computed(() => !!user.value?.is_demo)
  const isAuthenticated = computed(() => !!user.value?.id)
  const isVerificationPending = useSessionStorage('isVerificationPending', false)
  const isPasswordResetPending = useSessionStorage('isPasswordResetPending', false)

  function $reset() {
    user.value = {}
    isVerificationPending.value = false
    isPasswordResetPending.value = false
    boardStore.$reset()
    ticketStore.$reset()
  }

  async function demoLogin() {
    await login({}, API.AUTH.DEMO_LOGIN)
  }

  // If server response with 409 C onfict try logging out
  // and then retrying action once
  async function retryOnConflictOnce(action, retry = true) {
    const response = await action()
    if (response.status === 409 && retry) {
      await logout()
      return retryOnConflictOnce(action, false)
    }
    return response
  }

  async function login(payload, endpoint = API.AUTH.LOGIN) {
    const response = await retryOnConflictOnce(() => request(endpoint, 'POST', payload))
    const { ok, errors, verificationPendingStatus, user: userData } = handleAuthResponse(response)
    if (!ok) {
      return { ok, errors }
    }
    isVerificationPending.value = verificationPendingStatus
    user.value = userData
    return { ok }
  }

  async function signup(payload) {
    const response = await retryOnConflictOnce(() => request(API.AUTH.SIGNUP, 'POST', payload))
    const { ok, errors, verificationPendingStatus } = handleAuthResponse(response)
    if (!ok) {
      return { ok, errors }
    }
    isVerificationPending.value = verificationPendingStatus
    return { ok }
  }

  async function verifyEmail(payload) {
    const response = await request(API.AUTH.VERIFY_EMAIL, 'POST', payload)
    const { ok, errors, user: userData } = handleAuthResponse(response)
    if (!ok) {
      return { ok, errors }
    }
    user.value = userData
    isVerificationPending.value = false
    return { ok }
  }

  async function resendVerificationCode() {
    const response = await request(API.AUTH.VERIFY_EMAIL_RESEND, 'POST')
    const { ok, status } = handleAuthResponse(response)
    // if (!ok && status === 429) { throw {} }
    return { ok }
  }

  async function requestPasswordReset(payload) {
    const response = await request(API.AUTH.REQUEST_PASSWORD_RESET, 'POST', payload)
    const { ok, errors, passwordResetPendingStatus } = handleAuthResponse(response)
    if (!ok) {
      return { ok, errors }
    }
    isPasswordResetPending.value = passwordResetPendingStatus
    return { ok }

  }

  async function resetPassword(payload) {
    const response = await request(API.AUTH.RESET_PASSWORD, 'POST', payload)
    const { ok, errors, passwordResetPendingStatus } = handleAuthResponse(response)
    if (!ok) {
      return { ok, errors }
    }
    isPasswordResetPending.value = passwordResetPendingStatus
    return { ok }
  }

  async function logout() {
    await request(API.AUTH.SESSION, 'DELETE')
    $reset()
    // boardStore.$reset()
  }

  async function deleteAccount() {
    await request(API.AUTH.DELETE_ACCOUNT, 'DELETE')
    $reset()
    // boardStore.$reset()
  }

  return {
    user,
    isDemo,
    isAuthenticated,
    isVerificationPending,
    isPasswordResetPending,
    $reset,
    demoLogin,
    login,
    signup,
    logout,
    verifyEmail,
    resendVerificationCode,
    requestPasswordReset,
    resetPassword,
    deleteAccount,
    retryOnConflictOnce
  }
})
