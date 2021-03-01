import { DocumentNode } from '@apollo/client';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { firstError, getDeepStatus } from '../utils';
import {
   ApolloFormState,
   FieldValidator,
   FormErrors,
   FormManagerParams,
   FormTouches,
} from '../types';
import React from 'react';
import FormManipulator from './FormManipulator';
import ApolloManager from './ApolloManager';

const emptyDepencencies: any[] = [];
const defaultState: Omit<ApolloFormState<{}>, 'values'> = {
   errors: {},
   touches: {},
   isValid: true,
   loading: false,
   existsChanges: false,
   isSubmitted: false,
   focused: null,
   submitCount: 0,
} as const;

class FormManager<S extends object> {
   public readonly name: string;
   public readonly manipulator: FormManipulator<S>;

   protected customValidators: { [key: string]: FieldValidator<any> } = {};
   protected validateHandler: FormManagerParams<S>['validate'];
   protected validationSchema: FormManagerParams<S>['validationSchema'];
   protected onSubmit: FormManagerParams<S>['onSubmit'];
   protected onChange: FormManagerParams<S>['onChange'];
   protected resetOnSubmit: FormManagerParams<S>['resetOnSubmit'];
   protected formatState: FormManagerParams<S>['formatState'];
   protected validateOnMount: FormManagerParams<S>['validateOnMount'];
   protected initialState: S;
   protected initialErrors: FormErrors<S>;
   protected initialTouches: FormTouches<S>;
   protected query: DocumentNode;
   protected manager: ApolloManager<S>;
   protected timeouts: number[] = [];

   constructor(props: FormManagerParams<S>) {
      this.name = props.name;
      this.manager = new ApolloManager(props.name, props.apolloClient);

      this.validateHandler = props.validate;
      this.query = this.getQuery();
      this.onChange = props.onChange;
      this.onSubmit = props.onSubmit;
      this.validationSchema = props.validationSchema;
      this.validateOnMount = props.validateOnMount || false;
      this.resetOnSubmit = props.resetOnSubmit || false;
      this.formatState = props.formatState;
      this.initialState = cloneDeep(props.initialState);
      this.initialErrors = cloneDeep(props.initialErrors) || {};
      this.initialTouches = cloneDeep(props.initialTouches) || {};

      this.manipulator = new FormManipulator({
         ...props,
         defaultState,
         initialTouches: this.initialTouches,
         initialErrors: this.initialErrors,
         customValidators: this.customValidators,
      });

      // for set default
      if (!this.manager.get()) {
         this.set({
            ...defaultState,
            values: this.initialState,
            errors: this.initialErrors,
            touches: this.initialTouches,
         });
      }

      this.validate(this.validateOnMount);

      const timeout = setTimeout(() => {
         this.validate(this.validateOnMount);

         if (props.onInit) {
            props.onInit(this);
         }
      });

      this.timeouts.push(timeout);
   }

   public set(state: ApolloFormState<S>) {
      return this.manager.set(state);
   }
   public get(): ApolloFormState<S> {
      let data = this.manager.get() as any;

      if (!data) {
         this.manager.set({
            ...defaultState,
            values: this.initialState,
            errors: this.initialErrors,
            touches: this.initialTouches,
         });

         data = this.manager.get();
      }

      return cloneDeep(data) as ApolloFormState<S>;
   }
   public exists(): boolean {
      try {
         const data = this.manager.get();

         return Boolean(data);
      } catch (e) {
         return false;
      }
   }

   public useState<P = ApolloFormState<S>>(
      selector: (state: ApolloFormState<S>) => P = ((s: ApolloFormState<S>) => s) as any,
      dependencies: any[] = emptyDepencencies,
   ): P {
      const fullState = this.get();
      const [state, setState] = React.useState(selector ? selector(fullState) : fullState);

      React.useEffect(() => {
         return this.watch(selector, s => setState(s));
      }, [selector, ...dependencies]);

      return state as P;
   }
   public watch<P = ApolloFormState<S>>(
      selector: ((state: ApolloFormState<S>) => P) | null,
      handler: (next: P, prev: P) => void,
   ): () => void {
      return this.manager.watch(selector, handler, (selector
         ? selector(this.get())
         : this.get()) as any);
   }
   public useValue(key: string) {
      const watcher = React.useCallback(
         state => {
            return this.manipulator.getValue(state, key);
         },
         [key],
      );
      const value = this.useState(watcher);

      return value;
   }
   public useTouched(key: string) {
      const watcher = React.useCallback(
         state => {
            return this.manipulator.getTouched(state, key);
         },
         [key],
      );
      const value = this.useState(watcher);

      return value;
   }
   public useError(key: string) {
      const watcher = React.useCallback(
         state => {
            return this.manipulator.getError(state, key);
         },
         [key],
      );

      const value = this.useState(watcher);

      return value;
   }

