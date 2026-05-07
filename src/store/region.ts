import { reactive, watch } from 'vue'

export const regionStore = reactive({
  region: localStorage.getItem('region') || 'BR',
})
watch(
  () => regionStore.region,
  (newRegion) => {
    localStorage.setItem('region', newRegion)
  },
)
