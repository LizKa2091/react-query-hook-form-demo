import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "react-query";

export type FormValues = {
   title: string;
   body: string;
   id: number;
}

const sendPost = async (data: FormValues): Promise<FormValues> => {
   const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      title: data.title,
      body: data.body,
      userId: 1
   });
   return response.data;
};

const fetchPosts = async (): Promise<FormValues[]> => {
   const response = await axios.get("https://jsonplaceholder.typicode.com/posts");

   return response.data;
}

export const usePost1 = () => {
   const queryClient = useQueryClient();

   const mutation = useMutation({
      mutationFn: sendPost,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['posts'] })
      }
   })

   const { data, isLoading, isError } = useQuery({
      queryKey: ['posts'],
      queryFn: fetchPosts
   });

   return { mutation, posts: data, isLoading, isError }
};