import axios from "axios";
import { useQuery } from "react-query";
import { IPost } from "../post.types";

const getData = async (id: number) => {
   return axios.get<IPost>(`https://jsonplaceholder.typicode.com/posts/${id}`);
};

// isLoading и isFetching разница: 
// isLoading срабатывает тогда, когда идёт первая загрузка запроса
// isFetching срабатывает при обновлении данных (из кэша или ревалидация данных)

// функция refetch используется для принудительного повторного запроса данных (нужно обновить данные вручную, например, при нажатии на кнопку)
// использовать, когда не нужно передавать refetch через пропсы. если же нужно использовать вне контекста, то лучше подойдёт
// useQueryClient.invalidateQueries (App.tsx 44, 72 строки). он в целом лучше, тк автоматически управляет данными после мутации
export function usePost(id: number) {
   const { data, isLoading } = useQuery({
      queryKey: ['post', id], //queryKey: по этому же ключу будет храниться в кэше. очень важно делать разные ключи для разных запросов
      queryFn: () => getData(id),
      select: data => data.data,
      enabled: !!id, // запрос делается только тогда, когда id есть
   });

   return { post: data, isLoading };
};