import React from 'react';
import useForm, { IuseFormProps } from './hooks/useApolloForm';
import FormContext from './FormContext';

export type ApolloFormProps<S extends object> = IuseFormProps<S> & {
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
