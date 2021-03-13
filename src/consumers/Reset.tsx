import React from 'react';
import useFormCtx from '../hooks/useFormCtx';

export interface ResetComponentProps {
   disabled: boolean;
   loading: boolean;
   existsChanges: boolean;
}

export type ResetProps = {
   children: React.ComponentType<ResetComponentProps>;
};

function Reset(props: ResetProps) {
   const { children: Component } = props;

   const apolloForm = useFormCtx<any>();
   const { existsChanges, loading } = apolloForm.useState(s => ({
      loading: s.loading,
      existsChanges: s.existsChanges,
   }));

   return (
      <Component
         disabled={loading || !existsChanges}
         loading={loading}
         existsChanges={existsChanges}
      />
   );
}

export default Reset;
