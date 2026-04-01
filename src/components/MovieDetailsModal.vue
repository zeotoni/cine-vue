<script lang="ts">
import fallbackImg from '@/assets/images/no-poster.png'
import { genreMap } from '@/constants/genres'
import type { MovieCard } from '@/interfaces/MovieCardData'
import { Star, X } from 'lucide-vue-next'
import type { PropType } from 'vue'
export default {
  components: { Star, X },
  props: {
    movie: {
      type: Object as PropType<MovieCard>,
      required: true,
    },
    shouldOpen: Boolean,
  },
  emits: ['close'],
  data() {
    return {
      handleClick: null as null | ((e: MouseEvent) => void),
      handleKeyUp: null as null | ((e: KeyboardEvent) => void),
    }
  },
  watch: {
    shouldOpen(newVal: boolean) {
      const dialog = this.$refs.movieModal as HTMLDialogElement

      if (!dialog) return

      if (newVal) {
        if (!dialog.open) {
          dialog.showModal()
        }
      } else {
        if (dialog.open) {
          dialog.close()
        }
      }
    },
  },
  mounted() {
    this.handleClick = (e: MouseEvent) => {
      const dialog = this.$refs.movieModal as HTMLDialogElement

      if (!dialog) return

      if (e.target === dialog) {
        this.$emit('close')
      }
    }

    const dialog = this.$refs.movieModal as HTMLDialogElement
    dialog.addEventListener('click', this.handleClick)

    this.handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.$emit('close')
      }
    }

    document.addEventListener('keyup', this.handleKeyUp)
  },
  unmounted() {
    const dialog = this.$refs.movieModal as HTMLDialogElement

    if (dialog && this.handleClick) {
      dialog.removeEventListener('click', this.handleClick)
    }

    if (this.handleKeyUp) {
      document.removeEventListener('keyup', this.handleKeyUp)
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
    closeModal() {
      this.$emit('close')
    },
  },
}
</script>

<template>
  <dialog
    ref="movieModal"
    class="relative m-auto w-[80%] overflow-hidden rounded-xl"
  >
    <button
      class="absolute m-2 lg:m-4 right-0 bg-black/60 backdrop-blur shadow-md border border-white/30 rounded"
      @click="closeModal"
    >
      <X
        class="w-5 h-5 md:w-8 md:h-8"
        fill="#FFF"
        color="#FFF"
        aria-hidden="true"
      />
    </button>
    <picture>
      <img
        :key="movie?.backdrop_path"
        class="object-cover w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-xl"
        :src="getImgUrl(movie?.backdrop_path)"
        :alt="`Imagem do filme ` + movie?.title"
      />
    </picture>

    <div
      class="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none"
    ></div>

    <div
      class="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 w-full pointer-events-none"
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
