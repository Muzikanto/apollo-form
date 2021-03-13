import React from 'react';
import useFormCtx from '../hooks/useFormCtx';

export interface ResponseMessageProps<P extends { error: string }> {
   children?: React.ComponentType<P>;
}

function ResponseMessage<P extends { error: string }>(props: ResponseMessageProps<P>) {
   const apolloForm = useFormCtx();

   const responseMessage = apolloForm.useState(s => s.responseMessage);
   const existsChanges = apolloForm.useState(s => s.existsChanges);

   const Component = (props.children ||
      (({ error }: { error: string }) => <span>{error}</span>)) as React.ComponentType<{
      error: string;
   }>;

   const error = !existsChanges ? responseMessage : undefined;

   if (!error) {
      return <></>;
   }

   return <Component error={error} />;
}

export default ResponseMessage;
