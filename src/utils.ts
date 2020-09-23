import isDate from 'lodash/isDate';
import makeApolloFormQuery from './query';

function replaceValues(target: any, source: any, value: any) {
   for (const key of Object.keys(source)) {
      if (typeof source[key] === 'object' && !isDate(value)) {
         if (Array.isArray(source[key])) {
            if (!target[key]) {
               target[key] = [];
            }

            target[key][0] = true;

            if (!target[key][1]) {
               target[key][1] = {};
            }

            for (const k in source[key]) {
               target[key][1][k] = true;
            }
         } else {
            if (!target[key]) {
               target[key] = {};
            }
            replaceValues(target[key], source[key], value);
         }
      } else {
         target[key] = value;
      }
   }

   return source;
}

function firstError(state: any): undefined | string {
   for (const k in state) {
      if (typeof state[k] === 'object' && !isDate(state[k])) {
         return firstError(state[k]);
      } else {
         return state[k];
      }
   }

   return undefined;
}

function getDeepStatus(state: any, path: string, withDefault?: boolean) {
   const arr = path.split('.');
   const last = arr[arr.length - 1];

   let current = state;

   for (let i = 0; i < arr.length - 1; i++) {
      const key = arr[i];

      if (typeof current[key] === 'undefined') {
         if (i === arr.length - 1) {
            current[key] = {};
         } else {
            current[key] = [undefined, {}];
         }
      }

      if (typeof current[key] === 'object') {
         if (Array.isArray(current[key])) {
            current = current[key][1];
         } else {
            current = current[key];
         }
      } else {
         current[key] = [current[key], {}];
      }
   }

   if (typeof current === 'undefined') {
      return undefined;
   }

   if (typeof current[last] === 'undefined' && withDefault) {
      current[last] = undefined;
   }

   if (typeof current[last] === 'object') {
      if (!Array.isArray(current[last])) {
         current[last] = [undefined, current[last]];
         return undefined;
      }

      return current[last][0];
   }

   return current[last];
}
function setDeepStatus(state: any, path: string, value: any) {
   const arr = path.split('.');
   const last = arr[arr.length - 1];

   let current = state;

   for (let i = 0; i < arr.length - 1; i++) {
      const key = arr[i];

      if (typeof current[key] === 'undefined') {
         if (i === arr.length - 1) {
            current[key] = {};
         } else {
            current[key] = [undefined, {}];
         }
      }

      if (typeof current[key] === 'object') {
         if (Array.isArray(current[key])) {
            current = current[key][1];
         } else {
            current = current[key];
         }
      } else {
         const t = current[key];
         current[key] = [t, {}];
         current = current[key][1];
      }
   }

   if (typeof current[last] === 'object') {
      if (!Array.isArray(current[last])) {
         current[last] = [value, current[last]] as any;
      } else {
         current[last][0] = value;
      }
   } else {
      current[last] = value;
   }

   return state;
}

export { replaceValues, getDeepStatus, setDeepStatus, makeApolloFormQuery, firstError };
