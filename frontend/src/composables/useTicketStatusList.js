import { API } from '@/endpoints'
import { request } from '@/utils/request'
import { ref } from 'vue'

const ticketStatusList = ref({})
const isInitialized = ref(false)

export function useTicketStatusList() {
  async function fetchTicketStatusList() {
    if (!isInitialized.value) {
      const { ok, errors, data } = await request(API.META.TICKET_STATUS_LIST, 'GET')
      if (!ok) { throw errors }
      ticketStatusList.value = data.reduce((accumulator, item) => {
        accumulator[item.status] = item.label
        return accumulator
      }, {})
      isInitialized.value = true
    }
  }
  return { isInitialized, ticketStatusList, fetchTicketStatusList }
}
