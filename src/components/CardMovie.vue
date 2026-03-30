<script lang="ts">
import fallbackImg from '@/assets/images/no-poster.png'
import { genreMap } from '@/constants/genres'
import type { MovieCard } from '@/interfaces/MovieCardData'
import { Star } from 'lucide-vue-next'
import type { PropType } from 'vue'
export default {
  components: { Star },
  props: {
    cardData: {
      type: Object as PropType<MovieCard>,
      required: true,
    },
  },
  data() {
    return {
      imgState: 'loading' as 'loading' | 'success' | 'error',
      fallbackImg,
    }
  },
  methods: {
    getImgUrl(path: string) {
      return path == null
        ? fallbackImg
        : `https://image.tmdb.org/t/p/original${path}`
    },
    getGenreName(id: number) {
      return genreMap[id] || 'Unknown'
    },
  },
}
</script>

<template>
  <div class="rounded-xl overflow-hidden w-full h-100px">
    <section class="relative aspect-2/3">
      <div
        v-show="imgState == 'loading'"
        class="absolute inset-0 shimmer z-10"
      ></div>
      <img
        v-show="imgState !== 'loading'"
        class="h-full w-full object-cover"
        :src="
          imgState == 'error' ? fallbackImg : getImgUrl(cardData.poster_path)
        "
        :alt="`Imagem do filme ` + cardData.title"
        @load="imgState = 'success'"
        @error="imgState = 'error'"
      />
    </section>

    <div
      class="p-2 flex flex-col h-[110px] lg:h-[140px] justify-between bg-primaryCardBg"
    >
      <h4 class="text-primaryHeading text-fs-1 font-fw3 line-clamp-2 mb-2">
        {{ cardData.title || 'Untitled movie' }}
      </h4>

      <div class="flex flex-col mt-1 text-primaryText">
        <span class="text-fs-1">
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
