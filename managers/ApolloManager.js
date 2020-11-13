'use strict';
var __importDefault =
   (this && this.__importDefault) ||
   function(mod) {
      return mod && mod.__esModule ? mod : { default: mod };
   };
Object.defineProperty(exports, '__esModule', { value: true });
const utils_1 = require('../utils');
const isEqual_1 = __importDefault(require('lodash/isEqual'));
const BaseManager_1 = __importDefault(require('./BaseManager'));
class ApolloManager extends BaseManager_1.default {
   constructor(name, client) {
      super();
      this.name = name;
      this.query = this.getQuery();
      this.apolloClient = client;
   }
   set(state) {
      this.apolloClient.writeQuery({ query: this.query, data: { [this.name]: state } });
   }
   get() {
      let data = null;
      try {
         data = this.apolloClient.readQuery({
            query: this.query,
         });
      } catch (e) {}
      return data;
   }
   watch(selector, handler) {
      // @ts-ignore
      let previous = selector ? selector(this.get()[this.name]) : this.get()[this.name];
      // const watcher = this.apolloClient
      //    .watchQuery<{ [key: string]: ApolloFormState<S> }>({
      //       query: this.query,
      //       // id,
      //    })
      //    .subscribe(({ data }) => {
      //       console.log(1)
      //       const s = data[this.name];
      //
      //       const v: P = (selector ? selector(s) : s) as P;
      //
      //       if (!isEqual(previous, v)) {
      //          previous = v;
      //
      //          handler(v);
      //       }
      //    });
      //
      // return () => {
      //    watcher.unsubscribe();
      // };
      const unWatch = this.apolloClient.cache.watch({
         query: this.query,
         callback: ({ result }) => {
            const s = result[this.name];
            const v = selector ? selector(s) : s;
            if (!isEqual_1.default(previous, v)) {
               previous = v;
               handler(v);
            }
         },
         optimistic: false,
      });
      return unWatch;
   }
   getQuery() {
      return utils_1.makeApolloFormQuery(this.name);
   }
}
exports.default = ApolloManager;
