import React from 'react';
export declare type FilePickerError = 'File size is to large' | 'Wrong file format';
export interface FilePickerRenderProps<Multiple extends boolean = false> {
   onClick: (e: React.MouseEvent) => void;
   onDragEnter: (e: React.DragEvent) => void;
   onDragLeave: (e: React.DragEvent) => void;
   onDragOver: (e: React.DragEvent) => void;
   onDrop: (e: React.DragEvent) => void;
   dragged: boolean;
}
export interface FilePickerProps<Multiple extends boolean = false> {
   name: string;
   value: Multiple extends true ? File[] : File;
   onChange?: (value: Multiple extends true ? File[] : File) => void;
   multiple?: Multiple;
   reset?: boolean;
   accept?: string[];
   maxSize?: number;
   children: (props: FilePickerRenderProps<Multiple>) => JSX.Element;
   onError?: (err: FilePickerError) => void;
}
declare function FilePicker<Multiple extends boolean = false>(
   props: FilePickerProps<Multiple>,
): JSX.Element;
export default FilePicker;
