import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGitHubUsers } from './useGitHubUsers';
import { IGitHubUser } from '../../types/githubUsers.types';

interface IFormValues {
   username: string;
}

const GitHubUsers: FC = () => {
   const [page, setPage] = useState<number>(1);

   const { register, handleSubmit, formState: { errors }, watch } = useForm<IFormValues>();
   let username = watch('username');

   const { data, isLoading, isError, isSuccess } = useGitHubUsers(username, page);


   const handleForm = () => {};

   return (
      <div>
         <form onSubmit={handleSubmit(handleForm)}>
            <input type="text" placeholder='имя пользователя' {...register('username', { required: true, minLength: 3, maxLength: 20 })} onChange={ () => setPage(1) } />
            {errors.username && <p>{errors.username.message}</p>}
            {(errors.username || username?.length === 0) ? (
               <button type="submit" disabled>поиск</button>
               ) : (
                  <button type="submit">поиск</button>
               )
            } 
         </form>
         {isLoading && <p>загрузка...</p>}
         {isError && <p>ошибка при загрузке</p>}
         {isSuccess && data.items.length > 0 &&
            <>
               <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {data.items.map((item: IGitHubUser) => 
                     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #000', borderRadius: 12, maxWidth: 'max-content', padding: 15, gap: 25 }}>
                        login: {item.login}
                        id: {item.id}
                        type: {item.type}
                        avatar_url: <img src={item.avatar_url} alt={item.login} />
                     </div>
                  )}
               </div>
               <p>страница {page}</p>
               {data?.total_count > 10 && 
                  <button onClick={ () => setPage((prevPage: number) => prevPage + 1) }>перейти на следующую страницу</button>
               }
            </>
         }
         {isSuccess && data.items.length === 0 &&
            <p>ничего не найдено, попробуйте другой никнейм</p>
         }
      </div>
   )
};

export default GitHubUsers;