import React, { FC, useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useTodos, useAddTodo } from './useToDo';

const ToDoQuery: FC = () => {
   const { data, isLoading, isError} = useTodos();
   const { mutate } = useAddTodo();

   const handleAddTodo = () => {
      const newTitle = prompt('текст для новой задачи:');
      if (newTitle) {
         mutate(newTitle);
      }
   };

   return (
      <div>
         {isLoading &&
            <div>загрузка...</div>
         }
         {isError && 
            <div>возникла ошибка при загрузке данных</div>
         }
         {data?.map((item) => (
            <div key={item.id}>
               задача: {item.title} <br />
               статус: {item.completed ? 'выполнено' : 'не выполнено'}
            </div>
         ))}
         <button onClick={handleAddTodo}>добавить новую задачу</button>
      </div>
   )
};

export default ToDoQuery;