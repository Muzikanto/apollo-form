import { FormState } from '../types';

abstract class BaseManager<S extends object> {
   abstract get(): FormState<S>;
   abstract set(state: FormState<S>): void;
   abstract watch<P = FormState<S>>(
      selector: ((state: FormState<S>) => P) | null,
      handler: (prev: P, next: P) => void,
      defaultState: P,
   ): () => void;
   abstract remove(): void;
}

export default BaseManager;
