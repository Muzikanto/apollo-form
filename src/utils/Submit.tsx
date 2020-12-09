import React from 'react';
import useApolloFormCtx from '../hooks/useApolloFormCtx';
import FormManager from '../managers/FormManager';

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
   const { isValid, existsChanges, loading, isSubmitted } = apolloForm.useState(s => ({
      isValid: s.isValid,
      loading: s.loading,
      existsChanges: s.existsChanges,
      isSubmitted: s.isSubmitted,
   }));

   return (
      <Component
         disabled={(!isValid && isSubmitted) || loading || !existsChanges}
         isValid={isValid}
         loading={loading}
         existsChanges={existsChanges}
         isSubmitted={isSubmitted}
         form={apolloForm}
      />
   );
}

export default Submit;