   public setValues(values: S) {
      const prev = { ...this.get() };
      const next = { ...prev, values };
      const event = { type: 'all' as const, value: next.values };

      if (this.formatState) {
         next.values = this.formatState({ next: next.values, prev: prev.values, event });
      }

      if (!isEqual(this.initialState, prev.values)) {
         next.existsChanges = true;
      } else {
         next.existsChanges = false;
      }

      this.set(next);

      if (this.onChange) {
         this.onChange(next.values, prev.values, this, event);
      }
   }
   public setErrors(errors: FormErrors<S>) {
      return this.set({ ...this.get(), errors });
   }
   public setTouches(touches: FormTouches<S>) {
      return this.set({ ...this.get(), touches });
   }

   public setFieldValue(key: string, newValue: any) {
      let state = this.get();
      const prevValues = cloneDeep(state.values);
      const touched = getDeepStatus(state.touches, key);
      const event = { type: 'field' as const, key, value: newValue };

      if (!touched) {
         this.manipulator.setTouched(state, key, true);
      }

      this.manipulator.setValue(state, key, newValue);

      if (this.formatState) {
         state.values = this.formatState({ next: state.values, prev: prevValues, event });
      }

      this.manipulator.validate(state, false);

      if (!isEqual(this.initialState, state.values)) {
         state.existsChanges = true;
      } else {
         state.existsChanges = false;
      }

      this.set(state);

      if (this.onChange) {
         this.onChange(state.values, prevValues, this, event);
      }

      return state;
   }
   public setFieldError(key: string, error: string | undefined) {
      const state = this.get();

      this.manipulator.setError(state, key, error);

      const nextIsValid = !Boolean(firstError(state.errors));
      state.isValid = nextIsValid;

      return this.set(state);
   }
   public setFieldTouched(key: string, value: boolean) {
      const state = this.get();

      this.manipulator.setTouched(state, key, value);

      state.focused = null;

      return this.set(state);
   }
   public setFieldFocused(key: string | null) {
      const state = this.get();

      state.focused = key;

      return this.set(state);
   }

   public setIsValid(value: boolean) {
      const state = this.get();

      state.isValid = value;

      return this.set(state);
   }
   public setIsSubmitted(value: boolean) {
      const state = this.get();

      state.isSubmitted = value;

      return this.set(state);
   }
   public setExistsChanges(value: boolean) {
      const state = this.get();

      state.existsChanges = value;

      return this.set(state);
   }
   public setLoading(value: boolean) {
      const state = this.get();

      state.loading = value;

      return this.set(state);
   }

   public validate(allTouched?: boolean) {
      const state = this.get();

      this.manipulator.validate(state, allTouched);

      this.set(state);
   }

   public addFieldValidator<Value>(key: string, func: FieldValidator<Value>) {
      if (!this.customValidators[key]) {
         this.customValidators[key] = func;
      }
   }
   public removeFieldValidator(key: string) {
      delete this.customValidators[key];
   }

   public submit() {
      const state = this.get();
      this.manipulator.validate(state, true);

      state.isSubmitted = true;

      if (this.onSubmit && state.isValid) {
         state.loading = true;
         state.submitCount++;

         this.set(state);

         return this.onSubmit(state, this)
            .then(s => {
               const state2 = this.get();

               if (this.resetOnSubmit) {
                  this.manipulator.reset(state2);
               }

               state2.loading = false;

               this.set(state2);

               return s;
            })
            .catch((err: Error) => {
               const state2 = this.get();

               state2.loading = false;

               this.set(state2);

               return err;
            });
      } else {
         this.set(state);

         return Promise.resolve();
      }
   }

   public reset(getState?: S | ((state: S) => S)) {
      const state = this.get();

      this.manipulator.reset(state, getState);

      this.manipulator.validate(state, this.validateOnMount);

      state.isSubmitted = false;
      state.existsChanges = false;
      state.responseMessage = undefined;

      this.initialState = state.values;

      this.set(state);
   }

   public responseMessage(message: string) {
      const state = this.get();

      state.responseMessage = message;

      this.set(state);
   }

   public getQuery() {
      return this.manager.getQuery();
   }

   public getInitialState(): S {
      return this.initialState;
   }

   public renewOnChange(handler: FormManagerParams<S>['onChange']) {
      this.onChange = handler;
   }

   public renewOnSubmit(handler: FormManagerParams<S>['onSubmit']) {
      this.onSubmit = handler;
   }

   public stopTimeouts() {
      this.timeouts.forEach(clearTimeout);
   }
}

export default FormManager;
