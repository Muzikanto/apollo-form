import { useContext } from 'react';
import { FormManager } from '../index';
import FormContext from '../FormContext';

function useFormCtx<S extends object>(): FormManager<S> {
   return useContext(FormContext);
}

export default useFormCtx;
