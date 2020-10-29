import { ApolloFormState } from '../types';
import { ApolloClient, DocumentNode } from '@apollo/client';
import { makeApolloFormQuery } from '../utils';
import isEqual from 'lodash/isEqual';
import BaseManager from './BaseManager';

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

   public set(state: ApolloFormState<S>) {
      this.apolloClient.writeQuery({ query: this.query, data: { [this.name]: state } });
   }
   public get(): ApolloFormState<S> {
      let data = null;

      try {
         data = this.apolloClient.readQuery<ApolloFormState<S>>({
            query: this.query,
         }) as any;
      } catch (e) {}

      return data;
   }

   public watch<P = ApolloFormState<S>>(
      selector: ((state: ApolloFormState<S>) => P) | null,
      handler: (value: P) => void,
   ): () => void {
      // @ts-ignore
      let previous = selector ? selector(this.get()[this.name]) : this.get()[this.name];

      // const watcher = this.apolloClient
      //    .watchQuery<{ [key: string]: ApolloFormState<S> }>({
      //       query: this.query,
      //       // id,
      //    })
      //    .subscribe(({ data }) => {
      //       console.log(1)
      //       const s = data[this.name];
      //
      //       const v: P = (selector ? selector(s) : s) as P;
      //
      //       if (!isEqual(previous, v)) {
      //          previous = v;
      //
      //          handler(v);
      //       }
      //    });
      //
      // return () => {
      //    watcher.unsubscribe();
      // };

      const unWatch = this.apolloClient.cache.watch({
         query: this.query,
         callback: ({ result }) => {
            const s = (result as { [key: string]: ApolloFormState<S> })[this.name];

            const v: P = (selector ? selector(s) : s) as P;

            if (!isEqual(previous, v)) {
               previous = v;

               handler(v);
            }
         },
         optimistic: false,
      });

      return unWatch;
   }

   public getQuery() {
      return makeApolloFormQuery(this.name);
   }
}

export default ApolloManager;