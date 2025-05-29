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
  <div class="bg-primaryHeading rounded-lg overflow-hidden wh-full">
    <picture>
      <img
        class="w-full h-auto object-cover"
        :src="getImgUrl(cardData.poster_path)"
        :alt="`Imagem do filme ` + cardData.title"
      />
    </picture>

    <div class="p-4 h-50 md:h-60">
      <h3 class="text-secondaryHeading text-fs-3 font-fw3 mb-2">
        {{ cardData.title }}
      </h3>

      <ul class="flex flex-wrap gap-2 mb-2">
        <li v-for="id in cardData.genre_ids" :key="id">
          <p
            class="text-fs-1 text-gray-600 px-2 py-0.5 bg-secondaryText/30 rounded-full"
          >
            {{ getGenreName(id) }}
          </p>
        </li>
      </ul>

      <span class="text-fs-1 text-gray-600 mb-4">
        {{ cardData.release_date.slice(0, 4) }}
      </span>

      <div class="flex gap-1 items-center mt-2">
        <Star
          class="w-5 h-5"
          fill="#FBBF24"
          color="#FBBF24"
          aria-hidden="true"
        />
        <span class="text-fs-1 font-fw2 text-rating">{{
          cardData.vote_average.toFixed(1)
        }}</span>
      </div>
    </div>
  </div>
</template>
