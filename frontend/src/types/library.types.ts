interface User {
   id: string;
   username: string;
   token: string;
};
 
interface Book {
   id: string;
   title: string;
   author: string;
   genre: 'Фантастика' | 'Детектив' | 'Роман' | 'Научная литература' | 'Другое';
   publishedYear: number;
   rating?: number;
};
 
let mockDB = {
   users: [{ id: '1', username: 'admin', token: 'fake-jwt-token' }],
   books: [] as Book[],
};