import { ref } from "vue"
import { useTicketStore } from "@/stores/ticket"

export function useDragDrop() {
  const ticketStore = useTicketStore()

  function onDragStart(event, ticketId) {
    event.dataTransfer.setData('ticketId', ticketId)
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'
  }

  async function onDrop(event, status) {
    event.preventDefault()
    const ticketId = event.dataTransfer.getData("ticketId")
    if (!ticketId) return
    try {
      await ticketStore.updateTicket(ticketId, { status })
    }
    catch (errors) {
      console.log(errors)
    }
  }

  return { onDragStart, onDrop }
}

