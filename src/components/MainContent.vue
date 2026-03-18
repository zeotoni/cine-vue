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
      category: {
        topRated: {
          page: 1,
          loading: false,
          movies: [] as MovieCardData[],
          fetch: (page: number) => getTopRated(page),
        },
        upComing: {
          page: 1,
          loading: false,
          movies: [] as MovieCardData[],
          fetch: (page: number) => getUpComing(page),
        },
        filtered: {
          page: 1,
          loading: false,
          movies: [] as MovieCardData[],
          fetch: (page: number, search: FilterData) =>
            getMoviesBySearch(page, search),
        },
      },

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
      this.category.topRated.movies = await getTopRated(
        this.category.topRated.page,
      )
      this.category.upComing.movies = await getUpComing(
        this.category.upComing.page,
      )
    } catch (error) {
      console.error('Erro ao buscar filmes:', error)
    }
  },

  methods: {
    searchData(search: FilterData) {
      this.search = search
      this.loading = true
      if (!this.isFilteringActive) {
        this.category.filtered.movies = []
        return
      }
      this.getDiscoveredMovies()
    },

    async getDiscoveredMovies() {
      try {
        this.category.filtered.movies = await getMoviesBySearch(
          this.category.filtered.page,
          this.search,
        )
      } catch (error) {
        console.error('Erro ao buscar filmes:', error)
      } finally {
        this.loading = false
      }
    },

    async loadMore(category: 'upComing' | 'topRated' | 'filtered') {
      let currCategory = this.category[category]
      try {
        currCategory.loading = true
        currCategory.page += 1
        currCategory.movies.push(
          ...(await currCategory.fetch(currCategory.page, this.search)),
        )
      } catch (error) {
        console.error('Erro ao buscar filmes:', error)
      } finally {
        currCategory.loading = false
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
          :movies="category.topRated.movies"
          :category="'topRated'"
          :loading="category.topRated.loading"
          @load-more="loadMore"
        ></CardList>
        <CardList
          :title="'Upcoming'"
          :movies="category.upComing.movies"
          :category="'upComing'"
          :loading="category.upComing.loading"
          @load-more="loadMore"
        ></CardList>
      </section>

      <section v-if="isFilteringActive" class="flex flex-col gap-10">
        <p
          v-if="loading"
          class="text-primaryHeading text-center text-fs-2 font-fw3 line-clamp-2 mt-"
        >
          Carregando...
        </p>
        <p
          v-else-if="category.filtered.movies.length === 0"
          class="text-primaryHeading text-fs-3"
        >
          Nenhum filme encontrado
        </p>
        <div v-else>
          <CardList
            :title="'Filtered Movies'"
            :movies="category.filtered.movies"
            :category="'filtered'"
            :loading="category.filtered.loading"
            @load-more="loadMore"
          ></CardList>
        </div>
      </section>
    </main>
  </div>
</template>
