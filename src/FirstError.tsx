import React from 'react';
import useApolloFormCtx from './hooks/useApolloFormCtx';
import { firstError } from './utils';

export interface FirstErrorProps<P extends { error: string | undefined }> {
   children?: React.ComponentType<P>;

   showIfSubmitted?: boolean;
}

function FirstError<P extends { error: string | undefined }>(props: FirstErrorProps<P>) {
   const apolloForm = useApolloFormCtx();

   const submitted = apolloForm.useState(s => s.isSubmitted);
   const errors = apolloForm.useState(s => s.errors);

   const Component = (props.children ||
      (({ error }: any) => <span>{error}</span>)) as React.ComponentType<P>;

   return (
      // @ts-ignore
      <Component
         error={(props.showIfSubmitted ? submitted : true) ? firstError(errors) : undefined}
      />
   );
}

export default FirstError;
