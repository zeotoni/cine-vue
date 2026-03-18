<script lang="ts">
import { getMoviesBySearch, getTopRated, getUpComing } from '@/http'
import type FilterData from '@/interfaces/FilterData'
import type MovieCardData from '@/interfaces/MovieCardData'
import CardList from './CardList.vue'
import FeaturedMovie from './FeaturedMovie.vue'
import SidebarFilters from './SidebarFilters.vue'

const defaultFilters: FilterData = {
  title: '',
  genre: 'all',
  fromYear: '',
  toYear: '',
}

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
      discoveredMovies: [] as MovieCardData[],
      topRatedPage: 1,
      upcomingPage: 1,
      discoverPage: 1,

      search: { ...defaultFilters },
      loading: false,
    }
  },

  computed: {
    isFilteringActive(): boolean {
      return (
        this.search.title.trim() !== '' ||
        this.search.genre !== 'all' ||
        this.search.fromYear !== '' ||
        this.search.toYear !== ''
      )
    },
  },

  async created() {
    try {
      this.moviesTopRated = await getTopRated(this.topRatedPage)
      this.moviesUpComing = await getUpComing(this.upcomingPage)
    } catch (error) {
      console.error('Erro ao buscar filmes:', error)
    }
  },

  methods: {
    searchData(search: FilterData) {
      this.search = search
      this.loading = true
      if (!this.isFilteringActive) {
        this.discoveredMovies = []
        return
      }
      this.getDiscoveredMovies()
    },

    async getDiscoveredMovies() {
      try {
        this.discoveredMovies = await getMoviesBySearch(
          this.search,
          this.discoverPage,
        )
      } catch (error) {
        console.error('Erro ao buscar filmes:', error)
      } finally {
        this.loading = false
      }
    },

    async loadMore(category: 'upComing' | 'topRated' | 'filtered') {
      try {
        switch (category) {
          case 'upComing': {
            this.upcomingPage += 1
            this.moviesUpComing.push(...(await getUpComing(this.upcomingPage)))
            break
          }
          case 'topRated': {
            this.topRatedPage += 1
            this.moviesTopRated.push(...(await getTopRated(this.topRatedPage)))
            break
          }
          case 'filtered': {
            this.discoverPage += 1
            this.discoveredMovies.push(
              ...(await getMoviesBySearch(this.search, this.discoverPage)),
            )
            break
          }
        }
      } catch (error) {
        console.error('Erro ao buscar filmes:', error)
      }
    },
  },
}
</script>

<template>
  <div class="lg:flex">
    <SidebarFilters
      class="lg:w-[25%]"
      @update:search="searchData"
    ></SidebarFilters>

    <main class="lg:w-[75%] p-4 md:p-6 lg:p-8">
      <section v-if="!isFilteringActive" class="flex flex-col gap-10">
        <FeaturedMovie></FeaturedMovie>
        <CardList
          :title="'Top Rated'"
          :movies="moviesTopRated"
          :category="'topRated'"
          @load-more="loadMore"
        ></CardList>
        <CardList
          :title="'Upcoming'"
          :movies="moviesUpComing"
          :category="'upComing'"
          @load-more="loadMore"
        ></CardList>
      </section>

      <section v-if="isFilteringActive" class="flex flex-col gap-10">
        <p v-if="loading" class="text-primaryHeading text-fs-3">
          Carregando...
        </p>
        <p
          v-else-if="discoveredMovies.length === 0"
          class="text-primaryHeading text-fs-3"
        >
          Nenhum filme encontrado
        </p>
        <div v-else>
          <CardList
            :title="'Filtered Movies'"
            :movies="discoveredMovies"
            :category="'filtered'"
            @load-more="loadMore"
          ></CardList>
        </div>
      </section>
    </main>
  </div>
</template>
