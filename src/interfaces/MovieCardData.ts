export interface MovieCard {
  title: string
  genre_ids: number[]
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
