import { API } from '@/endpoints';
import { request } from '@/utils/request';
import { defineStore } from 'pinia';
import { ref } from 'vue'

export const useTicketStore = defineStore('ticket', () => {
  const ticketsByBoard = ref({})

  function getTickets(boardId) {
    const boardTickets = ticketsByBoard.value[boardId]
    if (!boardTickets) return []
    return Array.from(boardTickets.values())
  }

  async function fetchTickets(boardId) {
    const { ok, data, errors } = await request(API.TICKET.FILTER({ 'board_id': boardId }))
    if (!ok) {
      return { ok, errors }
    }
    ticketsByBoard.value[boardId] = data.reduce((accumulator, item) => {
      accumulator.set(item.id, item)
      return accumulator
    }, new Map())
    return { ok, data }
  }

  async function createTicket(boardId, payload) {
    const body = {...payload, board: boardId}
    const { ok, errors, data } = await request(API.TICKET.LIST, 'POST', body)
    if (!ok) {
      return { ok, errors }
    }

    ticketsByBoard.value[boardId] ??= new Map()
    ticketsByBoard.value[boardId].set(data.id, data)

    return { ok, data }
  }

  async function updateTicket(ticketId, payload) {
    const { ok, errors, data } = await request(API.TICKET.DETAIL(ticketId), 'PATCH', payload)
    if (!ok) {
      return { ok, errors }
    }
    const boardId = data.board
    const board = ticketsByBoard.value[boardId]
    if (board) {
      // delete needed to trigger vue reactivity change detection
      ticketsByBoard.value[boardId].delete(data.id)
      ticketsByBoard.value[boardId].set(data.id, data)
    }
    return { ok, data }
  }

  async function deleteTicket(boardId, ticketId) {
    const { ok, errors } = await request(API.TICKET.DETAIL(ticketId), 'DELETE')
    if (!ok) {
      return { ok, errors }
    }
    ticketsByBoard.value[boardId].delete(ticketId)
    return { ok }
  }

  function $reset(){
    ticketsByBoard.value = {}
  }

  return {
    ticketsByBoard,
    $reset,
    getTickets,
    fetchTickets,
    createTicket,
    updateTicket,
    deleteTicket
  }
})
