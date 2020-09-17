import useField, { FieldParams, IUseFieldProps } from '../hooks/useField';
import React from 'react';

export interface WithField<Value> {
   field: FieldParams<Value>;
}

function withField<Value, Props>(props: IUseFieldProps<Value>) {
   const field = useField(props);

   return (Component: React.ComponentType<Props>): React.FC<Props & WithField<Value>> => {
      return (props: Props) => {
         return <Component {...props} field={field} />;
      };
   };
}

export default withField;
