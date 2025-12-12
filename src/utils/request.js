import Cookies from "js-cookie";

const storage = window.sessionStorage

async function request(endpoint, method, data) {
  const csrftoken = Cookies.get('csrftoken')
  const options = {
    method: method,
    headers: {
      'Accept': 'application/json',
      'X-CSRFToken': csrftoken,
    },
    credentials: 'include'
  }
  const token = storage.getItem('sessionToken')
  if (token) options.headers['X-Session-Token'] = token
  if (typeof body != undefined) {
    options.headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(data)
  }
  const response = await fetch(endpoint, options)
  return await handleResponse(response)
}

async function handleResponse(response) {
  const text = await response.text()
  const _data = text ? JSON.parse(text) : null

  if (_data.status === 401) {
    storage.removeItem('sessionToken')
    return _data
  }

  const token = _data.meta?.sessionToken
  if (token) storage.setItem('sessionToken', token)

  if (!response.ok) {
    const errors = _data.errors || response.statusText
    throw errors
  }

  return _data
}

function groupErrorsByParam(errors) {
  const groupedErrors = {}
  for (var error of errors) {
    (groupedErrors[error.param] ??= []).push(error.message)
  }
  return groupedErrors
}
export { request, groupErrorsByParam }
