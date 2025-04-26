import { useQuery, useQueryClient } from "react-query";

const fetchPokemon = async (nameOrId: string) => {
   try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase()}`);

      if (!response.ok) throw new Error('покемон не найден');

      return response.json();
   }
   catch (e) {
      throw new Error(`ошибка: ${e}`);
   }
};

export const usePokedex = (nameOrId: string) => {
   return useQuery({
      queryKey: ['pokemon', nameOrId],
      queryFn: () => fetchPokemon(nameOrId),
      enabled: !!nameOrId,
      retry: 1
   })
};