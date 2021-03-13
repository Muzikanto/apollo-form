import React from 'react';
import useApolloFormCtx from '../hooks/useApolloFormCtx';

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

   const apolloForm = useApolloFormCtx<any>();
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
