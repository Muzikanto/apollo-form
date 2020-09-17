import React from 'react';
import useFieldArray, { FieldArrayParams, IUseFieldArrayProps } from '../hooks/useFieldArray';

export interface WithFieldArray<Value> {
   field: FieldArrayParams<Value>;
}

function withFieldArray<Value, Props>(props: IUseFieldArrayProps<Value>) {
   const fieldArray = useFieldArray(props);

   return (Component: React.ComponentType<Props>): React.FC<Props & WithFieldArray<Value>> => {
      return (props: Props) => {
         return <Component {...props} field={fieldArray} />;
      };
   };
}

export default withFieldArray;
