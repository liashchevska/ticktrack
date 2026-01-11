import { API } from "@/endpoints";
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
  const response = await fetch(endpoint, options)
  if (response.status === 403 && !triedCsrfTokenRefresh) {
    await refreshCsrfToken()
    return request(endpoint, method, payload, true)
  }
  const parsed = await parseResponse(response)
  return normalizeResponse(parsed)
}

async function parseResponse(response) {
  const text = await response.text()
  const body = text ? JSON.parse(text) : null
  return { ...body, ok: response.ok, statusText: response.statusText }
}

function normalizeResponse(response) {
  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    data: response.data ?? null,
    meta: response.meta ?? null,
    errors: response.errors ?? null,
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
