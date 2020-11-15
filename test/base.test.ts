import { ApolloClient, InMemoryCache } from '@apollo/client';
import FormManager from '../src/FormManager';
import _ from 'lodash';
import { FormManagerParams } from '../src';
import * as Yup from 'yup';
import { firstError } from '../src/utils';

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
      validate: function({ values }) {
         let errors: any = {};

         if (!values.text) {
            errors.text = 'not empty';
         }
         if (!errors.deep) {
            errors.deep = {};
         }
         if (!values.deep.one) {
            errors.deep.one = 'not empty 2';
         }

         return errors;
      },
      ...params,
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
      manager.validate();

      expect(manager.get().errors).toEqual({ text: 'not empty', deep: { one: 'not empty 2' } });
   });
   it('validate touches', () => {
      manager.validate(true);
      manager.validate(true);

      expect(manager.get().touches).toEqual({
         text: true,
         deep: { one: true },
      });
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
         isValid: true,
         errors: { deep: {} },
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
         isValid: true,
         errors: { deep: {} },
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
      expect(manager.manipulator.getError(manager.get(), 'deep.one')).toBe(undefined);
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
      expect(manager.get().isSubmitted).toBe(true);
   });
   it('submit catch', async () => {
      const manager = getFormManager({
         onSubmit: async ({ values }) => {
            throw new Error('test error');
         },
      });

      manager.setFieldValue('text', 'test');
      manager.setFieldValue('deep.one', 'test');

      await manager.submit();

      expect(manager.get().isSubmitted).toBe(true);
      expect(manager.get().loading).toBe(false);
   });
   it('manipulator', () => {
      manager.setFieldValue('deep.one', 'test');
      const v = manager.manipulator.getValue(manager.get(), 'deep.one');

      expect(v).toBe('test');
   });
   it('break equals', () => {
      let checkRenders = 0;

      manager.watch(null, () => {
         checkRenders = checkRenders + 1;
      });

      manager.setFieldError('deep.one', 'err');
      manager.manipulator.getError(manager.get(), 'deep.one');
      manager.setFieldError('deep.one', 'err');

      expect(checkRenders).toBe(1);
   });
   it('watch', () => {
      let values: string[] = [];
      let renders = 0;

      manager.watch(
         s => s.values.deep.one,
         v => {
            values.push(v);
            renders = renders + 1;
         },
      );

      manager.setFieldValue('deep.one', 'one');
      manager.setFieldValue('deep.one', 'two');
      manager.setFieldValue('deep.one', 'three');
      manager.setFieldValue('text', 'test');

      expect(values).toEqual(['one', 'two', 'three']);
      expect(renders).toBe(3);
   });
   it('validationSchema valid', () => {
      const manager = getFormManager({
         validationSchema: Yup.object().shape({
            text: Yup.string().required(),
            deep: Yup.object().shape({
               one: Yup.string().required(),
            }),
         }),
      });

      manager.setFieldValue('text', 'test');
      manager.setFieldValue('deep.one', 'test');

      expect(manager.get().errors).toEqual({ deep: {} });
   });
   it('validationSchema invalid', () => {
      const manager = getFormManager({
         validationSchema: Yup.object().shape({
            text: Yup.string().required(),
            deep: Yup.object().shape({
               one: Yup.string().required(),
            }),
         }),
         validate: undefined,
      });

      manager.setFieldValue('text', '');

      expect(manager.get().errors).toEqual({
         text: 'text is a required field',
         deep: [
            undefined,
            {
               one: 'deep.one is a required field',
            },
         ],
      });
   });
   it('setValues', () => {
      manager.setValues({ text: '5', deep: { one: '5' }, arr: [3, 2, 1] });

      expect(manager.get().values).toEqual({ text: '5', deep: { one: '5' }, arr: [3, 2, 1] });
   });
   it('setErrors', () => {
      manager.setErrors({ text: 'err', deep: { one: 'err' } });

      expect(manager.get().errors).toEqual({ text: 'err', deep: { one: 'err' } });
   });
   it('setTouches', () => {
      manager.setTouches({ text: true, deep: { one: true } });

      expect(manager.get().touches).toEqual({ text: true, deep: { one: true } });
   });
   it('onChange', () => {
      let changed = 0;

      const manager = getFormManager({
         onChange: () => {
            changed = changed + 1;
         },
      });

      manager.setFieldValue('text', 1);
      manager.setFieldValue('deep.one', 2);
      manager.setFieldError('deep.one', 'err');
      manager.setFieldTouched('deep.one', true);

      expect(changed).toEqual(2);
   });

   it('onChange', () => {
      expect(
         firstError({
            intervals: [null, { 0: [null, { from: 'from', to: 'to' }] }],
         }),
      ).toBe('from');
   });
});
