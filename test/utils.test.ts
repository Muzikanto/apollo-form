import { getDeepStatus, setDeepStatus } from '../src/utils';

describe('getDeepStatus', function() {
   it('base', () => {
      const state: any = { one: { two: { three: 1 }, two2: 2 } };

      const v1 = getDeepStatus(state, 'one.two.three');
      const v2 = getDeepStatus(state, 'one.two2');
      const v3 = getDeepStatus(state, 'empty.one');

      expect(v1).toBe(1);
      expect(v2).toBe(2);
      expect(v3).toBe(undefined);
      expect(state.empty).toEqual([undefined, {}]);
   });

   it('array', () => {
      const state: any = { one: [undefined, { two: ['one', { three: ['error'] }] }] };

      const v1 = getDeepStatus(state, 'one.two.three');
      const v2 = getDeepStatus(state, 'one.two');
      const v3 = getDeepStatus(state, 'one');

      expect(v1).toBe('error');
      expect(v2).toBe('one');
      expect(v3).toBe(undefined);
   });

   it('change', () => {
      const state: any = { one: [undefined, { two: ['one', { three: 'error' }] }] };

      setDeepStatus(state, 'one', 'test1');
      setDeepStatus(state, 'one.two', 'test2');
      setDeepStatus(state, 'one.two.three', 'test3');

      const v1 = getDeepStatus(state, 'one.two.three');
      const v2 = getDeepStatus(state, 'one.two');
      const v3 = getDeepStatus(state, 'one');

      expect(v1).toBe('test3');
      expect(v2).toBe('test2');
      expect(v3).toBe('test1');
   });
});
