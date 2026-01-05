<script lang="ts">
import { getTopRated, getUpComing } from '@/http'
import type MovieCardData from '@/interfaces/MovieCardData'
import CardList from './CardList.vue'
import FeaturedMovie from './FeaturedMovie.vue'
import SidebarFilters from './SidebarFilters.vue'

export default {
  components: {
    FeaturedMovie,
    CardList,
    SidebarFilters,
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
  <div class="lg:flex">
    <SidebarFilters class="lg:w-[25%]"></SidebarFilters>

    <main class="lg:w-[75%] p-4 md:p-6 lg:p-8">
      <section class="flex flex-col gap-10">
        <FeaturedMovie></FeaturedMovie>
        <CardList :title="'Top Rated'" :movies="moviesTopRated"></CardList>
        <CardList :title="'Upcoming'" :movies="moviesUpComing"></CardList>
      </section>
    </main>
  </div>
</template>
