<script lang="ts">
import { getTopRated, getUpComing } from '@/http'
import type MovieCardData from '@/interfaces/MovieCardData'
import CardList from './CardList.vue'
import FeaturedMovie from './FeaturedMovie.vue'

export default {
  components: {
    FeaturedMovie,
    CardList,
  },

  data() {
    return {
      moviesTopRated: [] as MovieCardData[],
      moviesUpComing: [] as MovieCardData[],
    }
  },

  async created() {
    try {
      this.moviesTopRated = await getTopRated()
      this.moviesUpComing = await getUpComing()
    } catch (error) {
      console.error('Erro ao buscar filmes:', error)
    }
  },
}
</script>

<template>
  <section class="flex flex-col gap-10 container mx-auto px-4 py-8">
    <FeaturedMovie></FeaturedMovie>
    <CardList :title="'Top Rated'" :movies="moviesTopRated"></CardList>
    <CardList :title="'Upcoming'" :movies="moviesUpComing"></CardList>
  </section>
</template>
