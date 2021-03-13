import { FormState } from '../../types';
import isEqual from 'lodash/isEqual';
import BaseManager from '../BaseManager';
import Observable from './Observable';

class ObservableManager<S extends object> extends BaseManager<S> {
   public name: string;
   public store: Observable<S>;

   constructor(name: string, store: Observable<S>) {
      super();

      this.name = name;
      this.store = store;
   }

   public set(state: FormState<S>) {
      this.store.set({ ...this.store.get(), [this.name]: state });
   }
   public get(): FormState<S> {
      let data = this.store.get();

      return ((data || {}) as any)[this.name];
   }

   public watch<P = FormState<S>>(
      selector: ((state: FormState<S>) => P) | null,
      handler: (value: P, prev: P) => void,
      defaultState: P,
   ): () => void {
      const unWatch = this.store.watch((next, prev) => {
         const nextPart = (next as { [key: string]: FormState<S> })[this.name];
         const prevPart = (prev as { [key: string]: FormState<S> })[this.name];

         if (!nextPart) {
            return;
         }

         const nextSel: P = (selector ? selector(nextPart) : nextPart) as P;
         const prevSel: P = prevPart && ((selector ? selector(prevPart) : prevPart) as P);

         if (!isEqual(nextSel, prevSel)) {
            handler(nextSel, (prevPart || defaultState) as any);
         }
      });

      return unWatch;
   }

   public remove() {
      const state = this.store.get();

      // @ts-ignore
      if (state[this.name]) {
         // @ts-ignore

         delete state[this.name];
      }

      // @ts-ignore
      this.set(state);
   }
}

export default ObservableManager;
