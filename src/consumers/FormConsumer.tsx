import React from 'react';
import FormManager from '../form/FormManager';
import useFormCtx from '../hooks/useFormCtx';

export interface FormConsumerProps<S extends object> {
   children: React.ComponentType<{ form: FormManager<S> }>;
}

function FormConsumer<S extends object>({ children: Render }: FormConsumerProps<S>) {
   const form = useFormCtx<S>();

   return <Render form={form} />;
}

export default FormConsumer;
