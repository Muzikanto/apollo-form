import React from 'react';
import useField, { UseFieldParams } from '../hooks/useField';
import { FieldValidator } from '../types';
import FilePicker, {
   FilePickerError,
   FilePickerProps,
   FilePickerRenderProps,
} from '../basic/FilePicker';

export type FieldFileError = FilePickerError;

export type FieldFileRenderProps<Multiple extends boolean = false> = FilePickerRenderProps<
   Multiple
> & {
   field: UseFieldParams<Multiple extends true ? File[] : File>;
};

export type FieldFileProps<Multiple extends boolean = false> = Omit<
   FilePickerProps<Multiple>,
   'children' | 'value' | 'onChange'
> & {
   name: string;
   validate?: FieldValidator<Multiple extends true ? File[] : File>;

   children: (props: FieldFileRenderProps<Multiple>) => JSX.Element;
   prepareError?: (err: FilePickerError) => string;
};

function FieldFile<Multiple extends boolean = false>(props: FieldFileProps<Multiple>) {
   const field = useField<Multiple extends true ? File[] : File>({
      name: props.name,
      validate: props.validate,
   });

   return (
      <FilePicker
         {...props}
         value={field.value}
         onChange={(e, value) => {
            field.setFieldValue(value);
         }}
         onError={err => {
            field.setFieldError(props.prepareError ? props.prepareError(err) : err);
         }}
      >
         {childProps => {
            return props.children({ ...childProps, field });
         }}
      </FilePicker>
   );
}

export default FieldFile;
