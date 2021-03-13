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
   const responseMessage = apolloForm.useState(s => s.responseMessage);

   const Component = (props.children ||
      (({ error }: { error: string }) => <span>{error}</span>)) as React.ComponentType<{
      error: string;
   }>;

   let error: string | undefined = undefined;

   if (responseMessage && !existsChanges) {
      error = responseMessage;
   }

   const firstErrorMessage = firstError(errors);
   if (((props.showIfSubmitted && submitted) || true) && firstErrorMessage) {
      error = firstErrorMessage;
   }

   if (!error) {
      return <></>;
   }

   return <Component error={error} />;
}

export default FirstError;
