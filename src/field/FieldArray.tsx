import useFieldArray, { FieldArrayParams, IUseFieldArrayProps } from '../hooks/useFieldArray';

export interface FieldArrayProps<Value> extends IUseFieldArrayProps<Value> {
   children: (props: { field: FieldArrayParams<Value> }) => JSX.Element;
}

function FieldArray<Value>(props: FieldArrayProps<Value>) {
   const { children, ...fieldArrProps } = props;

   const field = useFieldArray(fieldArrProps);

   return children({ field });
}

export default FieldArray;
