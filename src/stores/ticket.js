import { API } from '@/endpoints';
import { request } from '@/utils/request';
import { defineStore } from 'pinia';
import { ref } from 'vue'

export const useTicketStore = defineStore('ticket', () => {
  const ticketsByBoard = ref({})

  function getTickets(boardId) {
    const boardTickets = ticketsByBoard.value[boardId]
    if (!boardTickets) return []
    return Object.values(boardTickets)
  }

  async function fetchTickets(boardId) {
    const { ok, data, errors } = await request(API.TICKET.FILTER({ 'board_id': boardId }))
    if (!ok) { throw errors }
    ticketsByBoard.value[boardId] = data.reduce((accumulator, item) => {
      accumulator[item.id] = item
      return accumulator
    }, {})
  }

  async function createTicket(boardId, payload) {
    payload.board = boardId
    const { ok, errors, data } = await request(API.TICKET.LIST, 'POST', payload)
    if (!ok) { throw errors }
    ticketsByBoard.value[boardId] ??= {}
    ticketsByBoard.value[boardId][data.id] = data
  }

  async function updateTicket(ticketId, payload) {
    const { ok, errors, data } = await request(API.TICKET.DETAIL(ticketId), 'PATCH', payload)
    if (!ok) { throw errors }
    const boardId = data.board
    const board = ticketsByBoard.value[boardId]
    if (!board) return
    ticketsByBoard.value[boardId][ticketId] = data
  }

  async function deleteTicket(boardId, ticketId) {
    const { ok, errors } = await request(API.TICKET.DETAIL(ticketId), 'DELETE')
    if (!ok) { throw errors }
    const board = ticketsByBoard.value[boardId]
    delete board[ticketId]
  }

  return {
    ticketsByBoard,
    getTickets,
    fetchTickets,
    createTicket,
    updateTicket,
    deleteTicket
  }
})
