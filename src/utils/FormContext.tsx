import React from 'react';
import FormManager from '../managers/FormManager';

const FormContext = React.createContext({} as FormManager<any>);

export default FormContext;
