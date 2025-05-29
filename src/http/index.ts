import axios from 'axios'

const tmdb = axios.create({
  baseURL: import.meta.env.VITE_TMDB_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
    Accept: 'application/json',
  },
})

export async function getPopularMovies() {
  return tmdb.get('/movie/popular')
}

export async function getTopRated() {
  return tmdb.get('/movie/top_rated')
}
