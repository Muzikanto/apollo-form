import React from 'react';
import useApolloFormCtx from '../hooks/useApolloFormCtx';
import { firstError } from '../utils';

export interface FirstErrorProps<P extends { error: string }> {
   children?: React.ComponentType<P>;

   showIfSubmitted?: boolean;
}

function FirstError<P extends { error: string }>(props: FirstErrorProps<P>) {
   const apolloForm = useApolloFormCtx();

   const submitted = apolloForm.useState(s => s.isSubmitted);
   const errors = apolloForm.useState(s => s.errors);

   const existsChanges = apolloForm.useState(s => s.existsChanges);
   const response = apolloForm.useState(s => s.responseMessage);

   const Component = (props.children ||
      (({ error }: { error: string }) => <span>{error}</span>)) as React.ComponentType<{
      error: string;
   }>;

   const error =
      response && !existsChanges
         ? response
         : (props.showIfSubmitted
            ? submitted
            : true)
         ? firstError(errors)
         : undefined;

   if (!error) {
      return <></>;
   }

   return <Component error={error} />;
}

export default FirstError;
