import { ref } from 'vue'
import { groupErrorsByParam } from '../utils/request'

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
