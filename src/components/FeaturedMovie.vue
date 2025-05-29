<script lang="ts">
import { genreMap } from '@/constants/genres'
import { getPopularMovies } from '@/http'
import type MovieCardData from '@/interfaces/MovieCardData'
import { Star } from 'lucide-vue-next'
export default {
  components: { Star },

  data() {
    return {
      movie: {} as MovieCardData,
    }
  },

  async mounted() {
    try {
      const movies = await getPopularMovies()
      const r = Math.floor(Math.random() * movies.length)
      this.movie = movies[r]
    } catch (error) {
      console.error('Erro ao buscar filme em destaque:', error)
    }
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
  <section
    v-if="movie?.title"
    class="relative w-full overflow-hidden rounded-xl"
  >
    <picture>
      <img
        class="rounded-xl object-cover w-full h-[400px] sm:h-[500px] md:h-[600px]"
        :src="getImgUrl(movie?.backdrop_path)"
        :alt="`Imagem do filme ` + movie?.title"
      />
    </picture>

    <div
      class="absolute inset-0 bg-gradient-to-t from-black to-transparent"
    ></div>

    <div
      class="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 w-full"
    >
      <div class="flex gap-2 items-center mb-2">
        <span
          class="bg-blue-600 px-2 py-1 rounded-full text-primaryHeading text-fs-1"
          aria-label="Filme em destaque"
          >Featured</span
        >
        <time datetime="1999" class="text-primaryText text-fs-1">{{
          movie?.release_date?.slice(0, 4)
        }}</time>
      </div>

      <h2 class="text-fs-4 font-fw3 text-primaryHeading mb-2">
        {{ movie?.title }}
      </h2>

      <div class="flex flex-wrap gap-3 items-center mb-4">
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
      <p
        class="text-primaryText text-fs-2 mb-6 max-w-3xl leading-relaxed line-clamp-4 overflow-y-auto scrollbar-hide md:line-clamp-none"
      >
        {{ movie?.overview }}
      </p>
    </div>
  </section>
</template>
