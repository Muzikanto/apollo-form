import useField, { UseFieldProps, UseFieldParams } from '../hooks/useField';
import React from 'react';

export type WithFieldProps<Value> = UseFieldProps<Value>;

function withField<Value, Props>(props: WithFieldProps<Value>) {
   const field = useField(props);

   return (
      Component: React.ComponentType<Props>,
   ): React.FC<
      Props & {
         field: UseFieldParams<Value>;
      }
   > => {
      return (props: Props) => {
         return <Component {...props} field={field} />;
      };
   };
}

export default withField;
