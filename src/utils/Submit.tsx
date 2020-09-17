import React from 'react';
import useFormCtx from '../hooks/useFormCtx';
import _ from 'lodash';

export interface SubmitComponentProps {
   disabled: boolean;
   loading: boolean;
   isValid: boolean;
   existsChanges: boolean;
   isSubmitted: boolean;
}

export type SubmitProps = {
   children: React.ComponentType<SubmitComponentProps>;
};

function Submit(props: SubmitProps) {
   const Component = props.children;

   if (!Component) {
      throw new Error('Require component or children func');
   }

   const apolloForm = useFormCtx();
   const state = apolloForm.get();

   const isValid = state.isValid;
   const loading = state.loading;
   const existsChanges = state.existsChanges;
   const isSubmitted = state.isSubmitted;

   return (
      <Component
         disabled={!isValid || loading || !existsChanges}
         isValid={isValid}
         loading={loading}
         existsChanges={existsChanges}
         isSubmitted={isSubmitted}
      />
   );
}

export default Submit;
