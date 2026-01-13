import { computed } from 'vue'


export function useEntityForm({
  entity,
  createAction,
  updateAction,
  getId = (entity) => entity.id
}) {

  const isInUpdateMode = computed(() => Boolean(entity.value))
  const action = computed(() => {
    if (!isInUpdateMode.value) { return createAction }
    return (values) => updateAction(getId(entity.value), values)
  })
  return { isInUpdateMode, action }
}
