import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import GitHubUsers from './components/searchGithubUsers/GitHubUsers';
import './App.css';

const queryClient = new QueryClient();

const App: FC = () => {
   return (
      <QueryClientProvider client={queryClient}>
         <GitHubUsers />
         <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
   );
};

export default App;