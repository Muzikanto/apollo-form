import React from 'react';
import useField, { UseFieldParams, UseFieldProps } from '../hooks/useField';
import useFormCtx from '../hooks/useFormCtx';
import FormManager from '../form/FormManager';

export interface FieldProps<Value, S extends object = {}> extends UseFieldProps<Value> {
   children: (props: { field: UseFieldParams<Value>; form: FormManager<S> }) => JSX.Element;
}

function Field<Value, S extends object = {}>(props: FieldProps<Value, S>) {
   const { children, ...fieldProps } = props;

   const form = useFormCtx<S>();
   const field = useField(fieldProps);

   return <>{children({ field, form })}</>;
}

export default Field;
