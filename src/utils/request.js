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
  return await parseResponse(response)
}

async function parseResponse(response) {
  const text = await response.text()
  const data = text ? JSON.parse(text) : null
  return { ...data, ok: response.ok, statusText: response.statusText }
}

function handleAuthResponse(response) {
  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    user: response.data?.user ?? {},
    flows: response.data?.flows ?? [],
    errors: response.errors ?? [],
    meta: response.meta ?? []
  }
}

function groupErrorsByParam(errors) {
  const groupedErrors = {}
  for (var error of errors) {
    (groupedErrors[error.param] ??= []).push(error.message)
  }
  return groupedErrors
}

export { request, handleAuthResponse, groupErrorsByParam }
