import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IMovieValues } from '../../types/movies.types';
import { useMovies } from './useMovies';

interface IFormParams {
   name: string;
};

const Movies: FC = () => {
   const [inputValue, setInputValue] = useState<string>('');

   const { register, handleSubmit, watch } = useForm<IFormParams>();
   const { data, isLoading, isError } = useMovies(inputValue);

   const handleForm = ({ name }: IFormParams) => {
      setInputValue(name);
   };

   return (
      <div>
         <form onSubmit={handleSubmit(handleForm)}>
            <input type="text" {...register('name', { required: true, minLength: 2 })} placeholder='название'/>
            <button type="submit">поиск</button>
         </form>
         {isLoading && <span>загрузка...</span>}
         {isError && <span>ошибка, попробуйте ещё раз</span>}
         {data?.results && data.results.length > 0 &&
            <ul>
               {data.results.map((item: IMovieValues) => 
                  <li key={item.id} style={{display: 'flex', flexDirection: 'column'}}>
                     {item.title}
                     {item.overview}
                     {item.poster_path}
                     {item.release_date}
                  </li>
               )}
            </ul>
         }
      </div>
   )
};

export default Movies;