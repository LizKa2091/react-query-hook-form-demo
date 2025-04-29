import React, { FC, useState } from 'react';
import { IMarvelCharacter } from '../../types/marvel.types';
import { useForm } from 'react-hook-form';
import { useMarvel } from './useMarvel';

// !!! REACT_APP_PUBLIC_KEY required !!!

interface IFormParams {
   name: string;
};

const Marvel: FC = () => {
   const { register, handleSubmit } = useForm<IFormParams>();
   const [searchName, setSearchName] = useState('');
   const { data, isLoading, isError, isSuccess, refetch } = useMarvel(searchName);

   const handleForm = ({ name }: { name: string }) => {
      setSearchName(name);
   };

   return (
      <div>
         <p>поиск персонажей marvel</p>
         <form onSubmit={handleSubmit(handleForm)}>
            <input type="text" placeholder='название' {...register('name', { required: true, minLength: 2 })}/>
            <button type="submit">поиск</button>
         </form>
         {isLoading && <span>загрузка...</span>}
         {isError && <span>произошла ошибка</span>}
         {isSuccess && data &&
            <ul>
               {data.data.results.map((character: IMarvelCharacter) => (
                  <li style={{display: 'flex', flexDirection: 'column', marginBottom: 15}}>
                     <span>id: {character.id}</span>
                     <span>name: {character.name}</span>
                     <span>name: {character.description}</span>
                  </li>
               ))}
            </ul>
         }
         {isSuccess && data?.data?.results?.length === 0 &&
            <span>персонажи не найдены. попробуйте другое название</span>
         }
      </div>
   )
};

export default Marvel;