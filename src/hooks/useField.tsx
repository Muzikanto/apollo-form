import React from 'react';
import useFormCtx from './useFormCtx';
import { FieldProps } from '../types';

export interface UseFieldParams<Value> {
   name: string;
   value: Value;
   error?: string;
   touched?: boolean;
   focused: boolean;

   setFieldValue: (value: Value) => void;
   setFieldError: (error: string | undefined) => void;
   setFieldTouched: (touched: boolean) => void;
   setFieldFocused: () => void;
}

export type UseFieldProps<Value> = FieldProps<Value>;

function useField<Value>(props: UseFieldProps<Value>): UseFieldParams<Value> {
   const apolloForm = useFormCtx();

   const name = props.name;

   const value = apolloForm.useValue(name);
   const error = apolloForm.useError(name);
   const touched = apolloForm.useTouched(name);
   const focused = apolloForm.useState(s => s.focused === name, [name]);

   const setFieldValue = React.useCallback(
      (v: Value) => {
         apolloForm.setFieldValue(name, v);
      },
      [apolloForm, name],
   );
   const setFieldError = React.useCallback(
      (v: string | undefined) => {
         apolloForm.setFieldError(name, v);
      },
      [apolloForm, name],
   );
   const setFieldTouched = React.useCallback(
      (v: boolean) => {
         apolloForm.setFieldTouched(name, v);
      },
      [apolloForm, name],
   );
   const setFieldFocused = React.useCallback(() => {
      apolloForm.setFieldFocused(name);
   }, [apolloForm, name]);

   // @ts-ignore
   React.useEffect(() => {
      if (props.validate) {
         apolloForm.addFieldValidator(name, props.validate);

         return () => apolloForm.removeFieldValidator(name);
      }
   }, [apolloForm, name, props.validate]);

   return {
      name,
      value,
      error,
      touched,
      focused,

      setFieldValue,
      setFieldError,
      setFieldTouched,
      setFieldFocused,
   } as const;
}

export default useField;
