import React, { MutableRefObject } from 'react';
import useForm, { IuseFormProps } from './hooks/useApolloForm';
import FormContext from './utils/FormContext';
import FormManager from './managers/FormManager';

export type ApolloFormProps<S extends object> = IuseFormProps<S> & {
   children: React.ReactNode;

   id?: string;
   style?: React.CSSProperties;
   className?: string;
};

function ApolloForm<S extends object>(
   { children, id, style, className, onInit, ...params }: ApolloFormProps<S>,
   ref:
      | ((instance: FormManager<S> | null) => void)
      | MutableRefObject<FormManager<S> | null>
      | null,
) {
   const manager = useForm<S>({
      onInit: form => {
         if (onInit) {
            onInit(form);
         }

         if (ref) {
            if (typeof ref === 'object') {
               ref.current = form;
            } else {
               ref(form);
            }
         }
      },
      ...params,
   });

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

export default React.forwardRef(ApolloForm) as <S extends object>(
   props: ApolloFormProps<S> & {
      ref?:
         | ((instance: FormManager<S> | null) => void)
         | MutableRefObject<FormManager<S> | null>
         | null;
   },
) => JSX.Element;
