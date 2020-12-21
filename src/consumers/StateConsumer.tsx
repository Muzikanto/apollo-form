import React from 'react';
import useApolloFormCtx from '../hooks/useApolloFormCtx';
import { ApolloFormState } from '../types';
import FormManager from '../managers/FormManager';

export interface StateListenerProps<V extends object> {
   children: React.ComponentType<{ state: V; form: FormManager<V> }>;
   selector?: (state: ApolloFormState<any>) => V;
}

function StateConsumer<V extends object = {}>({
   children: Render,
   selector,
}: StateListenerProps<V>) {
   const apolloForm = useApolloFormCtx<V>();
   const state = apolloForm.useState<V>(selector);

   return <Render state={state} form={apolloForm} />;
}

export default StateConsumer;
