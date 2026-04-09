import { API } from "@/endpoints";
import { useAuthStore } from "@/stores/auth";
import { useGlobalErrorStore } from "@/stores/error";
import Cookies from "js-cookie";

let csrfRefreshPromise = null

function refreshCsrfToken() {
  if (!csrfRefreshPromise) {
    csrfRefreshPromise = fetch(API.CSRF, { credentials: 'include' })
      .finally(() => { csrfRefreshPromise = null })
  }
  return csrfRefreshPromise
}

async function request(endpoint, method, payload, triedCsrfTokenRefresh = false) {
  const errorStore = useGlobalErrorStore()
  const csrftoken = Cookies.get('csrftoken')
  const options = {
    method: method,
    headers: {
      'Accept': 'application/json',
      'X-CSRFToken': csrftoken,
    },
    credentials: 'include'
  }

  if (payload !== undefined) {
    options.headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(payload)
  }

  try {
    errorStore.reset()
    const response = await fetch(endpoint, options)
    if (response.status === 403 && !triedCsrfTokenRefresh) {
      await refreshCsrfToken()
      return request(endpoint, method, payload, true)
    }
    if (response.status === 403) {
      const authStore = useAuthStore()
      authStore.$reset()
      window.location.href = '/login'
      return { ok: false, status: 403 }
    }
    // Throw on server errors (5xx)
    if (response.status >= 500) {
      throw response
    }
    const parsed = await parseResponse(response)
    return normalizeResponse(parsed)
  }

  catch (error) {
    // Catch global errors such as server down and save them directly to store
    const normalized = {
      ok: false,
      status: error.status ?? null,
      statusText: error.statusText ?? 'Network Error',
    }
    errorStore.set(normalized)
    return normalized
  }
}

async function parseResponse(response) {
  const text = await response.text()
  const body = text ? JSON.parse(text) : null
  return {
    ...body,
    ok: response.ok,
    status: response.status,
    statusText: response.statusText
  }
}

function normalizeResponse(response) {
  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    data: response.data ?? null,
    meta: response.meta ?? null,
    errors: response.errors ?? [],
  }
}

function getFlowStatus(flows, flowId) {
  return flows.some(flow => flow.id === flowId && flow.is_pending)
}

function handleAuthResponse(response) {
  const { data, ...rest } = response
  const flows = data?.flows ?? []
  return {
    ...rest,
    user: data?.user ?? {},
    verificationPendingStatus: getFlowStatus(flows, 'verify_email'),
    passwordResetPendingStatus: getFlowStatus(flows, 'password_reset_by_code')
  }
}

export { request, handleAuthResponse }
