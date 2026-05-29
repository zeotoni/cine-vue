import fallbackImg from '@/assets/images/no-poster.png'
import type { MovieCard } from '@/interfaces/MovieCardData'

export function getBackdropImg(movie: MovieCard) {
  if (movie.backdrop_path) {
    return `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
  } else if (movie.poster_path) {
    return `https://image.tmdb.org/t/p/original${movie.poster_path}`
  } else {
    return fallbackImg
  }
}

export function getPosterImg(movie: MovieCard) {
  if (movie.poster_path) {
    return `https://image.tmdb.org/t/p/original${movie.poster_path}`
  } else if (movie.backdrop_path) {
    return `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
  } else {
    return fallbackImg
  }
}
