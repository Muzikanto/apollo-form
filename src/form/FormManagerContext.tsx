import React from 'react';
import BaseManager from '../managers/BaseManager';

const FormManagerContext = React.createContext<null | ((name: string) => BaseManager<any>)>(null);

export default FormManagerContext;
