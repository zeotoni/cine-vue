<script lang="ts">
import type MovieCardData from '@/interfaces/MovieCardData'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import type { PropType } from 'vue'
import CardMovie from './CardMovie.vue'

export default {
  components: {
    CardMovie,
    ChevronRight,
    ChevronLeft,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    movies: {
      type: Array as PropType<MovieCardData[]>,
      required: true,
    },
  },
  methods: {
    scroll(direction: string) {
      const container = this.$refs.scrollContainer as HTMLUListElement | null
      if (container) {
        const amount =
          direction === 'left' ? -container.clientWidth : container.clientWidth
        container.scrollBy({ left: amount, behavior: 'smooth' })
      }
    },
  },
}
</script>

<template>
  <section>
    <h3 class="text-fs-3 font-fw3 text-primaryHeading mb-3">{{ title }}</h3>

    <ul
      ref="scrollContainer"
      class="grid grid-flow-col gap-2 lg:gap-4 auto-cols-[45%] sm:auto-cols-[40%] md:auto-cols-[22%] lg:auto-cols-[18%] xl:auto-cols-[15%] snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:'none'] [scrollbar-width:'none'] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
    >
      <li v-for="movie in movies" :key="movie.title" class="snap-start">
        <CardMovie :cardData="movie" />
      </li>
    </ul>

    <div
      class="hidden md:flex justify-between gap-8 mt-4"
      role="group"
      aria-label="Scroll buttons"
    >
      <button
        class="text-primaryHeading border p-2 hover:bg-primaryText hover:text-secondaryHeading transition-colors duration-300"
        aria-label="Scroll left"
        @click="scroll('left')"
      >
        <ChevronLeft class="w-5 h-5" aria-hidden="true" focusable="false" />
      </button>

      <button
        class="text-primaryHeading border p-2 hover:bg-primaryText hover:text-secondaryHeading transition-colors duration-300"
        aria-label="Scroll right"
        @click="scroll('right')"
      >
        <ChevronRight class="w-5 h-5" aria-hidden="true" focusable="false" />
      </button>
    </div>
  </section>
</template>
