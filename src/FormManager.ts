import { DocumentNode } from '@apollo/client';
import _ from 'lodash';
import { getDeepStatus, makeApolloFormQuery, objectDeepPairs, setDeepStatus } from './utils';
import {
   ApolloFormState,
   FieldValidator,
   FormErrors,
   FormManagerParams,
   FormTouches,
} from './types';
import React from 'react';

class Changer<S extends object> {
   protected validateHandler: FormManagerParams<S>['validate'];
   protected validationSchema: FormManagerParams<S>['validationSchema'];
   protected customValidators: { [key: string]: FieldValidator<any> };
   protected initialState: S;
   protected initialErrors: FormErrors<S>;
   protected initialTouches: FormTouches<S>;
   protected validateOnMount: FormManagerParams<S>['validateOnMount'];

   constructor(
      props: Omit<FormManagerParams<S>, 'initialErrors' | 'initialTouches'> &
         Required<Pick<FormManagerParams<S>, 'initialErrors' | 'initialTouches'>> & {
            customValidators: { [key: string]: FieldValidator<any> };
         },
   ) {
      this.validateHandler = props.validate;
      this.validationSchema = props.validationSchema;
      this.customValidators = props.customValidators;
      this.initialState = props.initialState;
      this.initialErrors = props.initialErrors;
      this.initialTouches = props.initialTouches;
      this.validateOnMount = props.validateOnMount;
   }

   public setValue(state: ApolloFormState<S>, key: string, newValue: any): ApolloFormState<S> {
      const value = _.get(state.values, key);

      if (!_.isEqual(value, newValue)) {
         _.set(state.values, key, newValue);
      }

      if (!state.existsChanges) {
         state.existsChanges = true;
      }

      return state;
   }
   public setError(
      state: ApolloFormState<S>,
      key: string,
      value: string | undefined,
   ): ApolloFormState<S> {
      const error = getDeepStatus(state.errors, key);

      if (error !== value) {
         setDeepStatus(state.errors, key, value);
      }

      return state;
   }
   public setTouched(state: ApolloFormState<S>, key: string, value: boolean): ApolloFormState<S> {
      const touched = getDeepStatus(state.touches, key);

      if (touched !== value) {
         setDeepStatus(state.touches, key, value);
      }

      return state;
   }
   public validate(state: ApolloFormState<S>, allTouched: boolean = false): ApolloFormState<S> {
      state.errors = {};

      // merge errors from validate func
      if (this.validateHandler) {
         const customErrors = this.validateHandler(state);

         _.merge(state.errors, customErrors);
      }

      // custom validators
      for (const key in this.customValidators) {
         if (!(key in state.errors)) {
            const value = _.get(state.values, key);
            const newError = this.customValidators[key](value);

            if (newError) {
               this.setError(state, key, newError);
            }
         }
      }

      // yup validate
      if (this.validationSchema) {
         try {
            this.validationSchema.validateSync(state.values, {
               recursive: true,
               abortEarly: false,
            });
         } catch (e) {
            for (const err of e.inner) {
               const path = err.path.replace('[', '.').replace(']', '');
               this.setError(state, path, err.message);
            }
         }
      }

      const errorsPairs = objectDeepPairs(state.errors);

      const nextIsValid = !Boolean(errorsPairs.find(el => Boolean(el[1])));

      if (allTouched) {
         for (const pair of errorsPairs) {
            _.set(state.touches, pair[0], true);
         }
      }

      state.isValid = nextIsValid;

      return state;
   }

   public reset(state: ApolloFormState<S>, getState?: S | ((state: S) => S)) {
      if (getState) {
         if (typeof getState === 'function') {
            Object.assign(state, {
               ...defaultState,
               values: (getState as (state: S) => S)(state.values),
               errors: this.initialErrors,
               touches: this.initialTouches,
            });
         } else {
            Object.assign(state, {
               ...defaultState,
               values: state.values,
               errors: this.initialErrors,
               touches: this.initialTouches,
            });
         }
      } else {
         Object.assign(state, {
            ...defaultState,
            values: this.initialState,
            errors: this.initialErrors,
            touches: this.initialTouches,
         });
      }

      return state;
   }
}

const defaultState = {
   errors: {},
   touches: {},
   isValid: true,
   loading: false,
   existsChanges: false,
   isSubmitted: false,
} as const;

class FormManager<S extends object> {
   protected customValidators: { [key: string]: FieldValidator<any> } = {};
   protected apolloClient: FormManagerParams<S>['apolloClient'];
   protected name: FormManagerParams<S>['name'];
   protected validateHandler: FormManagerParams<S>['validate'];
   protected validationSchema: FormManagerParams<S>['validationSchema'];
   protected onSubmit: FormManagerParams<S>['onSubmit'];
   protected onChange: FormManagerParams<S>['onChange'];
   protected resetOnSubmit: FormManagerParams<S>['resetOnSubmit'];
   protected validateOnMount: FormManagerParams<S>['validateOnMount'];
   protected initialState: S;
   protected initialErrors: FormErrors<S>;
   protected initialTouches: FormTouches<S>;
   public query: DocumentNode;
   public changer: Changer<S>;

