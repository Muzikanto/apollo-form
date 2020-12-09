import FormManager from '../managers/FormManager';
import React from 'react';
import { useApolloClient } from '@apollo/client';
import { FormManagerParams } from '../types';
import isEqual from 'lodash/isEqual';

export type IuseFormProps<S extends object> = Omit<FormManagerParams<S>, 'apolloClient'> & {
   resetOnUnmount?: boolean;
   saveOnUnmount?: boolean;
};

function useApolloForm<S extends object>({
   resetOnUnmount,
   saveOnUnmount,
   enableReinitialize,
   initialState,
   ...props
}: IuseFormProps<S>) {
   const mountedRef = React.useRef(false);
   const apolloClient = useApolloClient();
   const manager = React.useMemo(
      () => new FormManager<S>({ ...props, initialState, apolloClient }),
      [],
   );

   if (enableReinitialize && typeof window === 'undefined') {
      if (!isEqual(manager.getInitialState(), initialState)) {
         manager.reset(initialState);
      }
   }

   React.useEffect(() => {
      if (enableReinitialize && mountedRef.current) {
         const state = manager.get();

         if (state) {
            if (!isEqual(manager.getInitialState(), initialState)) {
               manager.reset(initialState);
            }
         }
      }
      mountedRef.current = true;
   }, [initialState, mountedRef, enableReinitialize]);

   React.useEffect(() => {
      return () => {
         if (!saveOnUnmount) {
            apolloClient.cache.evict({ id: 'ROOT_QUERY', fieldName: manager.name });
         } else {
            if (resetOnUnmount) {
               if (manager.exists()) {
                  manager.reset();
               }
            }
         }
      };
   }, [resetOnUnmount, saveOnUnmount, manager]);

   React.useEffect(() => {
      manager.renewOnChange(props.onChange);
   }, [props.onChange]);

   React.useEffect(() => {
      manager.renewOnSubmit(props.onSubmit);
   }, [props.onSubmit]);

   return manager;
}

export default useApolloForm;
