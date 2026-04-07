import type FilterData from '@/interfaces/FilterData'
import type MovieCardData from '@/interfaces/MovieCardData'
import type { MovieCard } from '@/interfaces/MovieCardData'
import axios from 'axios'

const tmdb = axios.create({
  baseURL: import.meta.env.VITE_TMDB_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
    Accept: 'application/json',
  },
})

export async function getPopularMovies() {
  const response = await tmdb.get('/movie/popular')
  const popularMovies: MovieCardData = response.data

  return popularMovies
}

export async function getTopRated(page: number, filter?: FilterData) {
  const response = await tmdb.get(`/movie/top_rated?page=${page}`)
  const topRatedMovies: MovieCardData = response.data

  return topRatedMovies
}

export async function getUpComing(page: number, filter?: FilterData) {
  const response = await tmdb.get(`/movie/upcoming?page=${page}`)
  const upcomingMovies: MovieCardData = response.data

  return upcomingMovies
}

export async function getMoviesBySearch(page: number, filter: FilterData) {
  const params: Record<string, string | number> = {}

  if (filter.title.trim() !== '') {
    params.query = filter.title

    const response = await tmdb.get(`search/movie?page=${page}`, {
      params,
    })
    const foundMovies: MovieCardData = response.data

    return foundMovies
  }

  if (filter.genre !== 'all') {
    params.with_genres = filter.genre
  }

  if (filter.fromYear !== '') {
    params['primary_release_date.gte'] = filter.fromYear + '-01-01'
  }

  if (filter.toYear !== '') {
    params['primary_release_date.lte'] = filter.toYear + '-12-31'
  }

  params.sort_by = 'release_date.asc'

  const response = await tmdb.get(`discover/movie?page=${page}`, {
    params,
  })
  const foundMovies: MovieCardData = response.data

  return foundMovies
}

export async function getById(id: number) {
  const response = await tmdb.get(`/movie/${id}`)
  const movie: MovieCard = response.data

  return movie
}
