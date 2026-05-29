<script lang="ts">
import { genreMap } from '@/constants/genres'
import { getFeaturedMovies } from '@/http'
import type { MovieCard } from '@/interfaces/MovieCardData'
import { regionStore } from '@/store/region'
import { getBackdropImg, getPosterImg } from '@/utils/movieImages'
import { checkOverflow } from '@/utils/overviewExpand'
import { ChevronDown, ChevronUp, Star } from 'lucide-vue-next'
export default {
  components: { Star, ChevronDown, ChevronUp },

  data() {
    return {
      movie: {} as MovieCard,
      imgState: 'loading' as 'loading' | 'success' | 'error',
      regionStore,
      isExpanded: false,
      overflowsText: false as boolean | undefined,
      resizeObserver: null as ResizeObserver | null,
    }
  },

  watch: {
    'regionStore.region': {
      async handler() {
        try {
          const movies = await getFeaturedMovies()
          const r = Math.floor(Math.random() * movies.results.length)
          this.movie = movies.results[r]
        } catch (error) {
          console.error('Erro ao buscar filme em destaque:', error)
        }
      },
    },
    movie() {
      this.imgState = 'loading'
      this.isExpanded = false
      this.$nextTick(() => this.checkOverflow())
    },
    imgState(val) {
      if (val === 'success') {
        this.$nextTick(() => {
          const el = this.$refs.overviewText as HTMLParagraphElement
          if (el && this.resizeObserver) this.resizeObserver.observe(el)
          this.checkOverflow()
        })
      }
    },
  },

  async mounted() {
    this.isExpanded = false
    this.resizeObserver = new ResizeObserver(() => this.checkOverflow())

    try {
      const movies = await getFeaturedMovies()
      const r = Math.floor(Math.random() * movies.results.length)
      this.movie = movies.results[r]
    } catch (error) {
      console.error('Erro ao buscar filme em destaque:', error)
    }
  },
  unmounted() {
    if (this.resizeObserver) this.resizeObserver.disconnect()
  },
  methods: {
    getBackdropImg(movie: MovieCard) {
      return getBackdropImg(movie)
    },
    getPosterImg(movie: MovieCard) {
      return getPosterImg(movie)
    },
    getGenreName(id: number) {
      return genreMap[id] || 'Unknown'
    },
    expandOverview() {
      this.isExpanded = !this.isExpanded
    },
    checkOverflow() {
      const el = this.$refs.overviewText as HTMLParagraphElement
      if (!el) return

      this.overflowsText = checkOverflow(el)
    },
  },
}
</script>

<template>
  <section
    v-if="movie?.title"
    class="relative w-full overflow-hidden rounded-xl"
  >
    <picture>
      <source media="(min-width: 1024px)" :srcset="getBackdropImg(movie)" />
      <img
        class="rounded-xl object-cover w-full h-[400px] sm:h-[500px] md:h-[600px]"
        :src="getPosterImg(movie)"
        :alt="`Imagem do filme ` + movie?.title"
        @load="imgState = 'success'"
        @error="imgState = 'error'"
      />
    </picture>

    <div
      class="absolute inset-0 bg-gradient-to-t from-black to-transparent"
    ></div>

    <div
      v-show="imgState !== 'loading'"
      :class="{
        'bg-black/60 backdrop-blur overflow-y-auto justify-start pt-16':
          isExpanded,
      }"
      class="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 w-full"
    >
      <div v-if="!isExpanded" class="flex gap-2 items-center mb-2">
        <span
          class="bg-blue-600 px-2 py-1 rounded-full text-primaryHeading text-fs-1"
          aria-label="Filme em destaque"
          >Featured</span
        >
        <time datetime="1999" class="text-primaryText text-fs-1">{{
          movie?.release_date?.slice(0, 4)
        }}</time>
      </div>

      <h2
        v-if="!isExpanded"
        class="text-fs-4 font-fw3 text-primaryHeading mb-2"
      >
        {{ movie?.title }}
      </h2>

      <div v-if="!isExpanded" class="flex flex-wrap gap-3 items-center mb-4">
        <div class="flex gap-1 items-center">
          <Star
            class="w-5 h-5"
            fill="#FBBF24"
            color="#FBBF24"
            aria-hidden="true"
          />
          <span class="text-fs-1 font-fw2 text-rating">{{
            movie?.vote_average?.toFixed(1)
          }}</span>
        </div>

        <span
          v-for="id in movie?.genre_ids"
          :key="id"
          class="text-fs-1 font-fw2 text-primaryHeading px-2 py-0.5 bg-white/30 rounded-full"
          >{{ getGenreName(id) }}</span
        >
      </div>

      <button
        v-if="isExpanded"
        type="button"
        class="flex flex-col justify-center items-center mb-2 cursor-pointer"
        @click="expandOverview"
      >
        <ChevronUp class="text-primaryText"></ChevronUp>
        <span class="text-primaryText text-fs-1">Fechar</span>
      </button>

      <p
        ref="overviewText"
        :class="{ 'line-clamp-4': !isExpanded }"
        :style="{
          lineHeight: isExpanded
            ? 'var(--leading-relaxed)'
            : 'var(--leading-tight)',
        }"
        class="text-primaryText text-fs-2 max-w-3xl scrollbar-hide [-ms-overflow-style:'none'] [scrollbar-width:'none'] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
      >
        {{ movie?.overview }}
      </p>

      <button
        v-if="!isExpanded && overflowsText"
        type="button"
        class="flex flex-col justify-center items-center mt-2 cursor-pointer"
        @click="expandOverview"
      >
        <span class="text-primaryText text-fs-1">Ler mais</span>
        <ChevronDown class="text-primaryText"></ChevronDown>
      </button>
    </div>
  </section>
</template>
