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
