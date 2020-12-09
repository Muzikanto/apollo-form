import useFieldArray, { FieldArrayParams, IUseFieldArrayProps } from '../hooks/useFieldArray';
import FormManager from '../managers/FormManager';
import useApolloFormCtx from '../hooks/useApolloFormCtx';

export interface FieldArrayProps<Value, S extends object = {}> extends IUseFieldArrayProps<Value> {
   children: (props: { field: FieldArrayParams<Value>; form: FormManager<S> }) => JSX.Element;
}

function FieldArray<Value, S extends object = {}>(props: FieldArrayProps<Value, S>) {
   const { children, ...fieldArrProps } = props;

   const form = useApolloFormCtx<S>();
   const field = useFieldArray<Value>(fieldArrProps);

   return children({ field, form });
}

export default FieldArray;
