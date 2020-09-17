import React from 'react';
import useFormCtx from '../hooks/useFormCtx';
import _ from 'lodash';
import { getDeepStatus } from '../utils';

export interface ErrorMessageProps<P extends { error: string | undefined }> {
   name: string;
   children: React.ComponentType<P>;

   ignoreTouched?: boolean;
}

function ErrorMessage<P extends { error: string | undefined }>(props: ErrorMessageProps<P>) {
   const apolloForm = useFormCtx();

   const { errors, touches } = apolloForm.useState();

   const error = getDeepStatus(_.cloneDeep(errors), props.name);
   const touched = getDeepStatus(_.cloneDeep(touches), props.name);
console.log({errors, touches})
   const Component = (props.children || (({ error }: any) => error)) as React.ComponentType<P>;

   // @ts-ignore
   return <Component error={(!props.ignoreTouched ? error && touched : error) && error} />;
}

export default ErrorMessage;
