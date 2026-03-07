import { ref, onMounted, onUnmounted } from 'vue'

const openId = ref(null)

export function useDropdown() {

  // id open id is the same as id passed -> set null to close dropdown
  const toggle = (id) => { openId.value = openId.value === id ? null : id }
  const isOpen = (id) => { return openId.value === id }
  const close = () => { openId.value = null }
  const onEsc = (e) => { if (e.key === 'Escape') close() }

  onMounted(() => addEventListener('keydown', onEsc))
  onUnmounted(() => removeEventListener('keydown', onEsc))

  return { openId, toggle, isOpen, close }
}
