import { useQuery } from "react-query";
import { IMarvelApiResponse } from "../../types/marvel.types";

// !!! REACT_APP_PUBLIC_KEY required !!!

const fetchMarvel = async (name: string): Promise<IMarvelApiResponse> => {
   const apiKey = process.env.REACT_APP_PUBLIC_KEY;
   const response = await fetch(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${name.toLowerCase()}&apikey=${apiKey}`);

   if (!response.ok) {
      throw new Error('ошибка');
   }

   let result = response.json();
   console.log(result)
   return result;
};

export const useMarvel = (name: string) => {
   return useQuery({
      queryKey: ['marvel', name],
      queryFn: () => fetchMarvel(name),
      enabled: !!name
   });
};