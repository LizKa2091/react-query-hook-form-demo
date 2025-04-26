import React, { FC, useState } from 'react';
import { usePokedex } from './usePokedex';

const Pokedex: FC = () => {
   const [inputValue, setInputValue] = useState('');
   const [searchTerm, setSearchTerm] = useState('');
   const { data: pokemon } = usePokedex(searchTerm);

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (inputValue.trim()) {
         setSearchTerm(inputValue.trim());
      }
   };

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)} value={inputValue} type="text" placeholder='введите имя покемона или id'/>
            <button type="submit">найти</button>
            <p>например, pikachu</p>
         </form>
         {pokemon && (
         <div>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>ID: {pokemon.id}</p>
            <div>
               {pokemon.types.map((type: any) => (
                  <span key={type.type.name}>{type.type.name}</span>
               ))}
            </div>
         </div>
         )}
      </div>
   )
}

export default Pokedex;