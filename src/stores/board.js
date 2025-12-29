import { defineStore } from "pinia";
import { request } from "@/utils/request";
import { API } from "@/endpoints";
import { ref } from 'vue'

export const useBoardsStore = defineStore('boards', () => {
  const isInitialized = ref(false)
  const isInitializing = ref(false)
  const boardList = ref([])
  const currentBoard = ref(null)

  function $reset() {
    boardList.value = []
    currentBoard.value = null
    isInitialized.value = false
  }

  async function initBoardList() {
    if (isInitialized.value || isInitializing.value) { return }
    isInitializing.value = true
    try {
      await fetchBoardList()
      isInitialized.value = true
    } finally {
      isInitializing.value = false
    }
  }

  async function fetchBoardList(payload) {
    const { ok, data } = await request(API.BOARD.LIST, 'GET')
    if (ok) { boardList.value = data }
  }
  async function fetchBoard(id, payload) {
    const { ok, data } = await request(API.BOARD.DETAIL(id), 'GET')
    if (ok) { currentBoard.value = data }
  }
  async function createBoard(payload) {
    const { ok, data } = await request(API.BOARD.LIST, 'POST', payload)
    if (ok) {
      boardList.value = [...boardList.value, data]
      currentBoard.value = data
    }
  }
  async function updateBoard(payload) { }
  async function deleteBoard(payload) { }

  return {
    isInitialized,
    boardList,
    currentBoard,
    initBoardList,
    $reset,
    fetchBoardList,
    fetchBoard,
    createBoard,
    updateBoard,
    deleteBoard
  }
})
