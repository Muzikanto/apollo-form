import React from 'react';
import useForm, { IuseFormProps } from './hooks/useApolloForm';
import FormContext from './FormContext';

export type ApolloFormProps<S extends object> = IuseFormProps<S> & {
   children: React.ReactNode;

   id?: string;
   style?: React.CSSProperties;
   className?: string;
};

function ApolloForm<S extends object>({
   children,
   id,
   style,
   className,
   ...params
}: ApolloFormProps<S>) {
   const manager = useForm<S>(params);

   return (
      <FormContext.Provider value={manager}>
         <form
            id={id}
            onSubmit={e => {
               e.preventDefault();
               e.stopPropagation();

               manager.submit().then();
            }}
            style={style}
            className={className}
         >
            {children}
         </form>
      </FormContext.Provider>
   );
}

export default ApolloForm;
