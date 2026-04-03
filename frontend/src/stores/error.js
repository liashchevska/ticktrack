import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useGlobalErrorStore = defineStore('globalError', () => {
  const errorState = ref({
    ok: true,
    status: null,
    statusText: '',
  });
  const isServerDown = computed(() => !errorState.value.ok)

  function set(error) {
    errorState.value = error
  }

  function reset() {
    errorState.value = {
      ok: true,
      status: null,
      statusText: '',
    }
  }

  return { isServerDown, errorState, set, reset }
})
