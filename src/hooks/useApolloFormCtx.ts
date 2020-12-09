import { useContext } from 'react';
import { FormManager } from '../index';
import FormContext from '../utils/FormContext';

function useApolloFormCtx<S extends object>(): FormManager<S> {
   return useContext(FormContext);
}

export default useApolloFormCtx;
