import FormManager, { FormManagerParams } from '../FormManager';
import React from 'react';
import { useApolloClient } from '@apollo/client';

export type IuseFormProps<S extends object> = Omit<FormManagerParams<S>, 'apolloClient'>;

function useForm<S extends object>(props: IuseFormProps<S>) {
   const apolloClient = useApolloClient();
   const { current: manager } = React.useRef(new FormManager<S>({ ...props, apolloClient }));

   return manager;
}

export default useForm;
