import React from 'react';
import useField, { FieldParams } from '../hooks/useField';
import { FieldValidator } from '../types';
import FilePicker, {
   FilePickerError,
   FilePickerProps,
   FilePickerRenderProps,
} from '../components/FilePicker';

export type FileFieldRenderProps<Multiple extends boolean = false> = FilePickerRenderProps<
   Multiple
> & {
   field: FieldParams<Multiple extends true ? File[] : File>;
};

export type FileFieldProps<Multiple extends boolean = false> = Omit<
   FilePickerProps<Multiple>,
   'children'
> & {
   name: string;
   validate?: FieldValidator<Multiple extends true ? File[] : File>;

   prepareError?: (err: FilePickerError) => string;

   children: (props: FileFieldRenderProps<Multiple>) => JSX.Element;
};

function FileField<Multiple extends boolean = false>(props: FileFieldProps<Multiple>) {
   const field = useField<Multiple extends true ? File[] : File>({
      name: props.name,
      validate: props.validate,
   });

   return (
      <FilePicker
         {...props}
         value={field.value}
         onChange={v => field.setFieldValue(v)}
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

export default FileField;
