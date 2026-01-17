import { defineStore } from "pinia";
import { request } from "@/utils/request";
import { API } from "@/endpoints";
import { ref } from 'vue'

export const useBoardStore = defineStore('board', () => {
  const isInitialized = ref(false)
  const isInitializing = ref(false)
  const boardList = ref([])

  function $reset() {
    boardList.value = []
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
    const { ok, data, errors } = await request(API.BOARD.LIST, 'GET')
    if (!ok) throw { errors }
    boardList.value = data
  }
  async function createBoard(payload) {
    const { ok, data, errors } = await request(API.BOARD.LIST, 'POST', payload)
    if (!ok) throw { errors }
    boardList.value = [...boardList.value, data]

  }
  async function updateBoard(id, payload) {
    const { ok, data, errors } = await request(API.BOARD.DETAIL(id), 'PUT', payload)
    if (!ok) throw { errors }
    boardList.value = boardList.value.map(board => board.id == id ? data : board)
  }
  async function deleteBoard(id, payload) {
    const { ok, errors } = await request(API.BOARD.DETAIL(id), 'DELETE')
    if (!ok) throw { errors }
    boardList.value = boardList.value.filter(board => board.id !== id)
  }

  return {
    isInitialized,
    boardList,
    initBoardList,
    $reset,
    fetchBoardList,
    createBoard,
    updateBoard,
    deleteBoard,
  }
})
