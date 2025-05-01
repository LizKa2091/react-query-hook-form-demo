import { useQuery } from 'react-query';
import { IMoviesResponse } from './../../types/movies.types';

const fetchMovies = async (name: string): Promise<IMoviesResponse> => {
   try {
      const apiKey = process.env.REACT_APP_PUBLIC_KEY;

      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${name}`);

      if (!response.ok) {
         throw new Error('ошибка')
      }

      let result = await response.json();

      return result;
   }
   catch(err) {
      throw new Error('ошибка');
   }
};

export const useMovies = (name: string) => {
   return useQuery({
      queryKey: ['movies', name],
      queryFn: () => fetchMovies(name),
      enabled: !!name,
      retry: 2,
      staleTime: 1000 * 60
   })
};