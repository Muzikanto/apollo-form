import FormManager from '../form/FormManager';
import React from 'react';
import { useApolloClient } from '@apollo/client';
import { FormManagerParams } from '../types';
import isEqual from 'lodash/isEqual';
import ApolloManager from '../managers/ApolloManager';
import FormManagerContext from '../form/FormManagerContext';

export type UseFormProps<S extends object> = Omit<FormManagerParams<S>, 'manager'> & {
   name: string;
   resetOnUnmount?: boolean;
   saveOnUnmount?: boolean;
};

function useForm<S extends object>({
   resetOnUnmount,
   saveOnUnmount,
   enableReinitialize,
   initialState,
   name,
   ...props
}: UseFormProps<S>) {
   const apolloClient = useApolloClient();

   const formManagerCreator = React.useContext(FormManagerContext);
   const formManager = React.useMemo(
      () => (formManagerCreator ? formManagerCreator(name) : new ApolloManager(name, apolloClient)),
      [formManagerCreator, name, apolloClient],
   );
   const mountedRef = React.useRef(false);
   const form = React.useMemo(
      () =>
         new FormManager<S>({
            ...props,
            name,
            manager: formManager,
            initialState,
         }),
      [],
   );

   if (enableReinitialize && typeof window === 'undefined') {
      if (!isEqual(form.get().values, initialState)) {
         form.reset(initialState);
      }
   }

   React.useEffect(() => {
      if (enableReinitialize && mountedRef.current) {
         const state = form.get();

         if (state) {
            if (!isEqual(form.getInitialState(), initialState)) {
               form.reset(initialState);
            }
         }
      }
      mountedRef.current = true;
   }, [initialState, mountedRef, enableReinitialize]);

   React.useEffect(() => {
      return () => {
         if (!saveOnUnmount) {
            formManager.remove();
         } else {
            if (resetOnUnmount) {
               if (form.exists()) {
                  form.reset();
               }
            }
         }
      };
   }, [resetOnUnmount, saveOnUnmount, form]);

   React.useEffect(() => {
      form.renewOnChange(props.onChange);
   }, [props.onChange]);

   React.useEffect(() => {
      form.renewOnSubmit(props.onSubmit);
   }, [props.onSubmit]);
   React.useEffect(() => {
      return () => {
         form.stopTimeouts();
      };
   }, [form]);

   return form;
}

export default useForm;
