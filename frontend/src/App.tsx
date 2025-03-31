import React, { FC } from 'react';
import FormExample from './components/FormExample';
import FormSelectExample from './components/FormSelectExample';
import FormValidationExample from './components/FormValidationExample';
import FormErrorHandlingExample from './components/FormErrorHandlingExample';
import FormAuthValidation from './components/FormAuthValidation';
import FromMultiSelect from './components/FromMultiSelect';
import './App.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import FormFilterProducts from './components/FormFilterProducts';

const queryClient = new QueryClient();

const App: FC = () => {
   return (
      <>
         {/* <p>form example</p>
         <FormExample />
         <p>form with select example</p>
         <FormSelectExample />
         <p>form with validation example</p>
         <FormValidationExample />
         <p>form with error handling example</p>
         <FormErrorHandlingExample />
         <p>my auth form</p>
         <FormAuthValidation />
         <p>my multiselect form</p>
         <FromMultiSelect /> */}
         {/* <QueryClientProvider client={queryClient}>

         </QueryClientProvider> */}
         <FormFilterProducts />
      </>
   );
};

export default App;