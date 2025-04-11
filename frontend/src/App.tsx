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
import { useQuery } from 'react-query';
import { usePosts } from './components/usePosts';

//сделать так, чтобы запрос не производился, когда нет id
const isAuth = true;

// const getData = async () => {
//    return axios.get('https://jsonplaceholder.typicode.com/posts');
// }

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

   const { data, isLoading } = usePosts(isAuth);

   return (
      <>
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
      </>
   );
};

export default App;