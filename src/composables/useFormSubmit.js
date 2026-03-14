export function useFormSubmit({ onSuccess, onError }) {
  async function submit({ action }) {
    try {
      const result = await action()
      await onSuccess?.(result)
    } catch (e) {
      onError?.(e)
    }
  }
  return { submit }
}
