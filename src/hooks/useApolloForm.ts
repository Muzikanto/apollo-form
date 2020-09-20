import FormManager from '../FormManager';
import React from 'react';
import { useApolloClient } from '@apollo/client';
import { FormManagerParams } from '../types';

export type IuseFormProps<S extends object> = Omit<FormManagerParams<S>, 'apolloClient'> & {
   resetOnUnmount?: boolean;
   removeOnUnmount?: boolean;
};

function useApolloForm<S extends object>({
   resetOnUnmount,
   removeOnUnmount,
   // enableReinitialize,
   initialState,
   ...props
}: IuseFormProps<S>) {
   // const mountedRef = React.useRef(false);
   const apolloClient = useApolloClient();
   const { current: manager } = React.useRef(
      new FormManager<S>({ ...props, initialState, apolloClient }),
   );

   // React.useEffect(() => {
   //    if (enableReinitialize && mountedRef.current) {
   //       setTimeout(() => {
   //          manager.reset(initialState);
   //       });
   //    }
   //    mountedRef.current = true;
   // }, [initialState, mountedRef, enableReinitialize]);

   React.useEffect(() => {
      return () => {
         if (removeOnUnmount) {
            apolloClient.cache.evict({ id: 'ROOT_QUERY', fieldName: manager.name });
         } else {
            if (resetOnUnmount) {
               manager.reset();
            }
         }
      };
   }, [resetOnUnmount, manager]);

   return manager;
}

export default useApolloForm;
