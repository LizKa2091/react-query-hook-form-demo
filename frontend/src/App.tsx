import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './App.css';
import Marvel from './components/marvel/Marvel';

const queryClient = new QueryClient();

const App: FC = () => {
   return (
      <QueryClientProvider client={queryClient}>
         <Marvel />
         {/* <ReactQueryDevtools initialIsOpen={true} /> */}
      </QueryClientProvider>
   );
};

export default App;