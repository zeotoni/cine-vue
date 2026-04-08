export interface MovieCard {
  id: number
  title: string
  genre_ids: number[]
  genres: {
    id: number
    name: string
  }[]
  release_date: string
  overview: string
  backdrop_path: string
  poster_path: string
  vote_average: number
}

export default interface MovieCardData {
  page: number
  results: MovieCard[]
  total_pages: number
  total_results: number
}
