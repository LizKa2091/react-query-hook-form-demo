import { useQuery } from "react-query";
import { IEntity } from "../../types/starwars.types";

interface IResponse {
   results: IEntity[];
 }

const getEntities = async (): Promise<IResponse> => {
   try {
      const response = await fetch('https://swapi.dev/api/people/');

      if (!response.ok) {
         throw new Error('ошибка')
      }
      const data = await response.json();
  
      const resultsWithId = data.results.map((entity: any) => ({
         ...entity,
         id: parseInt(entity.url.split('/').filter(Boolean).pop()),
      }));

      return { ...data, results: resultsWithId };
   }
   catch (err) {
      throw new Error('ошибка');
   }
};

const getEntityById = async (id: number): Promise<IEntity> => {
   try {
      const response = await fetch(`https://swapi.dev/api/people/${id}/`);

      if (!response.ok) {
         throw new Error('ошибка');
      }
      return response.json();
   }
   catch (err) {
      throw new Error('ошибка')
   }
};

export const useEntities = () => {
   return useQuery<IResponse>({
      queryKey: ['allEntities'],
      queryFn: () => getEntities()
   });
};

export const useEntityById = (id: number) => {
   return useQuery<IEntity>({
      queryKey: ['entity', id],
      queryFn: () => getEntityById(id),
      enabled: !!id
   });
};