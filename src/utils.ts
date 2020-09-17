import _ from 'lodash';

function objectDeepPairs(source: object) {
   const pairs = _.toPairs(source);

   for (let i = 0; i < pairs.length; i++) {
      const key = pairs[i][0];
      const value = pairs[i][1];

      if (typeof value === 'object') {
         if (!_.isDate(value)) {
            const deepPairs = objectDeepPairs(value);

            pairs.splice(i, 1);

            for (const dp of deepPairs) {
               pairs.push([key + '.' + dp[0], dp[1]]);
            }
         }
      }
   }

   return pairs;
}

function getDeepStatus(state: any, path: string, withDefault?: boolean) {
   const arr = path.split('.');
   const last = arr[arr.length - 1];

   let current = state;

   for (const key of arr.slice(0, -1)) {
      if (!state[key]) {
         current[key] = {};
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

   if (!current) {
      return '';
   }

   if (!current[last] && withDefault) {
      current[last] = '';
   }

   if (typeof current[last] === 'object') {
      if (!Array.isArray(current[last])) {
         current[last] = ['', current[last]];
         return '';
      }

      return current[last][0];
   }

   return current[last];
}
function setDeepStatus(state: any, path: string, value: any) {
   const arr = path.split('.');
   const last = arr[arr.length - 1];

   let current = state;

   for (const key of arr.slice(0, -1)) {
      if (!current[key]) {
         current[key] = {};
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

export { objectDeepPairs, getDeepStatus, setDeepStatus };
