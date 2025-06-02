<script lang="ts">
import type MovieCardData from '@/interfaces/MovieCardData'
import type { PropType } from 'vue'
import CardMovie from './CardMovie.vue'

export default {
  components: {
    CardMovie,
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
}
</script>

<template>
  <section>
    <h3 class="text-fs-3 font-fw3 text-primaryHeading mb-3">{{ title }}</h3>

    <ul
      class="grid grid-flow-col gap-2 lg:gap-4 auto-cols-[45%] sm:auto-cols-[40%] md:auto-cols-[22%] lg:auto-cols-[18%] xl:auto-cols-[15%] snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:'none'] [scrollbar-width:'none'] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
    >
      <li v-for="movie in movies" :key="movie.title" class="snap-start">
        <CardMovie :cardData="movie" />
      </li>
    </ul>
  </section>
</template>
