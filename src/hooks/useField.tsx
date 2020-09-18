import React from 'react';
import useApolloFormCtx from './useApolloFormCtx';
import { FieldValidator } from '../types';

export interface FieldParams<Value> {
   value: Value;
   error?: string;
   touched?: boolean;

   setFieldValue: (value: Value) => void;
   setFieldError: (error: string | undefined) => void;
   setFieldTouched: (touched: boolean) => void;
}

export interface IUseFieldProps<Value> {
   name: string;
   validate?: FieldValidator<Value>;
}

function useField<Value>(props: IUseFieldProps<Value>): FieldParams<Value> {
   const apolloForm = useApolloFormCtx();

   const value = apolloForm.useValue(props.name);
   const error = apolloForm.useError(props.name);
   const touched = apolloForm.useTouched(props.name);

   const setFieldValue = React.useCallback(
      (v: Value) => {
         apolloForm.setFieldValue(props.name, v, true);
      },
      [apolloForm],
   );
   const setFieldError = React.useCallback(
      (v: string | undefined) => {
         apolloForm.setFieldError(props.name, v);
      },
      [apolloForm],
   );
   const setFieldTouched = React.useCallback(
      (v: boolean) => {
         apolloForm.setFieldTouched(props.name, v);
         // apolloForm.validateAt(props.name);
      },
      [apolloForm],
   );

   // @ts-ignore
   React.useEffect(() => {
      if (props.validate) {
         apolloForm.addFieldValidator(props.name, props.validate);

         return () => apolloForm.removeFieldValidator(props.name);
      }
   }, []);

   return {
      value,
      error,
      touched,

      setFieldValue,
      setFieldError,
      setFieldTouched,
   } as const;
}

export default useField;
