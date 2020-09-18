import { ApolloClient } from '@apollo/client';
import { ObjectSchema } from 'yup';
import FormManager from './FormManager';

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

   resetOnUnmount?: boolean;
   resetOnSubmit?: boolean;
   validateOnMount?: boolean;

   onSubmit?: (state: ApolloFormState<S>, form: FormManager<S>) => Promise<void>;
   onChange?: (state: S, form: FormManager<S>) => void;
}
