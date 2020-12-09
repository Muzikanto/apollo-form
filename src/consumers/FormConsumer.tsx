import React from 'react';
import FormManager from '../managers/FormManager';
import useApolloFormCtx from '../hooks/useApolloFormCtx';

export interface FormConsumerProps<S extends object> {
   children: React.ComponentType<{ form: FormManager<S> }>;
}

function FormConsumer<S extends object>({ children: Render }: FormConsumerProps<S>) {
   const form = useApolloFormCtx<S>();

   return <Render form={form} />;
}

export default FormConsumer;
