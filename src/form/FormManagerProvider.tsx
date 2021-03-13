import React from 'react';
import BaseManager from '../managers/BaseManager';
import FormManagerContext from './FormManagerContext';

function FormManagerProvider({
   children,
   getManager,
}: {
   children: React.ReactNode;
   getManager: (name: string) => BaseManager<any>;
}) {
   return <FormManagerContext.Provider value={getManager}>{children}</FormManagerContext.Provider>;
}

export default FormManagerProvider;
