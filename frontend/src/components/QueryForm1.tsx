import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormValues, usePost1 } from './usePost1';

const QueryForm1: FC = () => {
   const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
   const { mutation, posts, isLoading, isError } = usePost1();

   const onSubmit: SubmitHandler<FormValues> = data => {
      mutation.mutate(data);
      reset();
   };

   if (isLoading) return <div>загрузка...</div>;
   if (isError) return <div>ошибка</div>;

   return (
      <div>
         <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder='Заголовок' {...register('title', { required: true, minLength: 5 })} />
            {errors.title && (
               <p>{errors.title.type === "required" ? "Поле обязательно": "Минимум 5 символов"}</p>
            )}
            <input type="text" placeholder='Основной текст' {...register('body', { required: true, minLength: 10}) }/>
            {errors.body && (
               <p>{errors.body.type === "required" ? "Поле обязательно": "Минимум 10 символов"}</p>
            )}
            <button type="submit">отправить</button>
         </form>
         <p>текущие посты: </p>
         <div>
            {posts?.map((post) => (
               <div key={post.id}>
                  <h4>{post.title}</h4>
                  <p>{post.body}</p>
               </div>
            ))}
         </div>
      </div>
   )
}

export default QueryForm1;