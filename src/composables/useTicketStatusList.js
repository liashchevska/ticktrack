import { API } from '@/endpoints'
import { request } from '@/utils/request'
import { ref } from 'vue'

const ticketStatusList = ref({})
let isInitialized = false

export function useTicketStatusList() {
  async function fetchTicketStatusList() {
    if (!isInitialized) {
      const { ok, errors, data } = await request(API.META.TICKET_STATUS_LIST, 'GET')
      if (!ok) { throw errors }
      ticketStatusList.value = data.reduce((accumulator, item) => {
        accumulator[item.status] = item.label
        return accumulator
      }, {})
      isInitialized = true
    }
  }
  return { ticketStatusList, fetchTicketStatusList }
}
