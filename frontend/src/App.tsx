import React, { FC, useEffect } from 'react';
import FormExample from './components/FormExample';
import FormSelectExample from './components/FormSelectExample';
import FormValidationExample from './components/FormValidationExample';
import FormErrorHandlingExample from './components/FormErrorHandlingExample';
import FormAuthValidation from './components/FormAuthValidation';
import FromMultiSelect from './components/FromMultiSelect';
import './App.css';
import axios from 'axios';

import FormFilterProducts from './components/FormFilterProducts';
import { useIsFetching, useIsMutating, useMutation, useQuery, useQueryClient } from 'react-query';
import { usePosts } from './components/usePosts';
import { usePost } from './components/usePostById';
import { IPost } from './post.types';
import ToDoQuery from './components/ToDoQuery';

//сделать так, чтобы запрос не производился, когда нет id
const isAuth = true;

// const getData = async () => {
//    return axios.get('https://jsonplaceholder.typicode.com/posts');
// }

// useQuery используется для GET запросов, кэширует данные
// useMutation используется для обновления данных (все запросы кроме GET), не кэширует данные
const App: FC = () => {
   // //расстановка постоянно меняется в разных версиях
   // const { data, isLoading, isSuccess, isError } = useQuery({
   //    queryKey: ['posts'], //по этому же ключу будет храниться в кэше
   //    queryFn: getData,
   //    select: (data) => data.data,
   //    enabled: isAuth, // запрос делается только тогда, когда isAuth true

   // });

   // useEffect(() => {
   //    if (isSuccess) console.log('успех')
   // }, [isSuccess, data]);

   // useEffect(() => {
   //    if (isError) console.log('ошибка')
   // }, [isError]);

   const { post } = usePost(1);
   const { data, isLoading } = usePosts(isAuth);

   const queryClient = useQueryClient();

   console.log(post);

   const { mutate } = useMutation({
      mutationKey: ['add post'],
      mutationFn: async (newPost: Omit<IPost, 'id'>) => axios.post('https://jsonplaceholder.typicode.com/posts', newPost),
      // если в mutationFn больше 1 аргумента, то уже нужен объект
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['posts'] })
      }
   });

   // можем глобавльно устанавливать загрузку к любому запросу
   // const isFetching = useIsFetching();
   // const isMutating = useIsMutating();

   return (
      <>
         <ToDoQuery />
         {/* <p>form example</p>
         <FormExample />
         <p>form with select example</p>
         <FormSelectExample />
         <p>form with validation example</p>
         <FormValidationExample />
         <p>form with error handling example</p>
         <FormErrorHandlingExample />
         <p>my auth form</p>
         <FormAuthValidation />
         <p>my multiselect form</p>
         <FromMultiSelect /> */}
         {/* <QueryClientProvider client={queryClient}>

         </QueryClientProvider> */}
         {/* <FormFilterProducts /> */}
         {/* <QueryTutorial /> */}
         {isLoading ? 'Loading' : data?.length ? data.map((post: any) => (
            <div key={post.id}>
               {post.title}
            </div>
         )) : 'Not found'}
         <button onClick={ () => queryClient.invalidateQueries({queryKey: ['posts']}) }>invalidate posts</button>
         <button onClick={ () => mutate({
            body: 'New body',
            title: 'New title',
            userId: 1
         })}>Create</button>
      </>
   );
};

export default App;