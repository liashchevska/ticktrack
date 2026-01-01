import { ref, computed } from 'vue'
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { handleAuthResponse, request, } from '@/utils/request';
import { API } from '@/endpoints';
import { useSessionStorage } from '@vueuse/core';
import { useBoardStore } from './board';

export const useAuthStore = defineStore('auth', () => {
  const boardStore = useBoardStore()
  const user = useStorage('user', {})
  const isAuthenticated = computed(() => (Object.keys(user.value).length > 0))
  const isVerificationPending = useSessionStorage('isVerificationPending', false)
  const isPasswordResetPending = useSessionStorage('isPasswordResetPending', false)

  function $reset() {
    user.value = {}
    isVerificationPending.value = false
    isPasswordResetPending.value = false
  }

  async function login(payload) {
    const response = await request(API.AUTH.LOGIN, 'POST', payload)
    const { ok, errors, verificationPendingStatus, user: userData } = handleAuthResponse(response)

    if (!ok && errors.length) { throw errors }
    isVerificationPending.value = verificationPendingStatus
    user.value = userData
  }

  async function signup(payload) {
    const response = await request(API.AUTH.SIGNUP, 'POST', payload)
    const { ok, errors, verificationPendingStatus } = handleAuthResponse(response)
    if (!ok && errors.length) { throw errors }
    isVerificationPending.value = verificationPendingStatus
  }

  async function verifyEmail(payload) {
    const response = await request(API.AUTH.VERIFY_EMAIL, 'POST', payload)
    const { ok, errors, user: userData } = handleAuthResponse(response)
    if (!ok && errors.length) { throw errors }
    user.value = userData
    isVerificationPending.value = false
  }

  async function resendVerificationCode() {
    const response = await request(API.AUTH.VERYFY_EMAIL_RESEND, 'POST')
    const { ok, status } = handleAuthResponse(response)
    // if (!ok && status === 429) { throw {} }
  }

  async function requestPasswordReset(payload) {
    const response = await request(API.AUTH.REQUEST_PASSWORD_RESET, 'POST', payload)
    const { errors, passwordResetPendingStatus } = handleAuthResponse(response)
    if (errors.length) { throw errors }
    isPasswordResetPending.value = passwordResetPendingStatus
  }

  async function resetPassword(payload) {
    const response = await request(API.AUTH.RESET_PASSWORD, 'POST', payload)
    const { errors, passwordResetPendingStatus } = handleAuthResponse(response)
    if (errors.length) { throw errors }
    isPasswordResetPending.value = passwordResetPendingStatus
  }

  async function logout() {
    await request(API.AUTH.SESSION, 'DELETE')
    $reset()
    boardStore.$reset()
  }

  return {
    user,
    isAuthenticated,
    isVerificationPending,
    isPasswordResetPending,
    login,
    signup,
    logout,
    verifyEmail,
    resendVerificationCode,
    requestPasswordReset,
    resetPassword
  }
})
