import React from 'react';
import useFieldArray, { UseFieldArrayProps, UseFieldArrayParams } from '../hooks/useFieldArray';

export type WithFieldArrayProps<Value> = UseFieldArrayProps<Value>;

function withFieldArray<Value, Props>(props: WithFieldArrayProps<Value>) {
   const fieldArray = useFieldArray(props);

   return (
      Component: React.ComponentType<Props>,
   ): React.FC<
      Props & {
         field: UseFieldArrayParams<Value>;
      }
   > => {
      return (props: Props) => {
         return <Component {...props} field={fieldArray} />;
      };
   };
}

export default withFieldArray;
