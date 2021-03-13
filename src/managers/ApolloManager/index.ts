import { FormState } from '../../types';
import { ApolloClient, DocumentNode } from '@apollo/client';
import { makeApolloFormQuery } from '../../utils';
import isEqual from 'lodash/isEqual';
import BaseManager from '../BaseManager';

class ApolloManager<S extends object> extends BaseManager<S> {
   protected apolloClient: ApolloClient<object>;
   protected query: DocumentNode;
   public name: string;

   constructor(name: string, client: ApolloClient<object>) {
      super();

      this.name = name;
      this.query = this.getQuery();
      this.apolloClient = client;
   }

   public set(state: FormState<S>) {
      this.apolloClient.writeQuery({ query: this.query, data: { [this.name]: state } });
   }
   public get(): FormState<S> {
      let data = null;

      try {
         data = this.apolloClient.readQuery<FormState<S>>({
            query: this.query,
         }) as any;
      } catch (e) {}

      return (data || {})[this.name];
   }

   public watch<P = FormState<S>>(
      selector: ((state: FormState<S>) => P) | null,
      handler: (value: P, prev: P) => void,
      defaultState: P,
   ): () => void {
      const rawState = this.get();

      // @ts-ignore
      const state = rawState ? rawState : defaultState;

      let previous = selector && state ? selector(state as any) : state;

      const unWatch = this.apolloClient.cache.watch({
         query: this.query,
         callback: ({ result }) => {
            const fullState = (result as { [key: string]: FormState<S> })[this.name];

            if (!fullState) {
               return;
            }

            const v: P = (selector ? selector(fullState) : fullState) as P;

            if (!isEqual(previous, v)) {
               const prev = previous as P;
               previous = v;

               handler(v, prev);
            }
         },
         optimistic: false,
      });

      return unWatch;
   }

   public remove() {
      this.apolloClient.cache.evict({ id: 'ROOT_QUERY', fieldName: this.name });
   }

   public getQuery() {
      return makeApolloFormQuery(this.name);
   }
}

export default ApolloManager;
