import React from 'react';
import useApolloFormCtx from '../hooks/useApolloFormCtx';
import _ from 'lodash';
import FormManager from '../FormManager';

export interface SubmitComponentProps {
   disabled: boolean;
   loading: boolean;
   isValid: boolean;
   existsChanges: boolean;
   isSubmitted: boolean;
   form: FormManager<any>;
}

export type SubmitProps = {
   children: React.ComponentType<SubmitComponentProps>;
};

function Submit(props: SubmitProps) {
   const Component = props.children;

   const apolloForm = useApolloFormCtx<any>();
   const state = apolloForm.useState();

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
         form={apolloForm}
      />
   );
}

export default Submit;
