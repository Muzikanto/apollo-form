import React from 'react';
import useApolloFormCtx from '../hooks/useApolloFormCtx';
import { ApolloFormState } from '../types';

export interface StateListenerProps<S extends object, V = S> {
   children: React.ComponentType<{ state: V }>;
   selector?: (state: ApolloFormState<S>) => V;
}

function StateConsumer<S extends object, V = S>({ children: Render, selector }: StateListenerProps<S, V>) {
   const apolloForm = useApolloFormCtx<S>();
   const state = apolloForm.useState<V>(selector);

   return <Render state={selector ? selector(state as any) : state} />;
}

export default StateConsumer;
