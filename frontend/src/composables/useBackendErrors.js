import { ref } from 'vue'

function groupErrorsByParam(errors) {
  if (!errors) return {}
  const groupedErrors = {}
  for (var error of errors) {
    (groupedErrors[error.param] ??= []).push(error.message)
  }
  return groupedErrors
}

// remove backendErrors? + handle non-field errors?
export function useBackendErrors() {
  const backendErrors = ref([])

  function setErrors(errors, setFieldError) {
    backendErrors.value = groupErrorsByParam(errors)
    for (const field in backendErrors.value) {
      setFieldError(field, backendErrors.value[field])
    }

  }
  return { backendErrors, setErrors }
}
