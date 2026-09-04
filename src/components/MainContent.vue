<script lang="ts">
import { getById, getMoviesBySearch, getTopRated, getUpComing } from '@/http'
import type FilterData from '@/interfaces/FilterData'
import type { MovieCard } from '@/interfaces/MovieCardData'
import { regionStore } from '@/store/region'
import CardList from './CardList.vue'
import FeaturedMovie from './FeaturedMovie.vue'
import MovieDetailsModal from './MovieDetailsModal.vue'
import SidebarFilters from './SidebarFilters.vue'
import CardListSkeleton from './skeletons/CardListSkeleton.vue'
import FeaturedMovieSkeleton from './skeletons/FeaturedMovieSkeleton.vue'

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
    CardListSkeleton,
    FeaturedMovieSkeleton,
  },

  data() {
    return {
      category: {
        topRated: {
          page: 1,
          loading: false,
          loadingMore: false,
          movies: [] as MovieCard[],
          totalPages: 0,
          fetch: (page: number) => getTopRated(page),
        },
        upComing: {
          page: 1,
          loading: false,
          loadingMore: false,
          movies: [] as MovieCard[],
          totalPages: 0,
          fetch: (page: number) => getUpComing(page),
        },
        filtered: {
          page: 1,
          loading: false,
          loadingMore: false,
          movies: [] as MovieCard[],
          totalPages: 0,
          fetch: (page: number, search: FilterData) =>
            getMoviesBySearch(page, search),
        },
      },

      search: { ...defaultFilters },
      loading: false,
      openModal: false,
      loadingDetails: false,
      selectedMovie: {} as MovieCard,
      scrollY: 0,
      regionStore,
      featuredLoaded: false,
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

  watch: {
    'regionStore.region': {
      async handler() {
        this.loading = true
        this.featuredLoaded = false
        this.category.topRated.loading = true
        this.category.upComing.loading = true

        this.category.filtered.page = 1
        this.category.topRated.page = 1
        this.category.upComing.page = 1

        this.category.filtered.totalPages = 0
        this.category.topRated.totalPages = 0
        this.category.upComing.totalPages = 0

        this.category.filtered.movies = []
        this.category.topRated.movies = []
        this.category.upComing.movies = []

        try {
          const isFilteringActive =
            this.search.title.trim() !== '' ||
            this.search.genre !== 'all' ||
            this.search.fromYear !== '' ||
            this.search.toYear !== ''

          if (isFilteringActive) {
            let currCategory = this.category.filtered
            const filteredMovies = await getMoviesBySearch(
              currCategory.page,
              this.search,
            )

            currCategory.movies = filteredMovies.results
            currCategory.totalPages = filteredMovies.total_pages
            currCategory.page = filteredMovies.page
          }

          const topRatedMovies = await getTopRated(this.category.topRated.page)
          this.category.topRated.movies = topRatedMovies.results
          this.category.topRated.totalPages = topRatedMovies.total_pages

          const upcomingMovies = await getUpComing(this.category.upComing.page)
          this.category.upComing.movies = upcomingMovies.results
          this.category.upComing.totalPages = upcomingMovies.total_pages
        } catch (error) {
          console.error('Erro ao buscar filmes:', error)
        } finally {
          this.loading = false
          this.category.topRated.loading = false
          this.category.upComing.loading = false
        }
      },
    },
  },

  async created() {
    try {
      this.category.topRated.loading = true
      this.category.upComing.loading = true

      const topRatedMovies = await getTopRated(this.category.topRated.page)
      this.category.topRated.movies = topRatedMovies.results
      this.category.topRated.totalPages = topRatedMovies.total_pages

      const upcomingMovies = await getUpComing(this.category.upComing.page)
      this.category.upComing.movies = upcomingMovies.results
      this.category.upComing.totalPages = upcomingMovies.total_pages
    } catch (error) {
      console.error('Erro ao buscar filmes:', error)
    } finally {
      this.category.topRated.loading = false
      this.category.upComing.loading = false
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
        currCategory.loadingMore = true

        const newMovies = await currCategory.fetch(
          currCategory.page + 1,
          this.search,
        )

        currCategory.movies.push(...newMovies.results)

        currCategory.page = newMovies.page
      } catch (error) {
        console.error('Erro ao buscar filmes:', error)
      } finally {
        currCategory.loadingMore = false
      }
    },

    async expandMovie(movie: MovieCard) {
      this.scrollY = window.scrollY
      window.scrollTo(0, 0)

      this.loadingDetails = true
      this.openModal = true
      document.body.style.overflow = 'hidden'

      try {
        const newMovie = await getById(movie.id)
        this.selectedMovie = newMovie
      } catch (error) {
        console.error('Erro ao buscar filmes:', error)
      } finally {
        this.loadingDetails = false
      }
    },

    handleCloseModal() {
      this.openModal = false
      document.body.style.overflow = 'auto'
      this.selectedMovie = {} as MovieCard

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
        <FeaturedMovieSkeleton v-show="!featuredLoaded"></FeaturedMovieSkeleton>
        <FeaturedMovie
          v-show="featuredLoaded"
          @load-finished="featuredLoaded = $event"
        ></FeaturedMovie>
        <div>
          <h3 class="text-fs-3 font-fw3 text-primaryHeading mb-3">Top Rated</h3>
          <CardListSkeleton v-if="category.topRated.loading"></CardListSkeleton>
          <p
            v-else-if="category.topRated.movies.length === 0"
            class="text-primaryHeading text-fs-3"
          >
            Nenhum filme encontrado
          </p>
          <CardList
            v-else
            :movies="category.topRated.movies"
            :category="'topRated'"
            :loading="category.topRated.loadingMore"
            :show-load-more="hasMorePages('topRated')"
            @expand-movie="expandMovie"
            @load-more="loadMore"
          ></CardList>
        </div>
        <div>
          <h3 class="text-fs-3 font-fw3 text-primaryHeading mb-3">Upcoming</h3>
          <CardListSkeleton v-if="category.upComing.loading"></CardListSkeleton>
          <p
            v-else-if="category.upComing.movies.length === 0"
            class="text-primaryHeading text-fs-3"
          >
            Nenhum filme encontrado
          </p>
          <CardList
            v-else
            :movies="category.upComing.movies"
            :category="'upComing'"
            :loading="category.upComing.loadingMore"
            :show-load-more="hasMorePages('upComing')"
            @expand-movie="expandMovie"
            @load-more="loadMore"
          ></CardList>
        </div>
        <MovieDetailsModal
          :should-open="openModal"
          :movie="selectedMovie"
          :loading="loadingDetails"
          @close="handleCloseModal"
        ></MovieDetailsModal>
      </section>

      <section v-if="isFilteringActive" class="flex flex-col gap-10">
        <p
          v-if="loading"
          class="text-primaryHeading text-center text-fs-2 font-fw3 line-clamp-2"
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
            :loading="loadingDetails"
            @close="handleCloseModal"
          ></MovieDetailsModal>
        </div>
      </section>
    </main>
  </div>
</template>
