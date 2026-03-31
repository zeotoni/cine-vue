<script lang="ts">
import fallbackImg from '@/assets/images/no-poster.png'
import { genreMap } from '@/constants/genres'
import type { MovieCard } from '@/interfaces/MovieCardData'
import { Star } from 'lucide-vue-next'
import type { PropType } from 'vue'
export default {
  components: { Star },
  props: {
    movie: {
      type: Object as PropType<MovieCard>,
      required: true,
    },
    shouldOpen: Boolean,
  },
  watch: {
    shouldOpen(newVal: boolean) {
      const dialog = this.$refs.movieModal as HTMLDialogElement

      if (!dialog) return

      if (newVal) {
        dialog.showModal()
      } else {
        dialog.close()
      }
    },
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
  <dialog ref="movieModal" class="m-auto w-[80%] overflow-hidden rounded-xl">
    <picture>
      <img
        class="object-cover w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-xl"
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
      <h2 class="text-fs-4 font-fw3 text-primaryHeading mb-2">
        {{ movie?.title }}
      </h2>

      <time datetime="1999" class="text-primaryText text-fs-1 mb-2">{{
        movie?.release_date
      }}</time>

      <div class="flex flex-wrap gap-3 items-center mb-4">
        <div class="flex gap-1 items-center">
          <Star
            class="w-5 h-5"
            fill="#FBBF24"
            color="#FBBF24"
            aria-hidden="true"
          />
          <span class="text-fs-1 font-fw2 text-rating">{{
            movie?.vote_average
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
        class="text-primaryText text-fs-2 max-w-3xl leading-relaxed line-clamp-4 overflow-y-auto scrollbar-hide md:line-clamp-none [-ms-overflow-style:'none'] [scrollbar-width:'none'] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
      >
        {{ movie?.overview }}
      </p>
    </div>
  </dialog>
</template>
