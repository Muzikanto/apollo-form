import React from 'react';
import useFormCtx from './useFormCtx';
import _ from 'lodash';
import { getDeepStatus } from '../utils';

export interface FieldParams<Value> {
   value: Value;
   error?: string;
   touched?: boolean;

   setFieldValue: (value: Value) => void;
   setFieldError: (error: string | undefined) => void;
   setFieldTouched: (touched: boolean) => void;
}

export type FieldValidator<Value> = (value: Value) => string | null | void;

export interface IUseFieldProps<Value> {
   name: string;
   validate?: FieldValidator<Value>;
}

function useField<Value>(props: IUseFieldProps<Value>): FieldParams<Value> {
   const apolloForm = useFormCtx();

   const { values, errors, touches } = apolloForm.useState();

   const value = _.get(values, props.name);
   const error = getDeepStatus(_.cloneDeep(errors), props.name);
   const touched = getDeepStatus(_.cloneDeep(touches), props.name);

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
         apolloForm.validateAt(props.name);
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
