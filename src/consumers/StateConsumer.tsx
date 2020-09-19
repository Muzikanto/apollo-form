import React from 'react';
import useApolloFormCtx from '../hooks/useApolloFormCtx';
import { ApolloFormState } from '../types';

export interface StateListenerProps<V> {
   children: React.ComponentType<{ state: V }>;
   selector?: (state: ApolloFormState<any>) => V;
}

function StateConsumer<V = any>({ children: Render, selector }: StateListenerProps<V>) {
   const apolloForm = useApolloFormCtx<any>();
   const state = apolloForm.useState<V>(selector);

   return <Render state={state} />;
}

export default StateConsumer;
