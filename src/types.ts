import { ObjectSchema } from 'yup';
import FormManager from './form/FormManager';
import BaseManager from './managers/BaseManager';

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

export interface FormState<S extends object> {
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

export type FormChangeEvent = { type: 'all' | 'field'; key?: string; value?: any };

export interface FormManagerParams<S extends object> {
   name: string;
   manager: BaseManager<S>;

   initialState: S;
   initialErrors?: FormErrors<S>;
   initialTouches?: FormTouches<S>;

   validationSchema?: ObjectSchema<any>;
   validate?: (state: FormState<S>) => FormErrors<S> | undefined;

   resetOnSubmit?: boolean;
   validateOnMount?: boolean;
   enableReinitialize?: boolean;

   onInit?: (form: FormManager<S>) => void;
   onSubmit?: (state: FormState<S>, form: FormManager<S>) => Promise<void>;
   onChange?: (next: S, prev: S, form: FormManager<S>, event: FormChangeEvent) => void;
   formatState?: (params: { next: S; prev: S; event: FormChangeEvent }) => S;
}

export interface FieldProps<Value> {
   name: string;
   validate?: FieldValidator<Value>;
}
