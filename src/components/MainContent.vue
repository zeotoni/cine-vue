<script lang="ts">
import { getTopRated, getUpComing } from '@/http'
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
      baseList: [] as MovieCardData[],
      search: { ...defaultFilters },
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

    filteredMovies(): MovieCardData[] {
      return this.baseList.filter((el: MovieCardData) => {
        if (this.search.title) {
          if (!el.title.toLowerCase().includes(this.search.title)) {
            return false
          }
        }

        if (this.search.fromYear) {
          if (el.release_date.substring(0, 4) < this.search.fromYear) {
            return false
          }
        }

        if (this.search.toYear) {
          if (el.release_date.substring(0, 4) > this.search.toYear) {
            return false
          }
        }

        if (this.search.genre != 'all') {
          if (!el.genre_ids.includes(Number(this.search.genre))) {
            return false
          }
        }

        return true
      })
    },
  },

  async created() {
    try {
      this.moviesTopRated = await getTopRated()
      this.moviesUpComing = await getUpComing()
      this.baseList = [...this.moviesUpComing, ...this.moviesTopRated]
    } catch (error) {
      console.error('Erro ao buscar filmes:', error)
    }
  },

  methods: {
    searchData(search: FilterData) {
      this.search = search
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
        <CardList :title="'Top Rated'" :movies="moviesTopRated"></CardList>
        <CardList :title="'Upcoming'" :movies="moviesUpComing"></CardList>
      </section>

      <section v-if="isFilteringActive" class="flex flex-col gap-10">
        <CardList
          :title="'Filtered Movies'"
          :movies="filteredMovies"
        ></CardList>
      </section>
    </main>
  </div>
</template>
