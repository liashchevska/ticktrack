import { ref } from 'vue'

const DESKTOP_BREAKPOINT = 1024

const mediaQuery = window.matchMedia(
  `(min-width: ${DESKTOP_BREAKPOINT}px)`
)
const isDesktop = ref(mediaQuery.matches)

mediaQuery.addEventListener('change', (event) => {
  isDesktop.value = event.matches
})

export function useBreakpoint(desktopWidth = 1024) {
  return { isDesktop }
}
