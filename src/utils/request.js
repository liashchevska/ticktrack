import Cookies from "js-cookie";


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
  if (typeof body != undefined) {
    options.headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(data)
  }
  const response = await fetch(endpoint, options)
  return await handleResponse(response)
}

async function handleResponse(response) {
  const text = await response.text()
  const data = text ? JSON.parse(text) : null
  console.log(data)
  // if (!response.ok) {
  //   const error = (data && data.errors) || response.statusText
  //   return Promise.reject(error)
  // }
  return data
}
export { request }
