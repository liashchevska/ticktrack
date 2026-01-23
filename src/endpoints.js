const CLIENT = import.meta.env.VUE_APP_CLIENT || 'browser'
const BASE_URL = import.meta.env.VUE_APP_API_URL || 'http://127.0.0.1:8000'

export const API = {
  CSRF: `${BASE_URL}/api/csrf/`,
  AUTH: {
    LOGIN: `${BASE_URL}/auth/${CLIENT}/login/`,
    SESSION: `${BASE_URL}/auth/${CLIENT}/session/`,
    SIGNUP: `${BASE_URL}/auth/${CLIENT}/signup/`,
    VERIFY_EMAIL: `${BASE_URL}/auth/${CLIENT}/email/verify/`,
    VERYFY_EMAIL_RESEND: `${BASE_URL}/auth/${CLIENT}/email/verify/resend/`,
    REQUEST_PASSWORD_RESET: `${BASE_URL}/auth/${CLIENT}/password/request/`,
    RESET_PASSWORD: `${BASE_URL}/auth/${CLIENT}/password/reset/`
  },
  TICKET: {
    LIST: `${BASE_URL}/api/tickets/`,
    FILTER: (params = {}) => `${BASE_URL}/api/tickets/?${new URLSearchParams(params).toString()}`,
    DETAIL: (id) => `${BASE_URL}/api/tickets/${id}/`
  },
  BOARD: {
    LIST: `${BASE_URL}/api/boards/`,
    DETAIL: (id) => `${BASE_URL}/api/boards/${id}/`
  },
  META: {
    TICKET_STATUS_LIST: `${BASE_URL}/api/meta/ticket-status-list/`
  }
}
