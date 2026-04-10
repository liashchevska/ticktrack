export function useFormSubmit({ onSuccess, onError }) {
  async function submit({ action }) {
    try {
      const result = await action()
      if (!result.ok && result.errors?.length) throw result.errors
      await onSuccess?.(result)
    } catch (e) {
      onError?.(e)
    }
  }
  return { submit }
}
