import React from 'react';
import useFormCtx from '../hooks/useFormCtx';
import { FormState } from '../types';
import FormManager from '../form/FormManager';

export interface StateConsumerProps<V extends object> {
   children: React.ComponentType<{ state: V; form: FormManager<V> }>;
   selector?: (state: FormState<any>) => V;
}

function StateConsumer<V extends object = {}>({
   children: Render,
   selector,
}: StateConsumerProps<V>) {
   const apolloForm = useFormCtx<V>();
   const state = apolloForm.useState<V>(selector);

   return <Render state={state} form={apolloForm} />;
}

export default StateConsumer;
