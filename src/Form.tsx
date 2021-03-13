import React, { MutableRefObject } from 'react';
import useForm, { UseFormProps } from './hooks/useForm';
import FormContext from './form/FormContext';
import FormManager from './form/FormManager';

export type FormProps<S extends object> = UseFormProps<S> & {
   children: React.ReactNode;

   id?: string;
   style?: React.CSSProperties;
   className?: string;
};

function Form<S extends object>(
   { children, id, style, className, onInit, ...params }: FormProps<S>,
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
            onReset={e => {
               e.preventDefault();
               e.stopPropagation();

               manager.reset();
            }}
            style={style}
            className={className}
         >
            {children}
         </form>
      </FormContext.Provider>
   );
}

export default React.forwardRef(Form) as <S extends object>(
   props: FormProps<S> & {
      ref?:
         | ((instance: FormManager<S> | null) => void)
         | MutableRefObject<FormManager<S> | null>
         | null;
   },
) => JSX.Element;
