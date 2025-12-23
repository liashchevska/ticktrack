export function useFormSubmit({ onSuccess, onError }) {
  async function submit({ action }) {
    try {
      await action()
      await onSuccess?.()
    } catch (e) {
      onError?.(e)
    }
  }
  return { submit }
}
