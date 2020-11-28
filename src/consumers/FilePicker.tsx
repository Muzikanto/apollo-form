import React from 'react';

function parseFileList(fileList: FileList): File[] {
   const list: File[] = [];

   for (let i = 0; i < fileList.length; i++) {
      const file = fileList.item(i);

      if (file) {
         list.push(file);
      }
   }

   return list;
}

export type FilePickerError = 'File size is to large' | 'Wrong file format';

export interface FilePickerRenderProps<Multiple extends boolean | undefined = undefined> {
   onClick: (e: React.MouseEvent) => void;
   onDragEnter: (e: React.DragEvent) => void;
   onDragLeave: (e: React.DragEvent) => void;
   onDragOver: (e: React.DragEvent) => void;
   onDrop: (e: React.DragEvent) => void;
   dragged: boolean;
}

export interface FilePickerProps<Multiple extends boolean | undefined = undefined> {
   value?: Multiple extends true ? File[] : File;
   onChange?: (value: Multiple extends true ? File[] : File) => void;

   multiple?: Multiple;
   reset?: boolean;
   accept?: string[];
   maxSize?: number;

   children: (props: FilePickerRenderProps<Multiple>) => JSX.Element;

   onError?: (err: FilePickerError) => void;
}

const wrongErr: FilePickerError = 'Wrong file format';
const toLargeErr: FilePickerError = 'File size is to large';

function FilePicker<Multiple extends boolean | undefined = undefined>(
   props: FilePickerProps<Multiple>,
) {
   const fileInputRef = React.createRef<HTMLInputElement>();
   const [dragged, setDragged] = React.useState(false);

   const onClick = React.useCallback(
      (e: React.MouseEvent) => {
         if (fileInputRef.current) {
            fileInputRef.current.click();
         }
      },
      [fileInputRef],
   );
   const onChange = React.useCallback(
      (list: File[]) => {
         if (props.accept && props.accept.indexOf(list[0].type) === -1) {
            if (props.onError) {
               props.onError(wrongErr);
            }
            return;
         }

         if (props.maxSize && list[0].size > props.maxSize) {
            if (props.onError) {
               props.onError(toLargeErr);
            }
            return;
         }

         if (props.multiple) {
            const arr: File[] = [];

            if (!props.reset) {
               arr.push.apply(arr, props.value as any);
            }
            arr.push.apply(arr, list);

            if (props.onChange) {
               props.onChange(arr as any);
            }
         } else {
            if (props.onChange) {
               props.onChange(list[0] as any);
            }
         }
      },
      [props.onChange, props.value],
   );

   const onDragEnter = React.useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
         setDragged(true);
      }
   }, []);
   const onDragLeave = React.useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setDragged(false);
   }, []);
   const onDragOver = React.useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
   }, []);
   const onDrop = React.useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setDragged(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
         onChange(parseFileList(e.dataTransfer.files));
         e.dataTransfer.clearData();
      }
   }, []);

   return (
      <>
         {props.children({
            onClick,
            onDragEnter,
            onDragLeave,
            onDragOver,
            onDrop,
            dragged,
         })}
         <input
            ref={fileInputRef}
            type='file'
            value=''
            accept={props.accept ? props.accept.join(',') : undefined}
            style={{ display: 'none' }}
            multiple={props.multiple}
            onChange={e => {
               const targetFiles = e.target.files;

               if (targetFiles) {
                  onChange(parseFileList(targetFiles));
               }

               e.target.value = '';
            }}
            data-max-size={props.maxSize}
         />
      </>
   );
}

export default FilePicker;
