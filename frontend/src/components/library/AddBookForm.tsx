import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";

export const AddBookForm = () => {
   const { register, handleSubmit, reset } = useForm<Book>();
   const queryClient = useQueryClient();

   const mutation = useMutation({
      mutationFn: (newBook: Omit<Book, 'id'>) => {
         const book = {...newBook, id: Date.now().toString()};
         mockDB.books.push(book);
         return Promise.resolve(book);
      },
      onSuccess: () => {
         queryClient.invalidateQueries(['books']);
         reset();
      }
   });

   const onSubmit = (data: Omit<Book, 'id'>) => mutation.mutate(data);

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <input {...register('title', { required: 'название обязательно' })} placeholder="название" />
         <input {...register('author', { required: 'автор обязателен' })} placeholder="автор" />
         <select {...register('genre')}>
            <option value="Фантастика">фантастика</option>
            <option value="Детектив">детектив</option>
            <option value="Роман">роман</option>
         </select>
         <button type="submit">добавить книгу</button>
      </form>
   );
}