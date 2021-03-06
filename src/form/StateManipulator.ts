import { FormState, FieldValidator, FormErrors, FormManagerParams, FormTouches } from '../types';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import set from 'lodash/set';
import isEqual from 'lodash/isEqual';
import { firstError, getDeepStatus, replaceErrors, setDeepStatus } from '../utils';

class StateManipulator<S extends object> {
   protected validateHandler: FormManagerParams<S>['validate'];
   protected validationSchema: FormManagerParams<S>['validationSchema'];
   protected customValidators: { [key: string]: FieldValidator<any> };
   protected initialState: S;
   protected initialErrors: FormErrors<S>;
   protected initialTouches: FormTouches<S>;
   protected validateOnMount: FormManagerParams<S>['validateOnMount'];
   protected defaultState: Omit<FormState<S>, 'values'>;

   constructor(
      props: Omit<FormManagerParams<S>, 'initialErrors' | 'initialTouches'> &
         Required<Pick<FormManagerParams<S>, 'initialErrors' | 'initialTouches'>> & {
            customValidators: { [key: string]: FieldValidator<any> };
            defaultState: Omit<FormState<S>, 'values'>;
         },
   ) {
      this.validateHandler = props.validate;
      this.validationSchema = props.validationSchema;
      this.customValidators = props.customValidators;
      this.initialState = props.initialState;
      this.initialErrors = props.initialErrors;
      this.initialTouches = props.initialTouches;
      this.validateOnMount = props.validateOnMount;
      this.defaultState = props.defaultState;
   }

   public setValue(state: FormState<S>, key: string, newValue: any): FormState<S> {
      const value = get(state.values, key);

      if (!isEqual(value, newValue)) {
         set(state.values, key, newValue);
      }

      return state;
   }
   public setError(state: FormState<S>, key: string, value: string | undefined): FormState<S> {
      const error = getDeepStatus(state.errors, key);

      if (error !== value) {
         setDeepStatus(state.errors, key, value);
      }

      return state;
   }
   public setTouched(state: FormState<S>, key: string, value: boolean): FormState<S> {
      const touched = getDeepStatus(state.touches, key);

      if (touched !== value) {
         setDeepStatus(state.touches, key, value);
      }

      return state;
   }
   public getValue(state: FormState<S>, key: string) {
      return get(state.values, key);
   }
   public getError(state: FormState<S>, key: string) {
      return getDeepStatus(cloneDeep(state.errors), key);
   }
   public getTouched(state: FormState<S>, key: string) {
      const touched = getDeepStatus(cloneDeep(state.touches), key);

      return touched;
   }
   public validate(state: FormState<S>, allTouched: boolean = false): FormState<S> {
      state.errors = {};

      // merge errors from validate func
      if (this.validateHandler) {
         const customErrors = this.validateHandler(state);

         merge(state.errors, customErrors);
      }

      // custom validators
      for (const key in this.customValidators) {
         if (!(key in state.errors)) {
            const value = get(state.values, key);
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

               if (!this.getError(state, path)) {
                  this.setError(state, path, err.message);
               }
            }
         }
      }

      if (allTouched) {
         state.touches = replaceErrors(state.touches, state.errors, true);
      }

      const nextIsValid = !firstError(state.errors);

      state.isValid = nextIsValid;

      return state;
   }

   public reset(state: FormState<S>, getState?: S | ((state: S) => S)) {
      if (getState) {
         if (typeof getState === 'function') {
            Object.assign(state, {
               ...this.defaultState,
               values: (getState as (state: S) => S)(state.values),
               errors: this.initialErrors,
               touches: this.initialTouches,
               submitCount: state.submitCount,
            });
         } else {
            Object.assign(state, {
               ...this.defaultState,
               values: getState,
               errors: this.initialErrors,
               touches: this.initialTouches,
               submitCount: state.submitCount,
            });
         }
      } else {
         Object.assign(state, {
            ...this.defaultState,
            values: this.initialState,
            errors: this.initialErrors,
            touches: this.initialTouches,
            submitCount: state.submitCount,
         });
      }

      return state;
   }
}

export default StateManipulator;
