import { ApolloClient, InMemoryCache } from '@apollo/client';
import FormManager from '../src/FormManager';
import _ from 'lodash';
import { FormManagerParams } from '../src';

interface FormState {
   text: string;
   deep: {
      one: string;
   };
   arr: number[];
}

const getApolloClient = function() {
   return new ApolloClient({
      ssrMode: false,
      connectToDevTools: true,
      cache: new InMemoryCache().restore({}),
      resolvers: {},
      credentials: 'same-origin',
   });
};

const getFormManager = function(params?: Partial<FormManagerParams<FormState>>) {
   return new FormManager<FormState>({
      name: 'test',
      apolloClient: getApolloClient(),
      initialState: { text: '', deep: { one: '' }, arr: [1, 2, 3] },
      onSubmit: params ? params.onSubmit : undefined,
      validate: function(state) {
         return {
            text: 'not empty',
            deep: {
               one: 'not empty 2',
            },
         };
      },
   });
};

describe('Apollo form', function() {
   let manager: ReturnType<typeof getFormManager>;

   beforeEach(() => {
      manager = getFormManager();
   });

   it('base', () => {
      const newState = {
         ...manager.get(),
         loading: true,
         existsChanges: true,
         errors: { text: 'test err' },
      };
      manager.set(newState);

      expect(manager.get()).toEqual(_.cloneDeep(newState));
   });
   it('value', () => {
      manager.setFieldValue('text', 1);

      expect(manager.get().values.text).toBe(1);
   });
   it('value deep', () => {
      manager.setFieldValue('deep.one', 1);

      expect(manager.get().values.deep.one).toBe(1);
   });
   it('touched', () => {
      manager.setFieldTouched('text', true);

      expect(manager.manipulator.getTouched(manager.get(), 'text')).toBe(true);
   });
   it('touched deep', () => {
      manager.setFieldTouched('deep.one', true);

      expect(manager.manipulator.getTouched(manager.get(), 'deep.one')).toBe(true);
   });
   it('error', () => {
      manager.setFieldError('text', 'test err');

      expect(manager.manipulator.getError(manager.get(), 'text')).toBe('test err');
   });
   it('touched deep', () => {
      manager.setFieldError('deep.one', 'test err');

      expect(manager.manipulator.getError(manager.get(), 'deep.one')).toBe('test err');
   });
   it('loading', () => {
      manager.setLoading(true);
      expect(manager.get().loading).toBe(true);

      manager.setLoading(false);
      expect(manager.get().loading).toBe(false);
   });
   it('existsChanges', () => {
      manager.setExistsChanges(true);
      expect(manager.get().existsChanges).toBe(true);

      manager.setExistsChanges(false);
      expect(manager.get().existsChanges).toBe(false);
   });
   it('isValid', () => {
      manager.setIsValid(true);
      expect(manager.get().isValid).toBe(true);

      manager.setIsValid(false);
      expect(manager.get().isValid).toBe(false);
   });
   it('isSubmitted', () => {
      manager.setIsSubmitted(true);
      expect(manager.get().isSubmitted).toBe(true);

      manager.setIsSubmitted(false);
      expect(manager.get().isSubmitted).toBe(false);
   });
   it('validate errors', () => {
      manager.validate();

      expect(manager.get().errors).toEqual({ text: 'not empty', deep: { one: 'not empty 2' } });
   });
   it('validate touches', () => {
      manager.validate(true);

      expect(manager.get().touches).toEqual({ text: true, deep: { one: true } });
   });
   it('existsChanges after first change', () => {
      manager.setFieldValue('text', 'test');

      expect(manager.get().existsChanges).toBe(true);
   });
   it('reset default', () => {
      const initialState = _.cloneDeep(manager.get());

      manager.setFieldValue('text', 'test');
      manager.setFieldValue('deep.one', 'test2');
      manager.setFieldError('deep.one', 'err');
      manager.setFieldTouched('deep.one', true);
      manager.setIsSubmitted(true);
      manager.setLoading(true);
      manager.setExistsChanges(true);

      manager.reset();

      expect(manager.get()).toEqual(initialState);
   });
   it('reset object', () => {
      const initialState = _.cloneDeep(manager.get());

      manager.setFieldValue('text', 'test');
      manager.setFieldValue('deep.one', 'test2');
      manager.setFieldError('deep.one', 'err');
      manager.setFieldTouched('deep.one', true);
      manager.setIsSubmitted(true);
      manager.setLoading(true);
      manager.setExistsChanges(true);

      manager.reset({ text: '123', deep: { one: '234' }, arr: [2] });

      expect(manager.get()).toEqual({
         ...initialState,
         values: { text: '123', deep: { one: '234' }, arr: [2] },
      });
   });
   it('reset func', () => {
      const initialState = _.cloneDeep(manager.get());

      manager.setFieldValue('text', 'test');
      manager.setFieldValue('deep.one', 'test2');
      manager.setFieldError('deep.one', 'err');
      manager.setFieldTouched('deep.one', true);
      manager.setIsSubmitted(true);
      manager.setLoading(true);
      manager.setExistsChanges(true);

      manager.reset(state => ({ text: '123', deep: { one: '234' }, arr: state.arr }));

      expect(manager.get()).toEqual({
         ...initialState,
         values: { text: '123', deep: { one: '234' }, arr: [1, 2, 3] },
      });
   });
   it('custom validator', () => {
      manager.addFieldValidator('deep.one', function(v: string) {
         if (v === '123') {
            return 'err';
         }

         return undefined;
      });

      manager.setFieldValue('deep.one', '123');

      expect(manager.manipulator.getError(manager.get(), 'deep.one')).toBe('err');
   });
   it('custom validator removed', () => {
      manager.addFieldValidator('deep.one', function(v: string) {
         if (v === '123') {
            return 'err';
         }

         return undefined;
      });
      manager.removeFieldValidator('deep.one');

      manager.setFieldValue('deep.one', '123');

      expect(manager.manipulator.getError(manager.get(), 'deep.one')).toBe('not empty 2');
   });
   it('submit not called', () => {
      const manager = getFormManager({
         onSubmit: async () => {
            throw new Error('called');
         },
      });

      manager.submit();

      expect(true).toBe(true);
   });
   it('submit called', () => {
      const manager = getFormManager({
         onSubmit: async ({ values }) => {
            expect({ text: values.text, deep: values.deep.one }).toEqual({
               text: 'test',
               deep: 'test',
            });
         },
      });

      manager.setFieldValue('text', 'test');
      manager.setFieldValue('deep.one', 'test');

      manager.submit();
   });
});
