<script lang="ts">
import { getMoviesBySearch, getTopRated, getUpComing } from '@/http'
import type FilterData from '@/interfaces/FilterData'
import type { MovieCard } from '@/interfaces/MovieCardData'
import CardList from './CardList.vue'
import FeaturedMovie from './FeaturedMovie.vue'
import MovieDetailsModal from './MovieDetailsModal.vue'
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
    MovieDetailsModal,
  },

  data() {
    return {
      category: {
        topRated: {
          page: 1,
          loading: false,
          movies: [] as MovieCard[],
          totalPages: 0,
          fetch: (page: number) => getTopRated(page),
        },
        upComing: {
          page: 1,
          loading: false,
          movies: [] as MovieCard[],
          totalPages: 0,
          fetch: (page: number) => getUpComing(page),
        },
        filtered: {
          page: 1,
          loading: false,
          movies: [] as MovieCard[],
          totalPages: 0,
          fetch: (page: number, search: FilterData) =>
            getMoviesBySearch(page, search),
        },
      },

      search: { ...defaultFilters },
      loading: false,
      openModal: false,
      selectedMovie: {} as MovieCard,
      scrollY: 0,
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
      const topRatedMovies = await getTopRated(this.category.topRated.page)
      this.category.topRated.movies = topRatedMovies.results
      this.category.topRated.totalPages = topRatedMovies.total_pages

      const upcomingMovies = await getUpComing(this.category.upComing.page)
      this.category.upComing.movies = upcomingMovies.results
      this.category.upComing.totalPages = upcomingMovies.total_pages
    } catch (error) {
      console.error('Erro ao buscar filmes:', error)
    }
  },

  methods: {
    searchData(search: FilterData) {
      let currCategory = this.category.filtered

      this.search = search

      if (!this.isFilteringActive) {
        return
      }

      currCategory.page = 1
      currCategory.totalPages = 0
      currCategory.movies = []

      this.loading = true

      this.getDiscoveredMovies()
    },

    async getDiscoveredMovies() {
      let currCategory = this.category.filtered
      try {
        const filteredMovies = await getMoviesBySearch(
          currCategory.page,
          this.search,
        )

        currCategory.movies = filteredMovies.results
        currCategory.totalPages = filteredMovies.total_pages
        currCategory.page = filteredMovies.page
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

        const newMovies = await currCategory.fetch(
          currCategory.page + 1,
          this.search,
        )

        currCategory.movies.push(...newMovies.results)

        currCategory.page = newMovies.page
      } catch (error) {
        console.error('Erro ao buscar filmes:', error)
      } finally {
        currCategory.loading = false
      }
    },

    expandMovie(movie: MovieCard) {
      this.scrollY = window.scrollY
      this.openModal = true
      this.selectedMovie = movie
    },

    handleCloseModal() {
      this.openModal = false

      this.$nextTick(() => {
        window.scrollTo(0, this.scrollY)
      })
    },

    hasMorePages(category: 'upComing' | 'topRated' | 'filtered'): boolean {
      return this.category[category].page < this.category[category].totalPages
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
          :show-load-more="hasMorePages('topRated')"
          @expand-movie="expandMovie"
          @load-more="loadMore"
        ></CardList>
        <CardList
          :title="'Upcoming'"
          :movies="category.upComing.movies"
          :category="'upComing'"
          :loading="category.upComing.loading"
          :show-load-more="hasMorePages('upComing')"
          @expand-movie="expandMovie"
          @load-more="loadMore"
        ></CardList>
        <MovieDetailsModal
          :should-open="openModal"
          :movie="selectedMovie"
          @close="handleCloseModal"
        ></MovieDetailsModal>
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
            :show-load-more="hasMorePages('filtered')"
            @expand-movie="expandMovie"
            @load-more="loadMore"
          ></CardList>
          <MovieDetailsModal
            :should-open="openModal"
            :movie="selectedMovie"
            @close="handleCloseModal"
          ></MovieDetailsModal>
        </div>
      </section>
    </main>
  </div>
</template>
