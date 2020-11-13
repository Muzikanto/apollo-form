import { ApolloFormState } from '../types';
import { ApolloClient, DocumentNode } from '@apollo/client';
import BaseManager from './BaseManager';
declare class ApolloManager<S extends object> extends BaseManager<S> {
   protected apolloClient: ApolloClient<object>;
   protected query: DocumentNode;
   name: string;
   constructor(name: string, client: ApolloClient<object>);
   set(state: ApolloFormState<S>): void;
   get(): ApolloFormState<S>;
   watch<P = ApolloFormState<S>>(
      selector: ((state: ApolloFormState<S>) => P) | null,
      handler: (value: P) => void,
   ): () => void;
   getQuery(): DocumentNode;
}
export default ApolloManager;
