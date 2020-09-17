import React from 'react';
import useFormCtx from '../hooks/useFormCtx';

export interface FormLoaderComponentProps {
   loading: boolean;
}

export type FormLoaderProps = {
   children: React.ComponentType<FormLoaderComponentProps>;
};

function FormLoader(props: FormLoaderProps) {
   const Component = props.children;

   const apolloForm = useFormCtx();
   const state = apolloForm.useState();

   return <Component loading={state.loading} />;
}

export default FormLoader;
