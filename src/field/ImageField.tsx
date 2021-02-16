import React from 'react';
import useField, { FieldParams } from '../hooks/useField';
import { FieldValidator } from '../types';
import FilePicker, {
   FilePickerError,
   FilePickerProps,
   FilePickerRenderProps,
} from '../consumers/FilePicker';
import { blobToBase64 } from '../utils';

export type ImageFieldError = FilePickerError;

export type ImageFieldRenderProps<Multiple extends boolean = false> = FilePickerRenderProps<
   Multiple
> & {
   field: FieldParams<Multiple extends true ? File[] : File>;
};

export type ImageFieldProps<Multiple extends boolean = false> = Omit<
   FilePickerProps<Multiple>,
   'children' | 'value' | 'onChange'
> & {
   name: string;
   validate?: FieldValidator<Multiple extends true ? File[] : File>;
   compressFunc?: (file: File) => Promise<File>;

   children: (
      props: ImageFieldRenderProps<Multiple> & { image?: string; images: string[] },
   ) => JSX.Element;
};

function ImageField<Multiple extends boolean = false>(props: ImageFieldProps<Multiple>) {
   const { compressFunc, multiple } = props;

   const field = useField<Multiple extends true ? File[] : File>({
      name: props.name,
      validate: props.validate,
   });
   const [images, setImages] = React.useState<string[]>([]);

   return (
      <FilePicker<Multiple>
         accept={['image/jpeg', 'image/png']}
         {...props}
         value={field.value}
         onChange={(e, value) => {
            if (multiple) {
               if (compressFunc) {
                  Promise.all((value as File[]).map(f => compressFunc(f))).then(compressedFiles => {
                     field.setFieldValue(compressedFiles as any);

                     Promise.all((compressedFiles as File[]).map(f => blobToBase64(f))).then(
                        base64List => {
                           setImages([...(images as any[]), ...base64List] as any);
                        },
                     );
                  });
               } else {
                  field.setFieldValue(value);

                  Promise.all((value as File[]).map(f => blobToBase64(f))).then(base64List => {
                     setImages([...(images as any[]), ...base64List] as any);
                  });
               }
            } else {
               if (compressFunc) {
                  compressFunc(value as File).then(compressed => {
                     field.setFieldValue(compressed as any);
                     blobToBase64(value as File).then(v => setImages([v]));
                  });
               } else {
                  field.setFieldValue(value);
                  blobToBase64(value as File).then(v => setImages([v]));
               }
            }
         }}
         onError={err => {
            field.setFieldError(err);
         }}
      >
         {childProps => {
            return props.children({ ...childProps, field, image: images[0], images });
         }}
      </FilePicker>
   );
}

export default ImageField;
