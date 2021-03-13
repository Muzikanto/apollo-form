import React from 'react';
import useApolloFormCtx from '../hooks/useApolloFormCtx';

export interface FormLoaderComponentProps {
   loading: boolean;
}

export type FormLoaderProps = {
   children: React.ComponentType<FormLoaderComponentProps>;
};

function FormLoader(props: FormLoaderProps) {
   const Component = props.children;

   const apolloForm = useApolloFormCtx();
   const state = apolloForm.useState(s => s.loading);

   return <Component loading={state} />;
}

export default FormLoader;
