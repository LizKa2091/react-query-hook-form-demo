import { useQuery, useQueryClient, useMutation } from "react-query";

export type Todo = {
   id: number;
   title: string;
   completed: boolean;
};

let mockTodos: Todo[] = [
   { id: 1, title: "Изучить React Query", completed: false },
   { id: 2, title: "Написать Todo App", completed: true },
];

const fetchTodos = async (): Promise<Todo[]> => {
   return new Promise((resolve) => {
      setTimeout(() => {
         resolve([...mockTodos]);
      }, 1000);
   });
};
 

export function useTodos() {
   const { data, isLoading, isError } = useQuery({
      queryKey: ['todos'],
      queryFn: fetchTodos
   })

   return { data, isLoading, isError };
};

const addToDo = async (title: string): Promise<Todo> => {
   return new Promise((resolve) => {
      setTimeout(() => {
         const newTodo = {
            id: Math.random(),
            title,
            completed: false,
         };

         mockTodos.push(newTodo); // без этого новые задания не появляются
         resolve(newTodo);
      }, 500);
   })
};

export function useAddTodo() {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['update todos'],
      mutationFn: addToDo,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['todos'] })
      }
   });
};