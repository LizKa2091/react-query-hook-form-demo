import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { IPost } from "../post.types";

const getData = async (id: number) => {
   return axios.get<IPost>(`https://jsonplaceholder.typicode.com/posts/${id}`);
};

export function usePostById(id: number) {
   const { data, isLoading, isSuccess, isError } = useQuery({
      queryKey: ['post', id], //queryKey: по этому же ключу будет храниться в кэше
      queryFn: (id: number) => getData(id),
      select: (data) => data.data,
      enabled: id, // запрос делается только тогда, когда isEnabled true
   });

   useEffect(() => {
      if (isSuccess) console.log('успех')
   }, [isSuccess, data]);

   useEffect(() => {
      if (isError) console.log('ошибка')
   }, [isError]);

   return { data, isLoading, isSuccess, isError };
};