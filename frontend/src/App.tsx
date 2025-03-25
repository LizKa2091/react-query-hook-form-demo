import React, { FC } from 'react';
import FormExample from './components/FormExample';
import FormSelectExample from './components/FormSelectExample';
import FormValidationExample from './components/FormValidationExample';
import FormErrorHandlingExample from './components/FormErrorHandlingExample';

import './App.css';

const App: FC = () => {
   return (
      <>
         <p>form example</p>
         <FormExample />
         <p>form with select example</p>
         <FormSelectExample />
         <p>form with validation example</p>
         <FormValidationExample />
         <p>form with error handling example</p>
         <FormErrorHandlingExample />
      </>
   );
};

export default App;