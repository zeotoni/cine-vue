import type FilterData from '@/interfaces/FilterData'
import type MovieCardData from '@/interfaces/MovieCardData'
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
  const popularMovies: MovieCardData[] = response.data.results

  return popularMovies
}

export async function getTopRated() {
  const response = await tmdb.get('/movie/top_rated')
  const topRatedMovies: MovieCardData[] = response.data.results

  return topRatedMovies
}

export async function getUpComing() {
  const response = await tmdb.get('/movie/upcoming')
  const upcomingMovies: MovieCardData[] = response.data.results

  return upcomingMovies
}

export async function getMoviesBySearch(filter: FilterData) {
  const params: Record<string, string | number> = {}

  if (filter.title.trim() !== '') {
    params.query = filter.title

    const response = await tmdb.get(`search/movie`, {
      params,
    })
    const foundMovies: MovieCardData[] = response.data.results

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

  const response = await tmdb.get(`discover/movie`, {
    params,
  })
  const foundMovies: MovieCardData[] = response.data.results

  return foundMovies
}
