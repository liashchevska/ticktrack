const CLIENT = import.meta.env.VITE_APP_CLIENT || 'browser'

export const API = {
  CSRF: `/api/csrf/`,
  AUTH: {
    LOGIN: `/auth/${CLIENT}/login/`,
    SESSION: `/auth/${CLIENT}/session/`,
    SIGNUP: `/auth/${CLIENT}/signup/`,
    VERIFY_EMAIL: `/auth/${CLIENT}/email/verify/`,
    VERYFY_EMAIL_RESEND: `/auth/${CLIENT}/email/verify/resend/`,
    REQUEST_PASSWORD_RESET: `/auth/${CLIENT}/password/request/`,
    RESET_PASSWORD: `/auth/${CLIENT}/password/reset/`,
    DELETE_ACCOUNT: '/api/delete-user/',
    DEMO_LOGIN: '/api/demo-login/',
  },
  TICKET: {
    LIST: `/api/tickets/`,
    FILTER: (params = {}) => `/api/tickets/?${new URLSearchParams(params).toString()}`,
    DETAIL: (id) => `/api/tickets/${id}/`
  },
  BOARD: {
    LIST: `/api/boards/`,
    DETAIL: (id) => `/api/boards/${id}/`
  },
  META: {
    TICKET_STATUS_LIST: `/api/meta/ticket-status-list/`
  }
}
