import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { IPost } from "../post.types";

const getData = async () => {
   return axios.get<IPost[]>('https://jsonplaceholder.typicode.com/posts');
};

export function usePosts(isEnabled: boolean) {
   const { data, isLoading, isSuccess, isError } = useQuery({
      queryKey: ['posts'], //по этому же ключу будет храниться в кэше
      queryFn: getData,
      select: (data) => data.data,
      enabled: isEnabled, // запрос делается только тогда, когда isEnabled true
   });

   useEffect(() => {
      if (isSuccess) console.log('успех')
   }, [isSuccess, data]);

   useEffect(() => {
      if (isError) console.log('ошибка')
   }, [isError]);

   return { data, isLoading, isSuccess, isError };
};