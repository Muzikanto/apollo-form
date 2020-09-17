import useField, { FieldParams, IUseFieldProps } from '../hooks/useField';

export interface FieldProps<Value> extends IUseFieldProps<Value> {
   children: (props: { field: FieldParams<Value> }) => JSX.Element;
}

function Field<Value>(props: FieldProps<Value>) {
   const { children, ...fieldProps } = props;

   const field = useField(fieldProps);

   return children({ field });
}

export default Field;
