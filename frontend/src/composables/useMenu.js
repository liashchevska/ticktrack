import { ref, onMounted, onUnmounted } from 'vue'

const activeMenu = ref(null)

export function useMenu() {

  // id open id is the same as id passed -> set null to close dropdown
  const toggleMenu = (id) => { activeMenu.value = activeMenu.value === id ? null : id }
  const isMenuOpen = (id) => { return activeMenu.value === id }
  const closeMenu = () => { activeMenu.value = null }

  const onEsc = (e) => { if (e.key === 'Escape') closeMenu() }
  const onClick = (e) => closeMenu()

  onMounted(() => {
    addEventListener('keydown', onEsc)
    addEventListener('click', onClick)
  })

  onUnmounted(() => {
    removeEventListener('keydown', onEsc)
    removeEventListener('click', onClick)
  })

  return { activeMenu, toggleMenu, isMenuOpen, closeMenu }
}
