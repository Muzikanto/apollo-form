import React from 'react';
import useApolloFormCtx from './useApolloFormCtx';
import { FieldProps } from '../types';

export interface FieldParams<Value> {
   value: Value;
   error?: string;
   touched?: boolean;
   focused: boolean;

   setFieldValue: (value: Value) => void;
   setFieldError: (error: string | undefined) => void;
   setFieldTouched: (touched: boolean) => void;
   setFieldFocused: () => void;
}

export type IUseFieldProps<Value> = FieldProps<Value>;

function useField<Value>(props: IUseFieldProps<Value>): FieldParams<Value> {
   const apolloForm = useApolloFormCtx();
   const randName = React.useMemo(
      () => 'unnamed-field-' + Math.ceil(Math.random() * 999999999),
      [],
   );

   const name = props.name || randName;

   const value = apolloForm.useValue(name);
   const error = apolloForm.useError(name);
   const touched = apolloForm.useTouched(name);
   const focused = apolloForm.useState(s => s.focused === name, [name]);

   const setFieldValue = React.useCallback(
      (v: Value) => {
         apolloForm.setFieldValue(name, v);
      },
      [apolloForm],
   );
   const setFieldError = React.useCallback(
      (v: string | undefined) => {
         apolloForm.setFieldError(name, v);
      },
      [apolloForm],
   );
   const setFieldTouched = React.useCallback(
      (v: boolean) => {
         apolloForm.setFieldTouched(name, v);
      },
      [apolloForm],
   );
   const setFieldFocused = React.useCallback(() => {
      apolloForm.setFieldFocused(name);
   }, [apolloForm]);

   // @ts-ignore
   React.useEffect(() => {
      if (props.validate) {
         apolloForm.addFieldValidator(name, props.validate);

         return () => apolloForm.removeFieldValidator(name);
      }
   }, [apolloForm]);

   React.useEffect(() => {
      if (!props.name) {
         console.error(
            'Apollo-Form: The `name` of field is not provided. You should provide `name` to control form field.',
         );
      }
   }, [props.name]);

   return {
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
