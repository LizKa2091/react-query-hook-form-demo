import React, { FC } from 'react';
import { useQuery } from 'react-query';

const fetchData = async () => {
   const response = await fetch('/api/data');
   const data = await response.json();
   
   return data;
};

const QueryComponent: FC = () => {
   const { data, isLoading, error } = useQuery('myData', fetchData);
   // myData - ключ запроса. используется для идентификации и управления кэшированными данными, связанными с запросом
   // что-то вроде id для запроса

   if (isLoading) {
      return <div>Loading...</div>;
   }

   if (error) {
      const err = error as Error;

      return <div>{err.message}</div>;
   }

   return <div>{data}</div>

   // кэширование и автоматическое обновление данных
   // const { data } = useQuery('myData', fetchData, {
   //    refetchInterval: 5000, //обновление данных каждые 5 секунд
   // });

   // return <div>{data}</div>
   // полезно для отображения данных в режиме реального времени, иначе может быть потеря производительности
};

export default QueryComponent;