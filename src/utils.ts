import isDate from 'lodash/isDate';
import makeApolloFormQuery from './query';

function replaceErrors(target: any, source: any, value: any) {
   for (const key of Object.keys(source)) {
      if (typeof source[key] === 'object' && source[key] !== null && !isDate(value)) {
         if (Array.isArray(source[key])) {
            if (source[key][1] !== null && source[key][1] !== undefined) {
               if (typeof target[key] !== 'object' || target[key] === null) {
                  target[key] = {};
               }

               let t = Array.isArray(target[key]) ? target[key][1] : target[key];
               target[key] = [true, replaceErrors(t || {}, source[key][1], true)];
            }
         } else {
            if (typeof target[key] !== 'object' || target[key] === null) {
               target[key] = {};
            }

            if (source[key]) {
               target[key] = replaceErrors(target[key] || {}, source[key], true);
            }
         }
      } else {
         target[key] = value;
      }
   }

   return target;
}

function firstError(state: any): undefined | string {
   for (const k in state) {
      let item = state[k];

      if (Array.isArray(state[k])) {
         item = state[k][1];
      }

      if (typeof item === 'object' && !isDate(item)) {
         const err = firstError(item);

         if (err) {
            return err;
         }
      } else {
         return item;
      }
   }

   return undefined;
}

function getDeepStatus(state: { [key: string]: any }, path: string) {
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
      return current;
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

export function blobToBase64(blob: File | Blob): Promise<string> {
   return new Promise((resolve: (base64: string) => void, reject: (err: Error) => void) => {
      const reader = new FileReader();

      reader.onloadend = function() {
         const base64data = reader.result;

         if (typeof base64data === 'string') {
            resolve(base64data);
         } else {
            reject(new Error('Error parse'));
         }
      };

      reader.readAsDataURL(blob);
      reader.onerror = () => reject(new Error('Error parse'));
   });
}

export { replaceErrors, getDeepStatus, setDeepStatus, makeApolloFormQuery, firstError };
