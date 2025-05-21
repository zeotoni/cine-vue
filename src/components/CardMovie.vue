<script lang="ts">
import type MovieCardData from '@/interfaces/MovieCardData'
import { Star } from 'lucide-vue-next'
import type { PropType } from 'vue'
export default {
  components: { Star },
  props: {
    cardData: {
      type: Object as PropType<MovieCardData>,
      required: true,
    },
  },
}
</script>

<template>
  <div class="bg-primaryHeading rounded-lg overflow-hidden wh-full">
    <picture>
      <img
        class="w-full h-auto object-cover"
        :src="cardData.imgUrl"
        :alt="`Imagem do filme ` + cardData.title"
      />
    </picture>

    <div class="p-4">
      <h3 class="text-secondaryHeading text-fs-3 font-fw3">
        {{ cardData.title }}
      </h3>
      <div class="mb-2">
        <p class="text-fs-1 text-gray-600">
          {{ cardData.genre }} - {{ cardData.year }}
        </p>
      </div>
      <div class="flex gap-1 items-center">
        <Star
          class="w-5 h-5"
          fill="#FBBF24"
          color="#FBBF24"
          aria-hidden="true"
        />
        <span class="text-fs-1 font-fw2 text-rating">{{ cardData.rate }}</span>
      </div>
    </div>
  </div>
</template>
