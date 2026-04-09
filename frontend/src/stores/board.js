import { defineStore } from "pinia";
import { request } from "@/utils/request";
import { API } from "@/endpoints";
import { ref, computed } from 'vue'

export const useBoardStore = defineStore('board', () => {
  const isInitialized = ref(false)
  const isInitializing = ref(false)
  const boardList = ref([])
  // List of board IDs as strings because it's used to check if the router's ID parameter corresponds to an existing board
  const boardIdsList = computed(() => boardList.value.map(item => String(item.id)))

  function $reset() {
    boardList.value = []
    isInitialized.value = false
    isInitializing.value = false
  }

  async function initBoardList() {
    if (isInitialized.value || isInitializing.value) return
    isInitializing.value = true
    try {
      const { ok } = await fetchBoardList()
      if (ok) { isInitialized.value = true }
    } finally {
      isInitializing.value = false
    }
  }

  async function fetchBoardList() {
    const { ok, data, errors } = await request(API.BOARD.LIST, 'GET')
    if (!ok) {
      return { ok, errors }
    }
    boardList.value = data
    return { ok, data }
  }

  async function createBoard(payload) {
    const { ok, data, errors } = await request(API.BOARD.LIST, 'POST', payload)
    if (!ok) {
      return { ok, errors }
    }
    boardList.value = [...boardList.value, data]
    return { ok, data }
  }

  async function updateBoard(id, payload) {
    const { ok, data, errors } = await request(API.BOARD.DETAIL(id), 'PUT', payload)
    if (!ok) {
      return { ok, errors }
    }
    boardList.value = boardList.value.map(board => board.id == id ? data : board)
    return { ok, data }
  }

  async function deleteBoard(id) {
    const { ok, errors } = await request(API.BOARD.DETAIL(id), 'DELETE')
    if (!ok) {
      return { ok, errors }
    }
    boardList.value = boardList.value.filter(board => board.id !== id)
    return { ok }
  }

  return {
    isInitialized,
    boardList,
    boardIdsList,
    initBoardList,
    $reset,
    fetchBoardList,
    createBoard,
    updateBoard,
    deleteBoard,
  }
})
