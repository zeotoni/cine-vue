<script lang="ts">
import { Plus } from 'lucide-vue-next'

export default {
  components: {
    Plus,
  },
  emits: ['loadMore'],
}
</script>
<template>
  <div
    class="rounded-xl overflow-hidden w-full h-full hover:w-[98%] hover:h-[98%] bg-gray-700 hover:shadow-cyan-100 shadow-md flex flex-col justify-center items-center cursor-pointer transition-all duration-200"
    @click="$emit('loadMore')"
  >
    <Plus class="w-10 h-10" aria-hidden="true" focusable="false" color="#fff" />
    <h4
      class="text-primaryHeading text-center text-fs-2 font-fw3 line-clamp-2 mt-2"
    >
      Load More
    </h4>
  </div>
</template>
