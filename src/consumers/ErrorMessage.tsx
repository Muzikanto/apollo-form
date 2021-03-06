import React from 'react';
import useFormCtx from '../hooks/useFormCtx';

export interface ErrorMessageProps<P extends { error: string | undefined }> {
   name: string;
   children?: React.ComponentType<P>;

   ignoreTouched?: boolean;
}

function ErrorMessage<P extends { error: string | undefined }>(props: ErrorMessageProps<P>) {
   const apolloForm = useFormCtx();

   const error = apolloForm.useError(props.name);
   const touched = apolloForm.useTouched(props.name);

   const Component = (props.children ||
      (({ error }: any) => <span>{error}</span>)) as React.ComponentType<P>;

   // @ts-ignore
   return <Component error={!props.ignoreTouched ? touched && error : error} />;
}

export default ErrorMessage;
