import React from 'react';
import { FormManagerParams } from './FormManager';
import useForm from './hooks/useForm';
import FormContext from './FormContext';

export type ApolloFormProps<S extends object> = Omit<FormManagerParams<S>, 'apolloClient'> & {
   children: React.ReactNode;
};

function ApolloForm<S extends object>({ children, ...params }: ApolloFormProps<S>) {
   const manager = useForm<S>(params);

   return (
      <FormContext.Provider value={manager}>
         <form
            onSubmit={e => {
               e.preventDefault();
               e.stopPropagation();

               manager.submit();
            }}
         >
            {children}
         </form>
      </FormContext.Provider>
   );
}

export default ApolloForm;
