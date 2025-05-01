import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './App.css';
import Movies from './components/movies/Movies';

const queryClient = new QueryClient();

const App: FC = () => {
   return (
      <QueryClientProvider client={queryClient}>
         <Movies />
         <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
   );
};

export default App;