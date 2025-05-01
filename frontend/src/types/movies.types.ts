export interface IMovieValues {
   id: number;
   title: string;
   poster_path: string | null;
   release_date: string;
   overview: string;
}

export interface IMoviesResponse {
   page: number;
   results: IMovieValues[];
   total_pages: number;
   total_results: number;
}