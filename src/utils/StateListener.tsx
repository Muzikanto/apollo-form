import React from 'react';
import { ApolloFormState } from '../FormManager';
import useFormCtx from '../hooks/useFormCtx';

export interface StateListenerProps<S extends object> {
   children: React.ComponentType<ApolloFormState<S>>;
}

function StateListener<S extends object>({ children: Render }: StateListenerProps<S>) {
   const apolloForm = useFormCtx<S>();
   const state = apolloForm.useState();

   return <Render {...state} />;
}

export default StateListener;
