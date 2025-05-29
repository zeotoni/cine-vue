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
    <h4 class="text-fs-3 font-fw3 text-primaryHeading mb-3">{{ title }}</h4>

    <ul
      class="grid grid-flow-col auto-cols-[300px] gap-4 overflow-x-auto gap-4"
    >
      <li v-for="movie in movies" :key="movie.id">
        <CardMovie :cardData="movie" />
      </li>
    </ul>
  </section>
</template>
