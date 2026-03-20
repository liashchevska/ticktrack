import { useBoardStore } from "@/stores/board"
import { useRoute } from "vue-router"
import { computed } from 'vue'

export function useActiveBoard() {
  const route = useRoute()
  const boardStore = useBoardStore()

  const activeBoard = computed(() =>
    boardStore.boardList.find(board => board.id === Number(route.params.id)) ?? null
  )

  return { activeBoard }
}