   constructor(props: FormManagerParams<S>) {
      this.apolloClient = props.apolloClient;
      this.name = props.name;
      this.validateHandler = props.validate;
      this.query = this.getQuery();
      this.onChange = props.onChange;
      this.onSubmit = props.onSubmit;
      this.validationSchema = props.validationSchema;
      this.validateOnMount = props.validateOnMount;
      this.resetOnSubmit = props.resetOnSubmit;
      this.initialState = _.cloneDeep(props.initialState);
      this.initialErrors = _.cloneDeep(props.initialErrors) || {};
      this.initialTouches = _.cloneDeep(props.initialTouches) || {};
      this.changer = new Changer({
         ...props,
         initialTouches: this.initialTouches,
         initialErrors: this.initialErrors,
         customValidators: this.customValidators,
      });

      // for set default
      this.get();

      this.validate(this.validateOnMount);
   }

   public set(state: ApolloFormState<S>) {
      this.apolloClient.writeQuery({ query: this.query, data: { [this.name]: state } });
   }
   public get(): ApolloFormState<S> {
      let data = this.apolloClient.readQuery<ApolloFormState<S>>({
         query: this.query,
      }) as any;

      if (!data) {
         this.set({
            ...defaultState,
            values: this.initialState,
            errors: this.initialErrors,
            touches: this.initialTouches,
         });

         data = this.apolloClient.readQuery<ApolloFormState<S>>({
            query: this.query,
         }) as any;
      }

      return _.cloneDeep(data[this.name]) as ApolloFormState<S>;
   }
   public useState<P>(getValue?: (state: ApolloFormState<S>) => P): P {
      const [state, setState] = React.useState(getValue ? getValue(this.get()) : this.get());

      React.useEffect(() => {
         const unWatch = this.apolloClient.cache.watch({
            query: this.getQuery(),
            callback: ({ result }) => {
               const s = (result as { [key: string]: ApolloFormState<S> })[this.name];

               const v = getValue ? getValue(s) : s;

               if (!_.isEqual(state, v)) {
                  setState(v);
               }
            },
            optimistic: false,
         });

         return unWatch;
      }, [getValue, state]);

      return state as P;
   }
   public useValue(key: string) {
      const value = this.useState(state => {
         return _.get(state.values, key);
      });

      return value;
   }
   public useTouched(key: string) {
      const value = this.useState(state => {
         return getDeepStatus(_.cloneDeep(state.touches), key);
      });

      return value;
   }
   public useError(key: string) {
      const value = this.useState(state => {
         return getDeepStatus(_.cloneDeep(state.errors), key);
      });

      return value;
   }

   public setValues(values: S) {
      this.set({ ...this.get(), values });

      if (this.onChange) {
         this.onChange(values, this);
      }
   }
   public setErrors(errors: FormErrors<S>) {
      return this.set({ ...this.get(), errors });
   }
   public setTouches(touches: FormTouches<S>) {
      return this.set({ ...this.get(), touches });
   }

   public setFieldValue(key: string, newValue: any, validate?: boolean) {
      const state = this.get();
      const touched = getDeepStatus(state.touches, key);

      if (!touched) {
         this.changer.setTouched(state, key, true);
      }

      this.changer.setValue(state, key, newValue);

      this.changer.validate(state, false);

      this.set(state);

      if (this.onChange) {
         this.onChange(state.values, this);
      }

      return state;
   }
   public setFieldError(key: string, error: string | undefined) {
      const state = this.get();

      this.changer.setError(state, key, error);

      const errorsPairs = objectDeepPairs(state.errors);
      const nextIsValid = Boolean(errorsPairs.find(el => Boolean(el[1])));

      state.isValid = nextIsValid;

      return this.set(state);
   }
   public setFieldTouched(key: string, value: boolean) {
      const state = this.get();

      this.changer.setTouched(state, key, value);

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

      this.changer.validate(state, allTouched);

      this.set(state);
   }
   public validateAt(key: string) {
      const state = this.get();

      this.changer.setTouched(state, key, true);

      this.changer.validate(state, false);
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
      this.changer.validate(state, true);

      state.isSubmitted = true;

      if (this.onSubmit && state.isValid) {
         state.loading = true;

         this.set(state);

         this.onSubmit(state, this)
            .then(() => {
               state.loading = false;

               if (this.resetOnSubmit) {
                  this.changer.reset(state);
               }

               this.set(state);
            })
            .catch(() => {
               state.loading = false;

               this.set(state);
            });
      } else {
         this.set(state);
      }
   }

   public reset(getState?: S | ((state: S) => S)) {
      const state = this.get();

      this.changer.reset(state, getState);

      this.changer.validate(state, this.validateOnMount);

      state.isSubmitted = false;
      state.existsChanges = false;

      this.set(state);
   }

   public getQuery() {
      return makeApolloFormQuery(this.name);
   }
}

export default FormManager;
