import type CountryData from '@/interfaces/CountryData'
import type FilterData from '@/interfaces/FilterData'
import type MovieCardData from '@/interfaces/MovieCardData'
import type { MovieCard } from '@/interfaces/MovieCardData'
import { regionStore } from '@/store/region'
import axios from 'axios'

const tmdb = axios.create({
  baseURL: import.meta.env.VITE_TMDB_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
    Accept: 'application/json',
  },
})

tmdb.interceptors.request.use(function (config) {
  config.params = {
    ...config.params,
    region: regionStore.region,
  }

  return config
})

export async function getFeaturedMovies() {
  const currYear = new Date().getFullYear()

  let response = await tmdb.get('/discover/movie', {
    params: {
      with_origin_country: regionStore.region,
      sort_by: 'vote_average.desc',
      'primary_release_date.gte': `${currYear - 5}-01-01`,
    },
  })

  let results = response.data.results

  if (!results.length) {
    response = await tmdb.get('/discover/movie', {
      params: {
        with_origin_country: regionStore.region,
        sort_by: 'vote_average.desc',
      },
    })

    results = response.data.results
  }

  if (!results.length) {
    response = await tmdb.get('/discover/movie', {
      params: {
        sort_by: 'vote_average.desc',
      },
    })

    results = response.data.results
  }

  const featuredMovies: MovieCardData = response.data

  return featuredMovies
}

export async function getTopRated(page: number, filter?: FilterData) {
  const response = await tmdb.get('/discover/movie', {
    params: {
      page,
      with_origin_country: regionStore.region,
      sort_by: 'vote_average.desc',
      'vote_average.gte': 1.0,
    },
  })
  const topRatedMovies: MovieCardData = response.data

  return topRatedMovies
}

export async function getUpComing(page: number, filter?: FilterData) {
  const currDate = new Date().toISOString().split('T')[0]

  const response = await tmdb.get('/discover/movie', {
    params: {
      page,
      with_origin_country: regionStore.region,
      sort_by: 'primary_release_date.asc',
      'primary_release_date.gte': currDate,
    },
  })
  const upcomingMovies: MovieCardData = response.data

  return upcomingMovies
}

export async function getMoviesBySearch(page: number, filter: FilterData) {
  const params: Record<string, string | number> = {
    page,
  }

  let endpoint = ''

  if (filter.title.trim() !== '') {
    params.query = filter.title
    endpoint = '/search/movie'
  } else {
    if (filter.genre !== 'all') {
      params.with_genres = filter.genre
    }

    if (filter.fromYear !== '') {
      params['primary_release_date.gte'] = filter.fromYear + '-01-01'
    }

    if (filter.toYear !== '') {
      params['primary_release_date.lte'] = filter.toYear + '-12-31'
    }

    params.sort_by = 'primary_release_date.asc'
    params.with_origin_country = regionStore.region
    params.with_release_type = 2 | 3

    endpoint = '/discover/movie'
  }

  const response = await tmdb.get(endpoint, { params })
  const foundMovies: MovieCardData = response.data

  return foundMovies
}

export async function getById(id: number) {
  const response = await tmdb.get(`/movie/${id}`)
  const movie: MovieCard = response.data

  return movie
}

export async function getCountriesList() {
  const response = await tmdb.get(`/configuration/countries`)
  const listMovie: CountryData[] = response.data

  return listMovie
}
