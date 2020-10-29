import { ApolloFormState } from '../types';

abstract class BaseManager<S extends object> {
   abstract get(): ApolloFormState<S>;
   abstract set(state: ApolloFormState<S>): void;
   abstract watch<P = ApolloFormState<S>>(
      selector: ((state: ApolloFormState<S>) => P) | null,
      handler: (value: P) => void,
   ): () => void;
}

export default BaseManager;
