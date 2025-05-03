import { useQuery } from "react-query";
import { IGitHubResponse } from "../../types/githubUsers.types";

const fetchUsers = async (username: string, page: number): Promise<IGitHubResponse> => {
   const response = await fetch(`https://api.github.com/search/users?q=${username}&page=${page}&per_page=10`);

   if (!response.ok) {
      throw new Error('ошибка')
   }

   let result = await response.json();
   return result;
};

export const useGitHubUsers = (username: string, page: number) => {
   return useQuery({
      queryKey: ['users', username, page],
      queryFn: () => fetchUsers(username, page),
      enabled: !!username
   })
};