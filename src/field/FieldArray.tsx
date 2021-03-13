import React from 'react';
import useFieldArray, { UseFieldArrayParams, UseFieldArrayProps } from '../hooks/useFieldArray';
import FormManager from '../form/FormManager';
import useApolloFormCtx from '../hooks/useApolloFormCtx';

export interface FieldArrayProps<Value, S extends object = {}> extends UseFieldArrayProps<Value> {
   children: (props: { field: UseFieldArrayParams<Value>; form: FormManager<S> }) => JSX.Element;
}

function FieldArray<Value, S extends object = {}>(props: FieldArrayProps<Value, S>) {
   const { children, ...fieldArrProps } = props;

   const form = useApolloFormCtx<S>();
   const field = useFieldArray<Value>(fieldArrProps);

   return <>{children({ field, form })}</>;
}

export default FieldArray;
