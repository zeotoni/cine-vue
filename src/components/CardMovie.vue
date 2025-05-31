<script lang="ts">
import { genreMap } from '@/constants/genres'
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
  methods: {
    getImgUrl(path: string) {
      return `https://image.tmdb.org/t/p/original${path}`
    },
    getGenreName(id: number) {
      return genreMap[id] || 'Unknown'
    },
  },
}
</script>

<template>
  <div class="bg-primaryHeading rounded-lg overflow-hidden w-full h-full">
    <picture>
      <img
        :src="getImgUrl(cardData.poster_path)"
        :alt="`Imagem do filme ` + cardData.title"
      />
    </picture>

    <div class="p-2 flex flex-col h-[110px] lg:h-[140px] justify-between">
      <h3 class="text-secondaryHeading text-fs-1 font-fw3 line-clamp-2 mb-2">
        {{ cardData.title }}
      </h3>

      <div class="flex flex-col mt-1">
        <span class="text-fs-1 text-gray-400">
          {{ cardData.release_date.slice(0, 4) }}
        </span>

        <span class="text-fs-1 font-fw2 text-rating flex gap-1">
          <Star
            class="w-5 h-5"
            fill="#FBBF24"
            color="#FBBF24"
            aria-hidden="true"
          />
          {{ cardData.vote_average.toFixed(1) }}</span
        >
      </div>
    </div>
  </div>
</template>
