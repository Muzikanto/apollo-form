import React from 'react';
import useForm from '../hooks/useApolloForm';
import { FormManagerParams } from '../types';

export type WithFormProps<S extends object> = Omit<FormManagerParams<S>, 'apolloClient'>;

function withForm<State extends object, Props>(params: WithFormProps<State>) {
   const form = useForm(params);

   return (Component: React.ComponentType<Props>): React.FC<Props & WithFormProps<State>> => {
      return (props: Props) => {
         return <Component {...props} form={form} />;
      };
   };
}

export default withForm;
