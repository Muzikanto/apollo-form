import { ApolloClient, DocumentNode, gql, useQuery } from '@apollo/client';
import _ from 'lodash';
import { ObjectSchema } from 'yup';
import { objectDeepPairs, setDeepStatus } from './utils';

export type FieldValidator<Value> = (value: Value) => string | null | void;

export type FormErrors<State extends object> = {
   [k in keyof State]?:
      | (State[k] extends object
           ? FormErrors<State[k]> | [FormErrors<State[k]>] | [FormErrors<State[k]>, string]
           : string)
      | string;
};

export type FormTouches<State extends object> = {
   [k in keyof State]?: State[k] extends object
      ? FormTouches<State[k]> | [FormTouches<State[k]>, boolean]
      : boolean;
};

export interface ApolloFormState<S extends object> {
   values: S;
   errors: FormErrors<S>;
   touches: FormTouches<S>;
   isValid: boolean;
   loading: boolean;
   existsChanges: boolean;
   isSubmitted: boolean;
}

export interface FormManagerParams<S extends object> {
   name: string;
   apolloClient: ApolloClient<object>;

   initialState: S;
   initialErrors?: FormErrors<S>;
   initialTouches?: FormTouches<S>;

   validationSchema?: ObjectSchema<any>;
   validate?: (state: ApolloFormState<S>) => FormErrors<S> | undefined;

   resetOnSubmit?: boolean;
   validateOnMount?: boolean;

   onSubmit?: (state: ApolloFormState<S>, form: FormManager<S>) => Promise<void>;
   onChange?: (state: S, form: FormManager<S>) => void;
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

   constructor(props: FormManagerParams<S>) {
      this.apolloClient = props.apolloClient;
      this.name = props.name;
      this.validateHandler = props.validate;
      this.query = gql`query ApolloForm { ${this.name} @client }`;
      this.onChange = props.onChange;
      this.onSubmit = props.onSubmit;
      this.validationSchema = props.validationSchema;
      this.validateOnMount = props.validateOnMount;
      this.resetOnSubmit = props.resetOnSubmit;
      this.initialState = _.cloneDeep(props.initialState);
      this.initialErrors = _.cloneDeep(props.initialErrors) || {};
      this.initialTouches = _.cloneDeep(props.initialTouches) || {};

      this.set({
         ...defaultState,
         values: props.initialState,
         errors: this.initialErrors,
         touches: this.initialTouches,
      });

      this.validate(this.validateOnMount);
   }

   public set(state: ApolloFormState<S>) {
      this.apolloClient.writeQuery({ query: this.query, data: { [this.name]: state } });
   }
   public get(): ApolloFormState<S> {
      const data = this.apolloClient.readQuery<ApolloFormState<S>>({
         query: this.query,
      }) as any;

      return _.cloneDeep(data[this.name]) as ApolloFormState<S>;
   }
   public useState(): ApolloFormState<S> {
      const { data } = useQuery(this.query);

      return data[this.name];
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

      this.setValue(state, key, newValue);

      if (this.onChange) {
         this.onChange(state.values, this);
      }

      this.set(state);

      this.validate(false);
   }
   protected setValue(state: ApolloFormState<S>, key: string, newValue: any) {
      const value = _.get(state.values, key);
      const touched = _.get(state.touches, key);

      if (value !== newValue) {
         _.set(state.values, key, newValue);
      }

      if (!touched) {
         _.set(state.touches, key, true);
      }

      if (!state.existsChanges) {
         state.existsChanges = true;
      }

      return state;
   }
   public setFieldError(key: string, error: string | undefined) {
      const state = this.get();

      this.setError(state, key, error);

      const errorsPairs = objectDeepPairs(state.errors);
      const nextIsValid = Boolean(errorsPairs.find(el => Boolean(el[1])));

      state.isValid = nextIsValid;

      return this.set(state);
   }

   protected setError(state: ApolloFormState<S>, key: string, value: string | undefined) {
      setDeepStatus(state.errors, key, value);

      return state;
   }

   public setFieldTouched(key: string, value: boolean) {
      const state = this.get();

      this.setTouched(state, key, value);

      return this.set(state);
   }
   protected setTouched(state: ApolloFormState<S>, key: string, value: boolean) {
      setDeepStatus(state.touches, key, value);

      return state;
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

      this.set(state);
   }

   public validateAt(key: string) {
      const state = this.get();
      const keys = key.split('.');

      for (let i = 1; i <= keys.length; i++) {
         const pathToKey = keys.slice(0, i).join('.');

         _.set(state.touches, pathToKey, true);
      }

      this.set(state);
      this.validate(false);
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
      this.validate(true);

      state.isSubmitted = true;

      if (this.onSubmit && state.isValid) {
         state.loading = true;

         this.set(state);

         this.onSubmit(state, this)
            .then(() => {
               state.loading = false;

               if (this.resetOnSubmit) {
                  this.reset();
               }
               this.set(state);
            })
            .catch(() => {
               state.loading = false;
               this.set(state);
            });
      }
   }

   public reset(state?: S | ((state: S) => S)) {
      const currentState = this.get();

      if (state) {
         if (typeof state === 'function') {
            this.set({
               ...defaultState,
               values: (state as (state: S) => S)(currentState.values),
               errors: this.initialErrors,
               touches: this.initialTouches,
            });
         } else {
            this.set({
               ...defaultState,
               values: state,
               errors: this.initialErrors,
               touches: this.initialTouches,
            });
         }
      } else {
         this.set({
            ...defaultState,
            values: this.initialState,
            errors: this.initialErrors,
            touches: this.initialTouches,
         });
      }

      this.validate(this.validateOnMount);
   }
}

export default FormManager;
