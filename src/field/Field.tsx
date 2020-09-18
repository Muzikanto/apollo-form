import useField, { FieldParams, IUseFieldProps } from '../hooks/useField';
import useApolloFormCtx from '../hooks/useApolloFormCtx';
import FormManager from '../FormManager';

export interface FieldProps<Value, S extends object = {}> extends IUseFieldProps<Value> {
   children: (props: { field: FieldParams<Value>; form: FormManager<S> }) => JSX.Element;
}

function Field<Value, S extends object = {}>(props: FieldProps<Value, S>) {
   const { children, ...fieldProps } = props;

   const form = useApolloFormCtx<S>();
   const field = useField(fieldProps);

   return children({ field, form });
}

export default Field;
