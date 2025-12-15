const CLIENT = import.meta.env.VUE_APP_CLIENT || 'browser'
const BASE_URL = import.meta.env.VUE_APP_API_URL || 'http://127.0.0.1:8000'

export const API = {
  CSRF: `${BASE_URL}/api/csrf/`,
  AUTH: {
    LOGIN: `${BASE_URL}/_allauth/${CLIENT}/v1/auth/login`,
    SESSION: `${BASE_URL}/_allauth/${CLIENT}/v1/auth/session`,
    SIGNUP: `${BASE_URL}/_allauth/${CLIENT}/v1/auth/signup`,
    VERIFY_EMAIL: `${BASE_URL}/_allauth/${CLIENT}/v1/auth/email/verify`,
    VERYFY_EMAIL_RESEND: `${BASE_URL}/_allauth/${CLIENT}/v1/auth/email/verify/resend`,
    REQUEST_PASSWORD_RESET: `${BASE_URL}/_allauth/${CLIENT}/v1/auth/password/request`,
    RESET_PASSWORD: `${BASE_URL}/_allauth/${CLIENT}/v1/auth/password/reset`
  },
  TICKET: {
    LIST: `${BASE_URL}/api/tickets`,
    DETAIL: (id) => `${BASE_URL}/api/tickets/${id}`
  },
  BOARD: {
    LIST: `${BASE_URL}/api/boards`,
    DETAIL: (id) => `${BASE_URL}/api/boards/${id}`
  }
}
