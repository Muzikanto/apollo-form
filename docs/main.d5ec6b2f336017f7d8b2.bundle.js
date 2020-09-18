(window.webpackJsonp = window.webpackJsonp || []).push([
   [0],
   {
      119: function(module, exports) {},
      403: function(module, exports, __webpack_require__) {
         __webpack_require__(404),
            __webpack_require__(550),
            __webpack_require__(551),
            (module.exports = __webpack_require__(754));
      },
      468: function(module, exports) {},
      551: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.r(__webpack_exports__);
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _storybook_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(124),
            _storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(389),
            _apollo_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(106),
            _apollo_client_cache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(69);
         Object(_storybook_react__WEBPACK_IMPORTED_MODULE_1__.addParameters)({
            options: { showRoots: !0 },
            dependencies: { withStoriesOnly: !0, hideEmpty: !0 },
         }),
            Object(_storybook_react__WEBPACK_IMPORTED_MODULE_1__.addDecorator)(
               _storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.withKnobs,
            );
         var client = new _apollo_client__WEBPACK_IMPORTED_MODULE_3__.ApolloClient({
            ssrMode: !1,
            connectToDevTools: !0,
            cache: new _apollo_client_cache__WEBPACK_IMPORTED_MODULE_4__.InMemoryCache().restore(
               {},
            ),
            resolvers: {},
            credentials: 'same-origin',
         });
         Object(_storybook_react__WEBPACK_IMPORTED_MODULE_1__.addDecorator)(function(story) {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
               _apollo_client__WEBPACK_IMPORTED_MODULE_3__.ApolloProvider,
               { client: client },
               story(),
            );
         });
      },
      754: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.r(__webpack_exports__),
            function(module) {
               var _storybook_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(124);
               (module._StorybookPreserveDecorators = !0),
                  Object(_storybook_react__WEBPACK_IMPORTED_MODULE_0__.configure)(
                     [__webpack_require__(755)],
                     module,
                  );
            }.call(this, __webpack_require__(152)(module));
      },
      755: function(module, exports, __webpack_require__) {
         var map = { './example.stories.tsx': 760 };
         function webpackContext(req) {
            var id = webpackContextResolve(req);
            return __webpack_require__(id);
         }
         function webpackContextResolve(req) {
            if (!__webpack_require__.o(map, req)) {
               var e = new Error("Cannot find module '" + req + "'");
               throw ((e.code = 'MODULE_NOT_FOUND'), e);
            }
            return map[req];
         }
         (webpackContext.keys = function webpackContextKeys() {
            return Object.keys(map);
         }),
            (webpackContext.resolve = webpackContextResolve),
            (module.exports = webpackContext),
            (webpackContext.id = 755);
      },
      760: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.r(__webpack_exports__);
         var regenerator = __webpack_require__(262),
            regenerator_default = __webpack_require__.n(regenerator),
            objectSpread2 = __webpack_require__(46),
            asyncToGenerator = __webpack_require__(392),
            slicedToArray = __webpack_require__(205),
            react = __webpack_require__(0),
            react_default = __webpack_require__.n(react),
            src_FormContext = react_default.a.createContext({});
         var hooks_useApolloFormCtx = function useApolloFormCtx() {
            return Object(react.useContext)(src_FormContext);
         };
         var consumers_FormConsumer = function FormConsumer(_ref) {
            var Render = _ref.children,
               form = hooks_useApolloFormCtx();
            return react_default.a.createElement(Render, { form: form });
         };
         var consumers_StateConsumer = function StateConsumer(_ref) {
               var Render = _ref.children,
                  selector = _ref.selector,
                  state = hooks_useApolloFormCtx().useState(selector);
               return react_default.a.createElement(Render, { state: state });
            },
            objectWithoutProperties = __webpack_require__(91);
         var hooks_useField = function useField(props) {
            var apolloForm = hooks_useApolloFormCtx(),
               value = apolloForm.useValue(props.name),
               error = apolloForm.useError(props.name),
               touched = apolloForm.useTouched(props.name),
               setFieldValue = react_default.a.useCallback(
                  function(v) {
                     apolloForm.setFieldValue(props.name, v, !0);
                  },
                  [apolloForm],
               ),
               setFieldError = react_default.a.useCallback(
                  function(v) {
                     apolloForm.setFieldError(props.name, v);
                  },
                  [apolloForm],
               ),
               setFieldTouched = react_default.a.useCallback(
                  function(v) {
                     apolloForm.setFieldTouched(props.name, v);
                  },
                  [apolloForm],
               );
            return (
               react_default.a.useEffect(function() {
                  if (props.validate)
                     return (
                        apolloForm.addFieldValidator(props.name, props.validate),
                        function() {
                           return apolloForm.removeFieldValidator(props.name);
                        }
                     );
               }, []),
               {
                  value: value,
                  error: error,
                  touched: touched,
                  setFieldValue: setFieldValue,
                  setFieldError: setFieldError,
                  setFieldTouched: setFieldTouched,
               }
            );
         };
         var field_Field = function Field(props) {
               var children = props.children,
                  fieldProps = Object(objectWithoutProperties.a)(props, ['children']),
                  form = hooks_useApolloFormCtx();
               return children({ field: hooks_useField(fieldProps), form: form });
            },
            toConsumableArray = __webpack_require__(129);
         var hooks_useFieldArray = function useFieldArray(props) {
            var field = hooks_useField({ name: props.name, validate: props.validate });
            return (
               Array.isArray(field.value) || console.error(props.name + ' is not array'),
               Object(objectSpread2.a)({}, field, {
                  push: function push() {
                     for (
                        var _len = arguments.length, args = new Array(_len), _key = 0;
                        _key < _len;
                        _key++
                     )
                        args[_key] = arguments[_key];
                     field.setFieldValue([].concat(Object(toConsumableArray.a)(field.value), args));
                  },
                  removeAt: function removeAt(index) {
                     var newArr = Object(toConsumableArray.a)(field.value);
                     newArr.splice(index, 1), field.setFieldValue(newArr);
                  },
                  insertAt: function insertAt(index) {
                     for (
                        var newArr = Object(toConsumableArray.a)(field.value),
                           _len2 = arguments.length,
                           args = new Array(_len2 > 1 ? _len2 - 1 : 0),
                           _key2 = 1;
                        _key2 < _len2;
                        _key2++
                     )
                        args[_key2 - 1] = arguments[_key2];
                     newArr.splice.apply(newArr, [index, 0].concat(args)),
                        field.setFieldValue(newArr);
                  },
                  pop: function pop() {
                     var newArr = Object(toConsumableArray.a)(field.value);
                     newArr.pop(), field.setFieldValue(newArr);
                  },
                  swap: function swap(index1, index2) {
                     var newArr = Object(toConsumableArray.a)(field.value),
                        _ref = [newArr[index2], newArr[index1]];
                     (newArr[index1] = _ref[0]),
                        (newArr[index2] = _ref[1]),
                        field.setFieldValue(newArr);
                  },
                  clear: function clear() {
                     field.setFieldValue([]);
                  },
               })
            );
         };
         var field_FieldArray = function FieldArray(props) {
            var children = props.children,
               fieldArrProps = Object(objectWithoutProperties.a)(props, ['children']),
               form = hooks_useApolloFormCtx();
            return children({ field: hooks_useFieldArray(fieldArrProps), form: form });
         };
         var defineProperty = __webpack_require__(200),
            createForOfIteratorHelper = __webpack_require__(126),
            classCallCheck = __webpack_require__(263),
            createClass = __webpack_require__(264),
            lodash = __webpack_require__(30),
            lodash_default = __webpack_require__.n(lodash),
            taggedTemplateLiteral = __webpack_require__(393),
            client = __webpack_require__(106);
         function _templateObject() {
            var data = Object(taggedTemplateLiteral.a)(['query ApolloForm { ', ' @client }']);
            return (
               (_templateObject = function _templateObject() {
                  return data;
               }),
               data
            );
         }
         function objectDeepPairs(source) {
            for (var pairs = lodash_default.a.toPairs(source), i = 0; i < pairs.length; i++) {
               var key = pairs[i][0],
                  value = pairs[i][1];
               if ('object' == typeof value && !lodash_default.a.isDate(value)) {
                  var deepPairs = objectDeepPairs(value);
                  pairs.splice(i, 1);
                  var _step,
                     _iterator = Object(createForOfIteratorHelper.a)(deepPairs);
                  try {
                     for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                        var dp = _step.value;
                        pairs.push([key + '.' + dp[0], dp[1]]);
                     }
                  } catch (err) {
                     _iterator.e(err);
                  } finally {
                     _iterator.f();
                  }
               }
            }
            return pairs;
         }
         function getDeepStatus(state, path, withDefault) {
            var _step2,
               arr = path.split('.'),
               last = arr[arr.length - 1],
               current = state,
               _iterator2 = Object(createForOfIteratorHelper.a)(arr.slice(0, -1));
            try {
               for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                  var key = _step2.value;
                  state[key] || (current[key] = {}),
                     'object' == typeof current[key]
                        ? (current = Array.isArray(current[key]) ? current[key][1] : current[key])
                        : (current[key] = [current[key], {}]);
               }
            } catch (err) {
               _iterator2.e(err);
            } finally {
               _iterator2.f();
            }
            return current
               ? (!current[last] && withDefault && (current[last] = ''),
                 'object' == typeof current[last]
                    ? Array.isArray(current[last])
                       ? current[last][0]
                       : ((current[last] = ['', current[last]]), '')
                    : current[last])
               : '';
         }
         function setDeepStatus(state, path, value) {
            for (
               var arr = path.split('.'), last = arr[arr.length - 1], current = state, i = 0;
               i < arr.length - 1;
               i++
            ) {
               var key = arr[i];
               if (
                  (current[key] ||
                     (i === arr.length - 1 ? (current[key] = {}) : (current[key] = [void 0, {}])),
                  'object' == typeof current[key])
               )
                  current = Array.isArray(current[key]) ? current[key][1] : current[key];
               else {
                  var t = current[key];
                  (current[key] = [t, {}]), (current = current[key][1]);
               }
            }
            return (
               'object' == typeof current[last]
                  ? Array.isArray(current[last])
                     ? (current[last][0] = value)
                     : (current[last] = [value, current[last]])
                  : (current[last] = value),
               state
            );
         }
         var FormManager_Changer = (function() {
               function Changer(props) {
                  Object(classCallCheck.a)(this, Changer),
                     (this.validateHandler = void 0),
                     (this.validationSchema = void 0),
                     (this.customValidators = void 0),
                     (this.initialState = void 0),
                     (this.initialErrors = void 0),
                     (this.initialTouches = void 0),
                     (this.validateOnMount = void 0),
                     (this.validateHandler = props.validate),
                     (this.validationSchema = props.validationSchema),
                     (this.customValidators = props.customValidators),
                     (this.initialState = props.initialState),
                     (this.initialErrors = props.initialErrors),
                     (this.initialTouches = props.initialTouches),
                     (this.validateOnMount = props.validateOnMount);
               }
               return (
                  Object(createClass.a)(Changer, [
                     {
                        key: 'setValue',
                        value: function setValue(state, key, newValue) {
                           var value = lodash_default.a.get(state.values, key);
                           return (
                              lodash_default.a.isEqual(value, newValue) ||
                                 lodash_default.a.set(state.values, key, newValue),
                              state.existsChanges || (state.existsChanges = !0),
                              state
                           );
                        },
                     },
                     {
                        key: 'setError',
                        value: function setError(state, key, value) {
                           return (
                              getDeepStatus(state.errors, key) !== value &&
                                 setDeepStatus(state.errors, key, value),
                              state
                           );
                        },
                     },
                     {
                        key: 'setTouched',
                        value: function setTouched(state, key, value) {
                           return (
                              getDeepStatus(state.touches, key) !== value &&
                                 setDeepStatus(state.touches, key, value),
                              state
                           );
                        },
                     },
                     {
                        key: 'validate',
                        value: function validate(state) {
                           var allTouched =
                              arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                           if (((state.errors = {}), this.validateHandler)) {
                              var customErrors = this.validateHandler(state);
                              lodash_default.a.merge(state.errors, customErrors);
                           }
                           for (var _key in this.customValidators)
                              if (!(_key in state.errors)) {
                                 var value = lodash_default.a.get(state.values, _key),
                                    newError = this.customValidators[_key](value);
                                 newError && this.setError(state, _key, newError);
                              }
                           if (this.validationSchema)
                              try {
                                 this.validationSchema.validateSync(state.values, {
                                    recursive: !0,
                                    abortEarly: !1,
                                 });
                              } catch (e) {
                                 var _step,
                                    _iterator = Object(createForOfIteratorHelper.a)(e.inner);
                                 try {
                                    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                                       var err = _step.value,
                                          path = err.path.replace('[', '.').replace(']', '');
                                       this.setError(state, path, err.message);
                                    }
                                 } catch (err) {
                                    _iterator.e(err);
                                 } finally {
                                    _iterator.f();
                                 }
                              }
                           var errorsPairs = objectDeepPairs(state.errors),
                              nextIsValid = !Boolean(
                                 errorsPairs.find(function(el) {
                                    return Boolean(el[1]);
                                 }),
                              );
                           if (allTouched) {
                              var _step2,
                                 _iterator2 = Object(createForOfIteratorHelper.a)(errorsPairs);
                              try {
                                 for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                                    var pair = _step2.value;
                                    lodash_default.a.set(state.touches, pair[0], !0);
                                 }
                              } catch (err) {
                                 _iterator2.e(err);
                              } finally {
                                 _iterator2.f();
                              }
                           }
                           return (state.isValid = nextIsValid), state;
                        },
                     },
                     {
                        key: 'reset',
                        value: function reset(state, getState) {
                           return (
                              getState
                                 ? 'function' == typeof getState
                                    ? Object.assign(
                                         state,
                                         Object(objectSpread2.a)({}, defaultState, {
                                            values: getState(state.values),
                                            errors: this.initialErrors,
                                            touches: this.initialTouches,
                                         }),
                                      )
                                    : Object.assign(
                                         state,
                                         Object(objectSpread2.a)({}, defaultState, {
                                            values: state.values,
                                            errors: this.initialErrors,
                                            touches: this.initialTouches,
                                         }),
                                      )
                                 : Object.assign(
                                      state,
                                      Object(objectSpread2.a)({}, defaultState, {
                                         values: this.initialState,
                                         errors: this.initialErrors,
                                         touches: this.initialTouches,
                                      }),
                                   ),
                              state
                           );
                        },
                     },
                  ]),
                  Changer
               );
            })(),
            defaultState = {
               errors: {},
               touches: {},
               isValid: !0,
               loading: !1,
               existsChanges: !1,
               isSubmitted: !1,
            },
            src_FormManager = (function() {
               function FormManager(props) {
                  Object(classCallCheck.a)(this, FormManager),
                     (this.customValidators = {}),
                     (this.apolloClient = void 0),
                     (this.name = void 0),
                     (this.validateHandler = void 0),
                     (this.validationSchema = void 0),
                     (this.onSubmit = void 0),
                     (this.onChange = void 0),
                     (this.resetOnSubmit = void 0),
                     (this.validateOnMount = void 0),
                     (this.initialState = void 0),
                     (this.initialErrors = void 0),
                     (this.initialTouches = void 0),
                     (this.query = void 0),
                     (this.changer = void 0),
                     (this.apolloClient = props.apolloClient),
                     (this.name = props.name),
                     (this.validateHandler = props.validate),
                     (this.query = this.getQuery()),
                     (this.onChange = props.onChange),
                     (this.onSubmit = props.onSubmit),
                     (this.validationSchema = props.validationSchema),
                     (this.validateOnMount = props.validateOnMount),
                     (this.resetOnSubmit = props.resetOnSubmit),
                     (this.initialState = lodash_default.a.cloneDeep(props.initialState)),
                     (this.initialErrors = lodash_default.a.cloneDeep(props.initialErrors) || {}),
                     (this.initialTouches = lodash_default.a.cloneDeep(props.initialTouches) || {}),
                     (this.changer = new FormManager_Changer(
                        Object(objectSpread2.a)({}, props, {
                           initialTouches: this.initialTouches,
                           initialErrors: this.initialErrors,
                           customValidators: this.customValidators,
                        }),
                     )),
                     this.get(),
                     this.validate(this.validateOnMount);
               }
               return (
                  Object(createClass.a)(FormManager, [
                     {
                        key: 'set',
                        value: function set(state) {
                           this.apolloClient.writeQuery({
                              query: this.query,
                              data: Object(defineProperty.a)({}, this.name, state),
                           });
                        },
                     },
                     {
                        key: 'get',
                        value: function get() {
                           var data = this.apolloClient.readQuery({ query: this.query });
                           return (
                              data ||
                                 (this.set(
                                    Object(objectSpread2.a)({}, defaultState, {
                                       values: this.initialState,
                                       errors: this.initialErrors,
                                       touches: this.initialTouches,
                                    }),
                                 ),
                                 (data = this.apolloClient.readQuery({ query: this.query }))),
                              lodash_default.a.cloneDeep(data[this.name])
                           );
                        },
                     },
                     {
                        key: 'useState',
                        value: function useState(getValue) {
                           var _this = this,
                              _React$useState = react_default.a.useState(
                                 getValue ? getValue(this.get()) : this.get(),
                              ),
                              _React$useState2 = Object(slicedToArray.a)(_React$useState, 2),
                              state = _React$useState2[0],
                              setState = _React$useState2[1];
                           return (
                              react_default.a.useEffect(
                                 function() {
                                    return _this.apolloClient.cache.watch({
                                       query: _this.getQuery(),
                                       callback: function callback(_ref) {
                                          var s = _ref.result[_this.name],
                                             v = getValue ? getValue(s) : s;
                                          lodash_default.a.isEqual(state, v) || setState(v);
                                       },
                                       optimistic: !1,
                                    });
                                 },
                                 [getValue, state],
                              ),
                              state
                           );
                        },
                     },
                     {
                        key: 'useValue',
                        value: function useValue(key) {
                           return this.useState(function(state) {
                              return lodash_default.a.get(state.values, key);
                           });
                        },
                     },
                     {
                        key: 'useTouched',
                        value: function useTouched(key) {
                           return this.useState(function(state) {
                              return getDeepStatus(lodash_default.a.cloneDeep(state.touches), key);
                           });
                        },
                     },
                     {
                        key: 'useError',
                        value: function useError(key) {
                           return this.useState(function(state) {
                              return getDeepStatus(lodash_default.a.cloneDeep(state.errors), key);
                           });
                        },
                     },
                     {
                        key: 'setValues',
                        value: function setValues(values) {
                           this.set(Object(objectSpread2.a)({}, this.get(), { values: values })),
                              this.onChange && this.onChange(values, this);
                        },
                     },
                     {
                        key: 'setErrors',
                        value: function setErrors(errors) {
                           return this.set(
                              Object(objectSpread2.a)({}, this.get(), { errors: errors }),
                           );
                        },
                     },
                     {
                        key: 'setTouches',
                        value: function setTouches(touches) {
                           return this.set(
                              Object(objectSpread2.a)({}, this.get(), { touches: touches }),
                           );
                        },
                     },
                     {
                        key: 'setFieldValue',
                        value: function setFieldValue(key, newValue, validate) {
                           var state = this.get();
                           return (
                              getDeepStatus(state.touches, key) ||
                                 this.changer.setTouched(state, key, !0),
                              this.changer.setValue(state, key, newValue),
                              this.changer.validate(state, !1),
                              this.set(state),
                              this.onChange && this.onChange(state.values, this),
                              state
                           );
                        },
                     },
                     {
                        key: 'setFieldError',
                        value: function setFieldError(key, error) {
                           var state = this.get();
                           this.changer.setError(state, key, error);
                           var errorsPairs = objectDeepPairs(state.errors),
                              nextIsValid = Boolean(
                                 errorsPairs.find(function(el) {
                                    return Boolean(el[1]);
                                 }),
                              );
                           return (state.isValid = nextIsValid), this.set(state);
                        },
                     },
                     {
                        key: 'setFieldTouched',
                        value: function setFieldTouched(key, value) {
                           var state = this.get();
                           return this.changer.setTouched(state, key, value), this.set(state);
                        },
                     },
                     {
                        key: 'setIsValid',
                        value: function setIsValid(value) {
                           var state = this.get();
                           return (state.isValid = value), this.set(state);
                        },
                     },
                     {
                        key: 'setIsSubmitted',
                        value: function setIsSubmitted(value) {
                           var state = this.get();
                           return (state.isSubmitted = value), this.set(state);
                        },
                     },
                     {
                        key: 'setExistsChanges',
                        value: function setExistsChanges(value) {
                           var state = this.get();
                           return (state.existsChanges = value), this.set(state);
                        },
                     },
                     {
                        key: 'setLoading',
                        value: function setLoading(value) {
                           var state = this.get();
                           return (state.loading = value), this.set(state);
                        },
                     },
                     {
                        key: 'validate',
                        value: function validate(allTouched) {
                           var state = this.get();
                           this.changer.validate(state, allTouched), this.set(state);
                        },
                     },
                     {
                        key: 'validateAt',
                        value: function validateAt(key) {
                           var state = this.get();
                           this.changer.setTouched(state, key, !0),
                              this.changer.validate(state, !1),
                              this.set(state);
                        },
                     },
                     {
                        key: 'addFieldValidator',
                        value: function addFieldValidator(key, func) {
                           this.customValidators[key] || (this.customValidators[key] = func);
                        },
                     },
                     {
                        key: 'removeFieldValidator',
                        value: function removeFieldValidator(key) {
                           delete this.customValidators[key];
                        },
                     },
                     {
                        key: 'submit',
                        value: function submit() {
                           var _this2 = this,
                              state = this.get();
                           this.changer.validate(state, !0),
                              (state.isSubmitted = !0),
                              this.onSubmit && state.isValid
                                 ? ((state.loading = !0),
                                   this.set(state),
                                   this.onSubmit(state, this)
                                      .then(function() {
                                         (state.loading = !1),
                                            _this2.resetOnSubmit && _this2.changer.reset(state),
                                            _this2.set(state);
                                      })
                                      .catch(function() {
                                         (state.loading = !1), _this2.set(state);
                                      }))
                                 : this.set(state);
                        },
                     },
                     {
                        key: 'reset',
                        value: function reset(getState) {
                           var state = this.get();
                           this.changer.reset(state, getState),
                              this.changer.validate(state, this.validateOnMount),
                              (state.isSubmitted = !1),
                              (state.existsChanges = !1),
                              this.set(state);
                        },
                     },
                     {
                        key: 'getQuery',
                        value: function getQuery() {
                           return (function makeApolloFormQuery(name) {
                              return Object(client.gql)(_templateObject(), name);
                           })(this.name);
                        },
                     },
                  ]),
                  FormManager
               );
            })();
         var hooks_useApolloForm = function useApolloForm(_ref) {
            var resetOnUnmount = _ref.resetOnUnmount,
               enableReinitialize = _ref.enableReinitialize,
               initialState = _ref.initialState,
               props = Object(objectWithoutProperties.a)(_ref, [
                  'resetOnUnmount',
                  'enableReinitialize',
                  'initialState',
               ]),
               mountedRef = react_default.a.useRef(!1),
               apolloClient = Object(client.useApolloClient)(),
               manager = react_default.a.useRef(
                  new src_FormManager(
                     Object(objectSpread2.a)({}, props, {
                        initialState: initialState,
                        apolloClient: apolloClient,
                     }),
                  ),
               ).current;
            return (
               react_default.a.useEffect(
                  function() {
                     return (
                        enableReinitialize && mountedRef.current && manager.reset(initialState),
                        (mountedRef.current = !0),
                        function() {
                           resetOnUnmount && manager.reset();
                        }
                     );
                  },
                  [resetOnUnmount, enableReinitialize],
               ),
               manager
            );
         };
         var utils_ErrorMessage = function ErrorMessage(props) {
            var apolloForm = hooks_useApolloFormCtx(),
               error = apolloForm.useError(props.name),
               touched = apolloForm.useTouched(props.name),
               Component =
                  props.children ||
                  function(_ref) {
                     return _ref.error;
                  };
            return react_default.a.createElement(Component, {
               error: (props.ignoreTouched ? error : error && touched) && error,
            });
         };
         var utils_FormLoader = function FormLoader(props) {
            var Component = props.children,
               state = hooks_useApolloFormCtx().useState(function(s) {
                  return s.loading;
               });
            return react_default.a.createElement(Component, { loading: state });
         };
         var utils_Submit = function Submit(props) {
            var Component = props.children;
            if (!Component) throw new Error('Require component or children func');
            var state = hooks_useApolloFormCtx().get(),
               isValid = state.isValid,
               loading = state.loading,
               existsChanges = state.existsChanges,
               isSubmitted = state.isSubmitted;
            return react_default.a.createElement(Component, {
               disabled: !isValid || loading || !existsChanges,
               isValid: isValid,
               loading: loading,
               existsChanges: existsChanges,
               isSubmitted: isSubmitted,
            });
         };
         var src_ApolloForm = function ApolloForm(_ref) {
               var children = _ref.children,
                  params = Object(objectWithoutProperties.a)(_ref, ['children']),
                  manager = hooks_useApolloForm(params);
               return react_default.a.createElement(
                  src_FormContext.Provider,
                  { value: manager },
                  react_default.a.createElement(
                     'form',
                     {
                        onSubmit: function onSubmit(e) {
                           e.preventDefault(), e.stopPropagation(), manager.submit();
                        },
                     },
                     children,
                  ),
               );
            },
            es = (__webpack_require__(119), __webpack_require__(93)),
            TextField = __webpack_require__(799),
            Grid = __webpack_require__(797),
            Box = __webpack_require__(801),
            Button = __webpack_require__(802),
            Divider = __webpack_require__(798);
         function wait(time) {
            return new Promise(function(resolve) {
               setTimeout(resolve, time);
            });
         }
         __webpack_require__.d(__webpack_exports__, 'Example', function() {
            return Example;
         }),
            __webpack_require__.d(__webpack_exports__, 'anotherPage', function() {
               return anotherPage;
            });
         __webpack_exports__.default = { title: 'Components' };
         var validationSchema = es.b().shape({
            email: es
               .c()
               .required()
               .max(5),
            password: es
               .c()
               .required()
               .max(3),
            deep: es.b().shape({
               one: es
                  .c()
                  .required()
                  .max(2),
            }),
            arr: es
               .a()
               .of(
                  es
                     .c()
                     .required()
                     .max(3),
               )
               .min(3)
               .test('aeqwes', 'error test', function(arr) {
                  return !(
                     arr.filter(function(el) {
                        return 2 === el.length;
                     }).length > 0
                  );
               }),
         });
         function FormTextField(props) {
            return react.createElement(
               field_Field,
               { name: props.name, validate: props.validate },
               function(_ref) {
                  var field = _ref.field,
                     err = Boolean(field.touched && field.error);
                  return (
                     console.log('render ' + props.name),
                     react.createElement(TextField.a, {
                        value: field.value,
                        onChange: function onChange(e) {
                           return field.setFieldValue(e.target.value);
                        },
                        onBlur: function onBlur() {
                           return field.setFieldTouched(!0);
                        },
                        helperText: err ? field.error : void 0,
                        error: Boolean(field.touched && field.error),
                        label: props.label,
                     })
                  );
               },
            );
         }
         function FormTextFieldArray(props) {
            return react.createElement(
               field_FieldArray,
               { name: props.name, validate: props.validate },
               function(_ref2) {
                  var field = _ref2.field;
                  return react.createElement(
                     react.Fragment,
                     null,
                     field.value.map(function(el, i) {
                        return react.createElement(
                           Grid.a,
                           { item: !0, xs: 3, key: 'arr-field' + i },
                           react.createElement(FormTextField, {
                              key: 'test' + i,
                              name: props.name + '.' + i,
                              label: props.name + '.' + i,
                           }),
                        );
                     }),
                     react.createElement(
                        Grid.a,
                        { item: !0, xs: 3 },
                        react.createElement(
                           Box.a,
                           { display: 'flex' },
                           react.createElement(
                              Button.a,
                              {
                                 onClick: function onClick() {
                                    return field.push((field.value.length + 1).toString());
                                 },
                              },
                              'push',
                           ),
                           react.createElement(
                              Button.a,
                              {
                                 onClick: function onClick() {
                                    return field.pop();
                                 },
                              },
                              'pop',
                           ),
                        ),
                     ),
                  );
               },
            );
         }
         function Example() {
            var _React$useState = react.useState({
                  email: '1',
                  password: '',
                  deep: { one: '1' },
                  arr: ['', '2', '31'],
               }),
               _React$useState2 = Object(slicedToArray.a)(_React$useState, 2),
               initialState = _React$useState2[0];
            _React$useState2[1];
            return react.createElement(
               src_ApolloForm,
               {
                  name: 'test',
                  initialState: initialState,
                  validationSchema: validationSchema,
                  validate: function validate(_ref3) {
                     if ('12' === _ref3.values.email) return { email: 'Not 12' };
                  },
                  onSubmit: (function() {
                     var _ref5 = Object(asyncToGenerator.a)(
                        regenerator_default.a.mark(function _callee(_ref4, form) {
                           var values;
                           return regenerator_default.a.wrap(function _callee$(_context) {
                              for (;;)
                                 switch ((_context.prev = _context.next)) {
                                    case 0:
                                       return (
                                          (values = _ref4.values), (_context.next = 3), wait(1e3)
                                       );
                                    case 3:
                                       console.log('submit', values),
                                          form.reset(
                                             Object(objectSpread2.a)({}, values, {
                                                email: 'Reseted',
                                             }),
                                          );
                                    case 5:
                                    case 'end':
                                       return _context.stop();
                                 }
                           }, _callee);
                        }),
                     );
                     return function(_x, _x2) {
                        return _ref5.apply(this, arguments);
                     };
                  })(),
                  onChange: function onChange(state, form) {
                     return console.log('onChange: ', form.get().values);
                  },
                  enableReinitialize: !0,
               },
               react.createElement(
                  Grid.a,
                  { container: !0, spacing: 2 },
                  react.createElement(
                     Grid.a,
                     { container: !0, item: !0, xs: 12, spacing: 2 },
                     react.createElement(
                        Grid.a,
                        { item: !0, xs: 3 },
                        react.createElement(FormTextField, {
                           name: 'email',
                           label: 'email',
                           validate: function validate(v) {
                              if (1 === v.length) return 'custom error';
                           },
                        }),
                     ),
                     react.createElement(
                        Grid.a,
                        { item: !0, xs: 3 },
                        react.createElement(FormTextField, { name: 'password', label: 'password' }),
                     ),
                     react.createElement(
                        Grid.a,
                        { item: !0, xs: 3 },
                        react.createElement(FormTextField, { name: 'deep.one', label: 'Deep one' }),
                     ),
                  ),
                  react.createElement(
                     Grid.a,
                     { container: !0, item: !0, xs: 12, spacing: 2 },
                     react.createElement(FormTextFieldArray, {
                        name: 'arr',
                        validate: function validate(arr) {
                           if (
                              0 !==
                              arr.filter(function(el) {
                                 return 0 === el.length;
                              }).length
                           )
                              return 'not empty in arr';
                        },
                     }),
                  ),
                  react.createElement(
                     Grid.a,
                     { item: !0, xs: 12 },
                     react.createElement(Divider.a, null),
                  ),
                  react.createElement(
                     Grid.a,
                     { item: !0, xs: 12 },
                     react.createElement(consumers_FormConsumer, null, function(_ref6) {
                        var form = _ref6.form;
                        return react.createElement(
                           Button.a,
                           {
                              onClick: function onClick() {
                                 return form.reset();
                              },
                           },
                           'RESET',
                        );
                     }),
                     react.createElement(consumers_FormConsumer, null, function(_ref7) {
                        var form = _ref7.form;
                        return react.createElement(
                           Button.a,
                           {
                              onClick: function onClick() {
                                 return form.validate(!0);
                              },
                           },
                           'VALIDATE',
                        );
                     }),
                     react.createElement(utils_Submit, null, function(_ref8) {
                        var isValid = _ref8.isValid,
                           isSubmitted = _ref8.isSubmitted,
                           loading = _ref8.loading;
                        return react.createElement(
                           Button.a,
                           { type: 'submit', disabled: loading || (!!isSubmitted && !isValid) },
                           'Submit',
                        );
                     }),
                  ),
                  react.createElement(
                     Grid.a,
                     { item: !0, xs: 12 },
                     react.createElement(Divider.a, null),
                  ),
                  react.createElement(
                     Grid.a,
                     { item: !0, xs: 12, container: !0, spacing: 2 },
                     react.createElement(
                        Grid.a,
                        { item: !0, xs: 2 },
                        react.createElement(consumers_StateConsumer, null, function(_ref9) {
                           var isValid = _ref9.state.isValid;
                           return react.createElement(
                              react.Fragment,
                              null,
                              'Is valid: ' + isValid.toString(),
                           );
                        }),
                     ),
                     react.createElement(
                        Grid.a,
                        { item: !0, xs: 2 },
                        react.createElement(utils_FormLoader, null, function(_ref10) {
                           var loading = _ref10.loading;
                           return react.createElement(
                              react.Fragment,
                              null,
                              'Loading ' + loading.toString(),
                           );
                        }),
                     ),
                     react.createElement(
                        Grid.a,
                        { item: !0, xs: 2 },
                        react.createElement(
                           consumers_StateConsumer,
                           {
                              selector: function selector(s) {
                                 return s.existsChanges;
                              },
                           },
                           function(_ref11) {
                              var existsChanges = _ref11.state;
                              return react.createElement(
                                 react.Fragment,
                                 null,
                                 'Exists changes: ' + existsChanges.toString(),
                              );
                           },
                        ),
                     ),
                     react.createElement(
                        Grid.a,
                        { item: !0, xs: 2 },
                        react.createElement(
                           consumers_StateConsumer,
                           {
                              selector: function selector(s) {
                                 return s.isSubmitted;
                              },
                           },
                           function(_ref12) {
                              var isSubmitted = _ref12.state;
                              return react.createElement(
                                 react.Fragment,
                                 null,
                                 'Is submitted: ' + isSubmitted.toString(),
                              );
                           },
                        ),
                     ),
                  ),
                  react.createElement(
                     Grid.a,
                     { item: !0, xs: 12 },
                     react.createElement(Divider.a, null),
                  ),
                  react.createElement(
                     Grid.a,
                     { item: !0, xs: 3 },
                     react.createElement(utils_ErrorMessage, {
                        name: 'password',
                        children: function children(_ref13) {
                           var error = _ref13.error;
                           return react.createElement(
                              'span',
                              null,
                              'password-err: (',
                              react.createElement('b', { style: { color: 'red' } }, error),
                              ')',
                           );
                        },
                     }),
                  ),
                  react.createElement(
                     Grid.a,
                     { item: !0, xs: 3 },
                     react.createElement(utils_ErrorMessage, {
                        name: 'arr',
                        children: function children(_ref14) {
                           var error = _ref14.error;
                           return react.createElement(
                              'span',
                              null,
                              'arr-err: (',
                              react.createElement('b', { style: { color: 'red' } }, error),
                              ')',
                           );
                        },
                     }),
                  ),
               ),
            );
         }
         function anotherPage() {
            return react.createElement('div', null, 'another page');
         }
      },
   },
   [[403, 1, 2]],
]);
//# sourceMappingURL=main.d5ec6b2f336017f7d8b2.bundle.js.map
