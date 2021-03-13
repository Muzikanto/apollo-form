import cloneDeep from 'lodash/cloneDeep';

export type Watcher<T> = (val: T, prev: T) => void;
export type Listener<T> = (val: T) => void;

class Observable<T> {
   protected listeners: Array<{ event: Listener<T>; selector?: (state: T) => any }> = [];
   protected initialValue: T;
   protected value: T;
   protected watchers: Array<Watcher<T>> = [];
   protected timeouts: any[] = [];

   constructor(value: T) {
      this.value = cloneDeep(value);
      this.initialValue = cloneDeep(value);
   }

   public get(): T {
      return this.value;
   }

   public set(val: T) {
      if (this.value !== val) {
         const prev = this.value;
         this.value = val;

         this.listeners.forEach(l => l.event(l.selector ? l.selector(val) : val));

         const timeoutId = setTimeout(() => {
            this.watchers.forEach(l => l(val, prev));
         }, 0);

         this.timeouts.push(timeoutId);
      }
   }

   public watch(handler: (state: T, prev: T) => void) {
      this.watchers.push(handler);

      return () => {
         this.watchers = this.watchers.filter(l => l !== handler);
      };
   }
}

export default Observable;
