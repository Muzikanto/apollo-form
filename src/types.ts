import { ApolloClient } from '@apollo/client';
import { ObjectSchema } from 'yup';
import FormManager from './managers/FormManager';

export type FieldValidator<Value> = (value: Value) => string | null | void;

export type FormErrors<State extends object> = {
   [k in keyof State]?: State[k] extends object
      ? [string | undefined, FormErrors<State[k]> | string]
      : State[k];
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
   submitCount: number;
   focused: null | string;
   responseMessage?: string;
}

export type FormChangeEvent = { type: 'all' } | { type: 'all' | 'field'; value: string };

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
   enableReinitialize?: boolean;

   onInit?: (form: FormManager<S>) => void;
   onSubmit?: (state: ApolloFormState<S>, form: FormManager<S>) => Promise<void>;
   onChange?: (next: S, prev: S, form: FormManager<S>, event: FormChangeEvent) => void;
}

export interface FieldProps<Value> {
   name: string;
   validate?: FieldValidator<Value>;
}
