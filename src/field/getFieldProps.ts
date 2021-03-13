import { UseFieldParams } from '../hooks/useField';
import React from 'react';

export type GetFieldProps<T> = {
   value: T;
   error: boolean;
   helperText?: string;
   onChange: (e: any) => any;
   onFocus: (e: any) => any;
   onBlur: (e: any) => any;
};

function getFieldProps<T>(field: UseFieldParams<T>): GetFieldProps<T> {
   const error = Boolean(!field.focused && field.touched && field.error);

   return {
      value: field.value,
      error,
      helperText: error ? field.error : undefined,

      onChange: (e: React.ChangeEvent<any>) => {
         if (e.target.type === 'checkbox') {
            field.setFieldValue(e.target.checked);
         } else {
            field.setFieldValue(e.target.value);
         }

         return e;
      },
      onFocus: (e: any) => {
         field.setFieldFocused();

         return e;
      },
      onBlur: (e: any) => {
         field.setFieldTouched(true);

         return e;
      },
   };
}

export default getFieldProps;
