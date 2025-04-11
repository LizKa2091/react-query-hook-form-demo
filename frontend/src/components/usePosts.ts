import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { IPost } from "../post.types";

const getData = async () => {
   return axios.get<IPost[]>('https://jsonplaceholder.typicode.com/posts');
};

const initialData: { data: IPost[] } = {
   data: [
      {
         body: 'Initial body',
         id: 0,
         title: 'Initial title',
         userId: 0
      },
   ]
}

export function usePosts(isEnabled: boolean) {
   const { data, isLoading, isSuccess, isError } = useQuery({
      queryKey: ['posts'], //по этому же ключу будет храниться в кэше
      queryFn: getData,
      select: (data) => data.data,
      enabled: isEnabled, // запрос делается только тогда, когда isEnabled true
      initialData, // полезно для серверных приложений, предварительно заполняет кэш данными до выполнения запрсов
      staleTime: 1000, // время, через которое стейт будет неактивен и его нужно будет обновить (время в мс)
   });

   useEffect(() => {
      if (isSuccess) console.log('успех')
   }, [isSuccess, data]);

   useEffect(() => {
      if (isError) console.log('ошибка')
   }, [isError]);

   return { data, isLoading, isSuccess, isError };
};