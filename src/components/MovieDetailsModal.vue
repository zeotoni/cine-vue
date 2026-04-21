<script lang="ts">
import fallbackImg from '@/assets/images/no-poster.png'
import { genreMap } from '@/constants/genres'
import type { MovieCard } from '@/interfaces/MovieCardData'
import { ChevronDown, ChevronUp, Star, X } from 'lucide-vue-next'
import type { PropType } from 'vue'
export default {
  components: { Star, X, ChevronUp, ChevronDown },
  props: {
    movie: {
      type: Object as PropType<MovieCard>,
      required: true,
    },
    shouldOpen: Boolean,
    loading: Boolean,
  },
  emits: ['close'],
  data() {
    return {
      imgState: 'loading' as 'loading' | 'success' | 'error',
      fallbackImg,
      isExpanded: false,

      handleClick: null as null | ((e: MouseEvent) => void),
      handleKeyDown: null as null | ((e: KeyboardEvent) => void),
    }
  },
  watch: {
    shouldOpen(newVal: boolean) {
      const dialog = this.$refs.movieModal as HTMLDialogElement

      if (!dialog) return

      const focusableElements = this.getFocusableEl(dialog)
      const firstFocusableElement = focusableElements[0]

      if (newVal) {
        if (!dialog.open) {
          dialog.showModal()

          if (firstFocusableElement) firstFocusableElement.focus()
        }
      } else {
        if (dialog.open) {
          dialog.close()
        }
      }
    },
    movie() {
      this.imgState = 'loading'
    },
  },
  mounted() {
    this.isExpanded = false
    const dialog = this.$refs.movieModal as HTMLDialogElement

    this.handleClick = (e: MouseEvent) => {
      const dialog = this.$refs.movieModal as HTMLDialogElement

      if (!dialog) return

      if (e.target === dialog) {
        this.$emit('close')
      }
    }

    this.handleKeyDown = (e: KeyboardEvent) => {
      const dialog = this.$refs.movieModal as HTMLDialogElement

      if (!dialog) return

      if (e.key === 'Escape') {
        this.$emit('close')
      }
      if (e.key === 'Tab') {
        const focusableElements = this.getFocusableEl(dialog)
        if (focusableElements.length === 1) e.preventDefault()
      }
    }

    dialog.addEventListener('click', this.handleClick)
    document.addEventListener('keydown', this.handleKeyDown)
  },
  unmounted() {
    const dialog = this.$refs.movieModal as HTMLDialogElement

    if (dialog && this.handleClick) {
      dialog.removeEventListener('click', this.handleClick)
    }

    if (this.handleKeyDown) {
      document.removeEventListener('keydown', this.handleKeyDown)
    }
  },
  methods: {
    getImgUrl(path: string) {
      return path ? `https://image.tmdb.org/t/p/original${path}` : fallbackImg
    },
    getGenreName(id: number) {
      return genreMap[id] || 'Unknown'
    },
    closeModal() {
      this.$emit('close')
      this.isExpanded = false
    },
    getFocusableEl(dialog: HTMLElement) {
      const nodesEl = dialog.querySelectorAll(
        `[tabindex]:not([tabindex="-1"]),a[href]:not([disabled]),button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled])`,
      )
      return [...nodesEl] as HTMLElement[]
    },
    expandOverview() {
      this.isExpanded = !this.isExpanded
    },
  },
}
</script>

<template>
  <dialog
    ref="movieModal"
    class="relative m-auto w-[80%] max-h-[90vh] overflow-hidden rounded-xl"
  >
    <button
      class="absolute z-10 m-2 lg:m-4 right-0 bg-black/60 backdrop-blur shadow-md border border-white/30 rounded"
      @click="closeModal"
    >
      <X
        class="w-5 h-5 md:w-6 md:h-6"
        fill="#FFF"
        color="#FFF"
        aria-hidden="true"
      />
    </button>
    <div v-if="shouldOpen" class="relative h-[80vh] w-full">
      <div
        class="absolute inset-0 shimmer z-40 pointer-events-none"
        :class="loading || imgState === 'loading' ? 'opacity-100' : 'opacity-0'"
      ></div>

      <picture>
        <source
          media="(min-width: 1024px)"
          :srcset="getImgUrl(movie?.backdrop_path)"
        />
        <img
          :key="movie?.id"
          class="h-full w-full object-cover"
          :src="getImgUrl(movie?.poster_path)"
          :alt="`Imagem do filme ` + movie?.title"
          @load="imgState = 'success'"
          @error="imgState = 'error'"
        />
      </picture>

      <div
        class="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none"
      ></div>

      <div
        v-show="!loading && imgState !== 'loading'"
        :class="{
          'bg-black/60 backdrop-blur overflow-y-auto justify-start pt-16':
            isExpanded,
        }"
        class="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 w-full"
      >
        <h2
          v-if="!isExpanded"
          class="text-fs-4 font-fw3 text-primaryHeading mb-2"
        >
          {{ movie?.title }}
        </h2>

        <time
          v-if="!isExpanded"
          datetime="1999"
          class="text-primaryText text-fs-1 mb-2"
          >{{ movie?.release_date }}</time
        >

        <div v-if="!isExpanded" class="flex flex-wrap gap-3 items-center mb-4">
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
            v-for="genre in movie?.genres"
            :key="genre.id"
            class="text-fs-1 font-fw2 text-primaryHeading px-2 py-0.5 bg-white/30 rounded-full"
            >{{ genre.name }}</span
          >
        </div>

        <button
          v-if="isExpanded"
          type="button"
          class="flex flex-col justify-center items-center mb-2 cursor-pointer lg:hidden"
          @click="expandOverview"
        >
          <ChevronUp class="text-primaryText"></ChevronUp>
          <span class="text-primaryText text-fs-1">Fechar</span>
        </button>

        <p
          :class="{ 'line-clamp-4': !isExpanded }"
          :style="{
            lineHeight: isExpanded
              ? 'var(--leading-relaxed)'
              : 'var(--leading-tight)',
          }"
          class="text-primaryText text-fs-2 max-w-3xl scrollbar-hide md:line-clamp-none [-ms-overflow-style:'none'] [scrollbar-width:'none'] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
        >
          {{ movie?.overview }}
        </p>

        <button
          v-if="!isExpanded"
          type="button"
          class="flex flex-col justify-center items-center mt-2 cursor-pointer lg:hidden"
          @click="expandOverview"
        >
          <span class="text-primaryText text-fs-1">Ler mais</span>
          <ChevronDown class="text-primaryText"></ChevronDown>
        </button>
      </div>
    </div>
  </dialog>
</template>
