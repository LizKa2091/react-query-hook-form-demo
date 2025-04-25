import { useQuery } from "react-query";

export const BookList = () => {
   const { data: books, isLoading} = useQuery<Book[]>({
      queryKey: ['books'],
      queryFn: () => Promise.resolve(mockDB.books)
   })
   if (isLoading) return <div>Загрузка...</div>;

  return (
    <div>
      {books?.map(book => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>{book.author}, {book.genre}, {book.publishedYear}</p>
        </div>
      ))}
    </div>
  );
};